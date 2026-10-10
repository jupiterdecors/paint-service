import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({ title, description, align = 'left', id, as: Tag = 'h2', className = '' }: Props) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <Tag id={id} className="text-3xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-4xl">
        {title}
      </Tag>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
