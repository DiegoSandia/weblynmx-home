'use client';

import { useState, useEffect } from 'react';

const LINKS = [
  { href: '/paquetes',    label: 'Paquetes' },
  { href: '/diagnostico', label: 'Diagnóstico' },
  { href: '/nosotros',    label: 'Nosotros' },
  { href: '/blog',        label: 'Blog' },
  { href: '/#contacto',  label: 'Contacto' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    function update() {
      nav!.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="nav" id="nav">
        <a href="/" className="nav-logo">
          <img src="/Icono-transparent.png" alt="WeblynMX" className="nav-logo-img" />
          <span>WeblynMX</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="/#contacto" className="btn btn-pill-accent magnetic nav-cta">
          Hablemos <span className="arrow">→</span>
        </a>

        {/* Hamburger */}
        <button
          className="nav-ham"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`nav-ham-bar${open ? ' is-open' : ''}`} />
          <span className={`nav-ham-bar${open ? ' is-open' : ''}`} />
          <span className={`nav-ham-bar${open ? ' is-open' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <ul className="nav-drawer-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-drawer-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#contacto"
          className="btn btn-primary nav-drawer-cta"
          onClick={() => setOpen(false)}
        >
          Hablemos <span className="arrow">→</span>
        </a>
      </div>

      {/* Backdrop */}
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
