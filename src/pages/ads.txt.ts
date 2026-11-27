import { site } from '../config';
// AdSense needs ads.txt to serve ads at full value. Built from PUBLIC_ADSENSE_CLIENT (ca-pub-123 → pub-123).
export const GET = () => new Response(
  site.adsenseClient ? `google.com, ${site.adsenseClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n` : '# Ads not configured yet\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
