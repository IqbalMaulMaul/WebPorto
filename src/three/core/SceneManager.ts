import * as THREE from 'three';

export interface SceneManagerOptions {
  container: HTMLDivElement;
  onWebGLFallback?: () => void;
}

/** Owns GPU resources; pauses rendering offscreen and in hidden tabs. */
export class SceneManager {
  public container: HTMLDivElement;
  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  public renderer: THREE.WebGLRenderer | null = null;
  public animationFrameId: number | null = null;
  public isDisposed = false;
  private resizeObserver: ResizeObserver;
  private visibilityObserver: IntersectionObserver;
  private motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private visible = false;
  private paused = false;
  private contextUnavailable = false;
  private elapsed = 0;
  private previous = 0;
  private update?: (time: number, delta: number) => void;
  private onFallback?: () => void;

  constructor({ container, onWebGLFallback }: SceneManagerOptions) {
    this.container = container;
    this.onFallback = onWebGLFallback;
    this.camera.position.set(0, 2.4, 8.2);
    this.camera.lookAt(0, 0.1, 0);
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      this.renderer.debug.onShaderError = this.unavailable;
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.matchMedia('(pointer: coarse)').matches ? 1.25 : 1.5));
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.renderer.domElement.setAttribute('aria-hidden', 'true');
      this.renderer.domElement.addEventListener('webglcontextlost', this.contextLost);
      container.appendChild(this.renderer.domElement);
    } catch {
      onWebGLFallback?.();
    }
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(container);
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.restart();
    });
    this.visibilityObserver.observe(container);
    document.addEventListener('visibilitychange', this.restart);
    this.motion.addEventListener('change', this.restart);
    this.resize();
  }

  private contextLost = (event: Event) => {
    event.preventDefault();
    this.unavailable();
  };

  private unavailable = () => {
    this.contextUnavailable = true;
    this.stop();
    this.onFallback?.();
  };

  private resize = () => {
    if (this.isDisposed) return;
    const { clientWidth: width, clientHeight: height } = this.container;
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.position.z = Math.max(8.2, 8.5 / this.camera.aspect);
    this.camera.lookAt(0, 0.1, 0);
    this.camera.updateProjectionMatrix();
    this.renderer?.setSize(width, height);
    if (this.motion.matches || this.paused) this.draw(0);
  };

  private stop() {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.previous = 0;
  }

  private draw(delta: number) {
    if (this.isDisposed || this.contextUnavailable) return;
    this.update?.(this.elapsed, delta);
    this.renderer?.render(this.scene, this.camera);
  }

  private tick = (now: number) => {
    this.animationFrameId = null;
    if (this.isDisposed || this.contextUnavailable) return;
    // Recheck live preferences at the frame boundary: a queued frame can outlive
    // the preference-change notification or a pause/visibility transition.
    if (this.motion.matches || this.paused || !this.visible || document.hidden) {
      this.stop();
      if (this.visible && !document.hidden) this.draw(0);
      return;
    }
    const delta = this.previous ? Math.min((now - this.previous) / 1000, 0.05) : 0;
    this.previous = now;
    this.elapsed += delta;
    this.draw(delta);
    if (!this.contextUnavailable && !this.isDisposed) this.animationFrameId = requestAnimationFrame(this.tick);
  };

  private restart = () => {
    this.stop();
    if (this.isDisposed || this.contextUnavailable || !this.renderer || !this.visible || document.hidden || !this.update) return;
    if (this.motion.matches || this.paused) this.draw(0);
    else this.animationFrameId = requestAnimationFrame(this.tick);
  };

  public render(update?: (time: number, delta: number) => void) {
    this.update = update ?? (() => {});
    this.restart();
  }

  public get motionReduced() { return this.motion.matches; }
  public get available() { return Boolean(this.renderer) && !this.isDisposed && !this.contextUnavailable; }

  public setPaused(paused: boolean) {
    this.paused = paused;
    this.restart();
  }

  public invalidate() {
    if (!this.isDisposed && !this.contextUnavailable) this.draw(0);
  }

  public dispose() {
    this.isDisposed = true;
    this.stop();
    this.resizeObserver.disconnect();
    this.visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', this.restart);
    this.motion.removeEventListener('change', this.restart);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    this.scene.traverse((object) => {
      if (object instanceof THREE.DirectionalLight) object.shadow.dispose();
      const drawable = object as THREE.Mesh;
      if (drawable.geometry) geometries.add(drawable.geometry);
      if (drawable.material) {
        const list = Array.isArray(drawable.material) ? drawable.material : [drawable.material];
        list.forEach(material => {
          materials.add(material);
          Object.values(material).forEach(value => {
            if (value instanceof THREE.Texture) textures.add(value);
          });
        });
      }
    });
    textures.forEach(texture => texture.dispose());
    materials.forEach(material => material.dispose());
    geometries.forEach(geometry => geometry.dispose());
    this.scene.clear();
    this.renderer?.domElement.removeEventListener('webglcontextlost', this.contextLost);
    this.renderer?.dispose();
    this.renderer?.domElement.remove();
  }
}
