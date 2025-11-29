export interface ZodIssue {
  path: (string | number)[];
  message: string;
}

export class ZodError extends Error {
  issues: ZodIssue[];

  constructor(issues: ZodIssue[]) {
    super(issues[0]?.message || 'Validation error');
    this.issues = issues;
  }
}

export type SafeParseSuccess<T> = { success: true; data: T };
export type SafeParseError = { success: false; error: ZodError };
export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseError;

export interface BaseSchema<T> {
  parse: (data: unknown) => T;
  safeParse: (data: unknown) => SafeParseReturnType<T>;
  optional: () => BaseSchema<T | undefined>;
  refine: (check: (value: T) => boolean, message?: string) => BaseSchema<T>;
}

function buildResult<T>(fn: () => T): SafeParseReturnType<T> {
  try {
    return { success: true, data: fn() };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

function optionalWrapper<T>(schema: BaseSchema<T>): BaseSchema<T | undefined> {
  return {
    parse(data) {
      if (data === undefined || data === null) return undefined;
      return schema.parse(data);
    },
    safeParse(data) {
      return buildResult(() => this.parse(data));
    },
    optional() {
      return optionalWrapper(schema);
    },
    refine(check, message) {
      return optionalWrapper({
        ...schema,
        parse(input) {
          const parsed = schema.parse(input);
          if (!check(parsed)) {
            throw new ZodError([{ path: [], message: message || 'Invalid value' }]);
          }
          return parsed;
        },
      });
    },
  };
}

export function string() {
  const checks: ((value: string) => string | null)[] = [];

  const schema: BaseSchema<string> & {
    min: (len: number, message?: string) => typeof schema;
    nonempty: (message?: string) => typeof schema;
    regex: (pattern: RegExp, message?: string) => typeof schema;
  } = {
    parse(data) {
      const value = typeof data === 'string' ? data : '';
      const issues: ZodIssue[] = [];

      checks.forEach((check) => {
        const message = check(value);
        if (message) {
          issues.push({ path: [], message });
        }
      });

      if (issues.length) {
        throw new ZodError(issues);
      }

      return value;
    },
    safeParse(data) {
      return buildResult(() => this.parse(data));
    },
    optional() {
      return optionalWrapper(schema);
    },
    refine(check, message) {
      checks.push((value) => (check(value) ? null : message || 'Invalid value'));
      return schema;
    },
    min(len, message) {
      checks.push((value) => (value.length < len ? message || `Must be at least ${len} characters` : null));
      return schema;
    },
    nonempty(message) {
      checks.push((value) => (value.trim().length === 0 ? message || 'Required' : null));
      return schema;
    },
    regex(pattern, message) {
      checks.push((value) => (pattern.test(value) ? null : message || 'Invalid format'));
      return schema;
    },
  };

  return schema;
}

export function boolean() {
  const checks: ((value: boolean) => string | null)[] = [];

  const schema: BaseSchema<boolean> & {
    default: (value: boolean) => typeof schema;
  } = {
    parse(data) {
      const value = typeof data === 'boolean' ? data : false;
      const issues: ZodIssue[] = [];

      checks.forEach((check) => {
        const message = check(value);
        if (message) {
          issues.push({ path: [], message });
        }
      });

      if (issues.length) {
        throw new ZodError(issues);
      }

      return value;
    },
    safeParse(data) {
      return buildResult(() => this.parse(data));
    },
    optional() {
      return optionalWrapper(schema);
    },
    refine(check, message) {
      checks.push((value) => (check(value) ? null : message || 'Invalid value'));
      return schema;
    },
    default() {
      return schema;
    },
  };

  return schema;
}

export function object<Shape extends Record<string, BaseSchema<unknown>>>(shape: Shape) {
  const schema: BaseSchema<{ [K in keyof Shape]: Shape[K] extends BaseSchema<infer U> ? U : never }> = {
    parse(data) {
      const value = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};
      const parsed: Record<string, unknown> = {};
      const issues: ZodIssue[] = [];

      Object.entries(shape).forEach(([key, fieldSchema]) => {
        const result = fieldSchema.safeParse(value[key]);
        if (result.success) {
          parsed[key] = result.data;
        } else {
          result.error.issues.forEach((issue) => {
            issues.push({ path: [key, ...issue.path], message: issue.message });
          });
        }
      });

      if (issues.length) {
        throw new ZodError(issues);
      }

      return parsed as { [K in keyof Shape]: Shape[K] extends BaseSchema<infer U> ? U : never };
    },
    safeParse(data) {
      return buildResult(() => this.parse(data));
    },
    optional() {
      return optionalWrapper(schema);
    },
    refine(check, message) {
      return {
        ...schema,
        parse(input) {
          const parsed = schema.parse(input);
          if (!check(parsed)) {
            throw new ZodError([{ path: [], message: message || 'Invalid value' }]);
          }
          return parsed;
        },
        safeParse(input) {
          return buildResult(() => this.parse(input));
        },
        optional() {
          return optionalWrapper(schema);
        },
      };
    },
  };

  return schema;
}

export const z = { string, boolean, object };

export type infer<T extends BaseSchema<unknown>> = T extends BaseSchema<infer U> ? U : never;
