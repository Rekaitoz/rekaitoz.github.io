import { useState } from 'react'
import images from 'virtual:portfolio-images'
import type { Project } from './data'

type Picture = { src: string; alt: string }

const available = new Set(images)

export function asset(path: string) {
  return available.has(path)
    ? import.meta.env.BASE_URL + path.split('/').map(encodeURIComponent).join('/')
    : undefined
}

function picture(project: Project, file: string, alt: string): Picture | undefined {
  const src = asset(`images/projects/${project.imageFolder ?? project.slug}/${file}`)
  return src ? { src, alt } : undefined
}

function cover(project: Project) {
  return picture(project, 'cover.webp', project.coverAlt ?? project.title + ' cover')
}

function previewScreenshot(project: Project, index: number) {
  const screenshot = project.screenshots?.[index - 1]
  return screenshot && picture(project, screenshot.file, screenshot.alt)
}

function Flow({ flow }: { flow: NonNullable<Project['flow']> }) {
  const List = flow.sequence === false ? 'ul' : 'ol'
  return (
    <div className="flow">
      <p>{flow.label}</p>
      <List>{flow.steps.map((step) => <li key={step}>{step}</li>)}</List>
    </div>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  const desktop = cover(project) ?? (project.preview?.desktop
    ? previewScreenshot(project, project.preview.desktop) : undefined)
  const phones = (project.preview?.phones ?? []).flatMap((index) => {
    const image = previewScreenshot(project, index)
    return image ? [image] : []
  })
  const layout = desktop ? (phones.length ? 'mixed' : 'wide') : 'phones'
  const hasPreview = desktop || phones.length > 0
  return (
    <div className={`visual visual--${project.preview?.tone ?? (project.flow ? 'teal' : 'moss')}`}>
      {hasPreview ? (
        <div className={`preview preview--${layout}`} aria-hidden="true">
          {desktop && <div className="preview-desktop"><img src={desktop.src} alt="" loading="lazy" /></div>}
          {phones.map((phone) => <div className="preview-phone" key={phone.src}><img src={phone.src} alt="" loading="lazy" /></div>)}
        </div>
      ) : project.flow ? <Flow flow={project.flow} /> : (
        <div className="preview-symbol" aria-hidden="true"><i /><i /><i /></div>
      )}
    </div>
  )
}

export function ProjectGallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0)
  const screenshots = (project.screenshots ?? []).flatMap(({ file, alt }) => {
    const image = picture(project, file, alt)
    return image ? [image] : []
  })
  const primary = cover(project)
  const gallery = primary ? [primary, ...screenshots] : screenshots
  const current = gallery[index]
  if (!current) return project.flow ? <div className="detail-flow"><Flow flow={project.flow} /></div> : null

  function step(offset: number) {
    setIndex((previous) => (previous + offset + gallery.length) % gallery.length)
  }

  return (
    <section className="gallery" aria-label="Project screenshots">
      <div className="gallery-header">
        <h3>Screenshots</h3>
        {gallery.length > 1 && <div className="gallery-controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">←</button>
          <span aria-hidden="true">{index + 1} / {gallery.length}</span>
          <button type="button" onClick={() => step(1)} aria-label="Next screenshot">→</button>
        </div>}
      </div>
      <figure>
        <div className="gallery-stage">
          <img key={current.src} src={current.src} alt={current.alt} />
        </div>
        <figcaption>
          <span aria-live="polite"><span className="sr-only">Screenshot {index + 1} of {gallery.length}. </span>{current.alt}</span>
          <a href={current.src} target="_blank" rel="noreferrer" aria-label="Open full-size screenshot in a new tab">Full size ↗</a>
        </figcaption>
      </figure>
      {gallery.length > 1 && <div className="gallery-thumbs" role="group" aria-label="Choose screenshot">
        {gallery.map((image, number) => (
          <button key={image.src} type="button" aria-label={`Screenshot ${number + 1}: ${image.alt}`}
            aria-pressed={number === index} onClick={() => setIndex(number)}>
            <img src={image.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>}
    </section>
  )
}

