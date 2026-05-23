'use client';

import { useEffect } from 'react';

export default function Nav() {
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

  return (
    <nav className="nav" id="nav">
      <a href="/" className="nav-logo">
        <img src="/Icono-transparent.png" alt="WeblynMX" className="nav-logo-img" />
        <span>WeblynMX</span>
      </a>
      <ul className="nav-links">
        <li><a href="/#servicios">Servicios</a></li>
        <li><a href="/paquetes">Paquetes</a></li>
        <li><a href="/diagnostico">Diagnóstico</a></li>
        <li><a href="/nosotros">Nosotros</a></li>
        <li><a href="/#contacto">Contacto</a></li>
      </ul>
      <a href="/#contacto" className="btn btn-pill-accent magnetic">
        Hablemos <span className="arrow">→</span>
      </a>
    </nav>
  );
}
