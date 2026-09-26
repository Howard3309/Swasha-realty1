'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { Download } from 'lucide-react';

/**
 * ============================================================================
 * IMAGE UPLOAD GUIDE — read this before touching anything else
 * ============================================================================
 * Each flat below has an `image` field pointing at a placeholder (Unsplash).
 * Replace each placeholder with the real floor-plan drawing for that exact
 * flat + floor combination. You have two options for hosting:
 *
 *   A) Cloudinary (what you've been using): upload the cropped PNG/JPG of
 *      that single flat, then paste the resulting res.cloudinary.com URL
 *      into that flat's `image` field.
 *   B) Local /public folder: drop the file in your Next.js project's
 *      `/public/floor-plans/` folder, then set `image` to the local path,
 *      e.g. `/floor-plans/first-floor-a2.png`.
 *
 * WHICH FILE GOES WHERE (marked inline with "UPLOAD HERE" comments below):
 *   - First Floor  → A1  : you already uploaded FLAT_A1_2142.png — upload
 *                          that same file to Cloudinary/public and swap it in.
 *   - First Floor  → A2  : crop "FLAT A2 2176 SFT" out of
 *                          FULL_FIRST_FLOOR_CAD_EDITS.pdf, export, upload.
 *   - First Floor  → A3  : crop "FLAT A3 2360 SFT" out of the same PDF.
 *   - First Floor  → A4  : crop "FLAT A4 2142 SFT" out of the same PDF.
 *   - 2nd Floor+   → A1  : crop "FLAT A1 2788 SFT" out of
 *                          FULL_second_floor_edits.pdf, export, upload.
 *   - 2nd Floor+   → A2  : crop "FLAT A2 2826 SFT" out of the same PDF.
 *   - 2nd Floor+   → A3  : already wired up — using the Cloudinary URL you
 *                          gave me (Screenshot_2026-09-11_at_19.44.01.png).
 *   - 2nd Floor+   → A4  : crop "FLAT A4 2790 SFT" out of the same PDF.
 *
 * Tip: a clean single-flat export (not a screenshot of the whole sheet)
 * will look far sharper here than a cropped screenshot — re-export each
 * flat individually from AutoCAD/the DWG if you can, rather than cropping
 * the combined PDF.
 * ============================================================================
 */

type Flat = {
  id: string;
  name: string;
  area: string;
  image: string;
  specs: { label: string; value: string }[];
};

type FloorGroup = {
  id: string;
  label: string;
  flats: Flat[];
};

const floorGroups: FloorGroup[] = [
  {
    id: 'first-floor',
    label: 'First Floor',
    flats: [
      {
        id: 'ff-a1',
        name: 'Flat A1',
        area: '2,142 sq.ft.',
        // UPLOAD HERE: FLAT_A1_2142.png (you already have this file — just host it)
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790406701/Generated_Image_September_11_2026_-_12_31AM.jpg',
        specs: [
          { label: 'Living Room', value: "21'3\" x 12'0\"" },
          { label: 'Master Bedroom', value: "15'0\" x 14'9\"" },
          { label: 'Guest Bedroom', value: "12'0\" x 13'2\"" },
          { label: 'Dining', value: "13'2\" x 14'2\"" },
          { label: 'Balcony', value: "10'3\" x 7'11\"" },
        ],
      },
      {
        id: 'ff-a2',
        name: 'Flat A2',
        area: '2,176 sq.ft.',
        // UPLOAD HERE: crop "FLAT A2 2176 SFT" from FULL_FIRST_FLOOR_CAD_EDITS.pdf
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790406816/Generated_Image_September_11_2026_-_12_42AM.jpg',
        specs: [
          { label: 'Living Room', value: "21'3\" x 12'0\"" },
          { label: 'Master Bedroom', value: "15'0\" x 15'6\"" },
          { label: 'Guest Bedroom', value: "12'0\" x 13'2\"" },
          { label: 'Dining', value: "13'2\" x 14'11\"" },
          { label: 'Kitchen', value: "13'9\" x 9'2\"" },
        ],
      },
      {
        id: 'ff-a3',
        name: 'Flat A3',
        area: '2,360 sq.ft.',
        // UPLOAD HERE: crop "FLAT A3 2360 SFT" from FULL_FIRST_FLOOR_CAD_EDITS.pdf
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790406913/Generated_Image_September_11_2026_-_12_47AM.jpg',
        specs: [
          { label: 'Living Room', value: "27'10\" x 18'4\"" },
          { label: 'Master Bedroom', value: "14'0\" x 17'4\"" },
          { label: 'Guest Bedroom', value: "13'9\" x 14'0\"" },
          { label: 'Dining', value: "11'6\" x 18'4\"" },
          { label: 'Kitchen', value: "16'4\" x 10'0\"" },
        ],
      },
      {
        id: 'ff-a4',
        name: 'Flat A4',
        area: '2,142 sq.ft.',
        // UPLOAD HERE: crop "FLAT A4 2142 SFT" from FULL_FIRST_FLOOR_CAD_EDITS.pdf
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790406926/ChatGPT_Image_Sep_10_2026_11_20_06_PM.png',
        specs: [
          { label: 'Living Room', value: "11'6\" x 18'2\"" },
          { label: 'Master Bedroom', value: "14'0\" x 15'5\"" },
          { label: 'Guest Bedroom', value: "13'9\" x 13'0\"" },
          { label: 'Dining', value: "18'9\" x 11'0\"" },
          { label: 'Kitchen', value: "10'7\" x 11'10\"" },
        ],
      },
    ],
  },
  {
    id: 'second-floor',
    label: 'Second Floor Onwards',
    flats: [
      {
        id: 'sf-a1',
        name: 'Flat A1',
        area: '2,788 sq.ft.',
        // UPLOAD HERE: crop "FLAT A1 2788 SFT" from FULL_second_floor_edits.pdf
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408031/Generated_Image_September_11_2026_-_1_07AM.jpg',
        specs: [
          { label: 'Living Room', value: "23'9\" x 12'0\"" },
          { label: 'Master Bedroom', value: "15'0\" x 14'9\"" },
          { label: 'Guest Bedroom', value: "12'0\" x 13'2\"" },
          { label: 'Dining', value: "13'2\" x 14'2\"" },
          { label: 'Outdoor Balcony', value: "10'3\" x 7'11\"" },
        ],
      },
      {
        id: 'sf-a2',
        name: 'Flat A2',
        area: '2,826 sq.ft.',
        // UPLOAD HERE: crop "FLAT A2 2826 SFT" from FULL_second_floor_edits.pdf
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408019/Generated_Image_September_11_2026_-_1_31AM.jpg',
        specs: [
          { label: 'Living Room', value: "23'9\" x 12'0\"" },
          { label: 'Master Bedroom', value: "15'0\" x 15'6\"" },
          { label: 'Guest Bedroom', value: "12'0\" x 13'2\"" },
          { label: 'Dining', value: "13'2\" x 14'11\"" },
          { label: 'Kitchen', value: "13'9\" x 9'2\"" },
        ],
      },
      {
        id: 'sf-a3',
        name: 'Flat A3',
        area: '3,037 sq.ft.',
        // Already wired up: real Cloudinary render you provided
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/a_450/Screenshot_2026-09-11_at_19.44.01.png',
        specs: [
          { label: 'Living Room', value: "27'10\" x 18'4\"" },
          { label: 'Master Bedroom', value: "14'0\" x 17'4\"" },
          { label: 'Guest Bedroom', value: "13'9\" x 14'0\"" },
          { label: 'Dining', value: "11'6\" x 18'4\"" },
          { label: 'Outdoor Living', value: "11'6\" x 13'0\"" },
        ],
      },
      {
        id: 'sf-a4',
        name: 'Flat A4',
        area: '2,790 sq.ft.',
        // UPLOAD HERE: crop "FLAT A4 2790 SFT" from FULL_second_floor_edits.pdf
        image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408226/Generated_Image_September_11_2026_-_12_58AM.jpg',
        specs: [
          { label: 'Living Room', value: "11'6\" x 18'2\"" },
          { label: 'Master Bedroom', value: "14'0\" x 15'5\"" },
          { label: 'Guest Bedroom', value: "13'9\" x 13'0\"" },
          { label: 'Dining', value: "18'9\" x 11'0\"" },
          { label: 'Outdoor Living', value: "11'6\" x 11'0\"" },
        ],
      },
    ],
  },
];

