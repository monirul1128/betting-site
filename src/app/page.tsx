// Server component — forces dynamic rendering for the homepage
// Required because the betting app uses real-time data (new Date(), live odds)
export const dynamic = 'force-dynamic';

export { default } from './page-client';
