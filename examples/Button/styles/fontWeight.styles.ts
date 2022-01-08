import { css } from 'styled-components';

// types
import type { IStyledTheme } from 'src/types';
import { IButtonProps } from '../Button.types';

type TStyledKey = IButtonProps['fontWeight'];

const normal = css`
  font-weight: 300;
`;

const bold = css`
  font-weight: 500;
`;

export const fontWeightStyles: IStyledTheme<TStyledKey> = {
  normal,
  bold,
};
