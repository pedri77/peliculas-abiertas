"""Color de bloque de cada película: el color medio de sus fotogramas, saturado y oscurecido para que
el texto se lea, y la tinta (crema u oscura) según su luminosidad. Lo añade a src/datos/peliculas.json.
Uso: uv run --with pillow python -I scripts/colores.py
"""
import colorsys
import json
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
p = RAIZ / "src/datos/peliculas.json"
datos = json.loads(p.read_text())
for id_, d in datos.items():
    pix = []
    for f in sorted((RAIZ / "public/f" / id_).glob("*.webp")):
        pix += list(Image.open(f).convert("RGB").resize((24, 12)).getdata())
    # Media en HLS de los píxeles con algo de color; si no hay, la media de todos.
    con = [c for c in pix if colorsys.rgb_to_hls(*(v / 255 for v in c))[2] > 0.25] or pix
    r, g, b = (sum(c[i] for c in con) / len(con) / 255 for i in range(3))
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    s = min(1, max(0.35, s * 1.4))
    l = min(0.42, max(0.22, l * 0.8))
    rgb = [round(v * 255) for v in colorsys.hls_to_rgb(h, l, s)]
    d["color"] = "#" + "".join(f"{v:02x}" for v in rgb)
    d["tinta"] = "#f4efe6"
    print(id_, d["color"])
p.write_text(json.dumps(datos, ensure_ascii=False, indent=1))
