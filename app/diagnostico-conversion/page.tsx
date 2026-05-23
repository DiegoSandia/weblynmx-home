'use client';

import { useState } from 'react';
import Link from 'next/link';
import Cursor from '../components/Cursor';

const WA = 'https://wa.me/525541426190';
const TOTAL = 4;

interface FormData {
  nombreCompleto: string;
  nombreNegocio: string;
  giro: string;
  instagram: string;
  sitioWeb: string;
  fuenteClientes: string;
  correAnuncios: string;
  presupuestoAnuncios: string;
  problemaPrincipal: string;
  productoServicio: string;
  ticketPromedio: string;
  ctaActual: string;
  objetivo: string;
  presupuesto: string;
  comentarios: string;
}

const INIT: FormData = {
  nombreCompleto: '', nombreNegocio: '', giro: '', instagram: '', sitioWeb: '',
  fuenteClientes: '', correAnuncios: '', presupuestoAnuncios: '', problemaPrincipal: '',
  productoServicio: '', ticketPromedio: '', ctaActual: '',
  objetivo: '', presupuesto: '', comentarios: '',
};

const REQUIRED: Array<(keyof FormData)[]> = [
  ['nombreCompleto', 'nombreNegocio', 'giro'],
  ['fuenteClientes', 'problemaPrincipal'],
  ['productoServicio', 'ticketPromedio'],
  ['objetivo', 'presupuesto'],
];

const FUENTES = ['Redes sociales', 'Publicidad pagada', 'Boca a boca', 'Google', 'Otro'];
const ANUNCIOS = ['Sí, actualmente', 'Los pausé', 'Nunca he corrido', 'Experimentando'];
const PROBLEMAS = ['Muchas visitas y pocas ventas', 'Pocos mensajes o contactos', 'Mala imagen o presentación', 'No entienden lo que vendo', 'Otro'];
const OBJETIVOS = ['Más leads', 'Más ventas', 'Más citas', 'Más autoridad'];
const PRESUPUESTOS = ['Menos de $5,000', '$5,000 – $15,000', '$15,000 – $30,000', '$30,000 – $60,000', 'Más de $60,000'];

