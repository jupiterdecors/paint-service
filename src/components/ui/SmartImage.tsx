import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  /** Tailwind aspect ratio class, e.g. 'aspect-[4/3]'. Reserves space to avoid layout shift. */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  /** Load immediately (use for the hero image only). */
  priority?: boolean;
  sizes?: string;
  /** Show a small "Sample" label over the image. */
  sampleLabel?: boolean;
  /** Hide the 'Photo placeholder' chip (when a caption already covers that corner). */
  hidePlaceholderChip?: boolean;
}

/** Wall-paint colour combinations used for placeholders while real photos are missing. */
const palettes = [
  ['#E9DFCC', '#C7D3D0', '#173653'],
  ['#F1E4D6', '#D97745', '#2F4B66'],
  ['#E3E8EC', '#B9C7D3', '#D97745'],
  ['#EFE7DA', '#9FB3A6', '#173653'],
  ['#F3ECE2', '#D9B99B', '#45627E'],
];

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * Image with graceful fallback: if the photo file is missing or fails to load,
 * a clearly labelled painted-swatch placeholder is shown instead.
 */
export function SmartImage({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  sampleLabel = false,
  hidePlaceholderChip = false,
}: Props) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [a, b, c] = palettes[hash(src) % palettes.length];

  return (
    <div className={`relative overflow-hidden bg-sand ${aspect} ${className}`}>
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}

      {status === 'error' && (
        <div role="img" aria-label={`${alt} (photo placeholder)`} className="absolute inset-0" style={{ background: a }}>
          {/* Overlapping roller strokes */}
          <div
            className="absolute -left-[10%] top-[18%] h-[34%] w-[85%] -rotate-6 rounded-r-full"
            style={{ background: b }}
          />
          <div
            className="absolute -right-[8%] bottom-[16%] h-[22%] w-[70%] rotate-3 rounded-l-full opacity-90"
            style={{ background: c }}
          />
          {!hidePlaceholderChip && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-ink">
            <ImageOff aria-hidden className="size-3.5" />
            Photo placeholder
          </div>
          )}
        </div>
      )}

      {sampleLabel && (
        <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-0.5 text-xs font-semibold text-terracotta-ink shadow-sm">
          Sample
        </span>
      )}
    </div>
  );
}
