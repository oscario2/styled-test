import type { CSSProperties } from 'styled-components';

export type TPseudoProperty =
  | ':after'
  | ':before'
  | ':active'
  | ':hover'
  | ':disabled';

export type TCssProperty = keyof CSSProperties;
