import type { BaseSchema } from './zod';

export interface ResolverResult<T> {
  values: Partial<T>;
  errors: Record<string, { message?: string }>;
}

export function zodResolver<T>(schema: BaseSchema<T>) {
  return async (values: Partial<T>): Promise<ResolverResult<T>> => {
    const parsed = schema.safeParse(values);

    if (parsed.success) {
      return { values: parsed.data, errors: {} };
    }

    const errors: Record<string, { message?: string }> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path.join('.') || (issue.path[0]?.toString() ?? 'form');
      errors[key] = { message: issue.message };
    });

    return { values: {}, errors };
  };
}
