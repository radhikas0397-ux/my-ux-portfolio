#!/usr/bin/env python3
"""Remove the standing figure from the hero landscape via masked inpainting."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/Images/hero-landscape-female-v2.png"
OUT = ROOT / "public/Images/hero-landscape-v3.png"
BACKUP = ROOT / "public/Images/hero-landscape-female-v2.backup.png"

W, H = 1536, 1024


def build_mask() -> np.ndarray:
    """Mask covering the figure + residual shadow on the cliff."""
    mask = np.zeros((H, W), dtype=np.uint8)

    # Main silhouette — polygon traced from the figure outline
    silhouette = np.array(
        [
            [95, 895],
            [118, 820],
            [132, 745],
            [148, 680],
            [162, 610],
            [175, 545],
            [188, 485],
            [205, 430],
            [228, 385],
            [255, 352],
            [285, 328],
            [318, 312],
            [352, 305],
            [378, 318],
            [395, 345],
            [402, 378],
            [398, 415],
            [385, 452],
            [368, 495],
            [355, 545],
            [348, 598],
            [342, 655],
            [338, 715],
            [335, 775],
            [332, 835],
            [328, 895],
            [310, 920],
            [260, 935],
            [200, 940],
            [145, 935],
            [110, 920],
        ],
        dtype=np.int32,
    )
    cv2.fillPoly(mask, [silhouette], 255)

    # Rim-light halo around the figure
    halo = cv2.dilate(mask, np.ones((19, 19), np.uint8), iterations=2)
    mask = cv2.bitwise_or(mask, halo)

    # Ground contact shadow under feet
    cv2.ellipse(mask, (245, 918), (95, 18), 0, 0, 360, 255, -1)

    # Soft feather so inpaint blends at edges
    mask = cv2.GaussianBlur(mask, (21, 21), 0)
    _, mask = cv2.threshold(mask, 24, 255, cv2.THRESH_BINARY)
    return mask


def patch_cliff(img: np.ndarray, mask: np.ndarray) -> np.ndarray:
    """Clone cliff rock texture from the right edge of the mask."""
    out = img.copy()
    m = mask > 0

    # Source strip: cliff to the right of the figure
    src_x0, src_x1 = 420, 620
    src_y0, src_y1 = 680, 980

    dst_x0, dst_x1 = 80, 400
    dst_y0, dst_y1 = 680, 980

    src = img[src_y0:src_y1, src_x0:src_x1].astype(np.float32)
    src_h, src_w = src.shape[:2]
    dst_h, dst_w = dst_y1 - dst_y0, dst_x1 - dst_x0

    # Tile / stretch source to destination with slight noise variation
    tiled = cv2.resize(src, (dst_w, dst_h), interpolation=cv2.INTER_CUBIC)
    noise = np.random.default_rng(7).normal(0, 3.5, tiled.shape).astype(np.float32)
    patched = np.clip(tiled + noise, 0, 255).astype(np.uint8)

    region_mask = m[dst_y0:dst_y1, dst_x0:dst_x1].astype(np.float32)
    region_mask = cv2.GaussianBlur(region_mask, (31, 31), 0)[..., None]

    existing = out[dst_y0:dst_y1, dst_x0:dst_x1].astype(np.float32)
    blended = existing * (1 - region_mask) + patched.astype(np.float32) * region_mask
    out[dst_y0:dst_y1, dst_x0:dst_x1] = blended.astype(np.uint8)
    return out


def patch_sky(img: np.ndarray, mask: np.ndarray) -> np.ndarray:
    """Extend starfield / milky way from adjacent sky."""
    out = img.copy()
    m = mask > 0

    src = img[40:520, 480:920].astype(np.float32)
    dst = out[40:520, 80:420].astype(np.float32)

    resized = cv2.resize(src, (340, 480), interpolation=cv2.INTER_CUBIC)
    # Flip horizontally so it doesn't look copied
    resized = cv2.flip(resized, 1)

    region = m[40:520, 80:420].astype(np.float32)
    region = cv2.GaussianBlur(region, (41, 41), 0)[..., None]

    blended = dst * (1 - region) + resized * region
    out[40:520, 80:420] = blended.astype(np.uint8)
    return out


def main() -> None:
    img = cv2.imread(str(SRC))
    if img is None:
        raise SystemExit(f"Could not read {SRC}")

    mask = build_mask()

    # Pre-patch large regions before inpainting for cleaner reconstruction
    patched = patch_sky(img, mask)
    patched = patch_cliff(patched, mask)

    # Inpaint remaining seams
    result = cv2.inpaint(patched, mask, inpaintRadius=12, flags=cv2.INPAINT_NS)

    # Gentle color harmonisation on edited region only
    lab = cv2.cvtColor(result, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l = cv2.GaussianBlur(l, (5, 5), 0)
    lab = cv2.merge([l, a, b])
    result = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)

    # Backup original once
    if not BACKUP.exists():
        Image.open(SRC).save(BACKUP)

    cv2.imwrite(str(OUT), result, [cv2.IMWRITE_PNG_COMPRESSION, 3])

    # Save mask for debugging
    cv2.imwrite(str(ROOT / "public/Images/hero-landscape-v3-mask.png"), mask)

    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
