import Image from "next/image";

// Below lg: a horizontal swipe carousel with snap points. On lg: stacked.
export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="-mx-4 sm:mx-0">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 sm:px-0 lg:grid lg:grid-cols-1 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="relative aspect-[4/5] w-[88%] shrink-0 snap-center bg-sand sm:w-[70%] lg:w-full"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 88vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <p className="mt-2 px-4 text-[11px] uppercase tracking-[0.18em] text-muted sm:px-0 lg:hidden">
          Swipe for more · {images.length} photos
        </p>
      )}
    </div>
  );
}
