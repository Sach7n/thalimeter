---
name: ThaliMeter
description: How much rice, water, pasta and meat to cook for any number of people, painted like tiffin-lid codes on brushed steel.
colors:
  steel: "#e6e9e8"
  steel-2: "#d3d9d7"
  steel-3: "#aeb7b4"
  plate: "#ffffff"
  ink: "#16191b"
  ink-2: "#353c3f"
  muted: "#535b5e"
  on-ink: "#f4f6f5"
  on-ink-muted: "#b4bcbf"
  rice-vermilion: "#d7261e"
  water-ultramarine: "#2443b8"
  pasta-chrome-yellow: "#f2b705"
  pasta-ink: "#8a6400"
  meat-signal-green: "#1f8a4c"
  water-on-ink: "#5b78e8"
  meat-on-ink: "#2fae63"
  ink-rule: "#343b3e"
typography:
  display:
    fontFamily: "Big Shoulders Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(42px, 7vw, 76px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(30px, 4vw, 40px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.005em"
  numeral-result:
    fontFamily: "Big Shoulders Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(56px, 8vw, 84px)"
    fontWeight: 800
    lineHeight: 0.95
  numeral-answer:
    fontFamily: "Big Shoulders Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(38px, 5vw, 52px)"
    fontWeight: 800
    lineHeight: 1
  title:
    fontFamily: "Public Sans Variable, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Public Sans Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  label:
    fontFamily: "Public Sans Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  sm: "10px"
  md: "16px"
  lg: "22px"
  pill: "999px"
spacing:
  gutter: "20px"
  gutter-phone: "16px"
  block: "18px"
  ad: "48px"
  section: "64px"
  footer: "88px"
  container: "1140px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
  button-ghost-on-ink:
    backgroundColor: "transparent"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-ghost-on-ink-hover:
    backgroundColor: "{colors.on-ink}"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
    height: "46px"
  chip-selected-rice:
    backgroundColor: "{colors.rice-vermilion}"
    textColor: "{colors.plate}"
  chip-selected-pasta:
    backgroundColor: "{colors.pasta-chrome-yellow}"
    textColor: "{colors.ink}"
  stepper-input:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.numeral-answer}"
    rounded: "{rounded.sm}"
    height: "52px"
  answer-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  calc-plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.lg}"
    padding: "28px"
  calc-result:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.md}"
    padding: "22px"
  lid:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.rice-vermilion}"
    size: "84px"
  lid-large:
    size: "116px"
  lid-link:
    size: "60px"
  tool-tag-rice:
    backgroundColor: "{colors.rice-vermilion}"
    textColor: "{colors.plate}"
    rounded: "{rounded.pill}"
    padding: "9px 14px 8px"
  link-pill:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "44px"
  site-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  ad-slot:
    backgroundColor: "{colors.steel-2}"
    rounded: "{rounded.sm}"
    height: "300px"
---

# Design System: ThaliMeter

## Overview

**Creative North Star: "The Painted Tiffin Lid"**

ThaliMeter reads portion planning as a coding system, the way Mumbai tiffin carriers are marked with painted codes on their steel lids. The ground is pale brushed steel, the working surfaces are plain white plates, and the ink is a near-black. On top of that neutral metal sit four painted code colours, one per tool, and a single signature mark: a steel-rimmed lid with a number painted in its well. Every headcount, every answer hero and the live calculator result carry that lid, so the number you came for is legible at arm's length with a phone in one hand.

The voice is a sign-painter's, not a magazine's. Headings and numerals are set in a heavy condensed face in capitals; everything you actually read is a plain, sturdy sans. Density is moderate: the answer comes first in large numerals, both unit systems side by side, then the table, then the calculator plate. Surfaces are flat steel and white; depth is one soft lift reserved for the working calculator and the phone answer bar.

The build replaced a cream-paper, serif-display, emoji-card, terracotta-accent site. That category default is the confirmed rejection.

**Key Characteristics:**
- Brushed-steel ground, white plates, near-black ink; colour only as painted tool codes.
- One code colour per tool, set by `data-tool` on the body or a section, never mixed inside one tool.
- The painted lid is the signature and appears wherever a headcount or answer is shown.
- Condensed uppercase display for headings and numbers; plain sans for every sentence; tabular figures everywhere.
- Flat surfaces with one soft lift; heavy 2px ink rules carry structure.

## Colors

A cool metal neutral system with four saturated painted codes that each belong to exactly one tool.

