# Portrait & Visual Assets (`public/images/`)

## Replacing the Hero Portrait

The signature editorial hero loads its portrait from:

```text
public/images/yash-portrait.webp
```

(with an automatic fallback to `public/images/yash-portrait.png` and an editorial silhouette fallback if neither file is present).

### How to Replace With Your Own Portrait File

1. **Direct File Replacement (Recommended for Production / Vercel):**
   - Place your portrait image at `public/images/yash-portrait.webp` (or `.png` / `.jpg` if you update `DEFAULT_PORTRAIT_PATH` in `src/data/socialLinks.ts`).
   - Recommended dimensions: `1000 × 1250 px` (4:5 vertical aspect ratio), centered head and shoulders against a dark or transparent background.
   - The `PortraitTreatment` component (`src/components/PortraitTreatment.tsx`) automatically applies:
     - High-contrast monochrome grading
     - Subtle halftone stipple matrix (`mix-blend-mode: overlay`)
     - Warm orange (`#FF8047`) rim lighting
     - Bottom and radial edge vignette masks so the portrait blends seamlessly into `#050505` with no visible rectangular boundary.

2. **Interactive Browser Preview Replacement:**
   - Scroll to the **About (`01 / THE PERSON BEHIND THE WORK`)** section and use the **Portrait Source** control to upload or test any local image (`image.png`, `.webp`, `.jpg`) directly in your browser. The custom portrait is saved locally in `localStorage` and immediately updates the hero stage.
