import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, Menu, Moon, Search, Sun, Terminal, X } from 'lucide-react'
import { education, experience, profile, projects, skills } from './data/resume'
import './App.css'

function ScrollReveal() {
  const location = useLocation()
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('revealed'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname, location.hash])
  return null
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    document.documentElement.style.colorScheme = next
    localStorage.setItem('theme', next)
  }
  return (
    <button className="icon-button" type="button" onClick={cycleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.addEventListener('keydown', handleKey)
  }, [setOpen])

  const commands = [
    { label: 'Home', hint: 'Go to homepage', action: () => navigate('/') },
    { label: 'About', hint: 'Jump to about', action: () => navigate('/#about') },
    { label: 'Experience', hint: 'Jump to experience', action: () => navigate('/#experience') },
    { label: 'Projects', hint: 'Open projects', action: () => navigate('/projects') },
    { label: 'Skills', hint: 'Jump to skills', action: () => navigate('/#skills') },
    { label: 'Contact', hint: 'Open contact page', action: () => navigate('/contact') },
    { label: 'Blog', hint: 'Open blog', action: () => navigate('/blog') },
  ]
  const filtered = commands.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase()))

  if (!open) return null
  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
        <div className="palette-search">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to..."
            aria-label="Search commands"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="palette-results">
          {filtered.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.action()
                setOpen(false)
              }}
            >
              <span>{item.label}</span>
              <small>{item.hint}</small>
            </button>
          ))}
          {filtered.length === 0 && <p className="palette-empty">No destinations found.</p>}
        </div>
      </div>
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Ayoub Ayed home">
          <span>AA</span>
          <span className="brand-status" aria-hidden="true"></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/#about">About</Link>
          <Link to="/#experience">Experience</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
        </nav>
        <div className="header-actions">
          <button className="palette-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
            <Search size={16} />
            <span>Jump to</span>
            <kbd>⌘K</kbd>
          </button>
          <ThemeToggle />
          <button className="icon-button mobile-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/#about">About</Link>
          <Link to="/#experience">Experience</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      )}
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <span className="brand-footer">Ayoub Ayed</span>
        <p>Tunis, Tunisia</p>
      </div>
      <div className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
        <Link to="/contact">Contact <ArrowUpRight size={14} /></Link>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Ayoub Ayed</p>
    </footer>
  )
}

function SectionHeading({ eyebrow, title, link }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {link}
      </div>
    </div>
  )
}

