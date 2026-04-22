import { Link } from 'react-router-dom'
import './Home.css'

const skills = {
  'Languages': ['Java', 'Scala', 'Python', 'JavaScript', 'Kotlin', 'C++'],
  'Frameworks': ['Spring Boot', 'Spring Security', 'Play', 'Flask', 'Angular', 'React'],
  'Data & Messaging': ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'MySQL', 'Druid', 'Flink'],
  'Cloud & DevOps': ['AWS', 'Azure Spring Apps', 'Docker', 'Jenkins', 'CI/CD'],
}

const projects = [
  {
    name: 'Tracki8 MES',
    role: 'Software Engineer · Solvei8',
    year: '2025–26',
    desc: 'Cloud-edge Manufacturing Execution System serving 60+ global apparel factories. Built RFID scanning, combo packing architecture, and real-time data pipelines.',
    tags: ['Java', 'Scala', 'Kafka', 'MongoDB'],
    link: '/blog',
  },
  {
    name: 'Blogger Hub',
    role: 'Personal Project',
    year: '2024',
    desc: 'Production-grade multi-user blogging API with 3-tier RBAC, JWT + OTP auth, async Kafka notification pipeline, and Azure deployment.',
    tags: ['Spring Boot', 'Kafka', 'MongoDB', 'Docker'],
    link: 'https://github.com/amaanlari/blogger-hub',
  },
  {
    name: 'Viral Fission Platform',
    role: 'Software Developer Intern',
    year: '2024',
    desc: 'Redis + Kafka notification ecosystem serving 150k+ users with 1M+ daily updates and 100% delivery reliability via DLT and automated retries.',
    tags: ['Kafka', 'Redis', 'Spring Boot', 'Angular'],
    link: '/resume',
  },
  {
    name: 'Oppia',
    role: 'Open Source Contributor',
    year: '2023',
    desc: 'Automated translatable content creation on Oppia\'s educational platform, reducing contributor effort by 60%. Mentored contributors on code quality.',
    tags: ['Python', 'Angular'],
    link: 'https://github.com/oppia/oppia',
  },
]

export default function Home() {
  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow fade-up">
            <span className="mono-tag">Software Engineer</span>
            <span className="hero-line" />
            <span className="mono-tag muted">Available for opportunities</span>
          </div>

          <h1 className="hero-name fade-up-2">
            Mohammad<br />
            <em>Amaan Lari</em>
          </h1>

          <p className="hero-sub fade-up-3">
            Backend engineer specialising in distributed systems, cloud-edge microservices,
            and high-throughput data pipelines. Currently building production systems
            at manufacturing scale.
          </p>

          <div className="hero-actions fade-up-4">
            <Link to="/resume" className="btn-primary">View Resume</Link>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
              Download PDF ↓
            </a>
            <Link to="/blog" className="btn-ghost">Read Blog →</Link>
          </div>

          <div className="hero-meta fade-up-5">
            <a href="https://github.com/amaanlari" target="_blank" rel="noreferrer" className="meta-link">GitHub</a>
            <span className="meta-sep">·</span>
            <a href="https://linkedin.com/in/amaanlari" target="_blank" rel="noreferrer" className="meta-link">LinkedIn</a>
            <span className="meta-sep">·</span>
            <a href="mailto:amaanlari.official@gmail.com" className="meta-link">Email</a>
          </div>
        </div>

        <div className="hero-scroll-hint fade-up-6">
          <span className="mono-tag muted">scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <span className="mono-tag accent">01 — Skills</span>
            <h2 className="section-title">Technical stack</h2>
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([cat, items], i) => (
              <div className="skill-group" key={cat} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="skill-cat">{cat}</span>
                <div className="skill-chips">
                  {items.map(s => <span className="chip" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="mono-tag accent">02 — Work</span>
            <h2 className="section-title">Selected projects</h2>
          </div>
          <div className="projects-list">
            {projects.map((p, i) => (
              <Link
                to={p.link}
                className="project-card"
                key={p.name}
                target={p.link.startsWith('http') ? '_blank' : undefined}
                rel={p.link.startsWith('http') ? 'noreferrer' : undefined}
              >
                <div className="project-top">
                  <div>
                    <span className="project-year mono-tag muted">{p.year}</span>
                    <h3 className="project-name">{p.name}</h3>
                    <span className="project-role">{p.role}</span>
                  </div>
                  <span className="project-arrow">↗</span>
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <h2 className="cta-title">
              Let's build something<br /><em>meaningful.</em>
            </h2>
            <a href="mailto:amaanlari.official@gmail.com" className="btn-primary large">
              amaanlari.official@gmail.com
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
