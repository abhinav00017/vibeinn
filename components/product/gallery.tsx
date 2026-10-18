"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/modal";

type Img = { src: string; alt: string };

// Below lg: a horizontal swipe carousel with snap points. On lg: stacked.
// Tap or click any photo to open it large with prev and next.
export function Gallery({ images }: { images: Img[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const close = useCallback(() => setOpenAt(null), []);
  const n = images.length;
  const step = (d: number) => setOpenAt((i) => (i === null ? null : (i + d + n) % n));

  return (
    <div className="-mx-4 sm:mx-0">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 sm:px-0 lg:grid lg:grid-cols-1 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenAt(i)}
            aria-label={`Open ${img.alt} large`}
            className="relative aspect-[4/5] w-[88%] shrink-0 snap-center cursor-zoom-in bg-sand sm:w-[70%] lg:w-full"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 88vw"
              className="object-cover"
              priority={i === 0}
            />
          </button>
        ))}
      </div>
      {n > 1 && (
        <p className="mt-2 px-4 text-[11px] uppercase tracking-[0.18em] text-muted sm:px-0 lg:hidden">
          Swipe for more · {n} photos
        </p>
      )}

      <Modal open={openAt !== null} onClose={close} title={openAt !== null ? `${openAt + 1} / ${n}` : ""} wide>
        {openAt !== null && (
          <div className="relative bg-sand">
            <div className="relative mx-auto aspect-[4/5] max-h-[80vh] w-full">
              <Image
                src={images[openAt].src}
                alt={images[openAt].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-paper/90 text-lg"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-paper/90 text-lg"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
