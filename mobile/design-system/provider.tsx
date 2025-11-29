import React, { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import { tokens, type Tokens } from './tokens';
import { componentTokens, type ComponentName, requireComponentSpec } from './components';

interface DesignSystemValue {
  tokens: Tokens;
  components: typeof componentTokens;
}

const DesignSystemContext = createContext<DesignSystemValue>({
  tokens,
  components: componentTokens,
});

export function DesignSystemProvider({ children }: PropsWithChildren) {
  return (
    <DesignSystemContext.Provider value={{ tokens, components: componentTokens }}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem(): DesignSystemValue {
  return useContext(DesignSystemContext);
}

export function useComponentTokens(name: ComponentName) {
  const { components } = useDesignSystem();
  const spec = components[name];

  if (!spec) {
    throw new Error(
      `[design-system] "${name}" is not registered. Add it to mobile/design-system/components.ts so future contributors source tokens instead of inventing new styles.`,
    );
  }

  return spec;
}

export function ensureComponentTokens(name: ComponentName) {
  return requireComponentSpec(name);
}
