'use client';

import { useState } from 'react';

const WA_OPTIONS = [
  { label: '🚀 Landing page que vende', pkg: 'Vender Más (Landing + Funnel)', msg: 'Hola 👋 Quiero cotizar una *Landing Page* para vender más. Actualmente tengo tráfico pero no convierte bien. Me gustaría saber precios y tiempos de entrega.' },
  { label: '✨ Mejorar imagen de marca', pkg: 'Mejorar la Marca (Rebrand + Sitio)', msg: 'Hola 👋 Quiero cotizar un *rebrand y sitio web*. Mi negocio se ve amateur y necesita verse más profesional y premium. ¿Podemos hablar?' },
  { label: '🍽️ Restaurante o menú digital', pkg: 'Restaurante & Food (Menú Digital + Landing)', msg: 'Hola 👋 Tengo un *restaurante / café* y quiero cotizar un menú digital y/o sitio web. ¿Qué opciones tienen y cuánto cuesta?' },
  { label: '🎉 Invitación para evento', pkg: 'Evento Único (Invitación Digital + RSVP)', msg: 'Hola 👋 Quiero cotizar una *invitación digital* con RSVP para un evento. Me gustaría ver ejemplos y precios.' },
  { label: '👔 Soy profesionista', pkg: 'Sector Salud / Profesionistas (Sitio Premium)', msg: 'Hola 👋 Soy *profesionista* (médico / abogado / arquitecto / consultor) y quiero un sitio web que me haga ver más serio y confiable. ¿Qué paquetes tienen?' },
  { label: '🌱 Lanzar mi negocio', pkg: 'Emprendedor (Lanzamiento desde cero)', msg: 'Hola 👋 Estoy *lanzando mi negocio* y quiero presencia web desde cero: logo, sitio y sistema de redes. ¿Por dónde empezamos?' },
  { label: '💻 Startup o proyecto tech', pkg: 'Startup & Tech (Sitio Premium + Deck)', msg: 'Hola 👋 Tengo una *startup o proyecto tech* y necesito un sitio premium más deck digital. Estamos buscando inversión / clientes. ¿Pueden ayudarnos?' },
  { label: '💬 Otro tipo de proyecto', pkg: 'Otro proyecto', msg: 'Hola 👋 Tengo un proyecto web y quiero cotizar con WeblynMX. ¿Podemos agendar una llamada rápida para contarles de qué se trata?' },
];

