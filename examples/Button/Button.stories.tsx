import { ComponentStory, ComponentMeta } from '@storybook/react';

// addons
import { withPerformance } from 'storybook-addon-performance';

// components
import { Button } from './Button';

// types
import { IButtonProps } from './Button.types';

// /////////////
//  HELPERS
// /////////////

// generalize component
const Component = Button;
type TComponent = typeof Component;

// generalize state
type TProps = IButtonProps;
const state: TProps = {
  fontSize: 'small',
  fontWeight: 'normal',
  color: 'black',
};

// modify state
const setState = (props: Partial<TProps>): TProps => {
  return { ...state, ...props };
};

// /////////////
//  STORIES
// /////////////

export default {
  title: `Components/${Component.name}`,
  component: Component,
  decorators: [withPerformance],
} as ComponentMeta<TComponent>;

// extract types for `args` autocompletion
const template: ComponentStory<TComponent> = (args) => <Component {...args} />;

export const ButtonSmallNormal = template.bind({});
ButtonSmallNormal.args = setState({ fontSize: 'small', fontWeight: 'normal' });

export const ButtonMediumBold = template.bind({});
ButtonMediumBold.args = setState({ fontSize: 'medium', fontWeight: 'bold' });

export const ButtonLargeBoldWhite = template.bind({});
ButtonLargeBoldWhite.args = setState({
  fontSize: 'large',
  fontWeight: 'bold',
  color: 'white',
});
