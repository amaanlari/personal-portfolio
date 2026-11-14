export type Experience = {
  id: number
  company: string
  companyUrl?: string
  location?: string
  type?: 'Full-time' | 'Internship' | 'Training' | 'Freelance'
  roles: { title: string; start: string; end: string | null }[] // "2026-05"; null = Present; newest role last
  highlights: string[] // **bold** is supported
  tech?: string[]
}

export type Project = {
  id: number
  title: string
  description: string // one line, used on home
  details?: string[]
  tech: string[]
  status?: 'Live' | 'In progress' | 'Archived'
  featured?: boolean
  links?: { github?: string; live?: string; caseStudy?: string }
  context?: string // small label, e.g. "Personal Project"
  year?: string
}

export type OpenSource = {
  id: number
  org: string
  orgUrl?: string
  role: string
  start?: string
  end?: string | null
  highlights: string[]
}
