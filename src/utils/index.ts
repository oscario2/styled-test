import { FlattenSimpleInterpolation } from 'styled-components';

// @ts-ignore
import { toJSON } from 'cssjson';

// types
import type { TCssProperty, TPseudoProperty } from 'src/types/test.types';

interface ICssJson {
  /** properties */
  attributes: Record<TCssProperty, string>;
  /** pseudo/child elements */
  children: Record<TPseudoProperty, ICssJson>;
}

/**
 * traverse recursively through the CSS tree and build each `selector`
 * @param children
 * @param selector [0] = className
 * @param styles
 * @returns
 */
const buildSelector = (
  children: ICssJson['children'],
  selector: string[],
  styles = {} as Record<string, ICssJson['attributes']>,
) => {
  for (const [key, val] of Object.entries(children)) {
    selector = selector.concat([key]);
    styles[selector.join('')] = val.attributes;

    if (Object.keys(val.children).length) {
      styles = buildSelector(val.children, selector, styles);
      selector.pop();
    } else {
      selector = [selector[0]];
    }
  }

  return styles;
};

/**
 * parse css`` without props
 * @param className
 * @param style
 * @returns
 */
export const getCSSProperties = (
  className: string,
  style: FlattenSimpleInterpolation,
) => {
  // remove comments
  let pre = style.join('').replace(/[\/]+.*?\n/g, '');

  // remove spaces and multilines
  pre = pre.replace(/[\s]+/g, ' ');

  // css to json
  const { attributes, children } = toJSON(pre) as ICssJson;

  // parse base and children styles
  const selector = buildSelector(children, [className]);
  selector[className] = attributes;

  return selector;
};

/**
 * `boxShadow` to `box-shadow`
 * @param property
 */
export const getCssKey = (property: TCssProperty) => {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
};