export default function FloorPlans() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFloorId, setActiveFloorId] = useState(floorGroups[0].id);
  const [activeFlatId, setActiveFlatId] = useState(floorGroups[0].flats[0].id);

  const activeFloor = floorGroups.find((f) => f.id === activeFloorId)!;
  const activeFlat = activeFloor.flats.find((f) => f.id === activeFlatId)!;

  function selectFloor(floorId: string) {
    const floor = floorGroups.find((f) => f.id === floorId)!;
    setActiveFloorId(floorId);
    // reset to the first flat in the newly selected floor group
    setActiveFlatId(floor.flats[0].id);
  }

  return (
    <section id="residences" className="py-24 md:py-32 bg-offwhite text-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-charcoal/60 tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Residences</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">Thoughtfully Proportioned</h2>
        </motion.div>

        {/* Level 1: Floor selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {floorGroups.map((floor) => (
            <button
              key={floor.id}
              onClick={() => selectFloor(floor.id)}
              className={`px-6 py-2.5 text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
                activeFloorId === floor.id
                  ? 'bg-charcoal text-gold'
                  : 'bg-transparent text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 border border-charcoal/20'
              }`}
            >
              {floor.label}
            </button>
          ))}
        </div>

        {/* Level 2: Flat selector, scoped to the active floor */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {activeFloor.flats.map((flat) => (
            <button
              key={flat.id}
              onClick={() => setActiveFlatId(flat.id)}
              className={`px-8 py-3 text-sm font-semibold tracking-wider transition-colors duration-300 ${
                activeFlatId === flat.id
                  ? 'bg-charcoal text-gold'
                  : 'bg-transparent text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 border border-charcoal/20'
              }`}
            >
              {flat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center min-h-[500px]">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFlat.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">{activeFlat.name}</h3>
                <div className="flex items-center gap-4 text-charcoal/60 mb-10 text-sm tracking-wider uppercase font-medium">
                  <span>{activeFlat.area}</span>
                  <span className="w-1 h-1 rounded-full bg-gold"></span>
                  <span>{activeFloor.label}</span>
                </div>

                <div className="space-y-4 mb-12">
                  {activeFlat.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between py-4 border-b border-charcoal/10">
                      <span className="text-charcoal/70">{spec.label}</span>
                      <span className="font-medium text-charcoal">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300 group">
                  <span className="border-b border-charcoal group-hover:border-gold pb-1 transition-colors">Download Brochure</span>
                  <Download size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFlat.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] bg-white border border-charcoal/10 overflow-hidden"
              >
                <Image
                  src={activeFlat.image}
                  alt={`${activeFlat.name} — ${activeFloor.label}`}
                  fill
                  quality={70}
                  className="object-contain"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    event.currentTarget.parentElement?.style.setProperty(
                      'aspect-ratio',
                      `${naturalWidth} / ${naturalHeight}`,
                    );
                  }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}