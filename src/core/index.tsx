/**
 * ensure all `theme` properties exist on rendered component
 * allows for decoupled testing of different `styles`
 * - handles pseudo selectors
 * - catches duplicates rules
 * @param suite
 */
export const runStylesTests = (suite: ITestStyleSuite) => {
  const { story, styled, verbose: print } = suite;
  describe(`<${story.type.storyName} />`, () => {
    // consts
    let jsx: HTMLElement;

    // concat themes
    const theme = [
      suite.themes
        .flat()
        .filter((k) => k)
        .join(''),
    ] as FlattenSimpleInterpolation;

    beforeEach(() => {
      // arrange
      const { container, debug } = render(story);
      jsx = container.querySelector(styled.toString()) as HTMLElement;

      // debug
      if (print) debug();
    });

    afterEach(() => {
      cleanup();
    });

    test(suite.name, () => {
      //
      expect(jsx).not.toBeUndefined();

      //
      const classList = Array.from(jsx.classList);
      expect(classList).not.toBeUndefined();
      expect(classList).toHaveLength(2);

      // consts
      const className = '.' + classList[1].replace('.', '');

      // get all rules from our selected css``[] themes
      const themeStyles = getCSSProperties(className, theme);
      expect(themeStyles[className]).not.toBeUndefined();

      ///
      // assert `base`rules
      ///
      const assertBaseRules = () => {
        const baseRules = themeStyles[className];
        const baseRulesKeys = Object.keys(baseRules);

        baseRulesKeys.forEach((cssRule) => {
          const cssValue = baseRules[cssRule as TCssProperty];

          // duplicate rules are parsed as an array
          expect(jsx).toHaveStyleRule(cssRule, cssValue);
        });
      };

      //
      assertBaseRules();

      // return early if we have no pseudo rules
      if (Object.keys(themeStyles).length <= 1) {
        // debug
        if (print) {
          console.log(JSON.stringify(themeStyles, null, 3));
        }
        return;
      }

      ///
      // assert `pseudo`rules
      ///
      const assertPseudoRules = () => {
        // get stylesheet from `document`
        const { styleSheets } = document;
        expect(styleSheets).not.toBeUndefined();

        // ensure stylesheet exits
        const sheet = styleSheets.item(0);
        expect(sheet).not.toBeUndefined();
        expect(sheet?.cssRules).not.toBeUndefined();

        // get all style rules for `document`
        const cssRules = Array.from(sheet!.cssRules) as CSSStyleRule[];
        expect(cssRules).not.toBeUndefined();
        expect(cssRules.length > 0).toBeTruthy();

        // map css rules from rendered `document`
        type TCssPair = Record<TCssProperty, string>;
        const docStyles = {} as Record<string, TCssPair>;
        cssRules.forEach(({ selectorText, style }) => {
          docStyles[selectorText] = style as unknown as TCssPair;
        });

        // ensure every pseudo rule of our `theme` styles exists in `document` styles
        Object.keys(themeStyles).forEach((selector) => {
          // is pseudo selector
          if (selector.indexOf(':') === -1) return;

          // ignore empty `theme` rules
          const themeRules = Object.keys(themeStyles[selector]);
          if (themeRules.length === 0) return;

          // ensure `theme` key exists in rendered `document`
          expect(docStyles[selector]).toBeTruthy();

          // ensure every rule in our `theme` matches `document`
          Object.keys(themeStyles[selector]).forEach((cssKey) => {
            const _cssKey = cssKey as TCssProperty;

            const got = docStyles[selector][_cssKey];
            const want = themeStyles[selector][_cssKey];

            expect(got).toStrictEqual(want);
          });
        });
      };

      //
      assertPseudoRules();

      // debug
      if (print) console.log(JSON.stringify(themeStyles, null, 3));
    });
  });
};
