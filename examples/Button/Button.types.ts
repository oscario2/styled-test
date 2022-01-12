import { DOMAttributes } from 'react';

type TButtonEvents = Pick<
  DOMAttributes<HTMLButtonElement>,
  'onClick' | 'onMouseEnter'
>;

export interface IButtonProps extends TButtonEvents {
  fontSize: 'small' | 'medium' | 'large';
  fontWeight: 'normal' | 'bold';
  color: 'black' | 'white';
}
