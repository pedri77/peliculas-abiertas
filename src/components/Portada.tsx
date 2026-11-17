import {useEffect, useRef} from 'react';
import {DATOS, fotoUrl, peliculas, portada} from '../content';
import {easeOutCubic, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Portada: el titular a la izquierda y, a la derecha, una tira de película vertical que corre hacia
 * arriba con el scroll: tres fotogramas de cada película, en orden de estreno. Al lado, el año de la
 * película que pasa por el centro.
 *
 * Guion de scroll (p), sección de 340 svh:
 *   0.00 – 1.00  la tira sube de 0 a −(alto de la tira − alto de pantalla)
 *   año          el de la película cuyo fotograma está en el centro de la pantalla
 *   0.70 – 0.95  el titular se aparta un poco (sube 6 vh) para dar paso a la intro
 */

/** Tres fotogramas válidos por película: al principio, en medio y hacia el final. */
const FOTOS = peliculas.flatMap((pl) => {
  const f = DATOS[pl.id].fotos;
  return [f[1], f[Math.floor(f.length / 2)], f[f.length - 2]].map((k) => ({id: pl.id, k, anio: pl.anio}));
});

export function Portada() {
  const raizRef = useRef<HTMLElement>(null);
  const tiraRef = useRef<HTMLDivElement>(null);
  const anioRef = useRef<HTMLParagraphElement>(null);
  const tituloRef = useRef<HTMLDivElement>(null);
  const invitaRef = useRef<HTMLParagraphElement>(null);
  const fotoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let pAnterior = -1;
    let anchoAnterior = 0;
    let anioAnterior = 0;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      const vh = window.innerHeight;
      if (!visible || (Math.abs(p - pAnterior) < 0.00005 && window.innerWidth === anchoAnterior)) return;
      pAnterior = p;
      anchoAnterior = window.innerWidth;
      const tira = tiraRef.current!;
      const y = -p * Math.max(0, tira.offsetHeight - vh);
      tira.style.transform = `translate3d(0, ${y}px, 0)`;
      // Fotograma en el centro de la pantalla.
      let anio = FOTOS[0].anio;
      for (let i = 0; i < FOTOS.length; i++) {
        const el = fotoRefs.current[i];
        if (el && el.offsetTop + y <= vh / 2) anio = FOTOS[i].anio;
      }
      if (anio !== anioAnterior) {
        anioRef.current!.textContent = String(anio);
        anioAnterior = anio;
      }
      const t = easeOutCubic(tramo(p, 0.7, 0.95));
      tituloRef.current!.style.transform = `translate3d(0, ${-t * 6}vh, 0)`;
      invitaRef.current!.style.opacity = String(1 - tramo(p, 0, 0.04));
    });
  }, []);

  return (
    <section ref={raizRef} id="inicio" aria-labelledby="portada-titulo" className="relative" style={{height: '340svh'}}>
      <div className="sticky top-0 h-pantalla overflow-hidden bg-sala">
        <div
          ref={tiraRef}
          className="perforada-v absolute top-0 right-[3vw] w-[52vw] px-[22px] will-change-transform sm:w-[40vw] md:right-[6vw] md:w-[30vw]"
          role="img"
          aria-label={portada.etiqueta}
        >
          {FOTOS.map((f, i) => (
            <div
              key={`${f.id}-${f.k}`}
              ref={(el) => {
                fotoRefs.current[i] = el;
              }}
              className="py-2"
            >
              <img src={fotoUrl(f.id, f.k)} alt="" loading={i < 4 ? 'eager' : 'lazy'} decoding="async" className="block w-full" style={{aspectRatio: `${DATOS[f.id]?.w ?? 16} / ${DATOS[f.id]?.h ?? 9}`, objectFit: 'cover'}} />
            </div>
          ))}
        </div>

        <p ref={anioRef} className="absolute bottom-[8svh] left-4 z-20 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-amarillo sm:left-6 md:left-[5vw]" aria-hidden="true">
          {FOTOS[0].anio}
        </p>

        <div ref={tituloRef} className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 md:px-[5vw]">
          <p className="etiqueta text-amarillo">{portada.antetitulo}</p>
          <h1 id="portada-titulo" className="mt-3 font-display text-hero uppercase [text-shadow:0_4px_30px_oklch(0%_0_0/0.6)]">
            {portada.titulo.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-[26rem] text-lead text-crema/85 [text-shadow:0_2px_12px_oklch(0%_0_0/0.8)] max-md:-mx-2 max-md:bg-sala/85 max-md:p-2 md:max-w-[30rem]">{portada.bajada}</p>
        </div>
        <p ref={invitaRef} className="etiqueta absolute bottom-[3svh] left-4 text-crema/70 sm:left-6 md:left-[5vw]">
          {portada.invitacion} ↓
        </p>
      </div>
    </section>
  );
}
