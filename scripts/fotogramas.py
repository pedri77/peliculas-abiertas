"""Fotogramas de cada película abierta, sacados de la versión de 480p de Commons sin descargar el vídeo.

Usa las miniaturas de vídeo de Commons en un segundo dado («seek=»), como pide Wikimedia en vez de leer
el vídeo por rangos: N fotogramas repartidos entre el 6 % y el 90 % de la duración (sin títulos ni créditos). Escribe public/f/<id>/NN.webp (640 px) y src/datos/peliculas.json
con duración, licencia y autor según Commons.
Uso: uv run --with pillow python -I scripts/fotogramas.py
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import time
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comun import RAIZ, UA, get_json, info  # noqa: E402

N = 12
# Fotogramas descartados tras revisarlos a ojo: créditos, fundidos a negro y escenas del making-of.
DESCARTAR = {"elephants": [11], "bunny": [10, 11], "tears": [11], "cosmos": [10, 11], "spring": [11], "coffee": [11],
             "sprite": [11], "charge": [9, 10, 11], "wingit": [10, 11], "singularity": [11]}
PELICULAS = {
    "elephants": "Elephants Dream (2006).webm",
    "bunny": "Big Buck Bunny 4K.webm",
    "tears": "Tears of Steel 1080p.webm",
    "cosmos": "Cosmos Laundromat - First Cycle - Official Blender Foundation release.webm",
    "caminandes": "Caminandes 3 - Llamigos - Blender Animated Short.webm",
    "spring": "Spring - Blender Open Movie.webm",
    "coffee": "Coffee Run - Blender Open Movie-full movie.webm",
    "sprite": "Sprite Fright - Blender Open Movie-full movie.webm",
    "charge": "Charge - Blender Open Movie-full movie.webm",
    "wingit": "WING IT! - Blender Open Movie-full movie.webm",
    "singularity": "SINGULARITY - Blender Open Movie-full movie.webm",
}


def miniatura(fichero: str, segundo: int) -> tuple[str, float]:
    """URL de la miniatura de Commons del vídeo en ese segundo (960 px) y duración del vídeo."""
    d = get_json({"action": "query", "format": "json", "titles": "File:" + fichero, "prop": "videoinfo",
                  "viprop": "size|url", "viurlwidth": 960, "viurlparam": f"960px-seek={segundo}"})
    v = next(iter(d["query"]["pages"].values()))["videoinfo"][0]
    return v["thumburl"].split("?")[0], float(v["duration"])


def bajar(url: str, destino: Path) -> None:
    for intento in range(5):
        r = subprocess.run(["curl", "-s", "-A", UA, "-w", "%{http_code}", "-o", str(destino), url], capture_output=True, text=True)
        if r.stdout == "200":
            time.sleep(2)
            return
        destino.unlink(missing_ok=True)
        time.sleep(30 * (intento + 1))
    raise RuntimeError(url)


def main() -> None:
    meta = info(list(PELICULAS.values()))
    salida = {}
    for id_, f in PELICULAS.items():
        _, dur = miniatura(f, 1)
        carpeta = RAIZ / "public" / "f" / id_
        carpeta.mkdir(parents=True, exist_ok=True)
        tiempos = [round(dur * (0.06 + 0.84 * k / (N - 1))) for k in range(N)]
        for k, t in enumerate(tiempos):
            if k in DESCARTAR.get(id_, []):
                continue
            destino = carpeta / f"{k:02d}.webp"
            if destino.exists():
                continue
            jpg = RAIZ / "datos-crudos" / f"{id_}-{k:02d}.jpg"
            jpg.parent.mkdir(parents=True, exist_ok=True)
            if not jpg.exists():
                bajar(miniatura(f, t)[0], jpg)
            im = Image.open(jpg).convert("RGB")
            im.thumbnail((640, 640), Image.LANCZOS)
            im.save(destino, "WEBP", quality=74, method=6)
        m = meta[f]
        salida[id_] = {"fichero": f, "pagina": m["pagina"], "licencia": m["LicenseShortName"],
                       "autor": re.sub(r"\s*\[\d+\]$", "", re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m["Artist"])).strip()),
                       "duracion": round(dur), "tiempos": tiempos, "fotos": [k for k in range(N) if k not in DESCARTAR.get(id_, [])], "w": m["w"], "h": m["h"]}
        print(id_, round(dur), "s", m["LicenseShortName"], "|", salida[id_]["autor"][:50])
    (RAIZ / "src" / "datos").mkdir(parents=True, exist_ok=True)
    (RAIZ / "src" / "datos" / "peliculas.json").write_text(json.dumps(salida, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
