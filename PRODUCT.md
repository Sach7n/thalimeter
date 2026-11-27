# Product

<!-- impeccable:product-schema 1 -->

> Written without a live interview: the owner works asynchronously through a project thread. Facts marked *(inferred)* come from the codebase, the owner's brief and Search Console data, and should be confirmed.

## Platform

web

## Users
People about to cook for a group who need one number fast: how much uncooked rice (and water) for N people, how much pasta, how much meat to buy. They arrive from Google with queries like "how many cups of rice for 6 people" or "how much rice for 12 people", usually on a phone, often in the kitchen or at the shop. *(inferred from Search Console top queries)*

Audience by impressions (last 3 months): US first by a wide margin, then India, Philippines, UK, Canada, Australia, South Africa, Malaysia, NZ, Pakistan. So cups and grams both matter, and rice-heavy cuisines (South Asian, Filipino, Malaysian) are a large share of real users.

## Product Purpose
Free, ad-supported kitchen calculators for portion planning. Success: the visitor gets a trustworthy answer in the first screen, in their own units, and the page earns the click from Google search results.

## Positioning
Answers depend on how the food is served (side vs main vs rice-dish vs buffet), not one fixed number, and every assumption is published on /how-we-calculate/. Rice is the primary subject; pasta and meat are secondary.

## Operating Context
Static Astro 7 site with React islands, hosted on Hostinger behind Cloudflare, deployed by GitHub Actions on push to main. Monetised with Google AdSense (client id from `PUBLIC_ADSENSE_CLIENT`). Core Web Vitals matter for both search and ad revenue.

## Capabilities and Constraints
- Calculators: rice per person, rice-to-water ratio (5 rice types × stove / rice cooker / Instant Pot), uncooked↔cooked rice, pasta per person, meat per person.
- Static answer pages: rice for N people, rice per type, pasta for N people, meat by occasion.
- All maths in `src/lib/kitchen.ts`, tested by `npm run check`.
- Units: US cups/lb and metric g/L, remembered per browser; rice-cooker cups (180 ml) shown too.
- Must stay AdSense-policy compliant: ads labelled, never mimicking controls, never pushing the answer below the fold.

## Brand Commitments
Name: ThaliMeter (a *thali* is a plate with a little of everything, in the right amount). Domain thalimeter.com. Operator: Macsera Pty Ltd *(marked TODO in config, unconfirmed)*. Owner wants the site to stop looking AI-generated *(owner brief)*.

## Evidence on Hand
Only the published calculation values and sources summary on /how-we-calculate/. No testimonials, user counts, press or reviews exist; none may be invented.

## Product Principles
1. The answer first: the number sits above the fold and in the search snippet.
2. Both unit systems, always: cups and grams side by side.
3. Show every assumption; never claim precision the inputs don't have.
4. Ads pay for the site but never get between the visitor and the answer.

## Accessibility & Inclusion
Phone-first, one-handed use in a kitchen; large touch targets (≥44px), WCAG AA contrast, works without JavaScript for the static answer and chart.
