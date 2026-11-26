export const NameMarquee = () => {
  return (
    <section id="playground" className="name-marquee" aria-label="Iqbal Maulana Dhiti">
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
    </section>
  );
};
