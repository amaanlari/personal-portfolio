import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, FileText, Mail, PenLine } from 'lucide-react'
import PostLines from '../components/PostLines'
import { featuredProjects } from '../lib/content'
import { EMAIL, GITHUB } from '../lib/nav'
import './Home.css'

// Shown until public/images/hero-amaan.webp exists
function Silhouette() {
  return (
    <svg className="hero-portrait hero-silhouette" viewBox="0 0 400 520" aria-hidden="true">
      <circle cx="200" cy="140" r="92" />
      <path d="M200 250c-108 0-176 66-176 168v102h352V418c0-102-68-168-176-168z" />
    </svg>
  )
}

function Portrait() {
  const [missing, setMissing] = useState(false)
  if (missing) return <Silhouette />
  return (
    <img
      className="hero-portrait"
      src="/images/hero-amaan.webp"
      alt="Portrait of Mohammad Amaan Lari"
      decoding="async"
      fetchPriority="high"
      onError={() => setMissing(true)}
    />
  )
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-halftone" aria-hidden="true" />

        <p className="sticker">
          <span className="sticker-dot" aria-hidden="true" />
          Currently building <ArrowRight size={14} strokeWidth={3} aria-hidden="true" /> a Razorpay-style payment gateway
        </p>

        <div className="hero-figure">
          <Portrait />
        </div>

        <div className="hero-text">
          <p className="eyebrow">Mohammad Amaan Lari</p>
          <h1 className="hero-headline">I Ship.</h1>
          <p className="hero-tagline">
            Software Engineer at LTIMindtree — building enterprise systems across manufacturing,
            oil &amp; gas and fintech, with backend depth in Java, Scala and .NET.
          </p>
          <ul className="chevron-list hero-projects">
            {featuredProjects.slice(0, 3).map((project) => (
              <li key={project.id}>
                <span>
                  <Link to={`/work#project-${project.id}`}>{project.title}</Link>
                  {' — '}{project.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav className="hero-links" aria-label="Links">
          <p className="eyebrow">Links</p>
          <Link to="/work" className="btn-comic">View My Work</Link>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          <Link to="/blog">Blog <PenLine size={16} aria-hidden="true" /></Link>
          <a href={`mailto:${EMAIL}`}>Get In Touch <Mail size={16} aria-hidden="true" /></a>
          <Link to="/resume">Resume <FileText size={16} aria-hidden="true" /></Link>
        </nav>
      </section>

      <div className="container home-below">
        <PostLines title="Latest writing" />
      </div>
    </main>
  )
}
