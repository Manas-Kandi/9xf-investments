## 9xf mobile design system (darkest Material)

Entry points:
- `tokens.ts` — Material darkest color roles, spacing, radius, typography, motion, elevation.
- `components.ts` — component-level specs (button, input, card, list, tab bar). If a spec is missing, add it here.
- `provider.tsx` — context + hooks. Use `useComponentTokens('<component>')` to source styles instead of inlining.

How to use:
1) Wrap screens in `DesignSystemProvider` (done in `app/_layout.tsx`).
2) In components, pull tokens from hooks: e.g. `const button = useComponentTokens('button');`.
3) If a new UI primitive needs tokens, define it in `components.ts` first. Hooks will throw if you try to use an unregistered component so you build the tokens before UI.

Keep changes here concise; future agents should only need these files to update theming.
