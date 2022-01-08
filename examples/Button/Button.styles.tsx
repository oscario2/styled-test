import styled from 'styled-components';

// styles
import { fontSizeStyles, fontWeightStyles, colorStyles } from './styles';

// types
import type { IButtonProps } from './Button.types';

/**
 * @implementation
 * - logic of which `theme` or `mixin` to render
 */

/** dynamic */
const Button = styled.button<IButtonProps>`
  ${({ fontSize }) => fontSizeStyles[fontSize]};
  ${({ fontWeight }) => fontWeightStyles[fontWeight]};
  ${({ color }) => colorStyles[color]};
`;

export const Styled = {
  Button,
};

/** static, immutable */
const FlexContainer = styled.div`
  display: flex;
`;

export const Layout = {
  FlexContainer,
};
