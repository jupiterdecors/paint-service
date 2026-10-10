import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';

interface Crumb {
  label: string;
  to?: string;
}

/** Title band used at the top of inner pages. */
export function PageHeader({ title, description, crumbs, children }: { title: string; description?: string; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <section className="border-b border-line bg-sand">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link to="/" className="hover:text-navy hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-navy hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
