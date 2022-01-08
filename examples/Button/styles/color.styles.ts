import { css } from 'styled-components';

// types
import type { IStyledTheme } from 'src/types';
import { IButtonProps } from '../Button.types';

type TStyledKey = IButtonProps['color'];

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
