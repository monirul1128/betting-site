'use client';

/**
 * PageShell — wraps every page's root div.
 *
 * suppressHydrationWarning prevents the React hydration warning caused
 * by browser extensions (e.g. Grammarly, BIS safety scanner) that inject
 * extra attributes like bis_skin_checked="1" into the DOM.
 *
 * This does NOT mask real hydration bugs — it only suppresses one level
 * of attribute differences on this element itself, not its children.
 * Place it as the outermost wrapper on each page.
 */
export default function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      suppressHydrationWarning
      className={className}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1a1f2e' }}
    >
      {children}
    </div>
  );
}
