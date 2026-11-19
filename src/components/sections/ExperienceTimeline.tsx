interface TimelineItem {
  period: string;
  title: string;
  org: string;
  desc: string;
  tags: string[];
}

const TIMELINE: TimelineItem[] = [
  {
    period: '2025 – Present',
    title: 'Freelance Frontend Developer',
    org: 'Self-employed / Project Pertamina',
    desc: 'Developing custom web applications and 3D interactive experiences for clients, including a dashboard project for Pertamina.',
    tags: ['React', 'Three.js', 'Laravel'],
  },
  {
    period: '2024',
    title: 'Frontend Developer',
    org: 'Simulator Supply Chain Project',
    desc: 'Built a browser-based interactive supply chain simulation game as part of a university research initiative.',
    tags: ['React', 'Canvas API', 'Supabase'],
  },
  {
    period: '2023 – 2024',
    title: 'Informatics Student',
    org: 'University of [City]',
    desc: 'Studying Informatics Engineering with focus on web development, algorithms, and software engineering principles.',
    tags: ['Web Dev', 'Algorithms', 'OOP'],
  },
  {
    period: '2023',
    title: 'Web Development Workshop',
    org: 'Bootcamp / Community',
    desc: 'Completed intensive front-end and back-end development training covering React, Laravel, and database design.',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
  },
];

export const ExperienceTimeline = () => (
  <section id="experience" className="page-section experience-section" aria-labelledby="experience-title">
    <div className="wrap">
      <div className="section-heading heading-row"><div><span className="section-index">04 / Experience</span><h2 id="experience-title">Learning. Building.<br />Growing.</h2></div><p className="section-note">Active Since 2023<br />Global Developer · Indonesia</p></div>
      <div className="timeline-list">{TIMELINE.map((item, index) => <article className="timeline-row" key={item.title}>
        <div className="timeline-date"><span className="timeline-number">0{index + 1}</span><span>{item.period}</span></div>
        <div className="timeline-role"><h3>{item.title}</h3><p>{item.org}</p></div>
        <div className="timeline-description"><p>{item.desc}</p><div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
    </div>
  </section>
);
