import * as THREE from 'three';
import { SceneManager } from '../core/SceneManager';

export class TerrainScene {
  private manager: SceneManager;
  private terrainGrid!: THREE.LineSegments;

  constructor(container: HTMLDivElement, onFallback?: () => void) {
    this.manager = new SceneManager({ container, onWebGLFallback: onFallback });

    if (!this.manager.renderer) return;

    this.initScene();
    this.manager.render((time) => this.update(time));
  }

  private initScene() {
    const scene = this.manager.scene;

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3, 20);
    cyanLight.position.set(0, 5, 5);
    scene.add(cyanLight);

    // Wireframe Terrain Plane
    const width = 20;
    const height = 20;
    const segments = 30;
    const planeGeo = new THREE.PlaneGeometry(width, height, segments, segments);
    
    // Add wave height displacements to vertices
    const pos = planeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.5;
      pos.setZ(i, z);
    }
    planeGeo.computeVertexNormals();

    const wireGeo = new THREE.WireframeGeometry(planeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    this.terrainGrid = new THREE.LineSegments(wireGeo, wireMat);
    this.terrainGrid.rotation.x = -Math.PI / 2.5;
    this.terrainGrid.position.set(0, -2, -2);

    scene.add(this.terrainGrid);

    this.manager.camera.position.set(0, 0, 5);
  }

  private update(time: number) {
    if (this.terrainGrid) {
      this.terrainGrid.position.z = -2 + (Math.sin(time * 0.5) * 0.2);
    }
  }

  public destroy() {
    this.manager.dispose();
  }
}