### Primary
- **Rice Vermilion** (rice-vermilion): the rice tool's code and the default `--tool`. Lid wells, selected chips, the active nav underline, link underlines, list markers on rice pages, and the logo's gauge stroke. Also the house accent wherever no tool is set (footer link hover).

### Secondary
- **Ultramarine** (water-ultramarine): the water-ratio tool's code. Also the site-wide focus ring on every page regardless of tool.
- **Chrome Yellow** (pasta-chrome-yellow): the pasta tool's code as a fill. Text set on it is ink, never white (`--on-tool` switches to ink). As a text or lid-number colour it is replaced by **Deep Mustard** (pasta-ink), because the yellow itself fails contrast on white.
- **Signal Green** (meat-signal-green): the meat tool's code.

### Tertiary
- **Bright Ultramarine** (water-on-ink) and **Bright Signal Green** (meat-on-ink): lifted versions of the water and meat codes used only on the ink header nav, where the base codes are too dark to read against near-black. Rice and pasta use their base codes there.

### Neutral
- **Brushed Steel** (steel): page background, table header band, stepper buttons, the selected table row.
- **Steel Shade** (steel-2): stepper hover, table hairlines, the reserved ad well.
- **Steel Rim** (steel-3): row dividers, chip and link-pill borders, FAQ dividers.
- **White Plate** (plate): answer plate, calculator plate, tables, chips, lid wells.
- **Ink** (ink): text, the header and footer shell, the calculator result panel, primary buttons, 2px structural rules, the lid rim.
- **Ink Soft** (ink-2): secondary prose, lede and answer notes.
- **Muted Ink** (muted): labels, breadcrumbs, table notes, ad label.
- **On-Ink** (on-ink) and **On-Ink Muted** (on-ink-muted): text and secondary text on ink surfaces.
- **Ink Rule** (ink-rule): hairlines inside the ink result panel.

### Named Rules
**The One Code Per Tool Rule.** Each tool owns one painted colour (rice vermilion, water ultramarine, pasta chrome yellow, meat signal green). A surface sets its tool with `data-tool`, and every accent on it (lid ring and number, selected chip, link underline, list marker, FAQ plus) follows `--tool` / `--tool-ink`. Never hard-code a second tool's colour inside a tool's surface; the only place all four appear together is navigation and the brand mark. The one cross-tool exception is the ultramarine focus ring, which stays constant so keyboard focus looks the same everywhere.

**The Yellow Carries Ink Rule.** Chrome yellow is a fill colour only. Anything set on it is ink; any yellow-coded text or numeral uses Deep Mustard.

**The Steel Is Not Paper Rule.** Backgrounds are cool steel grey and white. No cream, beige or warm paper tones.

## Typography

**Display Font:** Big Shoulders Variable (with Arial Narrow, sans-serif)
**Body Font:** Public Sans Variable (with system-ui, sans-serif)

**Character:** A condensed sign-painter's face for anything that should read like a painted code, paired with a neutral public-service sans for every word you read. Body text runs with tabular numerals so figures line up.

### Hierarchy
- **Display** (800, clamp(42px, 7vw, 76px), 0.95, uppercase): the H1 question or statement on every page. Balanced wrapping.
- **Headline** (800, clamp(30px, 4vw, 40px), 0.95, uppercase): section H2s. Footer column heads use the same face at 20px with 0.04em tracking.
- **Numeral, result** (800, clamp(56px, 8vw, 84px), 0.95): the live answer inside the ink result panel.
- **Numeral, answer** (800, clamp(38px, 5vw, 52px), 1): the cups figures on the answer plate; stepper and amount inputs use the same face at 32px; stats at 26px.
- **Title** (Public Sans 700, 19px, 1.3): H3s, tool-row names.
- **Body** (Public Sans 400, 17px, 1.6): all prose; hero intro at 19px in Ink Soft; prose capped at 62 to 70ch.
- **Label** (Public Sans 700, 15px): field labels, figure labels, the result label above the live number, stat labels (14px). Sentence case.

### Named Rules
**The Numbers Are Painted Rule.** Every answer quantity a visitor came for is set in Big Shoulders 800. Every sentence, label and table cell is Public Sans. Do not set running text in the display face or answer numerals in the sans.

**The Sentence-Case Labels Rule.** Uppercase belongs to Big Shoulders headings, tool tags and the logo wordmark. Labels in Public Sans stay sentence case and untracked; the one exception is the "Advertisement" label (12px, 0.08em, uppercase), which exists for ad disclosure.

