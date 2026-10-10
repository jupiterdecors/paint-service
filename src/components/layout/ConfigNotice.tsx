import { useState } from 'react';
import { getMissingConfig } from '../../config/business';

/**
 * Developer-only reminder listing business details that still need filling in.
 * Never rendered in the production build.
 */
export function ConfigNotice() {
  const [hidden, setHidden] = useState(false);
  if (!import.meta.env.DEV || hidden) return null;
  const missing = getMissingConfig();
  if (!missing.length) return null;

  return (
    <aside className="fixed bottom-4 left-4 z-[60] max-w-sm rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 shadow-lg">
      <p className="font-semibold">Setup needed (visible only while developing)</p>
      <p className="mt-1">Add these in src/config/business.ts before launch:</p>
      <ul className="mt-2 list-disc space-y-0.5 pl-5">
        {missing.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setHidden(true)} className="mt-3 font-semibold underline">
        Hide for now
      </button>
    </aside>
  );
}
