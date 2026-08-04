#!/usr/bin/env python3
"""LaMa inpainting to remove the hero figure."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from simple_lama_inpainting import SimpleLama

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/Images/hero-landscape-female-v2.png"
OUT = ROOT / "public/Images/hero-landscape-v3-lama.png"

W, H = 1536, 1024


def build_mask() -> Image.Image:
    mask = np.zeros((H, W), dtype=np.uint8)

    silhouette = np.array(
        [
            [88, 900],
            [105, 815],
            [125, 730],
            [145, 650],
            [160, 570],
            [172, 500],
            [188, 440],
            [210, 390],
            [240, 350],
            [275, 325],
            [315, 308],
            [355, 302],
            [385, 315],
            [400, 345],
            [405, 385],
            [395, 430],
            [380, 480],
            [365, 535],
            [355, 595],
            [348, 660],
            [340, 730],
            [335, 800],
            [330, 870],
            [315, 915],
            [265, 935],
            [205, 942],
            [150, 935],
            [105, 915],
        ],
        dtype=np.int32,
    )
    cv2.fillPoly(mask, [silhouette], 255)
    cv2.ellipse(mask, (238, 925), (88, 16), 0, 0, 360, 255, -1)

    # Expand slightly for rim light
    mask = cv2.dilate(mask, np.ones((11, 11), np.uint8), iterations=1)
    return Image.fromarray(mask)


def main() -> None:
    lama = SimpleLama()
    image = Image.open(SRC).convert("RGB")
    mask = build_mask()
    result = lama(image, mask)
    result.save(OUT, optimize=True)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
