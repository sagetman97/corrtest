type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type LastOf<T> = UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R ? R : never
type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = N extends true ? [] : [...UnionToTuple<Exclude<T, L>>, L]

export type CreatePropsTypeWithGuard<TProps> = {
  keys: UnionToTuple<keyof TProps>
  guard(prop: string): prop is string & keyof TProps
}

type PropsConfig<T> = Record<keyof T, boolean>

export function createPropsTypeWithGuard<T extends Record<string, unknown>>(config: Partial<PropsConfig<T>>): CreatePropsTypeWithGuard<T> {
  const keys = Object.keys(config) as UnionToTuple<keyof T>

  function guard(prop: string): prop is string & keyof T {
    return keys.includes(prop as never)
  }

  return {
    keys,
    guard,
  }
}

export type SplitProps<TProps extends Record<string, unknown>, TGuard extends (prop: string) => prop is string> = TGuard extends (
  prop: string
) => prop is string & infer TReturns
  ? {
      [K in keyof TProps as K extends TReturns ? K : never]: TProps[K]
    }
  : never

export function splitProps<TProps extends Record<string, unknown>, TGuard extends (prop: string) => prop is string>(
  props: TProps,
  guard: TGuard
): SplitProps<TProps, TGuard> {
  return Object.fromEntries(Object.entries(props).filter(([key]) => guard(key))) as SplitProps<TProps, TGuard>
}

export type RequiredConfig<T> = { [K in keyof T]-?: true }