## Layout

A single centred column, max 1140px, with a 20px gutter (16px under 520px). Pages are vertical stacks of sections 64px apart; an H2 is followed by its content 18px below. The footer sits 88px below the last section.

Page order on answer pages (rice, pasta, meat for N): breadcrumbs, then the hero (H1 and answer plate with a large lid, then a note paragraph), then the data table, then the calculator section, then the ad slot, then FAQ, then the headcount lids and related links. Tool pages lead with the calculator plate inside the desktop fold.

The calculator plate is one column on phones and two columns from 900px (inputs 1.05fr, result 1fr), with the ink result panel sticky 16px from the top. Below 900px the result panel is replaced in view by a sticky pill bar 12px above the bottom edge that keeps the live answer visible while inputs change. Tool rows collapse from a three-column grid (130px tag, text, arrow) to two columns at 640px. Under 520px the table drops its water and cooked columns, the answer plate's lid shrinks to 64px and headcount lids centre.

**The Answer First Rule.** The answer plate (or, on tool pages, the calculator with its result) is the first thing under the H1. Nothing, including an ad, sits between the H1 and the answer.

## Elevation & Depth

Flat by default. Depth comes from tone (white plate on steel, ink panel on white) and from 2px ink rules, not shadows. One shadow exists: the soft lift, used on the calculator plate and on the phone sticky answer bar, both of which are working surfaces that sit above the page.

The lid's inner coloured ring is drawn with an inset box-shadow, but it is paint, not elevation.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 1px 2px rgba(22,25,27,.08), 0 14px 32px -14px rgba(22,25,27,.28)`): the calculator plate and the phone answer bar only.

### Named Rules
**The One Lift Rule.** Only the live calculator and its phone answer bar are lifted. Answer plates, tables, chips and cards stay flat with borders.

## Shapes

Soft but sturdy. Three radii: 10px for inputs, chips, stepper and the ad well; 16px for tables and the ink result panel; 22px for the answer and calculator plates. Pills (999px) for buttons, tool tags, link pills, the unit toggle and the phone answer bar. The lid and nav dots are perfect circles. Painted strokes (nav underline, logo gauge) are round-capped.

Structure lines are 2px ink (answer plate border, stepper and amount inputs, table header rule, top rule of tool rows and FAQ); separators are 1px or 1.5px steel.

## Components

### Buttons
Pill-shaped and plain; they sit on the ink result panel.
- **Shape:** pill (999px), 46px tall, 0 20px padding, 700 15px Public Sans.
- **Primary:** ink fill, on-ink text, 2px ink border. Hover to Ink Soft.
- **Ghost on ink:** transparent with an on-ink-muted border; hover inverts to on-ink fill and ink text. Used for the copy action in the result panel.
- **Focus:** the global 3px ultramarine ring, 2px offset.

### Chips
- **Style:** white plate, 1.5px steel-rim border, 10px radius, 46px min height, 600 15px. Hover darkens the border to ink.
- **State:** `aria-pressed="true"` fills with the tool code, border matches, text switches to `--on-tool` (white, or ink on pasta) and 700. Wide choice chips show a 13px muted hint under the label.

### Inputs / Fields
- **Stepper:** 2px ink frame, 10px radius, 52px steel minus/plus buttons either side of a centred 32px Big Shoulders number. Pressing a button flashes it in the tool colour.
- **Amount:** the same 2px ink frame and 32px numeral, beside a pill unit toggle (ink fill on the selected unit; inverted on ink panels).
- **Checkboxes:** native, 22px, ink accent colour, 44px row height.
- **Labels:** 700 15px sentence case; optional hint in 400 muted.

### Answer Plate
White plate, 2px ink border, 22px radius, 20px 24px padding, max 860px. A large lid sits left of a grid of figures, each a 15px muted label, a Big Shoulders numeral and a 15px sub-line giving grams and pounds. Both unit systems are always shown.

### Calculator
White plate with the soft lift, 22px radius. Inputs on the left; on the right an ink result panel (16px radius) with a sentence-case result label, a unit toggle, the huge numeral with a live lid, a sub-line, a two-column stat grid ruled in ink hairlines, a note and the copy button.

