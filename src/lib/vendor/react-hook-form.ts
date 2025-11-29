import { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { ResolverResult } from './zod-resolver';

export interface FieldError {
  message?: string;
}

export interface FormState<T> {
  errors: Partial<Record<keyof T & string, FieldError>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export type SubmitHandler<T> = (values: T) => void | Promise<void>;

export interface UseFormOptions<T> {
  defaultValues?: Partial<T>;
  resolver?: (values: Partial<T>) => Promise<ResolverResult<T>> | ResolverResult<T>;
}

export interface RegisterResult {
  name: string;
  value?: unknown;
  onChange: (event: { target: { value: unknown; type?: string; checked?: boolean } } | unknown) => void;
}

export interface UseFormReturn<T> {
  register: (name: keyof T & string) => RegisterResult;
  handleSubmit: (
    handler: SubmitHandler<T>
  ) => (event?: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: (values?: Partial<T>) => void;
  setValue: (name: keyof T & string, value: unknown) => void;
  watch: (name: keyof T & string) => unknown;
  formState: FormState<T>;
}

export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T> = {}
): UseFormReturn<T> {
  const [values, setValues] = useState<Partial<T>>(options.defaultValues || {});
  const [errors, setErrors] = useState<Partial<Record<keyof T & string, FieldError>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: keyof T & string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const register = useCallback(
    (name: keyof T & string): RegisterResult => ({
      name,
      value: values[name],
      onChange: (event) => {
        const target = (event as { target?: { value: unknown; type?: string; checked?: boolean } }).target;
        if (target) {
          const nextValue = target.type === 'checkbox' ? target.checked : target.value;
          setValue(name, nextValue);
          return;
        }

        setValue(name, event as unknown);
      },
    }),
    [setValue, values]
  );

  const watch = useCallback((name: keyof T & string) => values[name], [values]);

  const reset = useCallback((nextValues?: Partial<T>) => {
    setValues(nextValues || {});
    setErrors({});
  }, []);

  const formState: FormState<T> = useMemo(
    () => ({
      errors,
      isSubmitting,
      isValid: Object.keys(errors).length === 0,
    }),
    [errors, isSubmitting]
  );

  const handleSubmit = useCallback(
    (handler: SubmitHandler<T>) =>
      async (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const resolverResult = options.resolver
          ? await options.resolver(values)
          : ({ values, errors: {} as Record<string, FieldError> } as ResolverResult<T>);

        if (resolverResult.errors && Object.keys(resolverResult.errors).length > 0) {
          setErrors(resolverResult.errors as Partial<Record<keyof T & string, FieldError>>);
          setIsSubmitting(false);
          return;
        }

        await handler((resolverResult.values as T) || (values as T));
        setIsSubmitting(false);
      },
    [options, values]
  );

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState,
  };
}
