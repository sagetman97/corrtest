from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np
from rapidocr_onnxruntime import RapidOCR


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("image_path")
    parser.add_argument("--out", default="")
    parser.add_argument("--scale", type=float, default=1.0)
    parser.add_argument("--binarize", action="store_true")
    args = parser.parse_args()

    image_path = Path(args.image_path)
    out_path = Path(args.out) if args.out else image_path.with_suffix(".ocr.txt")
    proc_path = image_path

    if args.scale != 1.0 or args.binarize:
        img = cv2.imread(str(image_path))
        if args.scale != 1.0:
            img = cv2.resize(img, None, fx=args.scale, fy=args.scale, interpolation=cv2.INTER_CUBIC)
        if args.binarize:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            gray = cv2.GaussianBlur(gray, (3, 3), 0)
            img = cv2.adaptiveThreshold(
                gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 11
            )
        proc_path = image_path.with_name(image_path.stem + ".proc.png")
        cv2.imwrite(str(proc_path), img)

    ocr = RapidOCR()
    result, _ = ocr(str(proc_path))

    rows = []
    for item in result or []:
        box, text, conf = item
        xs = [p[0] for p in box]
        ys = [p[1] for p in box]
        rows.append((sum(ys) / len(ys), sum(xs) / len(xs), float(conf), text))

    rows.sort(key=lambda x: (x[0], x[1]))
    out_lines = [f"{y:.1f}\t{x:.1f}\t{c:.2f}\t{t}" for y, x, c, t in rows]
    out_path.write_text("\n".join(out_lines), encoding="utf-8")
    print(f"Wrote {len(rows)} rows -> {out_path}")


if __name__ == "__main__":
    main()
