import {intro} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/** Qué es una película abierta, sobre el crema de taquilla. */
export function Intro() {
  const ref = useAparecer<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="intro-titulo" className="bg-crema py-[16svh] text-tinta">
      <div className="mx-auto grid max-w-[80rem] gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[6vw] md:px-[5vw]">
        <div>
          <p data-aparece className="etiqueta text-rojo">
            {intro.antetitulo}
          </p>
          <h2 id="intro-titulo" data-aparece style={{'--i': 1} as React.CSSProperties} className="mt-2 font-display text-display uppercase">
            {intro.titulo}
          </h2>
        </div>
        <div>
          {intro.cuerpo.map((t, k) => (
            <p key={k} data-aparece style={{'--i': k + 2} as React.CSSProperties} className="mt-4 text-lead text-tinta-2 first:mt-0">
              {t}
            </p>
          ))}
          <dl className="mt-10 grid grid-cols-3 border-t-2 border-tinta">
            {intro.cifras.map((c, k) => (
              <div key={c.texto} data-aparece style={{'--i': k + 4} as React.CSSProperties} className="pt-3 pr-3">
                <dt className="sr-only">{c.texto}</dt>
                <dd className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-none text-rojo">{c.valor}</dd>
                <dd className="mt-1 text-[0.8125rem] text-tinta-2">{c.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
