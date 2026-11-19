import * as THREE from 'three';

export type StudioForm = 'orbit' | 'bloom' | 'flow';

/** Shared materials let all three studies use the same lighting and disposal path. */
export function createStudioForms(chrome: THREE.Material, sage: THREE.Material) {
  const bloom = new THREE.Group();
  const petalGeometry = new THREE.SphereGeometry(0.75, 32, 20);
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const petal = new THREE.Mesh(petalGeometry, chrome);
    petal.scale.set(0.54, 1.15, 0.42);
    petal.position.set(Math.sin(angle) * 0.83, Math.cos(angle) * 0.83, Math.sin(angle * 2) * 0.14);
    petal.rotation.z = -angle;
    bloom.add(petal);
  }
  bloom.add(new THREE.Mesh(new THREE.SphereGeometry(0.43, 32, 24), sage));

  class FlowCurve extends THREE.Curve<THREE.Vector3> {
    constructor() { super(); }
    getPoint(t: number, target = new THREE.Vector3()) {
      const angle = t * Math.PI * 2;
      return target.set(1.3 * Math.sin(angle), 1.1 * Math.sin(angle * 2), 0.52 * Math.cos(angle));
    }
  }
  const flow = new THREE.Group();
  const loop = new THREE.Mesh(new THREE.TubeGeometry(new FlowCurve(), 144, 0.22, 20, true), chrome);
  loop.rotation.z = -0.35;
  flow.add(loop);
  const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), sage);
  pearl.position.set(0.54, 0.45, 0.12);
  flow.add(pearl);
  return { bloom, flow };
}
