import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function buildHtml(d: Record<string, string>) {
  const row = (label: string, val: string) => `
    <tr>
      <td style="padding:10px 16px;font-size:12px;color:#888;white-space:nowrap;width:220px;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.04);">${label}</td>
      <td style="padding:10px 16px;font-size:13px;color:#e8e8e8;border-bottom:1px solid rgba(255,255,255,0.04);">${val || '—'}</td>
    </tr>`;

  const section = (title: string, rows: string) => `
    <div style="margin-bottom:20px;">
      <div style="background:#111;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
        <div style="background:#0d0d0d;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8BFF61;">${title}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </div>
    </div>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Diagnóstico de Conversión</title></head>
  <body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,sans-serif;color:#F5F5F5;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;background:#8BFF61;color:#0B0B0B;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:5px 16px;border-radius:999px;margin-bottom:14px;">WeblynMX</div>
      <h1 style="font-size:22px;font-weight:700;color:#F5F5F5;margin:0 0 4px;">Nuevo Diagnóstico de Conversión</h1>
      <p style="font-size:13px;color:#888;margin:0;">De: <strong style="color:#8BFF61;">${d.nombreNegocio || 'Sin nombre'}</strong></p>
    </div>
    ${section('Datos de contacto',
      row('Nombre completo', d.nombreCompleto) +
      row('Nombre del negocio', d.nombreNegocio) +
      row('Giro / Industria', d.giro) +
      row('Instagram', d.instagram) +
      row('Sitio web actual', d.sitioWeb)
    )}
    ${section('Situación de tráfico',
      row('¿De dónde llegan sus clientes?', d.fuenteClientes) +
      row('¿Corre anuncios actualmente?', d.correAnuncios) +
      row('Presupuesto mensual de anuncios', d.presupuestoAnuncios) +
      row('Principal problema', d.problemaPrincipal)
    )}
    ${section('Oferta y negocio',
      row('Servicio o producto principal', d.productoServicio) +
      row('Ticket promedio', d.ticketPromedio) +
      row('CTA actual', d.ctaActual)
    )}
    ${section('Objetivo y presupuesto',
      row('Objetivo principal', d.objetivo) +
      row('Presupuesto aproximado', d.presupuesto) +
      row('Comentarios finales', d.comentarios)
    )}
    <p style="text-align:center;font-size:11px;color:#444;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">Diagnóstico enviado desde weblynmx.com</p>
  </div></body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'diagnostico@weblynmx.com',
      to: 'WeblynMx@gmail.com',
      subject: `Diagnóstico de Conversión · ${data.nombreNegocio || 'Nuevo lead'}`,
      html: buildHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/diagnostico-conversion]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