function Home() {
  const location = useLocation()
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start',
          })
        })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash])

  return (
    <main>
      <section className="hero-section">
        <div className="availability" data-reveal>
          <span></span> Available for final-year project internship
        </div>
        <h1 data-reveal>
          Building reliable software
          <br />
          <em>from systems to screens.</em>
        </h1>
        <div className="hero-bottom" data-reveal>
          <p>
            Computer Science student based in Tunis, with a foundation in backend, databases and systems
            and hands-on production development experience.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/#projects">View selected work <ArrowUpRight size={17} /></Link>
            <Link className="text-link" to="/contact">Get in touch <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <SectionHeading eyebrow="01 / About" title="A practical foundation in software engineering." />
        <div className="about-grid" data-reveal>
          <p className="about-summary">{profile.summary}</p>
          <div className="strengths">
            {['Problem solving', 'Debugging', 'Teamwork', 'Communication', 'Adaptability'].map((item) => (
              <span key={item}><Check size={14} /> {item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <SectionHeading eyebrow="02 / Experience" title="Where I’ve contributed." />
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.company} data-reveal>
              <div className="timeline-meta">
                <p>{item.period}</p>
                <p>{item.location}</p>
              </div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p className="timeline-description">{item.description}</p>
                <ul>
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <SectionHeading
          eyebrow="03 / Selected work"
          title="Projects built, explored and maintained."
          link={<Link className="text-link section-link" to="/projects/my-prestige-holidays">View first case study <ArrowUpRight size={15} /></Link>}
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <Link className={`project-card ${index === 0 ? 'project-featured' : ''}`} to={`/projects/${project.slug}`} key={project.slug} data-reveal>
              <div className="project-card-top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <ArrowUpRight size={20} />
              </div>
              <div className="project-card-body">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="project-tags">
                {project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <SectionHeading eyebrow="04 / Skills" title="Tools and foundations." />
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-group" key={group.title} data-reveal>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section education-section" id="education">
        <SectionHeading eyebrow="05 / Education" title="A rigorous computer science path." />
        <div className="education-list">
          {education.map((item) => (
            <article key={`${item.school}-${item.degree}`} data-reveal>
              <p className="education-period">{item.period}</p>
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}{item.institution ? ` · ${item.institution}` : ''}</p>
                {item.note && <p className="education-note">{item.note}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-banner" data-reveal>
        <p className="eyebrow">06 / Contact</p>
        <h2>Have an engineering project in mind?</h2>
        <Link className="button button-light" to="/contact">Start a conversation <ArrowUpRight size={17} /></Link>
      </section>
    </main>
  )
}

function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFound />

  return (
    <main className="inner-page">
      <Link className="back-link" to="/#projects"><ArrowLeft size={16} /> Back to projects</Link>
      <header className="case-header" data-reveal>
        <p className="eyebrow">{project.subtitle}</p>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
      </header>
      <div className="case-meta" data-reveal>
        <div><p>Stack</p><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        <div>
          <p>Links</p>
          <div className="case-links">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a>}
            {project.url && <a href={project.url} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={14} /></a>}
          </div>
        </div>
      </div>
      {project.preview && (
        <div className="case-preview" data-reveal>
          <img src={project.preview} alt={`${project.title} preview`} />
        </div>
      )}
      <article className="case-content">
        <section data-reveal><p className="case-number">01</p><div><h2>Problem</h2><p>{project.problem}</p></div></section>
        <section data-reveal><p className="case-number">02</p><div><h2>Build</h2><p>{project.build}</p></div></section>
        {project.features && (
          <section data-reveal>
            <p className="case-number">03</p>
            <div>
              <h2>Key features</h2>
              <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
          </section>
        )}
        <section data-reveal><p className="case-number">{project.features ? '04' : '03'}</p><div><h2>Decisions</h2><ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div></section>
        <section data-reveal><p className="case-number">{project.features ? '05' : '04'}</p><div><h2>Result</h2><p>{project.result || project.summary}</p></div></section>
      </article>
    </main>
  )
}

function ProjectsPage() {
  return (
    <main className="inner-page projects-index">
      <header className="page-header" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h1>Projects</h1>
        <p className="page-header-summary">
          Production development, conversational AI, desktop games and database work.
        </p>
      </header>
      <div className="project-grid projects-index-grid">
        {projects.map((project, index) => (
          <Link
            className="project-card"
            to={`/projects/${project.slug}`}
            key={project.slug}
            data-reveal
          >
            <div className="project-card-top">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <ArrowUpRight size={20} />
            </div>
            <div className="project-card-body">
              <p className="project-subtitle">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="project-tags">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

function BlogPage() {
  return (
    <main className="inner-page blog-page">
      <header className="page-header" data-reveal>
        <p className="eyebrow">Notes</p>
        <h1>Blog</h1>
      </header>
      <div className="empty-state" data-reveal>
        <Terminal size={28} />
        <h2>Writing is in progress.</h2>
        <p>Technical notes and project updates will appear here.</p>
        <Link className="text-link" to="/">Back to home <ArrowUpRight size={15} /></Link>
      </div>
    </main>
  )
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <main className="inner-page contact-page">
      <header className="page-header" data-reveal>
        <p className="eyebrow">Get in touch</p>
        <h1>Let’s work together.</h1>
      </header>
      <div className="contact-layout">
        <div className="contact-info" data-reveal>
          <p>I’m looking for a final-year project internship in backend, databases, systems or cybersecurity.</p>
          <dl>
            <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
            <div><dt>Location</dt><dd>{profile.location}</dd></div>
            <div><dt>Social</dt><dd className="social-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></dd></div>
          </dl>
        </div>
        <form className="contact-form" onSubmit={submit} data-reveal>
          <label>Name<input name="name" value={form.name} onChange={update} required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={update} required /></label>
          <label>Message<textarea name="message" rows="6" value={form.message} onChange={update} required /></label>
          <button className="button button-primary" type="submit">Compose email <ArrowUpRight size={17} /></button>
        </form>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / Not found</p>
      <h1>This page took a wrong turn.</h1>
      <p>The destination doesn’t exist, but the rest of the portfolio is close by.</p>
      <Link className="button button-primary" to="/">Return home <ArrowUpRight size={17} /></Link>
    </main>
  )
}

function RouteEffects() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])
  return null
}

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <ScrollReveal />
      <RouteEffects />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
