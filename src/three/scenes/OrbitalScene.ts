import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { SceneManager } from '../core/SceneManager';
import { createStudioForms } from './StudioForms';
import type { StudioForm } from './StudioForms';

/** A procedural studio sculpture, with all controls independent of React rendering. */
export class OrbitalScene {
  private manager: SceneManager;
  private sculpture = new THREE.Group();
  private display = new THREE.Group();
  private rings: THREE.Mesh[] = [];
  private target = new THREE.Vector2();
  private pointer = new THREE.Vector2();
  private container: HTMLDivElement;
  private environment: THREE.WebGLRenderTarget | null = null;
  private paused = false;
  private yaw = 0;
  private lastTime = 0;
  private startTime = 0;
  private dragging: number | null = null;
  private lastPointerX = 0;
  private bounds: DOMRect;
  private scrollProgress = 0;
  private scrollTarget = 0;
  private forms: Partial<Record<StudioForm, THREE.Group>> = {};
  private formChangedAt = -Infinity;
  public get available() { return this.manager.available; }

  constructor(container: HTMLDivElement, fallback: () => void, globe = false) {
    this.container = container;
    this.bounds = container.getBoundingClientRect();
    this.manager = new SceneManager({ container, onWebGLFallback: fallback });
    const renderer = this.manager.renderer;
    if (!renderer) return;
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    this.environment = pmrem.fromScene(room, 0.04);
    this.manager.scene.environment = this.environment.texture;
    room.dispose();
    pmrem.dispose();
    if (!this.manager.available) return;
    renderer.toneMappingExposure = 0.92;
    this.manager.scene.add(this.display);

    const chrome = new THREE.MeshPhysicalMaterial({ color: 0xc4cec8, metalness: 1, roughness: 0.13, envMapIntensity: 1.6, clearcoat: 1 });
    const signal = new THREE.MeshPhysicalMaterial({ color: 0xb9d77d, metalness: 0.18, roughness: 0.14, clearcoat: 1 });
    const geometry = new THREE.TorusGeometry(1.36, 0.20, 24, 128);
    for (let index = 0; index < 3; index++) {
      const ring = new THREE.Mesh(geometry, chrome);
      ring.rotation.set(0.45 + index * 0.72, index * Math.PI / 3, index * 0.35);
      ring.scale.set(1.22, 0.84, 1);
      this.rings.push(ring);
      this.sculpture.add(ring);
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.64, 48, 32), signal);
    this.sculpture.add(core);
    const satelliteGeometry = new THREE.SphereGeometry(0.15, 24, 16);
    for (let i = 0; i < 2; i++) {
      const satellite = new THREE.Mesh(satelliteGeometry, chrome);
      satellite.position.set(i === 0 ? -2.05 : 2.05, i === 0 ? 0.5 : -0.4, 0.1);
      this.sculpture.add(satellite);
    }
    if (globe) {
      const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: true, transparent: true, opacity: 0.18 }));
      this.sculpture.add(wire);
    }
    this.sculpture.rotation.set(0.1, -0.3, -0.2);
    this.sculpture.scale.setScalar(0.63);
    this.sculpture.position.y = 1.15;
    this.sculpture.traverse(object => { if (object instanceof THREE.Mesh) object.castShadow = true; });
    this.forms = { orbit: this.sculpture, ...createStudioForms(chrome, signal) };
    for (const [name, form] of Object.entries(this.forms)) {
      form.visible = name === 'orbit';
      form.scale.setScalar(0.63);
      form.position.y = 1.15;
      form.traverse(object => { if (object instanceof THREE.Mesh) object.castShadow = true; });
      this.display.add(form);
    }

    // A physical display gives the floating forms a shared scale and grounding.
    const porcelain = new THREE.MeshStandardMaterial({ color: 0xbfc7ac, roughness: 0.42, metalness: 0.12, envMapIntensity: 0.32 });
    const podiums = [[0, -0.65, 0, 1.18, 1.4], [-1.75, -1.1, 0.35, 0.95, 0.7], [1.75, -1.3, 0.45, 0.95, 0.5]];
    const plinths: THREE.Mesh[] = [];
    for (const [x, y, z, radius, height] of podiums) {
      const half = height / 2;
      const profile = [[0,-half],[radius-0.06,-half],[radius-0.015,-half+0.025],[radius,-half+0.06],[radius,half-0.06],[radius-0.015,half-0.025],[radius-0.06,half],[0,half]].map(([px,py]) => new THREE.Vector2(px,py));
      const podium = new THREE.Mesh(new THREE.LatheGeometry(profile, 80), porcelain);
      podium.position.set(x, y, z);
      podium.castShadow = true;
      podium.receiveShadow = true;
      plinths.push(podium);
      this.display.add(podium);
    }
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.44, 0.16, 128, 20), new THREE.MeshPhysicalMaterial({ color: 0x638e70, roughness: 0.16, metalness: 0.45, clearcoat: 1, envMapIntensity: 1.1 }));
    knot.position.set(-1.75, -0.05, 0.35);
    knot.castShadow = true;
    const gem = new THREE.Mesh(new RoundedBoxGeometry(0.94, 0.94, 0.94, 4, 0.16), new THREE.MeshPhysicalMaterial({ color: 0xa5d9bf, metalness: 0, roughness: 0.08, transmission: 0.72, thickness: 0.8, ior: 1.45, clearcoat: 1, attenuationColor: new THREE.Color(0x568c65), attenuationDistance: 1.4 }));
    gem.position.set(1.75, -0.25, 0.45);
    gem.castShadow = true;
    this.display.add(knot, gem, this.sculpture);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.manager.scene.add(new THREE.HemisphereLight(0xe8efdc, 0x153c30, 0.65));
    const key = new THREE.DirectionalLight(0xfff2d6, 2.8);
    key.position.set(-3, 5, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 5;
    key.shadow.camera.bottom = -5;
    key.shadow.normalBias = 0.03;
    const rim = new THREE.DirectionalLight(0xb7ecd4, 3.8);
    rim.position.set(3, 2, -4);
    const fill = new THREE.DirectionalLight(0xe3f2e8, 0.7);
    fill.position.set(4, 0, 3);
    this.manager.scene.add(key, rim, fill);
    container.addEventListener('pointermove', this.move);
    container.addEventListener('pointerleave', this.leave);
    container.addEventListener('pointerenter', this.enter);
    container.addEventListener('pointerdown', this.down);
    container.addEventListener('pointerup', this.up);
    container.addEventListener('pointercancel', this.up);
    container.addEventListener('lostpointercapture', this.up);
    window.addEventListener('scroll', this.scroll, { passive: true });
    this.scroll();
    this.manager.render((time, delta) => {
      this.lastTime = time;
      this.pointer.lerp(this.target, delta ? 1 - Math.exp(-3.5 * delta) : 1);
      const phase = time - this.startTime;
      const damping = delta ? 1 - Math.exp(-4 * delta) : 1;
      this.scrollProgress = this.manager.motionReduced ? 0 : THREE.MathUtils.lerp(this.scrollProgress, this.scrollTarget, damping);
      const entrance = this.manager.motionReduced ? 1 : 1 - Math.pow(1 - Math.min(time / 1.6, 1), 4);
      this.display.rotation.set(this.pointer.y * 0.10 + this.scrollProgress * 0.14, this.pointer.x * 0.18 + this.scrollProgress * 0.65, -this.scrollProgress * 0.08);
      this.display.position.y = -0.75 * (1 - entrance) + this.scrollProgress * 0.12;
      this.display.scale.setScalar(0.86 + entrance * 0.14 + this.scrollProgress * 0.06);
      plinths.forEach((podium, index) => { podium.position.y = podiums[index][1] - (1 - entrance) * (0.3 + index * 0.2); });
      this.sculpture.rotation.set(0.1 + this.pointer.y * 0.18, -0.3 + phase * 0.12 + this.yaw + this.pointer.x * 0.35, -0.2);
      this.sculpture.position.y = 1.15 + Math.sin(phase * 0.5) * 0.08 + (1 - entrance) * 1.2;
      const switchProgress = this.manager.motionReduced ? 1 : Math.min(1, Math.max(0, (time - this.formChangedAt) / 0.8));
      const remaining = switchProgress - 1;
      const reveal = 1 + 2.2 * remaining ** 3 + 1.2 * remaining ** 2;
      this.sculpture.scale.setScalar(0.63 * (0.25 + 0.75 * reveal));
      knot.rotation.set(phase * 0.15, phase * 0.2 + this.yaw * 0.3, 0.3);
      knot.position.y = -0.05 + Math.sin(phase * 0.7 + 1) * 0.12 + (1 - entrance) * 0.8;
      gem.rotation.set(0.35 + phase * 0.1, 0.55 + phase * -0.18 + this.yaw * 0.3, 0.25);
      gem.position.y = -0.25 + Math.sin(phase * 0.6 + 2) * 0.1 + (1 - entrance) * 1.5;
      this.rings.forEach((ring, index) => {
        ring.rotation.set(0.45 + index * 0.72 + Math.sin(phase * 0.3 + index) * 0.12, index * Math.PI / 3 + phase * (index % 2 ? -0.12 : 0.08), index * 0.35 + phase * 0.04);
      });
      core.scale.setScalar(1 + Math.sin(phase * 0.7) * 0.025);
    });
  }

  private enter = () => { this.bounds = this.container.getBoundingClientRect(); };
  private scroll = () => {
    if (this.paused || this.manager.motionReduced) return;
    const hero = this.container.closest('section');
    if (!hero) return;
    this.scrollTarget = THREE.MathUtils.clamp(-hero.getBoundingClientRect().top / hero.clientHeight, 0, 1);
  };
  private down = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0) return;
    this.enter();
    this.dragging = event.pointerId;
    this.lastPointerX = event.clientX;
    this.container.setPointerCapture(event.pointerId);
    this.container.dataset.dragging = 'true';
  };
  private up = () => {
    if (this.dragging !== null && this.container.hasPointerCapture(this.dragging)) this.container.releasePointerCapture(this.dragging);
    this.dragging = null;
    delete this.container.dataset.dragging;
  };
  private move = (event: PointerEvent) => {
    if (this.dragging === event.pointerId) {
      this.yaw += (event.clientX - this.lastPointerX) * 0.012;
      this.lastPointerX = event.clientX;
      this.manager.invalidate();
      return;
    }
    if (event.pointerType === 'touch' || this.paused || this.manager.motionReduced) return;
    const rect = this.bounds;
    this.target.set((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
  };
  private leave = () => { this.target.set(0, 0); };

  public setPaused(paused: boolean) { this.paused = paused; if (!paused) this.scroll(); this.manager.setPaused(paused); }
  public rotate() { this.yaw += Math.PI / 6; this.manager.invalidate(); }
  public setForm(name: StudioForm) {
    const form = this.forms[name];
    if (!form || form === this.sculpture) return;
    this.sculpture.visible = false;
    this.sculpture = form;
    form.visible = true;
    this.formChangedAt = this.paused || this.manager.motionReduced ? -Infinity : this.lastTime;
    this.manager.invalidate();
  }
  public reset() { this.yaw = 0; this.startTime = this.lastTime; this.target.set(0, 0); this.pointer.set(0, 0); this.manager.invalidate(); }
  public destroy() {
    this.up();
    this.container.removeEventListener('pointermove', this.move);
    this.container.removeEventListener('pointerleave', this.leave);
    this.container.removeEventListener('pointerenter', this.enter);
    this.container.removeEventListener('pointerdown', this.down);
    this.container.removeEventListener('pointerup', this.up);
    this.container.removeEventListener('pointercancel', this.up);
    this.container.removeEventListener('lostpointercapture', this.up);
    window.removeEventListener('scroll', this.scroll);
    this.manager.dispose();
    this.environment?.dispose();
  }
}