export default function ContactSection() {
  const [selectedMsg, setSelectedMsg] = useState('');
  const [nameInput, setNameInput] = useState('');

  function buildMessage() {
    if (!selectedMsg) return '';
    let msg = selectedMsg;
    const name = nameInput.trim();
    if (name) {
      msg = msg.replace('Hola 👋', `Hola 👋 soy *${name}*,`);
    }
    return msg;
  }

  const msg = buildMessage();
  const ready = !!selectedMsg;
  const previewText = msg.replace(/\*/g, '');

  function openWhatsApp() {
    const m = buildMessage();
    if (!m) return;
    const url = 'https://wa.me/525541426190?text=' + encodeURIComponent(m);
    window.open(url, '_blank', 'noopener');
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="section-wrap">
        <div className="contact-grid">

          {/* Izquierda: info + canales */}
          <div className="contact-left reveal">
            <span className="eyebrow" style={{ marginBottom: '1.2rem' }}>Contacto</span>
            <h2 style={{ marginTop: '1rem' }}>Hablemos de tu <span className="accent">proyecto.</span></h2>
            <p>Sin tecnicismos, sin formularios eternos. Escríbenos por el canal que prefieras y empezamos.</p>

            <div className="contact-channels">

              {/* WhatsApp */}
              <a
                href="https://wa.me/525541426190?text=Hola%20%F0%9F%91%8B%20Vi%20su%20sitio%20web%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20con%20WeblynMX.%20%C2%BFPodemos%20hablar%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <div className="contact-link-icon green">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#8BFF61"/>
                    <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.465 3.432 1.28 4.877L2 22l5.26-1.247A9.956 9.956 0 0012.004 22C17.531 22 22 17.523 22 12.004 22 6.477 17.531 2 12.004 2zm0 18.214a8.195 8.195 0 01-4.187-1.146l-.299-.179-3.121.74.784-3.032-.197-.311A8.172 8.172 0 013.786 12c0-4.529 3.685-8.214 8.218-8.214 4.532 0 8.21 3.685 8.21 8.214 0 4.529-3.678 8.214-8.21 8.214z" fill="#8BFF61" opacity=".6"/>
                  </svg>
                </div>
                <div className="contact-link-text">
                  <strong>WhatsApp</strong>
                  <span>+52 55 4142 6190</span>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/weblynmx" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon purple">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="6" stroke="#C864FF" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="4.5" stroke="#C864FF" strokeWidth="1.8"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="#C864FF"/>
                  </svg>
                </div>
                <div className="contact-link-text">
                  <strong>Instagram</strong>
                  <span>@weblynmx</span>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              {/* Correo */}
              <a href="mailto:weblynmx@gmail.com" className="contact-link">
                <div className="contact-link-icon teal">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#00C8B4" strokeWidth="1.8"/>
                    <path d="M2 7l10 7 10-7" stroke="#00C8B4" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="contact-link-text">
                  <strong>Correo</strong>
                  <span>weblynmx@gmail.com</span>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              {/* Tarjeta digital */}
              <a href="https://tarjeta-weblynmx.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon card">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="5" width="20" height="14" rx="3" stroke="#8BFF61" strokeWidth="1.8"/>
                    <path d="M2 9h20" stroke="#8BFF61" strokeWidth="1.8"/>
                    <rect x="5" y="13" width="5" height="2" rx="1" fill="#8BFF61"/>
                    <rect x="12" y="13" width="3" height="2" rx="1" fill="#8BFF61" opacity=".5"/>
                  </svg>
                </div>
                <div className="contact-link-text">
                  <strong>Tarjeta Digital</strong>
                  <span>tarjeta-weblynmx.vercel.app</span>
                </div>
                <span className="contact-arrow">→</span>
              </a>

            </div>
          </div>

          {/* Derecha: wizard de cotización por WhatsApp */}
          <div className="reveal" style={{ ['--reveal-delay' as string]: '.15s' }}>
            <div className="wa-wizard" id="cotizar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#8BFF61"/>
                  <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.465 3.432 1.28 4.877L2 22l5.26-1.247A9.956 9.956 0 0012.004 22C17.531 22 22 17.523 22 12.004 22 6.477 17.531 2 12.004 2zm0 18.214a8.195 8.195 0 01-4.187-1.146l-.299-.179-3.121.74.784-3.032-.197-.311A8.172 8.172 0 013.786 12c0-4.529 3.685-8.214 8.218-8.214 4.532 0 8.21 3.685 8.21 8.214 0 4.529-3.678 8.214-8.21 8.214z" fill="#8BFF61" opacity=".6"/>
                </svg>
                <span className="wa-wizard-title">Cotizar por WhatsApp</span>
              </div>
              <p className="wa-wizard-sub">Elige lo que mejor describe tu proyecto y te generamos el mensaje. Llega en 30 segundos.</p>

              <span className="wa-wizard-label">¿Qué necesitas?</span>
              <div className="wa-options" id="wa-options">
                {WA_OPTIONS.map((opt) => (
                  <button
                    key={opt.pkg}
                    className={`wa-option${selectedMsg === opt.msg ? ' selected' : ''}`}
                    onClick={() => setSelectedMsg(opt.msg)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="wa-name-row">
                <span className="wa-wizard-label">Tu nombre (opcional)</span>
                <input
                  type="text"
                  className="wa-name-input"
                  id="wa-name"
                  placeholder="Ej. Carlos, Sofía, Andrés..."
                  maxLength={40}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>

              <div className={`wa-preview${ready ? ' visible' : ''}`} id="wa-preview">
                <strong>📲 Así llegará tu mensaje:</strong>
                <span id="wa-preview-text">{previewText}</span>
              </div>

              <button
                className="wa-send-btn"
                id="wa-send"
                disabled={!ready}
                onClick={openWhatsApp}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#0B0B0B"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.771.465 3.432 1.28 4.877L2 22l5.26-1.247A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="#0B0B0B" opacity=".5"/>
                </svg>
                Abrir WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
