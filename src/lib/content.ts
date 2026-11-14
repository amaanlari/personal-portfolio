import experienceData from '../../content/experience.json'
import projectsData from '../../content/projects.json'
import openSourceData from '../../content/opensource.json'
import type { Experience, Project, OpenSource } from '../types'

// Content is stored oldest → newest (id 1 = oldest); the site shows newest first.
const newestFirst = <T extends { id: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => b.id - a.id)

export const experience = newestFirst(experienceData as Experience[])
export const projects = newestFirst(projectsData as Project[])
export const openSource = newestFirst(openSourceData as OpenSource[])
export const featuredProjects = projects.filter((p) => p.featured)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "2026-05" → "May 2026"; year only or unknown month ("2026-XX") → "2026"; null → "Present"
export function formatMonth(value: string | null): string {
  if (value === null) return 'Present'
  const [year, month] = value.split('-')
  const name = MONTHS[Number(month) - 1]
  return name ? `${name} ${year}` : year
}

export function formatPeriod(start: string, end: string | null): string {
  const from = formatMonth(start)
  const to = formatMonth(end)
  return from === to ? from : `${from} – ${to}`
}
