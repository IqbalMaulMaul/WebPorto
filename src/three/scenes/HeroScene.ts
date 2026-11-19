import { OrbitalScene } from './OrbitalScene';

/** Compatibility entrypoint for the local orbital sculpture. */
export class HeroScene extends OrbitalScene {
  constructor(container: HTMLDivElement, onFallback?: () => void) {
    super(container, onFallback ?? (() => {}));
  }
}
