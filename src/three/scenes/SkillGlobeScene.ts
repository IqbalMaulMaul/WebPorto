import { OrbitalScene } from './OrbitalScene';

export class SkillGlobeScene extends OrbitalScene {
  constructor(container: HTMLDivElement, onFallback?: () => void) {
    super(container, onFallback ?? (() => {}), true);
  }
}
