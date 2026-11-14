import ProjectList from '../components/ProjectList'
import { projects } from '../lib/content'

export default function Work() {
  return (
    <main className="page">
      <title>Work · Mohammad Amaan Lari</title>
      <div className="container">
        <h1 className="page-title">Work</h1>
        <p className="page-lead">Things I've built, at work and on my own. Newest first.</p>
        <div className="section">
          <ProjectList items={projects} emphasizeFeatured />
        </div>
      </div>
    </main>
  )
}
