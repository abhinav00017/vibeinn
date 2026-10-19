"""Turn text into SVG path data with fontTools. Used for the logo and for outlining prints.

    from tools.textpath import Face
    f = Face("/System/Library/Fonts/Supplemental/Futura.ttc", "Futura-Bold")
    d, width = f.path("VIBEINN", size=120, tracking=0.12)   # tracking = fraction of em
"""
from fontTools.ttLib import TTFont, TTCollection
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import math


class Face:
    def __init__(self, file: str, name: str | None = None):
        if file.endswith(".ttc"):
            coll = TTCollection(file)
            font = None
            for f in coll.fonts:
                ps = f["name"].getDebugName(6)
                if name is None or ps == name:
                    font = f
                    break
            if font is None:
                raise ValueError(f"{name} not in {file}: " + ", ".join(f["name"].getDebugName(6) for f in coll.fonts))
        else:
            font = TTFont(file)
        self.font = font
        self.upem = font["head"].unitsPerEm
        self.cmap = font.getBestCmap()
        self.glyphs = font.getGlyphSet()
        self.hmtx = font["hmtx"]
        self.cap = font["OS/2"].sCapHeight if hasattr(font["OS/2"], "sCapHeight") and font["OS/2"].sCapHeight else self.upem * 0.7

    def _glyph(self, ch):
        return self.cmap.get(ord(ch))

    def width(self, text: str, size: float, tracking: float = 0) -> float:
        s = size / self.upem
        w = 0
        for i, ch in enumerate(text):
            g = self._glyph(ch)
            if g is None:
                w += size * 0.3
                continue
            w += self.hmtx[g][0] * s
            if i < len(text) - 1:
                w += tracking * size
        return w

    def cap_height(self, size: float) -> float:
        return self.cap * size / self.upem

    def path(self, text: str, size: float, x: float = 0, y: float = 0, tracking: float = 0) -> tuple[str, float]:
        """Path data for `text` with its baseline at (x, y). Returns (d, advance width)."""
        s = size / self.upem
        parts = []
        cx = x
        for i, ch in enumerate(text):
            g = self._glyph(ch)
            if g is None:
                cx += size * 0.3
                continue
            pen = SVGPathPen(self.glyphs)
            tpen = TransformPen(pen, (s, 0, 0, -s, cx, y))
            self.glyphs[g].draw(tpen)
            d = pen.getCommands()
            if d:
                parts.append(d)
            cx += self.hmtx[g][0] * s
            if i < len(text) - 1:
                cx += tracking * size
        return " ".join(parts), cx - x

    def arc_path(self, text: str, size: float, cx: float, cy: float, r: float, start_deg: float, tracking: float = 0, inside: bool = False) -> str:
        """Glyphs along a circle. Baseline sits on radius r. start_deg is where the text begins (0 = top, clockwise)."""
        s = size / self.upem
        parts = []
        ang = math.radians(start_deg)
        for ch in text:
            g = self._glyph(ch)
            adv = (self.hmtx[g][0] * s if g else size * 0.3) + tracking * size
            half = (adv / r) / 2
            mid = ang + (half if not inside else -half)
            if g:
                pen = SVGPathPen(self.glyphs)
                rot = mid if not inside else mid + math.pi
                cos, sin = math.cos(rot), math.sin(rot)
                px = cx + r * math.sin(mid)
                py = cy - r * math.cos(mid)
                w = self.hmtx[g][0] * s
                # glyph origin at its horizontal centre, baseline on the circle, rotated tangent
                a, b, c, d = cos * s, sin * s, sin * s, -cos * s
                ox = px - (w / 2) * cos
                oy = py - (w / 2) * sin
                tpen = TransformPen(pen, (a, b, c, d, ox, oy))
                self.glyphs[g].draw(tpen)
                dd = pen.getCommands()
                if dd:
                    parts.append(dd)
            ang = ang + (2 * half if not inside else -2 * half)
        return " ".join(parts)
