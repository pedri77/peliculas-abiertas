import {DATOS, creditos, peliculas} from '../content';
import {useAjustarTexto} from '../hooks/useAjustarTexto';
import {useAparecer} from '../hooks/useAparecer';
import {irA} from '../lib/scroll';

/** Fuentes, licencia de cada película y el nombre de la página de borde a borde. */
export function Creditos() {
  const ref = useAparecer<HTMLElement>();
  const marca = useAjustarTexto<HTMLSpanElement>();
  return (
    <footer ref={ref} aria-labelledby="creditos-titulo" className="bg-crema pt-[12svh] text-tinta">
      <div className="mx-auto grid max-w-[80rem] gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:px-[5vw]">
        <div>
          <p data-aparece className="etiqueta text-rojo">
            {creditos.antetitulo}
          </p>
          <h2 id="creditos-titulo" data-aparece style={{'--i': 1} as React.CSSProperties} className="mt-2 font-display text-display uppercase">
            {creditos.titulo}
          </h2>
          <p data-aparece style={{'--i': 2} as React.CSSProperties} className="mt-5 text-body text-tinta-2">
            {creditos.cuerpo}
          </p>
          <ul className="mt-6 grid gap-2 text-[0.9375rem]">
            {creditos.fuentes.map((f) => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noreferrer" className="font-semibold text-rojo underline underline-offset-4">
                  {f.texto} ↗
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => irA('#inicio')}
            className="mt-8 border-2 border-tinta px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors hover:bg-tinta hover:text-crema"
          >
            ↑ {creditos.volver}
          </button>
          <p className="mt-8 text-[0.8125rem] text-tinta-2">{creditos.firma}</p>
        </div>
        <ul data-aparece style={{'--i': 2} as React.CSSProperties} className="grid content-start gap-2 text-[0.875rem] leading-relaxed text-tinta-2">
          {peliculas.map((pl) => {
            const d = DATOS[pl.id];
            return (
              <li key={pl.id} className="flex gap-3 border-b border-tinta/15 pb-2">
                <span className="mt-1.5 size-3 shrink-0" style={{background: d.color}} aria-hidden="true" />
                <span>
                  <a href={d.pagina} target="_blank" rel="noreferrer" className="font-semibold text-tinta underline decoration-tinta/30 underline-offset-4 hover:text-rojo">
                    {pl.titulo}
                  </a>{' '}
                  ({pl.anio}). {d.autor}. {d.licencia}.
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-[10svh] overflow-hidden px-4 pb-6 sm:px-6 md:px-[5vw]" aria-hidden="true">
        <span ref={marca} className="inline-block font-display leading-[1] whitespace-nowrap uppercase">
          {creditos.wordmark}
        </span>
      </div>
    </footer>
  );
}