type Status = 'idle' | 'sending' | 'ok' | 'error';

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="dform-field">
      <label className={`dform-label${required ? ' required' : ''}`}>{label}</label>
      {children}
      {error && <span className="dform-error-msg">{error}</span>}
    </div>
  );
}

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="dform-options">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`dform-pill${value === opt ? ' selected' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function DiagnosticoConversionPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'bck'>('fwd');
  const [key, setKey] = useState(0);
  const [data, setData] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  function set(field: keyof FormData, value: string) {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate(): boolean {
    const req = REQUIRED[step] || [];
    const errs: Partial<Record<keyof FormData, string>> = {};
    req.forEach((k) => { if (!data[k].trim()) errs[k] = 'Este campo es requerido'; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validate()) return;
    setDir('fwd');
    setKey((k) => k + 1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir('bck');
    setKey((k) => k + 1);
    setStep((s) => s - 1);
  }

  async function submit() {
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/diagnostico-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const inp = (field: keyof FormData, placeholder: string) => (
    <input
      className={`dform-input${errors[field] ? ' error' : ''}`}
      placeholder={placeholder}
      value={data[field]}
      onChange={(e) => set(field, e.target.value)}
    />
  );

  const ta = (field: keyof FormData, placeholder: string) => (
    <textarea
      className={`dform-textarea${errors[field] ? ' error' : ''}`}
      placeholder={placeholder}
      value={data[field]}
      onChange={(e) => set(field, e.target.value)}
    />
  );

  if (status === 'ok') return (
    <div className="dform-page">
      <Cursor />
      <div className="dform-result">
        <div className="dform-result-blob ok" aria-hidden="true" />
        <div className="dform-result-icon ok">✓</div>
        <h1 className="dform-result-title">Diagnóstico enviado.</h1>
        <p className="dform-result-sub">
          Recibimos tu información. Te responderemos con una recomendación personalizada en menos de 24 horas.
        </p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          También por WhatsApp <span className="arrow">→</span>
        </a>
        <Link href="/" className="dg-page-back" style={{ marginTop: '2rem' }}>← Volver a WeblynMX</Link>
      </div>
    </div>
  );

  if (status === 'error') return (
    <div className="dform-page">
      <Cursor />
      <div className="dform-result">
        <div className="dform-result-blob err" aria-hidden="true" />
        <div className="dform-result-icon err">✕</div>
        <h1 className="dform-result-title">Algo salió mal.</h1>
        <p className="dform-result-sub">
          No pudimos enviar tu diagnóstico. Escríbenos directamente por WhatsApp y te atendemos de inmediato.
        </p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Escribir por WhatsApp <span className="arrow">→</span>
        </a>
        <button className="dform-btn-back" style={{ marginTop: '1rem' }} onClick={() => setStatus('idle')}>
          ← Intentar de nuevo
        </button>
      </div>
    </div>
  );

  return (
    <div className="dform-page">
      <Cursor />

      <header className="dform-progress-header">
        <div className="dform-progress-meta">
          <Link href="/" className="dform-logo">W<span>eblynMX</span></Link>
          <span className="dform-step-count">Diagnóstico de Conversión · {step + 1}/{TOTAL}</span>
        </div>
        <div className="dform-bar-track">
          <div className="dform-bar-fill" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
        </div>
      </header>

      <main className="dform-main">
        <div className="dform-inner">

          {/* STEP 1 */}
          {step === 0 && (
            <div key={key} className={`dform-step-panel${dir === 'bck' ? ' dform-back' : ''}`}>
              <p className="dform-step-eyebrow">Paso 1 de 4 · Datos de contacto</p>
              <h1 className="dform-step-title">Cuéntanos sobre ti</h1>
              <p className="dform-step-desc">Información básica de tu negocio para comenzar el análisis.</p>
              <div className="dform-fields">
                <div className="dform-two-cols">
                  <Field label="Nombre completo" required error={errors.nombreCompleto}>
                    {inp('nombreCompleto', 'Tu nombre')}
                  </Field>
                  <Field label="Nombre del negocio" required error={errors.nombreNegocio}>
                    {inp('nombreNegocio', 'Tu marca o empresa')}
                  </Field>
                </div>
                <div className="dform-two-cols">
                  <Field label="Giro o industria" required error={errors.giro}>
                    {inp('giro', 'Ej. E-commerce, Servicios, Consultoría…')}
                  </Field>
                  <Field label="Instagram">
                    {inp('instagram', '@tunombre')}
                  </Field>
                </div>
                <Field label="Sitio web actual">
                  {inp('sitioWeb', 'https://…')}
                </Field>
              </div>
              <div className="dform-nav-btns">
                <button className="dform-btn-next" onClick={next}>Continuar <span>→</span></button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div key={key} className={`dform-step-panel${dir === 'bck' ? ' dform-back' : ''}`}>
              <p className="dform-step-eyebrow">Paso 2 de 4 · Tu tráfico actual</p>
              <h1 className="dform-step-title">¿De dónde viene tu audiencia?</h1>
              <p className="dform-step-desc">Necesitamos entender tu situación actual para identificar dónde está la fuga.</p>
              <div className="dform-fields">
                <Field label="¿De dónde llegan tus clientes principalmente?" required error={errors.fuenteClientes}>
                  <Pills options={FUENTES} value={data.fuenteClientes} onChange={(v) => set('fuenteClientes', v)} />
                  {errors.fuenteClientes && <span className="dform-error-msg">{errors.fuenteClientes}</span>}
                </Field>
                <Field label="¿Corres anuncios actualmente?">
                  <Pills options={ANUNCIOS} value={data.correAnuncios} onChange={(v) => set('correAnuncios', v)} />
                </Field>
                <Field label="Presupuesto mensual de anuncios (si aplica)">
                  {inp('presupuestoAnuncios', 'Ej. $3,000/mes, $10,000/mes…')}
                </Field>
                <Field label="¿Cuál es tu principal problema de conversión?" required error={errors.problemaPrincipal}>
                  <Pills options={PROBLEMAS} value={data.problemaPrincipal} onChange={(v) => set('problemaPrincipal', v)} />
                  {errors.problemaPrincipal && <span className="dform-error-msg">{errors.problemaPrincipal}</span>}
                </Field>
              </div>
              <div className="dform-nav-btns">
                <button className="dform-btn-back" onClick={back}>← Atrás</button>
                <button className="dform-btn-next" onClick={next}>Continuar <span>→</span></button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div key={key} className={`dform-step-panel${dir === 'bck' ? ' dform-back' : ''}`}>
              <p className="dform-step-eyebrow">Paso 3 de 4 · Tu oferta</p>
              <h1 className="dform-step-title">¿Qué vendes y a qué precio?</h1>
              <p className="dform-step-desc">Entender tu oferta es clave para optimizar la conversión.</p>
              <div className="dform-fields">
                <Field label="Servicio o producto principal" required error={errors.productoServicio}>
                  {ta('productoServicio', 'Describe brevemente qué vendes y cómo funciona…')}
                </Field>
                <div className="dform-two-cols">
                  <Field label="Ticket promedio" required error={errors.ticketPromedio}>
                    {inp('ticketPromedio', 'Ej. $500, $2,500, $15,000…')}
                  </Field>
                  <Field label="CTA actual (qué pides al visitante)">
                    {inp('ctaActual', 'Ej. WhatsApp, formulario, llamada…')}
                  </Field>
                </div>
              </div>
              <div className="dform-nav-btns">
                <button className="dform-btn-back" onClick={back}>← Atrás</button>
                <button className="dform-btn-next" onClick={next}>Continuar <span>→</span></button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 3 && (
            <div key={key} className={`dform-step-panel${dir === 'bck' ? ' dform-back' : ''}`}>
              <p className="dform-step-eyebrow">Paso 4 de 4 · Tu objetivo</p>
              <h1 className="dform-step-title">¿Qué quieres lograr?</h1>
              <p className="dform-step-desc">Últimos detalles para completar tu diagnóstico de conversión.</p>
              <div className="dform-fields">
                <Field label="Objetivo principal" required error={errors.objetivo}>
                  <Pills options={OBJETIVOS} value={data.objetivo} onChange={(v) => set('objetivo', v)} />
                  {errors.objetivo && <span className="dform-error-msg">{errors.objetivo}</span>}
                </Field>
                <Field label="Presupuesto aproximado para el proyecto" required error={errors.presupuesto}>
                  <Pills options={PRESUPUESTOS} value={data.presupuesto} onChange={(v) => set('presupuesto', v)} />
                  {errors.presupuesto && <span className="dform-error-msg">{errors.presupuesto}</span>}
                </Field>
                <Field label="Comentarios o preguntas finales">
                  {ta('comentarios', 'Algo más que quieras que sepamos…')}
                </Field>
              </div>
              <div className="dform-nav-btns">
                <button className="dform-btn-back" onClick={back}>← Atrás</button>
                <button
                  className="dform-btn-next"
                  onClick={submit}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar diagnóstico ✓'}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
