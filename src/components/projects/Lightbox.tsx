import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project } from '../../data/projects';
import { SmartImage } from '../ui/SmartImage';

interface Props {
  items: Project[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

/** Accessible image viewer: Esc closes, ← → navigate, focus stays inside while open. */
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;

  const prev = () => onChange((index - 1 + count) % count);
  const next = () => onChange((index + 1) % count);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && count > 1) onChange((index - 1 + count) % count);
      else if (e.key === 'ArrowRight' && count > 1) onChange((index + 1) % count);
      else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onChange, onClose]);

  if (!item) return null;

  const navBtn =
    'inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-[80] flex flex-col bg-navy-deep/95 p-4 sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between text-white">
        <p className="text-sm text-white/70" aria-live="polite">
          {index + 1} of {count}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className={navBtn} aria-label="Close gallery">
          <X aria-hidden className="size-6" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {count > 1 && (
          <button type="button" onClick={prev} className={`${navBtn} hidden sm:inline-flex`} aria-label="Previous photo">
            <ChevronLeft aria-hidden className="size-7" />
          </button>
        )}
        <figure className="w-full max-w-5xl">
          <SmartImage
            key={item.id}
            src={item.image}
            alt={item.alt}
            aspect="aspect-[4/3] mx-auto w-full max-w-[min(100%,calc(70vh*4/3))]"
            className="rounded-xl"
            sizes="90vw"
          />
          <figcaption className="mt-4 text-white">
            <h2 id="lightbox-title" className="text-lg font-semibold text-white">
              {item.title}
            </h2>
            <p className="text-sm text-white/70">
              {item.category} — {item.description}
            </p>
          </figcaption>
        </figure>
        {count > 1 && (
          <button type="button" onClick={next} className={`${navBtn} hidden sm:inline-flex`} aria-label="Next photo">
            <ChevronRight aria-hidden className="size-7" />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-4 sm:hidden">
          <button type="button" onClick={prev} className={navBtn} aria-label="Previous photo">
            <ChevronLeft aria-hidden className="size-7" />
          </button>
          <button type="button" onClick={next} className={navBtn} aria-label="Next photo">
            <ChevronRight aria-hidden className="size-7" />
          </button>
        </div>
      )}
    </div>
  );
}