### Navigation
- **Header:** ink shell; logo mark (36px) and Big Shoulders wordmark (26px, uppercase, 0.03em) left, tool links right.
- **Tool links:** 700 15px on-ink, 48px min height, each preceded by a 10px dot in that tool's code. A 4px round-capped underline in the same code wipes in from the left on hover (0.35s, ease-out-expo) and stays on the current page.
- **Footer:** ink shell, Big Shoulders 20px column heads, on-ink-muted links that turn white with a vermilion underline on hover.
- **Breadcrumbs:** 15px muted, above the H1.

### Tool Rows
The tool index on home and 404: rows, not icon cards. Each row has a pill tool tag painted in its code (Big Shoulders 18px uppercase), the tool name and blurb, and an arrow that nudges 4px right on hover while the row lightens to white. 2px ink rule on top, steel-rim dividers between.

### Link Pills
Related pages and meat occasions: white pills with a 1.5px steel-rim border, 44px min height, 700 15px. Hover darkens the border to ink.

### FAQ
Native disclosure rows, 2px ink rule on top, steel-rim dividers, 18px bold questions, a plus mask in `--tool-ink` that rotates 45 degrees when open.

### Ad Slot
- **Placement:** only between content sections. Never inside a calculator, never between the H1 and the answer, never in the header or nav. On answer pages it follows the calculator section; on tool pages and home it follows the calculator or tool index.
- **Size:** 48px margin top and bottom, 300px reserved height (280px for the ad well) so the page does not shift when the ad loads.
- **Label:** a centred "Advertisement" label above the slot, and the wrapper is an `aside` labelled "Advertisement".
- **Fill:** steel-2 well, 10px radius, until the ad paints. Renders nothing when no AdSense client or slot is configured.

### The Lid (Signature Component)
A painted tiffin lid: a white circular well with an ink rim (6% of its size), an inner ring painted in `--tool` (7%), and the number painted in `--tool-ink` in Big Shoulders 800 at 44% of its size. One component with set sizes: 116px on answer heroes, 84px default, 72px in the result panel (rim lightened to on-ink-muted on ink), 64px on phone heroes, 60px as headcount links, 40px in the phone answer bar.

- **Headcount links:** a row of 60px lids each captioned "people". Hover lifts 3px and tilts minus 8 degrees, rim turning to the tool colour. The current page's lid is filled solid in the tool colour with `--on-tool` text.
- **Live result:** when the headcount changes the lid re-stamps (scale 1.18 and minus 14 degrees easing to rest over 0.45s).
- **Accessibility:** carries `role="img"` and a label such as "8 people" when it stands alone.

### Logo
The ThaliMeter mark is the same lid read as a meter: a steel rim with an ink stroke, a white well, a round-capped rice-vermilion gauge arc with an ink needle and hub, and three small bowls below in ultramarine, chrome yellow and signal green. Source: `scripts/brand/mark.svg`, identical in `public/favicon.svg` and inlined in the header.
- In the header it sits at 36px beside the uppercase Big Shoulders wordmark, on the ink shell.
- On the social card it pairs with the wordmark at 72px and repeats as a large cropped lid on the right.
- Theme colour is ink (#16191b), app background is steel.
- Use the mark as drawn. Do not recolour the gauge per tool; the gauge is always vermilion and the three bowls always carry the other three codes.

## Do's and Don'ts

### Do:
- **Do** set `data-tool` (rice, water, pasta, meat) on the body or a section and colour accents through `--tool` and `--tool-ink`.
- **Do** put the answer, in cups and grams (and pounds where relevant), directly under the H1 in an answer plate with a lid.
- **Do** use the lid for every headcount link and live result; current page fills solid in the tool colour.
- **Do** set answer numerals in Big Shoulders 800 and every sentence in Public Sans with tabular figures.
- **Do** keep touch targets at least 44px (chips 46px, nav 48px, stepper buttons 52px).
- **Do** place ad slots only between content sections, labelled "Advertisement", with 300px reserved height.
- **Do** honour reduced motion: every transition and the lid stamp switch off.

### Don't:
- **Don't** use cream or warm paper backgrounds, serif display type, emoji icon cards or a terracotta accent.
- **Don't** put an ad inside a calculator, above the answer, or between the H1 and the answer plate.
- **Don't** set white text on chrome yellow, or use chrome yellow as a text colour; use ink on it and Deep Mustard for yellow-coded text.
- **Don't** mix two tool codes inside one tool's surface.
- **Don't** add shadows beyond the single lift on the calculator plate and phone answer bar.
- **Don't** lay out the tool index as icon cards; it is rows with painted tags.
- **Don't** recolour the logo gauge or bowls.
