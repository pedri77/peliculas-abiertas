/** Todo el texto de la página vive aquí. Los componentes no llevan texto suelto. */
import datos from './datos/peliculas.json';

const base = import.meta.env.BASE_URL;
export const fotoUrl = (id: string, k: number) => `${base}f/${id}/${String(k).padStart(2, '0')}.webp`;

type Datos = {fichero: string; pagina: string; licencia: string; autor: string; duracion: number; tiempos: number[]; fotos: number[]; w: number; h: number; color: string; tinta: string};
export const DATOS = datos as Record<string, Datos>;

/** 00:06:12 */
export const tiempo = (s: number) => {
  const t = Math.max(0, Math.round(s));
  return [Math.floor(t / 3600), Math.floor((t % 3600) / 60), t % 60].map((v) => String(v).padStart(2, '0')).join(':');
};

export const portada = {
  antetitulo: 'Blender Studio · 2006–2026',
  titulo: ['Películas', 'abiertas'],
  bajada: 'Once cortos hechos con software libre y publicados con todo dentro: la película, los modelos, las texturas y los ficheros de producción. Cualquiera puede verlos, copiarlos y rehacerlos.',
  invitacion: 'Desliza: la película empieza a correr',
  etiqueta: 'Una tira de película con un fotograma de cada una de las once películas abiertas',
};

export const intro = {
  antetitulo: 'Qué es una película abierta',
  titulo: 'Cine con las tripas a la vista',
  cuerpo: [
    'En 2006, un grupo de artistas y programadores hizo un corto solo con software libre y lo publicó con todos sus ficheros. Desde entonces, la Blender Foundation repite la jugada cada uno o dos años, con un estudio propio en Ámsterdam.',
    'Cada película sirve también de banco de pruebas: lo que el equipo necesita para terminarla acaba dentro de Blender, el programa de 3D gratuito que usan desde estudiantes hasta estudios de cine.',
  ],
  cifras: [
    {valor: '11', texto: 'películas en esta página'},
    {valor: '20', texto: 'años, de 2006 a 2026'},
    {valor: 'CC BY', texto: 'licencia: basta con citar'},
  ],
};

export type Pelicula = {id: string; titulo: string; anio: number; direccion: string; proyecto?: string; sinopsis: string; estreno: string};

