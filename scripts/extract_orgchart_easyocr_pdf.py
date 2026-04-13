from __future__ import annotations

from pathlib import Path

import easyocr
import fitz


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "docs/reference/company/orgchart.pdf"
OUT_DIR = ROOT / "docs/reference/company/orgchart-ocr"


def render_pages() -> list[Path]:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF_PATH)
    image_paths: list[Path] = []
    for i in range(len(doc)):
        page = doc[i]
        pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))
        img_path = OUT_DIR / f"page-{i + 1:02d}.png"
        pix.save(img_path)
        image_paths.append(img_path)
    return image_paths


def ocr_pages(image_paths: list[Path]) -> None:
    reader = easyocr.Reader(["en"], gpu=False, verbose=False)
    for img_path in image_paths:
        out = reader.readtext(str(img_path), detail=1, paragraph=False)
        rows = []
        for box, text, conf in out:
            xs = [p[0] for p in box]
            ys = [p[1] for p in box]
            rows.append((sum(ys) / 4, sum(xs) / 4, float(conf), text))
        rows.sort(key=lambda r: (r[0], r[1]))
        out_path = img_path.with_suffix(".ocr.txt")
        out_path.write_text(
            "\n".join(f"{y:.1f}\t{x:.1f}\t{c:.2f}\t{text}" for y, x, c, text in rows),
            encoding="utf-8",
        )
        print(f"{img_path.name}: {len(rows)} rows")


if __name__ == "__main__":
    paths = render_pages()
    ocr_pages(paths)
