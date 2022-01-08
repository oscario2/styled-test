import type { FlattenSimpleInterpolation } from 'styled-components';

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
   * // which styled component to test `themes` on
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
