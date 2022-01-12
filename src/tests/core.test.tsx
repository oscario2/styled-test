import styled, { css } from 'styled-components';

// core
import { runStylesTests } from 'src';

// types
import type { IStyledTheme, ITestStyleSuite } from 'src';
import { EFailReason } from 'src/error';

interface IComponentProps {
  fontSize: 'small' | 'large';
  fontWeight: 'normal' | 'bold';
  className?: string;
}

// declaration
const fontSizeStyles: IStyledTheme<IComponentProps['fontSize']> = {
  small: css`
    font-size: 10pt;
  `,
  large: css`
    font-weight: 14pt;
  `,
};

const fontWeightStyles: IStyledTheme<IComponentProps['fontWeight']> = {
  normal: css`
    font-weight: normal;
  `,
  bold: css`
    font-weight: bold;
  `,
};

// implementation
const StyledButton = styled.button<IComponentProps>`
  ${({ fontSize }) => fontSizeStyles[fontSize]};
  ${({ fontWeight }) => fontWeightStyles[fontWeight]};
`;

// component
const Button = (props: IComponentProps) => {
  return <StyledButton {...props} />;
};

describe('style tests', () => {
  let suite = {} as ITestStyleSuite;

  beforeEach(() => {
    const _suite: ITestStyleSuite = {
      name: '`small` button with `bold` font-weight',
      story: <Button fontSize="small" fontWeight="bold" />,
      styled: StyledButton,
      themes: [fontSizeStyles.small, fontWeightStyles.bold],
    };
    suite = _suite;
  });

  test('success', () => {
    runStylesTests(suite);
  });

  test('media queries', () => {
    suite.themes.push(css`
      @media (min-width: 200px) {
        color: #fff;
      }
    `);
    // TODO: support parsing @media queries @oscario2
  });

  test('`styled` too many classes', () => {
    // arrange
    suite.story = (
      <Button fontSize="small" fontWeight="bold" className="another" />
    );

    expect.hasAssertions();
    try {
      // act
      runStylesTests(suite);
    } catch (error) {
      // assert
      expect(error).toHaveProperty('reason', EFailReason.TooManyClasses);
    }
  });

  test('`styled` not in DOM', () => {
    // arrange
    suite.styled = 'invalid';

    expect.hasAssertions();
    try {
      // act
      runStylesTests(suite);
    } catch (error) {
      // assert
      expect(error).toHaveProperty('reason', EFailReason.ElementNotFoundInDOM);
    }
  });

  test('duplicate `css` rule', () => {
    // arrange
    suite.themes.push(
      css`
        font-weight: normal;
      `,
    );

    expect.hasAssertions();
    try {
      // act
      runStylesTests(suite);
    } catch (error) {
      // assert
      expect(error).toHaveProperty('reason', EFailReason.DuplicateStyleRule);
    }
  });

  test('invalid `css` value', () => {
    // arrange
    const rule = 'border: 20px';
    suite.themes.push(
      css`
        border: ${rule};
      `,
    );

    expect.hasAssertions();
    try {
      // act
      runStylesTests(suite);
    } catch (error) {
      // assert
      expect(error).toHaveProperty('reason', EFailReason.InvalidStyleRule);
    }
  });

  test('invalid `css` key', () => {
    // arrange
    const rule = 'invalid: key';
    suite.themes.push(
      css`
        ${rule};
      `,
    );

    expect.hasAssertions();
    try {
      // act
      runStylesTests(suite);
    } catch (error) {
      // assert
      expect(error).toHaveProperty('reason', EFailReason.InvalidStyleRule);
    }
  });
});
