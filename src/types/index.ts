import type {
  FlattenSimpleInterpolation,
  CSSProperties,
} from 'styled-components';

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

export type TPseudoProperty =
  | ':after'
  | ':before'
  | ':active'
  | ':hover'
  | ':disabled';
export type TCssProperty = keyof CSSProperties;

export interface ITestStyleSuite {
  /**
   * name of test suite
   */
  name: string;
  /** ```ts
   * const story = <ButtonIdle />;
   * ```
   **/
  story: JSX.Element;
  /** ```ts
   * // which component to test `themes` on
   * const styled = styled.div``
   * ```
   **/
  styled: string;
  /** ```ts
   * // array of mixins that should exist on component
   * css`
   *    display: flex;
   *    :after { color: blue; }
   * `
   * ```
   */
  themes: FlattenSimpleInterpolation[];
  /**
   * prints
   * - the rendered component `html`
   * - all checked `css` rules
   */
  verbose?: boolean;
}
