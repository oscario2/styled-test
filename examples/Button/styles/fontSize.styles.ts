import { css } from 'styled-components';

// types
import type { IStyledTheme } from 'src/types';
import { IButtonProps } from '../Button.types';

type TStyledKey = IButtonProps['fontSize'];

const base = css`
  line-height: 5px;
`;

const small = css`
  ${base}
  font-size: 10pt;
`;

const medium = css`
  ${base}
  font-size: 12pt;
`;

const large = css`
  ${base}
  font-size: 14pt;
`;

export const fontSizeStyles: IStyledTheme<TStyledKey> = {
  small,
  medium,
  large,
};
