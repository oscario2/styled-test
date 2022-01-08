import type { FlattenSimpleInterpolation } from 'styled-components';

export type IStyledTheme<T extends string> = Record<
  T,
  FlattenSimpleInterpolation
>;
