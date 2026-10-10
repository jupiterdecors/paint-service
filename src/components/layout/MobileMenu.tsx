import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { navItems } from './navigation';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { business, isPhoneConfigured, telHref } from '../../config/business';

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
}

export function MobileMenu({ open, onClose, id }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Rendered into <body> so the sticky header's backdrop blur can't clip it.
  return createPortal(
    <div
      id={id}
      ref={panelRef}
      className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
    >
      <nav aria-label="Mobile" className="px-5 py-4">
        <ul className="divide-y divide-line">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex min-h-14 items-center text-lg font-semibold ${isActive ? 'text-terracotta-ink' : 'text-navy'}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3">
          <ButtonLink to="/contact" variant="accent" size="lg" className="w-full">
            Get a Quote
          </ButtonLink>
          {isPhoneConfigured() && (
            <ButtonAnchor href={telHref()} variant="outline" size="lg" className="w-full">
              <Phone aria-hidden className="size-5" /> Call {business.phone}
            </ButtonAnchor>
          )}
        </div>
      </nav>
    </div>,
    document.body,
  );
}
