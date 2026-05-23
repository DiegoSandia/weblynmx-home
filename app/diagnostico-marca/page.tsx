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
  ciudad: string;
  instagram: string;
  sitioWeb: string;
  descripcionMarca: string;
  percepcion: string;
  marcasInspiran: string;
  problemaImagen: string;
  diferenciador: string;
  clienteIdeal: string;
  dudasCliente: string;
  objetivo: string;
  presupuesto: string;
  comentarios: string;
}

const INIT: FormData = {
  nombreCompleto: '', nombreNegocio: '', giro: '', ciudad: '',
  instagram: '', sitioWeb: '', descripcionMarca: '', percepcion: '',
  marcasInspiran: '', problemaImagen: '', diferenciador: '',
  clienteIdeal: '', dudasCliente: '', objetivo: '', presupuesto: '', comentarios: '',
};

const REQUIRED: Array<(keyof FormData)[]> = [
  ['nombreCompleto', 'nombreNegocio', 'giro'],
  ['descripcionMarca', 'percepcion', 'problemaImagen'],
  ['diferenciador', 'clienteIdeal'],
  ['objetivo', 'presupuesto'],
];

const OBJETIVOS = ['Más ventas', 'Mejor imagen', 'Autoridad', 'Lanzamiento', 'Redes sociales', 'Otro'];
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

export default function DiagnosticoMarcaPage() {
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
      const res = await fetch('/api/diagnostico-marca', {
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

      {/* Progress header */}
      <header className="dform-progress-header">
        <div className="dform-progress-meta">
          <Link href="/" className="dform-logo">W<span>eblynMX</span></Link>
          <span className="dform-step-count">Diagnóstico de Marca · {step + 1}/{TOTAL}</span>
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
              <h1 className="dform-step-title">Cuéntanos sobre tu negocio</h1>
              <p className="dform-step-desc">Vamos a conocerte. Solo toma unos minutos.</p>
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
                    {inp('giro', 'Ej. Restaurante, Moda, Tech…')}
                  </Field>
                  <Field label="Ciudad">
                    {inp('ciudad', 'Tu ciudad')}
                  </Field>
                </div>
                <div className="dform-two-cols">
                  <Field label="Instagram">
                    {inp('instagram', '@tunombre')}
                  </Field>
                  <Field label="Sitio web actual">
                    {inp('sitioWeb', 'https://…')}
                  </Field>
                </div>
              </div>
              <div className="dform-nav-btns">
                <button className="dform-btn-next" onClick={next}>Continuar <span>→</span></button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div key={key} className={`dform-step-panel${dir === 'bck' ? ' dform-back' : ''}`}>
              <p className="dform-step-eyebrow">Paso 2 de 4 · Tu identidad visual</p>
              <h1 className="dform-step-title">Háblanos de tu imagen</h1>
              <p className="dform-step-desc">Queremos entender cómo percibes tu marca hoy y a dónde quieres llevarla.</p>
              <div className="dform-fields">
                <Field label="¿Cómo describirías tu marca en este momento?" required error={errors.descripcionMarca}>
                  {ta('descripcionMarca', 'Ej. Profesional pero sin personalidad, muy básica, sin coherencia…')}
                </Field>
                <Field label="¿Qué percepción quieres transmitir?" required error={errors.percepcion}>
                  {ta('percepcion', 'Ej. Lujo accesible, confianza, innovación, cercanía…')}
                </Field>
                <Field label="¿Qué marcas te inspiran? (nacionales o internacionales)">
                  {inp('marcasInspiran', 'Ej. Apple, Starbucks, alguna marca local…')}
                </Field>
                <Field label="¿Cuál es el principal problema con tu imagen actual?" required error={errors.problemaImagen}>
                  {ta('problemaImagen', 'Ej. Logo muy básico, colores inconsistentes, no refleja mi nivel de servicio…')}
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
              <p className="dform-step-eyebrow">Paso 3 de 4 · Tu negocio y cliente</p>
              <h1 className="dform-step-title">Cuéntanos sobre tu cliente</h1>
              <p className="dform-step-desc">Esto nos ayuda a darte una recomendación que realmente conecte con tu mercado.</p>
              <div className="dform-fields">
                <Field label="¿Qué hace diferente a tu negocio?" required error={errors.diferenciador}>
                  {ta('diferenciador', 'Ej. Usamos ingredientes locales, entrega en 2 horas, atención personalizada…')}
                </Field>
                <Field label="¿Quién es tu cliente ideal?" required error={errors.clienteIdeal}>
                  {ta('clienteIdeal', 'Ej. Mujeres de 25-40 años, dueños de PyMEs en CDMX, profesionistas…')}
                </Field>
                <Field label="¿Qué dudas tiene tu cliente antes de comprarte?">
                  {ta('dudasCliente', 'Ej. ¿Es confiable? ¿Vale el precio? ¿Tienen experiencia?')}
                </Field>
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
              <p className="dform-step-desc">Últimos detalles para completar tu diagnóstico.</p>
              <div className="dform-fields">
                <Field label="Objetivo principal" required error={errors.objetivo}>
                  <Pills options={OBJETIVOS} value={data.objetivo} onChange={(v) => set('objetivo', v)} />
                  {errors.objetivo && <span className="dform-error-msg">{errors.objetivo}</span>}
                </Field>
                <Field label="Presupuesto aproximado" required error={errors.presupuesto}>
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
