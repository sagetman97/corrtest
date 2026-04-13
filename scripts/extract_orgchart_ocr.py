from __future__ import annotations

import json
from pathlib import Path

import fitz
import numpy as np
from PIL import Image
from rapidocr_onnxruntime import RapidOCR


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "docs/reference/company/orgchart.pdf"
IMG_PATH = ROOT / "docs/reference/company/orgchart-page1-x8.png"
AUTO_CROP_IMG_PATH = ROOT / "docs/reference/company/orgchart-autocrop-x8.png"
TXT_PATH = ROOT / "docs/reference/company/orgchart-ocr.txt"
JSON_PATH = ROOT / "docs/reference/company/orgchart-ocr.json"


def render_pdf() -> None:
    doc = fitz.open(PDF_PATH)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(8, 8))
    pix.save(IMG_PATH)


def auto_crop() -> None:
    im = Image.open(IMG_PATH).convert("RGB")
    arr = np.array(im)
    # Keep all dark/light-gray chart elements while discarding white margins.
    mask = np.any(arr < 245, axis=2)
    ys, xs = np.where(mask)
    y0, y1 = ys.min(), ys.max()
    x0, x1 = xs.min(), xs.max()
    pad = 30
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(arr.shape[1] - 1, x1 + pad)
    y1 = min(arr.shape[0] - 1, y1 + pad)
    im.crop((x0, y0, x1 + 1, y1 + 1)).save(AUTO_CROP_IMG_PATH)


def run_ocr() -> list[dict]:
    ocr = RapidOCR()
    result, _ = ocr(str(AUTO_CROP_IMG_PATH))
    rows = []
    for item in result or []:
        box, text, conf = item
        xs = [p[0] for p in box]
        ys = [p[1] for p in box]
        rows.append(
            {
                "text": text,
                "conf": float(conf),
                "x": float(sum(xs) / len(xs)),
                "y": float(sum(ys) / len(ys)),
            }
        )
    rows.sort(key=lambda r: (r["y"], r["x"]))
    return rows


def save_rows(rows: list[dict]) -> None:
    JSON_PATH.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    lines = [f"{r['y']:.1f}\t{r['x']:.1f}\t{r['conf']:.2f}\t{r['text']}" for r in rows]
    TXT_PATH.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    render_pdf()
    auto_crop()
    parsed = run_ocr()
    save_rows(parsed)
    print(f"Wrote {len(parsed)} OCR rows")
