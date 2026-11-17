import {useEffect} from 'react';
import {Creditos} from './components/Creditos';
import {Intro} from './components/Intro';
import {Pelicula} from './components/Pelicula';
import {Portada} from './components/Portada';
import {peliculas} from './content';
import {useMovimientoReducido} from './hooks/useMovimientoReducido';
import {iniciarScroll} from './lib/scroll';

/** Orden del guion: tira de película · qué es una película abierta · once películas · fuentes. */
export default function App() {
  const reducido = useMovimientoReducido();
  useEffect(() => iniciarScroll(reducido), [reducido]);
  return (
    <main>
      <Portada />
      <Intro />
      {peliculas.map((pl, k) => (
        <Pelicula key={pl.id} pl={pl} n={k + 1} total={peliculas.length} />
      ))}
      <Creditos />
    </main>
  );
}
