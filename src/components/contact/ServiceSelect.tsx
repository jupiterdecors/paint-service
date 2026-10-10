import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown, type LucideIcon } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface Props {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  /** Classes for the closed control (border colour etc.), shared with the other inputs. */
  className?: string;
}

/**
 * Styled replacement for a native <select>, following the WAI-ARIA "select-only combobox" pattern:
 * Enter / Space / ↓ open the list, ↑ ↓ Home End move, Enter selects, Esc closes, typing a letter jumps.
 */
export function ServiceSelect({ id, name, value, options, placeholder, onChange, invalid, describedBy, className = '' }: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const [active, setActive] = useState(Math.max(selectedIndex, 0));
  const typed = useRef({ text: '', at: 0 });

  const selected = options[selectedIndex];
  const optionId = (i: number) => `${listId}-opt-${i}`;

  const openList = () => {
    setActive(Math.max(selectedIndex, 0));
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  // Close when clicking anywhere outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        return;
      case 'ArrowUp':
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        return;
      case 'Home':
        e.preventDefault();
        setActive(0);
        return;
      case 'End':
        e.preventDefault();
        setActive(last);
        return;
      case 'Enter':
      case ' ':
        e.preventDefault();
        choose(active);
        return;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        return;
      case 'Tab':
        setOpen(false);
        return;
    }
    if (e.key.length === 1 && /\S/.test(e.key)) {
      const now = Date.now();
      typed.current.text = (now - typed.current.at > 600 ? '' : typed.current.text) + e.key.toLowerCase();
      typed.current.at = now;
      const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(typed.current.text));
      if (hit >= 0) setActive(hit);
    }
  };

  const SelectedIcon = selected?.icon;

  return (
    <div ref={rootRef} className="relative mt-2">
      <button
        id={id}
        name={name}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex min-h-12 w-full items-center gap-3 rounded-lg border bg-white px-4 text-left text-base transition-colors focus:outline-none focus:ring-2 focus:ring-navy/15 ${
          open ? 'border-navy ring-2 ring-navy/15' : ''
        } ${className}`}
      >
        {SelectedIcon && <SelectedIcon aria-hidden className="size-[18px] shrink-0 text-terracotta" />}
        <span className={`flex-1 truncate ${selected ? 'text-ink' : 'text-muted/70'}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown aria-hidden className={`size-5 shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 origin-top overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(15,40,64,0.25)] motion-safe:animate-select-pop"
        >
          {options.map((o, i) => {
            const Icon = o.icon;
            const isSelected = i === selectedIndex;
            const isActive = i === active;
            return (
              <li
                key={o.value}
                id={optionId(i)}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(i)}
                onPointerDown={(e) => e.preventDefault()} // keep focus on the button
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                  isActive ? 'bg-sand' : ''
                } ${isSelected ? 'font-semibold text-navy' : 'text-ink'}`}
              >
                <span
                  aria-hidden
                  className={`grid size-8 shrink-0 place-items-center rounded-md transition-colors ${
                    isSelected || isActive ? 'bg-terracotta/15 text-terracotta-ink' : 'bg-navy-soft text-navy'
                  }`}
                >
                  {Icon && <Icon className="size-4" />}
                </span>
                <span className="flex-1">{o.label}</span>
                {isSelected && <Check aria-hidden className="size-4 shrink-0 text-terracotta-ink" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
