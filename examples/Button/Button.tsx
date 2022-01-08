import { Styled, Layout } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ ...props }: IButtonProps) => {
  return (
    <Layout.FlexContainer>
      <Styled.Button {...props}></Styled.Button>
    </Layout.FlexContainer>
  );
};
