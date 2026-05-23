'use client';

import { useEffect } from 'react';

export default function TransformacionSection() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.ba-wrap').forEach((wrap) => {
      const orient = wrap.dataset.orient; // 'h' or 'v'
      const beforeWrap = wrap.querySelector<HTMLElement>('.ba-before-wrap');
      const divider = wrap.querySelector<HTMLElement>('.ba-divider');
      const handle = wrap.querySelector<HTMLElement>('.ba-handle');
      if (!beforeWrap || !divider || !handle) return;

      let pos = 50;
      let dragging = false;
      let autoDir = 1;
      let autoActive = true;

      function apply() {
        if (orient === 'h') {
          beforeWrap!.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
          divider!.style.left = pos + '%';
          handle!.style.left = pos + '%';
        } else {
          beforeWrap!.style.clipPath = `inset(0 0 ${100 - pos}% 0)`;
          divider!.style.top = pos + '%';
          handle!.style.top = pos + '%';
        }
      }
      apply();

      function setFromEvent(e: PointerEvent) {
        const r = wrap.getBoundingClientRect();
        if (orient === 'h') {
          pos = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
        } else {
          pos = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
        }
        apply();
      }

      wrap.addEventListener('pointerdown', (e) => {
        dragging = true;
        autoActive = false;
        try { wrap.setPointerCapture((e as PointerEvent).pointerId); } catch (_) {}
        setFromEvent(e as PointerEvent);
        e.preventDefault();
      });
      wrap.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        setFromEvent(e as PointerEvent);
        e.preventDefault();
      }, { passive: false });
      wrap.addEventListener('pointerup', (e) => {
        dragging = false;
        try { wrap.releasePointerCapture((e as PointerEvent).pointerId); } catch (_) {}
      });
      wrap.addEventListener('pointercancel', () => { dragging = false; });

      wrap.addEventListener('touchstart', (e) => {
        dragging = true; autoActive = false;
        e.preventDefault();
      }, { passive: false });
      wrap.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        e.preventDefault();
        const t = (e as TouchEvent).touches[0];
        const r = wrap.getBoundingClientRect();
        if (orient === 'h') {
          pos = Math.max(0, Math.min(100, ((t.clientX - r.left) / r.width) * 100));
        } else {
          pos = Math.max(0, Math.min(100, ((t.clientY - r.top) / r.height) * 100));
        }
        apply();
      }, { passive: false });
      wrap.addEventListener('touchend', () => { dragging = false; });

      let last = performance.now();
      function autoTick(now: number) {
        const dt = (now - last) / 1000; last = now;
        if (autoActive) {
          pos += autoDir * 8 * dt;
          if (pos > 65) { pos = 65; autoDir = -1; }
          if (pos < 35) { pos = 35; autoDir = 1; }
          apply();
        }
        requestAnimationFrame(autoTick);
      }
      requestAnimationFrame(autoTick);
    });
  }, []);

  return (
    <>
      {/* ANTES Y DESPUÉS — LANDING */}
      <section id="transformacion">
        <div className="section-wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Transformación</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>
              Así se ve la <span className="accent">diferencia.</span>
            </h2>
          </div>

          <div className="ba-wrap ba-horizontal reveal" id="ba1" data-orient="h">
            <img
              className="ba-img ba-after-img"
              src="/antesydespues/Despues Landing page.png"
              alt="Después"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="ba-placeholder" style={{ display: 'none' }}>
              Después · Landing Premium<small>/antesydespues/Despues Landing page.png</small>
            </div>

            <div className="ba-before-wrap">
              <img
                className="ba-img ba-before-img"
                src="/antesydespues/Antes - Landing Page.png"
                alt="Antes"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="ba-placeholder" style={{ display: 'none' }}>
                Antes · Landing<small>/antesydespues/Antes - Landing Page.png</small>
              </div>
            </div>

            <span className="ba-label ba-label-before">Antes</span>
            <span className="ba-label ba-label-after">Después</span>

            <div className="ba-divider"></div>
            <div className="ba-handle" data-magnetic-skip>← →</div>
          </div>

          <p className="ba-caption reveal">El mismo negocio. La misma oferta. La percepción lo cambia todo.</p>
        </div>
      </section>

      {/* ANTES Y DESPUÉS — MENÚ */}
      <section>
        <div className="section-wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Detalles que importan</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>
              Hasta un <span className="accent">menú</span> comunica quién eres.
            </h2>
          </div>

          <div className="ba-wrap ba-vertical reveal" id="ba2" data-orient="v">
            <img
              className="ba-img ba-after-img"
              src="/antesydespues/Despues-menu-restaurante.png"
              alt="Después menú"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="ba-placeholder" style={{ display: 'none' }}>
              Después · Menú Digital<small>/antesydespues/Despues-menu-restaurante.png</small>
            </div>

            <div className="ba-before-wrap">
              <img
                className="ba-img ba-before-img"
                src="/antesydespues/Antes-menu restaurante.png"
                alt="Antes menú"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="ba-placeholder" style={{ display: 'none' }}>
                Antes · Menú impreso<small>/antesydespues/Antes-menu restaurante.png</small>
              </div>
            </div>

            <span className="ba-label ba-label-before">Antes</span>
            <span className="ba-label ba-label-after">Después</span>

            <div className="ba-divider"></div>
            <div className="ba-handle" data-magnetic-skip>↕</div>
          </div>

          <p className="ba-caption reveal">Un menú digital premium no es un lujo. Es la diferencia entre que regresen o no.</p>
        </div>
      </section>
    </>
  );
}
