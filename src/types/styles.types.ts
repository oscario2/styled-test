import type { FlattenSimpleInterpolation } from 'styled-components';

/**
 * ```ts
type TStyledKey = IComponentProps['color']; // 'black' | 'white'

const black = css`
    background: #000;
    color: #fff;
`;

const white = css`
    background: #fff;
    color: #000;
`;

export const colorStyles: IStyledTheme<TStyledKey> = {
    black,
    white,
};
 * ```
 */
export type IStyledTheme<T extends string> = Record<
  T,
  FlattenSimpleInterpolation
>;
