import { ArrowUpRight, BriefcaseBusiness, ClipboardCheck, Code2, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../experience.css';

interface TimelineItem {
  period: string;
  title: string;
  org: string;
  label: string;
  icon: LucideIcon;
  highlights: string[];
  tags: string[];
  project?: string;
}

// Experience supplied by the portfolio owner; recent technical work is featured first.
const TIMELINE: TimelineItem[] = [
  {
    period: 'Jun 2026 – Oct 2026',
    title: 'Frontend Developer',
    org: 'HPSIM — HMI Protocol Simulator (Pertamina Project)',
    label: 'Featured project',
    icon: Code2,
    highlights: [
      "Developed frontend interfaces for HPSIM, a Digital Twin prototype for Pertamina's fuel terminal operations.",
      'Built interactive monitoring dashboards to display operational information, including tank inventory, pump status, valve conditions, and active alarms.',
      'Developed Interactive Process Flow Diagram (PFD) interfaces to visualize industrial equipment and process conditions.',
      'Implemented responsive user interface components and operational data visualizations using Bootstrap and ApexCharts.',
    ],
    tags: ['Digital Twin', 'Bootstrap', 'ApexCharts', 'Interactive PFD'],
    project: '/projects/pertamina-supply-chain',
  },
  {
    period: 'Oct 2026',
    title: 'Quality Assurance Tester',
    org: 'Partograf Mobile 1.4.0',
    label: 'Quality assurance',
    icon: ClipboardCheck,
    highlights: [
      'Performed functional testing on the Partograf Mobile application to verify feature behavior and application functionality.',
      'Tested input validation and form behavior across different patient assessment scenarios.',
      'Conducted regression testing to identify issues following application updates.',
      'Tested alarm functionality on physical Android devices, including alarm behavior when the screen was locked.',
      'Documented test results, identified issues, and recorded observations for quality evaluation.',
    ],
    tags: ['Functional testing', 'Regression testing', 'Android'],
  },
  {
    period: 'Aug 2025',
    title: 'Intern',
    org: 'BPSDMP Kominfo Digital Yogyakarta',
    label: 'Internship',
    icon: GraduationCap,
    highlights: [
      'Participated in internship activities within a government institution focused on digital technology and competency development.',
      'Gained exposure to cloud computing, digital product design, and emerging technologies.',
      'Participated in learning activities covering Azure OpenAI and prompt engineering.',
      'Developed communication and presentation skills through public speaking activities.',
    ],
    tags: ['Cloud computing', 'Azure OpenAI', 'Public speaking'],
  },
  {
    period: 'Mar 2022 – May 2022',
    title: 'Administrative Intern',
    org: 'Kominfo Lampung Utara',
    label: 'Internship',
    icon: BriefcaseBusiness,
    highlights: [
      'Managed administrative documents related to Memorandum of Understanding (MoU) agreements between the institution and news media organizations.',
      'Prepared and organized MoU documentation to support media partnership administration.',
      'Assisted in maintaining and processing records of media collaboration agreements.',
    ],
    tags: ['MoU documentation', 'Media partnerships', 'Administration'],
  },
];

export const ExperienceTimeline = () => (
  <section id="experience" className="page-section career-section" aria-labelledby="experience-title">
    <div className="wrap">
      <div className="section-heading career-heading">
        <div><span className="section-index">01 / Experience</span><h2 id="experience-title">Experience<span aria-hidden="true">.</span></h2></div>
        <div className="career-introduction"><span className="career-years">2022 — 2026</span><p>My professional journey through internships, software development projects, and quality assurance activities.</p></div>
      </div>
      <div className="career-grid">
        {TIMELINE.map((item, index) => {
          const Icon = item.icon;
          return <article className={`career-card ${index === 0 ? 'career-card--featured' : ''}`} key={item.org} aria-labelledby={`experience-role-${index}`}>
            <div className="career-card-top"><span className="career-category"><Icon size={18} aria-hidden="true" />{item.label}</span><span className="career-period">{item.period}</span></div>
            <h3 id={`experience-role-${index}`}>{item.title}</h3>
            <p className="career-organization">{item.org}</p>
            <ul className="career-highlights">{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <div className="career-footer"><div className="career-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{item.project && <Link className="career-project-link" to={item.project}>View HPSIM project <ArrowUpRight size={17} aria-hidden="true" /></Link>}</div>
          </article>;
        })}
      </div>
    </div>
  </section>
);
