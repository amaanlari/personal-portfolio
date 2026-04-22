import './Resume.css'

const experience = [
  {
    role: 'Software Engineer',
    company: 'Solvei8 · Tracki8 MES',
    period: 'Apr 2025 – Feb 2026',
    sub: 'Intern → Full-Time · Cloud-Edge MES serving 60+ global factories',
    bullets: [
      { label: 'RFID Bulk Scanning Engine', text: 'Replaced manual QR single-scan workflows with an RFID bulk system processing 5–10 tags simultaneously, directly cutting per-bundle scan time on the factory floor. Engineered a tag lifecycle state machine defining precise Terminated vs. Active transitions with versioning logic to prevent data collisions in high-concurrency environments.' },
      { label: 'Cross-Microservice WIP Integration', text: 'Identified a missing data linkage between two microservices; engineered a service-to-service integration to fetch live WIP state and surface it in the Tag Generation module\'s history view, giving floor supervisors real-time traceability without manual lookups.' },
      { label: 'Scan & Pack Refactor', text: 'Led full-stack refactor to support multi-color, variable-size cartons demanded by global clients; migrated 3 core production tables (nullable color columns + historical backfill from BCTX tables), modified 21 files across Scala, Slick mappings, DTOs, Excel parser, and REST APIs — shipped as a zero-downtime global update.' },
      { label: 'Set Packs — Greenfield Architecture', text: 'Co-designed a two-tier packing system (Set Pack → Carton) for complex combo orders, iterating the data model 3 times with senior developer and solutions team. Built 5–10 APIs in Scala with optimistic concurrency control, MongoDB aggregation pipelines, hash-based audit logging, and 10+ DTOs.' },
      { label: 'Measurement QC Automation', text: 'Built automated QC services that generate production compliance reports directly from user-defined specifications, eliminating manual reporting overhead and enabling real-time data-driven floor monitoring across all factories.' },
      { label: 'API & Data Layer', text: 'Owned the full data layer across Tracki8 modules — optimized MongoDB aggregation pipelines and PostgreSQL schemas with regression testing; integrated Apache Kafka event streaming for manufacturing analytics, co-authoring performance contracts with the data engineering team. Delivered 20+ RESTful APIs in Java/Scala.' },
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Viral Fission',
    period: 'Jul 2024 – Dec 2024',
    sub: '',
    bullets: [
      { label: 'Notification Ecosystem', text: 'Replaced cron-based monitoring with a Redis + Kafka distributed pipeline (In-App, SMS, Email) serving 150k+ users with 1M+ daily updates; added DLT and automated retries for 100% delivery reliability. Led Kafka vs. AWS SQS benchmarking to produce a cost-performance scaling roadmap for leadership.' },
      { label: 'Platform Engineering', text: 'Architected corporate website and CMS with Angular 18 and Spring Boot; implemented a Global Exception Handler with custom types and unit tests, standardizing error reporting across all mobile and web clients.' },
    ],
  },
]

const projects = [
  {
    name: 'Blogger Hub',
    stack: 'Java 17 · Spring Boot · Spring Security · Kafka · MongoDB · Redis · Docker · Azure',
    bullets: [
      'Built production-grade multi-user blogging API with JWT + OTP auth, refresh token rotation, and 3-tier RBAC (Admin/Free/Premium) enforcing subscription-based feature gating via Spring Security filter chains; engineered async Kafka notification pipeline for 5+ event types.',
      'Optimized MongoDB with compound indexes and paginated read/unread tracking; containerized with Docker and deployed on Azure Spring Apps with Cloudinary CDN for media.',
    ],
  },
  {
    name: 'Oppia',
    stack: 'Python · Angular · Open Source',
    bullets: [
      'Automated translatable content creation, reducing contributor effort by 60%; wrote unit tests against the full existing test suite and mentored contributors, raising average contribution quality score by 10%.',
    ],
  },
]

const skills = {
  'Languages': ['Java', 'Python', 'Scala', 'JavaScript', 'C++', 'Kotlin'],
  'Frameworks & Tools': ['Spring Boot', 'Spring Security', 'Play', 'Flask', 'Angular', 'React', 'Docker', 'Git', 'Jenkins'],
  'Databases & Messaging': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka (KRaft)', 'Druid', 'Flink'],
  'Cloud & DevOps': ['AWS (EC2, Elastic Beanstalk, SNS, SQS, CloudWatch)', 'Azure Spring Apps', 'Docker', 'CI/CD'],
}

export default function Resume() {
  return (
    <main className="resume-page">
      <div className="container">

        {/* Actions */}
        <div className="resume-actions fade-up">
          <button className="resume-print-btn" onClick={() => window.print()}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="resume-dl-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>

        {/* Header */}
        <div className="resume-header fade-up-2">
          <div className="rh-left">
            <span className="mono-label">Curriculum Vitae</span>
            <h1 className="resume-name">Mohammad<br /><em>Amaan Lari</em></h1>
          </div>
          <div className="rh-right">
            <div className="contact-line">
              <span className="contact-label">Email</span>
              <a href="mailto:amaanlari.official@gmail.com" className="contact-val">amaanlari.official@gmail.com</a>
            </div>
            <div className="contact-line">
              <span className="contact-label">LinkedIn</span>
              <a href="https://linkedin.com/in/amaanlari" target="_blank" rel="noreferrer" className="contact-val">linkedin.com/in/amaanlari</a>
            </div>
            <div className="contact-line">
              <span className="contact-label">GitHub</span>
              <a href="https://github.com/amaanlari" target="_blank" rel="noreferrer" className="contact-val">github.com/amaanlari</a>
            </div>
            <div className="contact-line">
              <span className="contact-label">Phone</span>
              <span className="contact-val">+91-7985453891</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="r-section fade-up-3">
          <h2 className="r-section-title">Technical Skills</h2>
          <div className="r-skills">
            {Object.entries(skills).map(([cat, items]) => (
              <div className="r-skill-row" key={cat}>
                <span className="r-skill-cat">{cat}</span>
                <span className="r-skill-vals">{items.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="r-section fade-up-4">
          <h2 className="r-section-title">Experience</h2>
          {experience.map((job) => (
            <div className="r-job" key={job.company}>
              <div className="r-job-header">
                <div>
                  <h3 className="r-job-role">{job.role}</h3>
                  <span className="r-job-company">{job.company}</span>
                  {job.sub && <span className="r-job-sub">{job.sub}</span>}
                </div>
                <span className="r-job-period">{job.period}</span>
              </div>
              <ul className="r-bullets">
                {job.bullets.map((b) => (
                  <li className="r-bullet" key={b.label}>
                    <span className="bullet-label">{b.label}:</span>
                    <span className="bullet-text"> {b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="r-section fade-up-5">
          <h2 className="r-section-title">Projects</h2>
          {projects.map((p) => (
            <div className="r-job" key={p.name}>
              <div className="r-job-header">
                <h3 className="r-job-role">{p.name}</h3>
              </div>
              <p className="r-stack">{p.stack}</p>
              <ul className="r-bullets">
                {p.bullets.map((b, i) => (
                  <li className="r-bullet" key={i}>
                    <span className="bullet-text">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="r-section fade-up-6">
          <h2 className="r-section-title">Education</h2>
          <div className="r-job">
            <div className="r-job-header">
              <div>
                <h3 className="r-job-role">B.Tech, Information Technology</h3>
                <span className="r-job-company">KIET Group of Institutions · Ghaziabad, India</span>
                <span className="r-job-sub">CGPA: 6.72</span>
              </div>
              <span className="r-job-period">Nov 2021 – Mar 2025</span>
            </div>
          </div>
        </section>


      </div>
    </main>
  )
}
