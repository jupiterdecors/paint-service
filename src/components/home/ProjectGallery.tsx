import { useCallback, useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import { projectCategories, projects as allProjects, type ProjectCategory } from '../../data/projects';
import { SmartImage } from '../ui/SmartImage';
import { Lightbox } from '../projects/Lightbox';

interface Props {
  /** Maximum number of projects to show (homepage preview). */
  limit?: number;
  showFilters?: boolean;
}

type Filter = 'All' | ProjectCategory;

export function ProjectGallery({ limit, showFilters = true }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const list = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);

  const close = useCallback(() => setOpenIndex(null), []);
  const filters: Filter[] = ['All', ...projectCategories];

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label="Filter projects by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-[15px] font-medium transition-colors ${
                filter === f ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-navy/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="mt-10 text-muted">No projects in this category yet. Choose another category to see more work.</p>
      ) : (
        <ul className="mt-8 grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li key={p.id} className={p.shape === 'tall' ? 'sm:row-span-2' : ''}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl text-left"
                aria-label={`View larger: ${p.title} (${p.category})`}
              >
                <SmartImage
                  src={p.image}
                  alt={p.alt}
                  aspect="h-full"
                  className="h-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                  hidePlaceholderChip
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-navy-deep/80 to-transparent p-4 pt-12 text-white">
                  <span>
                    <span className="block text-xs font-medium text-white/80">{p.category}</span>
                    <span className="block font-semibold">{p.title}</span>
                  </span>
                  <Expand aria-hidden className="size-5 opacity-80" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null && <Lightbox items={visible} index={openIndex} onClose={close} onChange={setOpenIndex} />}
    </div>
  );
}
