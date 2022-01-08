import { css } from 'styled-components';

// types
import type { TPseudoProperty } from 'src/types';

// utils
import { getCSSProperties } from 'src/utils';

describe('`styled` to `css`', () => {
  const className = 'cls';
  type TSelector = (string | TPseudoProperty)[];

  test('parse `base` styles', () => {
    // arrange
    const style = css`
      display: flex;
    `;

    // act
    const props = getCSSProperties(className, style);

    // assert
    expect(Object.keys(props).length).toEqual(1);
    expect(props[className]).not.toBeUndefined();
    expect(props[className].display).not.toBeUndefined();
  });

  test('parse empty `base` and `pseudo` styles', () => {
    // arrange
    const selector: TSelector = [className, ':after'];
    const style = css`
      :after {
        display: flex;
      }
    `;

    // act
    const props = getCSSProperties(className, style);

    // assert
    expect(Object.keys(props).length).toEqual(2);
    expect(props[selector.join('')]).not.toBeUndefined();
    expect(props[selector.join('')].display).not.toBeUndefined();
  });

  test('parse with `comments` and N-depth `psuedo', () => {
    // arrange
    const selector: TSelector = [className, ':after', ':active'];
    const style = css`
      :after {
        // empty :after
        :active {
          /* comment */
          display: 'flex';
        }
      }
    `;

    // act
    const props = getCSSProperties(className, style);

    // assert
    expect(Object.keys(props).length).toEqual(3);
    expect(props[selector.join('')]).not.toBeUndefined();
    expect(props[selector.join('')].display).not.toBeUndefined();
  });
  test('fail on duplicate rules', () => {});
});