export const peliculas: Pelicula[] = [
  {
    id: 'elephants',
    titulo: 'Elephants Dream',
    anio: 2006,
    direccion: 'Bassam Kurdali',
    proyecto: 'Proyecto Orange',
    sinopsis: 'Dos hombres recorren una máquina infinita llena de cables y engranajes. Uno cree que la entiende; el otro no está tan seguro.',
    estreno: 'La primera película abierta del mundo: hecha casi solo con software libre y publicada con todos sus ficheros de producción.',
  },
  {
    id: 'bunny',
    titulo: 'Big Buck Bunny',
    anio: 2008,
    direccion: 'Sacha Goedegebure',
    proyecto: 'Proyecto Peach',
    sinopsis: 'Un conejo enorme y bonachón aguanta las burlas de tres roedores hasta que decide vengarse de ellos.',
    estreno: 'Pelo y hierba por todas partes, que obligaron a mejorar cómo los genera Blender. Por su licencia libre acabó siendo uno de los vídeos de prueba más usados en internet.',
  },
  {
    id: 'tears',
    titulo: 'Tears of Steel',
    anio: 2012,
    direccion: 'Ian Hubert',
    proyecto: 'Proyecto Mango',
    sinopsis: 'Un grupo de científicos se reúne en la Oude Kerk de Ámsterdam para repetir un momento del pasado y salvar el mundo de unos robots.',
    estreno: 'La primera con actores reales: rodada en Ámsterdam y terminada con efectos visuales hechos en Blender.',
  },
  {
    id: 'cosmos',
    titulo: 'Cosmos Laundromat',
    anio: 2015,
    direccion: 'Mathieu Auvray',
    proyecto: 'Proyecto Gooseberry',
    sinopsis: 'En una isla desolada, Franck, una oveja harta de todo, conoce a un vendedor que le ofrece vivir otras vidas.',
    estreno: 'Iba a ser un largometraje y se quedó en un primer episodio de diez minutos. Ganó el premio del jurado en Animago 2015 y en SIGGRAPH 2016.',
  },
  {
    id: 'caminandes',
    titulo: 'Caminandes: Llamigos',
    anio: 2016,
    direccion: 'Pablo Vazquez',
    sinopsis: 'Koro, una llama de la Patagonia, se pelea con un pingüino por unas bayas rojas en pleno invierno.',
    estreno: 'Tercer episodio de una serie que empezó un artista argentino por su cuenta y que el estudio adoptó desde el segundo.',
  },
  {
    id: 'spring',
    titulo: 'Spring',
    anio: 2019,
    direccion: 'Andy Goralczyk',
    sinopsis: 'Una pastora y su perro se enfrentan a espíritus antiguos para que siga el ciclo de la vida, en unas montañas inspiradas en la infancia del director.',
    estreno: 'Se hizo para poner a prueba Blender 2.80, la versión que cambió por completo la interfaz del programa.',
  },
  {
    id: 'coffee',
    titulo: 'Coffee Run',
    anio: 2020,
    direccion: 'Hjalti Hjálmarsson',
    sinopsis: 'Con la cafeína por las nubes, una mujer corre hacia atrás por los recuerdos agridulces de una relación.',
    estreno: 'La primera película abierta renderizada con EEVEE, el motor de Blender que pinta en tiempo real.',
  },
  {
    id: 'sprite',
    titulo: 'Sprite Fright',
    anio: 2021,
    direccion: 'Matthew Luhn y Hjalti Hjálmarsson',
    sinopsis: 'Unos adolescentes ruidosos se adentran en un bosque y descubren a unos seres-seta muy pacíficos. Hasta que dejan de serlo.',
    estreno: 'Comedia de terror al estilo de los ochenta, dirigida por un artista de historia que había trabajado en Pixar.',
  },
  {
    id: 'charge',
    titulo: 'Charge',
    anio: 2022,
    direccion: 'Hjalti Hjálmarsson',
    sinopsis: 'En un futuro sin energía, un anciano se cuela en una fábrica de baterías y se topa con un dron de seguridad letal.',
    estreno: 'Una apuesta por el fotorrealismo y por mejorar cómo se texturizan los materiales en Blender.',
  },
  {
    id: 'wingit',
    titulo: 'Wing It!',
    anio: 2023,
    direccion: 'Rik Schutte',
    sinopsis: 'Un gato ingeniero muy cuadriculado recibe la visita de un perro que quiere ser piloto. Acaban los dos dentro de un cohete sin control.',
    estreno: 'Comedia de persecución a toda velocidad, con un estilo de dibujo animado muy marcado.',
  },
  {
    id: 'singularity',
    titulo: 'Singularity',
    anio: 2026,
    direccion: 'Andy Goralczyk',
    sinopsis: 'Cuando el universo era joven, un suceso cósmico se traga el hogar de una pequeña criatura espacial, que tiene que refugiarse con otras bajo la mirada de un ser celeste misterioso.',
    estreno: 'La primera del estudio en 4K y HDR, con un acabado de pintura y multitudes animadas con nodos geométricos. Se estrenó en mayo de 2026.',
  },
];

export const pelicula = {
  direccion: 'Dirección',
  estreno: 'Qué estrenó',
  ver: 'Ver en Commons',
};

export const creditos = {
  antetitulo: 'Fuentes',
  titulo: 'Cómo está hecha',
  cuerpo:
    'Los fotogramas son miniaturas que genera Wikimedia Commons de cada película, reducidas y convertidas a WebP: doce por película repartidos a lo largo de la duración, sin los que caían en créditos, fundidos a negro o escenas del making-of. Las películas son de la Blender Foundation y el Blender Studio, con licencia Creative Commons. Blender y su logotipo son marcas de la Blender Foundation; esta página no está hecha ni revisada por ellos.',
  licencia: (l: string) => l,
  fuentes: [
    {texto: 'Películas del Blender Studio', url: 'https://studio.blender.org/films/'},
    {texto: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/deed.es'},
    {texto: 'Anton y Figtree (SIL OFL)', url: 'https://fonts.google.com/'},
  ],
  volver: 'Volver arriba',
  wordmark: 'Películas abiertas',
  firma: 'Textos y código hechos con IA (Claude) y revisados, como pieza de portfolio. Las imágenes no se han generado ni modificado con IA.',
};
