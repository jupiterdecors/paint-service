import { Link } from 'react-router-dom';
import { business } from '../../config/business';

export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#173653" />
      <circle cx="32" cy="32" r="17" fill="#F5F1E8" />
      <path d="M15.6 36.5c10.8-3.4 21.9-3.4 32.8 0" stroke="#D97745" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ inverted = false, onClick }: { inverted?: boolean; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5" aria-label={`${business.name} — home`}>
      <LogoMark />
      <span className={`whitespace-nowrap text-[19px] font-bold tracking-[-0.02em] ${inverted ? 'text-white' : 'text-navy'}`}>
        Jupiter <span className={inverted ? 'font-medium text-white/75' : 'font-medium text-muted'}>Decors</span>
      </span>
    </Link>
  );
}
