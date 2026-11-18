import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { about, experience, profile, projects } from './data'
import type { Category, Project } from './data'
import { asset, ProjectGallery, ProjectVisual } from './project-media'
import './style.css'

const sections = ['Work', 'Experience', 'About', 'Contact']
const filters = ['All', 'Frontend', 'Data Automation'] as const
const featured = projects.filter((project) => project.visual)
const more = projects.filter((project) => !project.visual)
const mail = 'mailto:' + profile.email

function Tags({ items }: { items: string[] }) {
  return <ul className="tags">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

function App() {
  const [filter, setFilter] = useState<'All' | Category>('All')
  const [selected, setSelected] = useState<Project>()
  const dialog = useRef<HTMLDialogElement>(null)
  const dialogTitle = useRef<HTMLHeadingElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const portrait = asset('images/profile/' + profile.photo) ?? asset('images/profile/profile.webp')
  const filtered = more.filter((project) => filter === 'All' || project.category === filter)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('arrived')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.08 })
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) {
      dialog.current.showModal()
      dialogTitle.current?.focus()
    }
  }, [selected])

  function openProject(event: MouseEvent<HTMLButtonElement>, project: Project) {
    opener.current = event.currentTarget
    setSelected(project)
  }

  function onClose() {
    setSelected(undefined)
    opener.current?.focus()
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label={profile.name + ', back to top'}>{profile.initials}<span>.</span></a>
          <nav aria-label="Main navigation">{sections.map((section) => <a key={section} href={`#${section.toLowerCase()}`}>{section}</a>)}</nav>
        </div>
      </header>

      <main id="main" className="shell" tabIndex={-1}>
        <section id="top" className="hero" aria-labelledby="name">
          <div className="hero-copy">
            <p className="eyebrow location"><span aria-hidden="true" />{profile.location}</p>
            <h1 id="name">{profile.name}</h1>
            <p className="role">{profile.title} <span>· {profile.specialty}</span></p>
            <p className="intro">{profile.summary}</p>
            <div className="actions">
              <a className="button primary" href="#work">View my work <span aria-hidden="true">↓</span></a>
              <a className="button secondary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="portrait-stage">
            <div className="portrait-orbit" aria-hidden="true"><i /><i /></div>
            <div className="portrait">
              {portrait ? <img src={portrait} alt={profile.name} fetchPriority="high" /> : <span aria-hidden="true">{profile.initials}<b>.</b></span>}
            </div>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <h2 id="work-title">Selected Work</h2>
            <p>Frontend engineering &amp; reporting automation</p>
          </div>
          <div className="featured">
            {featured.map((project) => (
              <article className="project-card" key={project.slug} data-reveal>
                <ProjectVisual project={project} />
                <div className="project-body">
                  <p className="eyebrow">{project.category} <span>·</span> {project.period ?? 'BSI Banjarmasin Area'}</p>
                  <h3><button className="project-open" type="button" onClick={(event) => openProject(event, project)} aria-haspopup="dialog">{project.title}<span aria-hidden="true">↗</span></button></h3>
                  <p className="description">{project.summary}</p>
                  {project.metric && <p className="metric"><strong>{project.metric}</strong> <span>per pipeline recap</span></p>}
                  <Tags items={project.stack.slice(0, 3)} />
                </div>
              </article>
            ))}
          </div>
          <div className="section-heading more-heading" data-reveal>
            <h3>More Projects</h3>
            <div className="filters" aria-label="Filter more projects" role="group">
              {filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
          </div>
          <p className="sr-only" role="status">{filtered.length} {filter === 'All' ? '' : filter + ' '}projects shown</p>
          <div key={filter} className="more-grid">
            {filtered.map((project) => (
              <article className="project-card compact" key={project.slug}>
                <ProjectVisual project={project} />
                <div className="compact-body">
                  <p className="eyebrow">{project.type}</p>
                  <h4><button className="project-open" type="button" onClick={(event) => openProject(event, project)} aria-haspopup="dialog">{project.title}<span aria-hidden="true">↗</span></button></h4>
                  <p className="description">{project.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-title">
          <div className="section-heading" data-reveal><h2 id="experience-title">Experience</h2></div>
          {experience.map((job) => (
            <article className="experience-row" key={job.organization} data-reveal>
              <div className="job-meta"><p className="eyebrow">{job.period}</p><p>{job.organization}</p>{job.location && <p className="muted">{job.location}</p>}</div>
              <div className="job-copy"><h3>{job.role}</h3><p>{job.summary}</p><ul>{job.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </article>
          ))}
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="section-heading" data-reveal><h2 id="about-title">About</h2></div>
          <div className="about-grid">
            <div className="about-panel" data-reveal>
              <h3>Skills</h3>
              {about.skills.map((group) => <div key={group.title} className="skill-group"><h4>{group.title}</h4><Tags items={group.items} /></div>)}
            </div>
            <div className="about-panel" data-reveal>
              <h3>Education</h3>
              <p className="degree">{about.education.degree}</p>
              <p>{about.education.university}<br />{about.education.detail}</p>
              <h3>Awards</h3>
              <ul>{about.awards.map((award) => <li key={award}>{award}</li>)}</ul>
              <h3>Languages</h3><p>{about.languages}</p>
            </div>
          </div>
          <div className="about-extra" data-reveal>
            <details><summary>Certifications</summary><ul>{about.certifications.map((item) => <li key={item}>{item}</li>)}</ul></details>
            <details><summary>Activities</summary><ul>{about.activities.map((item) => <li key={item}>{item}</li>)}</ul></details>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="contact-panel" data-reveal>
            <div><p className="eyebrow">Contact</p><h2 id="contact-title">Let’s talk.</h2><a className="email" href={mail}>{profile.email}</a></div>
            <div className="contact-links">
              <a className="button primary" href={mail}>Send an email <span aria-hidden="true">↗</span></a>
              <div className="socials"><a href={profile.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a><a href={profile.github}>GitHub <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer"><span>{profile.name}</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>

      <dialog ref={dialog} onClose={onClose} aria-labelledby="project-title" onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}>
        {selected && <div className="dialog-content">
          <div className="dialog-close">
            <button className="close" type="button" onClick={() => dialog.current?.close()} aria-label="Close project details">×</button>
          </div>
          <p className="eyebrow">{selected.category} · {selected.type}</p>
          <h2 id="project-title" ref={dialogTitle} tabIndex={-1}>{selected.title}</h2>
          <p className="muted">{[selected.organization, selected.period].filter(Boolean).join(' · ')}</p>
          <Tags items={selected.stack} />
          <ProjectGallery key={selected.slug} project={selected} />
          <div className="project-detail">
            <h3>Overview</h3><p>{selected.summary}</p>
            <h3>My contribution</h3><p>{selected.contribution}</p>
            {selected.workflow && <><h3>How it worked</h3><p>{selected.workflow}</p></>}
            {selected.outcome && <><h3>Outcome</h3><p>{selected.outcome}</p></>}
          </div>
        </div>}
      </dialog>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)

