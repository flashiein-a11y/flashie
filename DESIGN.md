# Design Brief

## Direction

**Warm Food Discovery** — An inviting, approachable food delivery interface that prioritizes appetite appeal and effortless ordering through warm, food-centric visual language.

## Tone

Friendly and approachable with premium polish—warm, welcoming tones and rounded geometry create a consumer-friendly surface, while careful shadow depth and card elevation maintain sophistication and visual hierarchy.

## Differentiation

Logo-forward header design with prominent app branding paired with warm card-based restaurant discovery surfaces featuring bold food imagery and organic spacing patterns that encourage browsing and discovery.

## Color Palette

| Token      | OKLCH         | Role                               |
| ---------- | ------------- | ---------------------------------- |
| background | 0.975 0.008 75| Warm cream, appetite-invoking base |
| foreground | 0.22 0.025 50 | Deep warm brown, text              |
| card       | 1.0 0.004 75  | Pure white, restaurant imagery     |
| primary    | 0.62 0.22 55  | Warm orange/amber, CTA actions     |
| accent     | 0.58 0.18 155 | Fresh green, health/freshness      |
| muted      | 0.92 0.01 75  | Subtle beige, secondary surfaces   |

## Typography

- Display: Plus Jakarta Sans — warm, friendly, rounded geometry for headings
- Body: Plus Jakarta Sans — clean, approachable sans-serif for UI and content
- Scale: Hero `text-4xl md:text-6xl font-bold`, headings `text-2xl font-bold`, labels `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Surface hierarchy through layered shadows and card backgrounds: subtle card shadow (2px/8px rgba) for resting state, elevated shadow (4px/16px rgba) for interaction, creating visual differentiation between content and actions without flattening.

## Structural Zones

| Zone    | Background             | Border               | Notes                                |
| ------- | ---------------------- | -------------------- | ------------------------------------ |
| Header  | `bg-card` with logo    | `border-b border-border` | Logo-forward, search bar center, user menu right |
| Content | `bg-background`        | —                    | Warm cream base with card grid      |
| Sections| `bg-card` cards        | None                 | Rounded (12-16px), `shadow-card`    |
| Footer  | `bg-muted/40`          | `border-t border-border` | Spacious, neutral background        |

## Spacing & Rhythm

Spacious, breathing layout with 24px section gaps, 16px content grouping, 8px micro-spacing—rounded corners (12-16px) and generous padding on cards create an approachable, unhurried rhythm.

## Component Patterns

- Buttons: Warm orange primary with white text, rounded-full for pills, rounded-lg for standard; hover applies shadow-elevated
- Cards: Rounded-lg with `bg-card`, `shadow-card`, spacious 20px padding; restaurant imagery fills top section
- Badges: Fresh green accent for ratings/health labels, rounded-full, compact padding

## Motion

- Entrance: Subtle fade-in (0.3s ease-out) on card load
- Hover: `shadow-elevated` transition on interactive cards with smooth color shift
- Decorative: None; smooth interactions only to maintain professional tone

## Constraints

- No gradients or decorative animation
- Logo must remain visible and prominent in header
- Card radius minimum 12px for warmth and approachability
- All text uses Plus Jakarta Sans; no system font fallbacks
- Food imagery must have breathing room (padding/margin) around content

## Signature Detail

Logo-forward header design with warm sidebar or nav drawer available on mobile, creating immediate brand recognition and familiar e-commerce navigation patterns while maintaining premium visual hierarchy.
