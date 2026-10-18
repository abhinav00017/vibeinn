import Image from "next/image";

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {images.map((img) => (
        <div key={img.src} className="relative aspect-[4/5] bg-sand">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={img === images[0]}
          />
        </div>
      ))}
    </div>
  );
}
