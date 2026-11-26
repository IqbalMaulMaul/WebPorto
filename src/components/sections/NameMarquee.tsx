import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

export const NameMarquee = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section id="playground" className="name-marquee" aria-label="Iqbal Maulana Dhiti" data-paused={paused}>
      <div className="name-marquee-track" aria-hidden="true">
        {[0, 1].map(group => (
          <div className="name-marquee-group" key={group}>
            {[0, 1, 2].map(item => (
              <span className="name-marquee-item" key={item}>
                Iqbal Maulana Dhiti <span className="name-marquee-diamond">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button className="name-marquee-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play name animation' : 'Pause name animation'}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </section>
  );
};
