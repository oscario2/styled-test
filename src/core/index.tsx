import { FlattenSimpleInterpolation } from 'styled-components';
import { render, cleanup } from '@testing-library/react';

// types
import type { ITestStyleSuite, TCssProperty } from 'src/types';

// utils
import { getCSSProperties } from 'src/utils';
import { StyleError, TFailReason, EFailReason } from 'src/error';

const error = (reason: TFailReason, message?: string) => {
  throw new StyleError(reason, message);
};

/**
 * ```.
 * ensure all `theme` properties exist on a rendered component
 * allows for decoupled testing of different `styles`
 * ```
 * - handles pseudo selectors
 * - catches duplicates rules
 * @param suite
 */
export const runStylesTests = (suite: ITestStyleSuite) => {
  const { story, styled, verbose } = suite;

  // arrange
  const { container, debug } = render(story);
  const jsx = container.querySelector(styled.toString()) as HTMLElement;
  if (!jsx) {
    error(
      EFailReason.ElementNotFoundInDOM,
      `could not find ${styled.toString()} in DOM`,
    );
  }

  // concat themes
  const theme = [
    suite.themes
      .flat()
      .filter((k) => k)
      .join(''),
  ] as FlattenSimpleInterpolation;

  // debug
  if (verbose) debug();

  const classList = Array.from(jsx.classList);
  if (classList.length !== 2) {
    error(
      EFailReason.TooManyClasses,
      `found ${classList.length} classes, expected 2`,
    );
  }

  // consts
  const className = '.' + classList[1].replace('.', '');
  const matchedRules = [] as string[];

  // get all rules from our selected css``[] themes
  const themeStyles = getCSSProperties(className, theme);
  if (themeStyles[className] === undefined) throw new Error();

  // get stylesheet from `document`
  const { styleSheets } = document;
  if (!styleSheets) {
    error(
      EFailReason.DocumentStyleSheetUndefined,
      'document.styleSheets = ' + styleSheets,
    );
  }

  // ensure stylesheet exits
  const sheet = styleSheets.item(0);
  if (!sheet) {
    error(
      EFailReason.DocumentCssRulesUndefied,
      'styleSheets.item(0) = ' + sheet,
    );
  }

  if (!sheet?.cssRules) {
    error(
      EFailReason.DocumentCssRulesEmpty,
      'sheet.cssRules = ' + sheet?.cssRules,
    );
  }

  // get all style rules for `document`
  const cssRules = Array.from(sheet!.cssRules) as CSSStyleRule[];
  if (cssRules.length === 0) {
    error(EFailReason.DocumentCssRulesEmpty, 'sheet.cssRules.length = 0');
  }

  // map css rules from rendered `document`
  type TCssPair = Record<TCssProperty, string>;
  const docStyles = {} as Record<string, TCssPair>;
  cssRules.forEach(({ selectorText, style }) => {
    docStyles[selectorText] = style as unknown as TCssPair;
  });

  // ensure `theme` styles exists in `document` styles
  Object.keys(themeStyles).forEach((selector) => {
    // ignore empty `theme` rules
    const themeRules = Object.keys(themeStyles[selector]);
    if (themeRules.length === 0) return;

    // ensure `theme` key exists in rendered `document`
    if (!docStyles[selector]) {
      error(
        EFailReason.SelectorNotFoundinDOM,
        `${selector} not found in 'document'`,
      );
    }

    // ensure every rule in our `theme` matches `document`
    Object.keys(themeStyles[selector]).forEach((cssKey) => {
      const _cssKey = cssKey as TCssProperty;

      const want = themeStyles[selector][_cssKey];
      const got = docStyles[selector][_cssKey];

      if (Array.isArray(want)) {
        error(
          EFailReason.DuplicateStyleRule,
          `found ${want.length} rules for ${cssKey}`,
        );
      }

      if (want !== got) {
        error(
          EFailReason.InvalidStyleRule,
          `expected ${cssKey}:${want}, got ${cssKey}:${got}`,
        );
      }
      matchedRules.push(`${selector} > ${cssKey}: ${got}`);
    });
  });

  // debug
  if (verbose) {
    console.log('[theme]:\n' + JSON.stringify(themeStyles, null, 3));
  }

  if (verbose) {
    console.log('[matched]:\n' + matchedRules.join('\n'));
  }

  // clean-up DOM
  cleanup();
};
