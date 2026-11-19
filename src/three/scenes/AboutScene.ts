import { OrbitalScene } from './OrbitalScene';

export class AboutScene extends OrbitalScene {
  constructor(container: HTMLDivElement, onFallback?: () => void) {
    super(container, onFallback ?? (() => {}));
  }
}
