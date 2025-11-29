import { tokens } from './tokens';

export type ComponentName =
  | 'button'
  | 'input'
  | 'card'
  | 'surface'
  | 'listItem'
  | 'chip'
  | 'tabBar'
  | 'navBar';

export type ComponentSpec = Record<string, any>;

export const componentTokens: Record<ComponentName, ComponentSpec> = {
  button: {
    height: { md: 48, lg: 54 },
    paddingX: tokens.spacing.lg,
    gap: tokens.spacing.xs,
    radius: tokens.radius.pill,
    text: tokens.typography.labelLarge,
    variants: {
      filled: {
        container: tokens.color.primary,
        content: tokens.color.onPrimary,
      },
      tonal: {
        container: tokens.color.surfaceContainerHigh,
        content: tokens.color.onSurface,
      },
      outlined: {
        container: 'transparent',
        content: tokens.color.onSurface,
        border: tokens.color.outline,
      },
      text: {
        container: 'transparent',
        content: tokens.color.tertiary,
      },
      ghost: {
        container: tokens.color.surface,
        content: tokens.color.onSurface,
        border: tokens.color.outlineVariant,
      },
    },
  },
  input: {
    height: 56,
    radius: tokens.radius.md,
    paddingX: tokens.spacing.lg,
    paddingY: tokens.spacing.sm,
    text: tokens.typography.bodyLarge,
    background: tokens.color.surfaceContainer,
    border: tokens.color.outlineVariant,
    placeholder: tokens.color.muted,
    focusBorder: tokens.color.primary,
    errorBorder: tokens.color.error,
  },
  card: {
    radius: tokens.radius.xl,
    padding: tokens.spacing.lg,
    background: tokens.color.surfaceContainer,
    elevatedBackground: tokens.color.surfaceContainerHigh,
    border: tokens.color.outlineVariant,
  },
  surface: {
    page: tokens.color.background,
    container: tokens.color.surfaceContainer,
    overlay: tokens.color.scrim,
  },
  listItem: {
    radius: tokens.radius.lg,
    paddingX: tokens.spacing.lg,
    paddingY: tokens.spacing.md,
    minHeight: 64,
    divider: tokens.color.outlineVariant,
  },
  chip: {
    radius: tokens.radius.pill,
    paddingX: tokens.spacing.md,
    paddingY: tokens.spacing.xs,
    container: tokens.color.surfaceContainerHigh,
    content: tokens.color.onSurface,
  },
  tabBar: {
    height: 64,
    background: tokens.color.surface,
    active: tokens.color.onSurface,
    inactive: tokens.color.muted,
    border: tokens.color.outlineVariant,
  },
  navBar: {
    height: 56,
    background: tokens.color.surface,
    tint: tokens.color.onSurface,
    shadow: tokens.elevation.level1,
  },
};

export function requireComponentSpec(name: ComponentName): ComponentSpec {
  const spec = componentTokens[name];
  if (!spec) {
    throw new Error(
      `[design-system] Missing component tokens for "${name}". Add a spec in mobile/design-system/components.ts before using it.`,
    );
  }
  return spec;
}
