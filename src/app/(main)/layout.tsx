// Force all routes under (main) to be dynamically rendered
// This is correct for a real-time betting platform
export const dynamic = 'force-dynamic';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
