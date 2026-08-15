# Intent Witness Reviewer Reference

## Intent alignment

Ask what the user should understand or accomplish within the first moments of the screen. Check whether the strongest visual and interaction hierarchy supports that job.

Potential failures:

- aggregate metrics outrank live/primary workflow;
- decorative content outranks actionable state;
- primary action appears below secondary summaries;
- page title/copy describes a category rather than the user's task.

## Information architecture

Inspect whether grouping, naming, and navigation reflect user mental models.

Potential failures:

- Dashboard/Overview/Insights/Analytics/Activity overlap;
- implementation/schema concepts become top-level user concepts;
- the same information appears in multiple modules/routes;
- configuration exposes low-level parameters instead of meaningful user choices;
- semantically different objects are compressed into one generic component pattern.

## Composition and hierarchy

Potential failures:

- many equal-weight boxes despite unequal semantic priority;
- container chrome becomes the dominant visual carrier;
- critical state cannot be distinguished without reading labels;
- repeated grid rhythm makes every section feel interchangeable;
- hierarchy is shallow relative to the number of semantic levels.

Do not conclude “too many cards” from count alone. Explain what the card treatment does to hierarchy/grouping.

## Interaction

Potential failures:

- every action uses a modal regardless of risk/complexity;
- common action requires unnecessary navigation depth;
- destructive/safe actions are visually equivalent;
- important state transitions have weak feedback;
- a backend setting is exposed rather than automated/defaulted;
- mobile retains pointer/desktop interaction assumptions.

## Product specificity

Thought experiment:

> If branding and noun labels disappeared, would structure/interaction still reveal the product's domain?

Low specificity is only a finding if product-specific objects/jobs are being suppressed or generic structure causes weaker usability.

## Responsive priority

Check whether mobile/narrow layout is **reprioritized**, not merely stacked.

Potential failures:

- critical alert moves below stats because of source order;
- comparison table simply overflows or becomes unreadable;
- primary action becomes hidden in generic overflow menu;
- desktop navigation collapse loses key task paths.

## Performative design

Potential signals include category-signaling glow/gradient/prompt/AI theater. Ask whether high-salience elements demonstrate capability, state, or action. Do not ban expressive design.

## Copy and semantics

Potential failures:

- generic “Welcome back” filler dominates first viewport;
- vague verbs like Manage/View Details where domain-specific action exists;
- marketing copy inside operational surfaces;
- multiple navigation labels with indistinct meanings.

## Positive evidence

The reviewer may mention what is working, especially when it explains why a common convention should remain. Positive evidence reduces unnecessary redesign.
