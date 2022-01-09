// `enum` to support typings for .jsx
export const EFailReason = {
  DocumentStyleSheetUndefined: 'DocumentStyleSheetUndefined',
  DocumentStyleSheetEmpty: 'DocumentStyleSheetEmpty',

  DocumentCssRulesUndefied: 'DocumentCssRulesUndefied',
  DocumentCssRulesEmpty: 'DocumentCssRulesEmpty',

  DuplicateStyleRule: 'DuplicateStyleRule',
  ElementNotFoundInDOM: 'ElementNotFoundInDOM',
  InvalidStyleRule: 'InvalidStyleRule',
  SelectorNotFoundinDOM: 'SelectorNotFoundinDOM',
  TooManyClasses: 'TooManyClasses',
} as const;

export type TFailReason = keyof typeof EFailReason;
// export type TFailValue = typeof EFailReason[TFailReason];

/**
 *
 */
export class StyleError extends Error {
  /**
   *
   * @param reason
   * @param message
   */
  constructor(public reason: TFailReason, message?: string) {
    super(message || '');
  }
}
