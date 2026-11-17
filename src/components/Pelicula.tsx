import {useEffect, useRef} from 'react';
import {DATOS, fotoUrl, pelicula, tiempo, type Pelicula as TPelicula} from '../content';
import {clamp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Una película: bloque de color sacado de sus fotogramas, título de cartel y una tira horizontal de
 * sus fotogramas (9 a 12) que corre con el scroll. Encima de la tira, el código de tiempo del fotograma que
 * pasa por el centro.
 *
 * Guion de scroll (p), sección de 190 svh:
 *   0.04 – 0.96  la tira se desplaza de modo que el fotograma q = p · (n − 1) quede en el centro
 *   código       tiempo interpolado entre los dos fotogramas más cercanos al centro
 *   realce       fotograma central a opacidad 1, los demás a 0.55
 */

export function Pelicula({pl, n, total}: {pl: TPelicula; n: number; total: number}) {
  const raizRef = useRef<HTMLElement>(null);
  const tiraRef = useRef<HTMLDivElement>(null);
  const codigoRef = useRef<HTMLSpanElement>(null);
  const fotoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const d = DATOS[pl.id];
  const fotos = d.fotos;
  const N = fotos.length;

  useEffect(() => {
    let pAnterior = -1;
    let anchoAnterior = 0;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      const vw = window.innerWidth;
      if (!visible || (Math.abs(p - pAnterior) < 0.00005 && vw === anchoAnterior)) return;
      pAnterior = p;
      anchoAnterior = vw;
      const q = tramo(p, 0.04, 0.96) * (N - 1);
      const primera = fotoRefs.current[0];
      if (!primera) return;
      const ancho = primera.offsetWidth;
      tiraRef.current!.style.transform = `translate3d(${vw / 2 - ancho / 2 - q * ancho}px, 0, 0)`;
      fotoRefs.current.forEach((el, k) => {
        if (el) el.style.opacity = String(0.55 + 0.45 * clamp(1 - Math.abs(k - q)));
      });
      const k = Math.min(N - 2, Math.floor(q));
      const t0 = d.tiempos[fotos[k]];
      const t1 = d.tiempos[fotos[k + 1]];
      codigoRef.current!.textContent = tiempo(t0 + (t1 - t0) * (q - k));
    });
  }, [d, fotos, N]);

  return (
    <section
      ref={raizRef}
      id={pl.id}
      aria-labelledby={`${pl.id}-titulo`}
      className="relative"
      style={{height: '190svh', background: d.color, color: d.tinta}}
    >
      <div className="sticky top-0 flex h-pantalla flex-col justify-between overflow-hidden py-[4svh]">
        <header className="flex items-start justify-between gap-4 px-4 sm:px-6 md:px-[5vw]">
          <div className="min-w-0">
            <p className="etiqueta opacity-80">
              {String(n).padStart(2, '0')} / {total}
              {pl.proyecto ? ` · ${pl.proyecto}` : ''}
            </p>
            <h2 id={`${pl.id}-titulo`} className="mt-1 font-display text-display break-words uppercase">
              {pl.titulo}
            </h2>
            <p className="mt-1 text-[0.9375rem] opacity-85">
              {pelicula.direccion}: {pl.direccion}
            </p>
          </div>
          <p className="shrink-0 font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-none opacity-90">{pl.anio}</p>
        </header>

        <div className="relative">
          <p className="etiqueta mb-2 text-center tabular-nums opacity-80" aria-hidden="true">
            <span ref={codigoRef}>{tiempo(d.tiempos[fotos[0]])}</span> / {tiempo(d.duracion)}
          </p>
          <div ref={tiraRef} className="perforada flex w-max py-[22px] will-change-transform">
            {fotos.map((f, k) => (
              <div
                key={f}
                ref={(el) => {
                  fotoRefs.current[k] = el;
                }}
                className="px-1.5"
              >
                <img
                  src={fotoUrl(pl.id, f)}
                  alt={k === Math.floor(N / 2) ? `Fotograma de ${pl.titulo}` : ''}
                  loading="lazy"
                  decoding="async"
                  className="block h-[24svh] w-auto md:h-[34svh]"
                  style={{aspectRatio: `${d.w} / ${d.h}`}}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 px-4 sm:px-6 md:grid-cols-2 md:gap-[4vw] md:px-[5vw]">
          <p className="text-body">{pl.sinopsis}</p>
          <p className="text-body">
            <span className="etiqueta mr-2 opacity-80">{pelicula.estreno}</span>
            {pl.estreno}
          </p>
        </div>
      </div>
    </section>
  );
}
