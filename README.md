# Películas abiertas

Web cinemática sobre las películas abiertas de la Blender Foundation y el Blender Studio, de *Elephants Dream* (2006) a *Singularity* (2026).

Demo: https://pedri77.github.io/peliculas-abiertas/

## Qué tiene

- Portada: una tira de película vertical con tres fotogramas de cada película, en orden de estreno.
- Qué es una película abierta.
- Once películas, cada una en un bloque del color de sus fotogramas: título, dirección, año, sinopsis, lo que estrenó y una tira de doce fotogramas que corre con el scroll con su código de tiempo.

*Sintel* (2010) no está: su diseño artístico es de David Revoy, que desde el 8 de octubre de 2026 prohíbe las derivaciones de su obra hechas con IA, y esta página está escrita y programada con IA.

## Datos y derechos

- Fotogramas: miniaturas de vídeo que genera Wikimedia Commons en un segundo dado (`seek=`), reducidas a WebP. Doce por película, del 6 % al 90 % de la duración.
- Películas: Blender Foundation / Blender Studio, con licencias Creative Commons (CC BY 2.5, 3.0 o 4.0, y CC BY-SA 3.0 en la copia de Commons de *Cosmos Laundromat*), según figura en cada fichero de Commons. La atribución completa está en el pie de la página.
- Blender y su logotipo son marcas de la Blender Foundation. Esta página no está hecha ni revisada por ellos. Textos y código hechos con IA (Claude) y revisados; las imágenes no se han generado ni modificado con IA.

```bash
uv run --with pillow python -I scripts/fotogramas.py   # fotogramas + licencias de Commons
uv run --with pillow python -I scripts/colores.py      # color de bloque de cada película
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3016
npm run lint && npm run build
```

React 19, Vite, Tailwind 4 y Lenis; un solo bucle `requestAnimationFrame`. Respeta `prefers-reduced-motion`. Despliegue a GitHub Pages con `.github/workflows/pages.yml` en cada push a `main`.
