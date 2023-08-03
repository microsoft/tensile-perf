import { getRandomUtil } from '@tensile-perf/tools';
import type { CssSelectorParams, CssSelectorType } from '../../types';
import type { RandomUtil } from '@tensile-perf/tools';

export const DEFAULT_SELECTOR_TYPES = [
  'class',
  'tag',
  'nth-child',
  'pseudo-element',
  'not-class',
  'not-attribute',
  'attribute-name',
  'attribute-value',
] as const;


export class CssSelector {
  private rando: RandomUtil;
  private readonly selectorTypes: CssSelectorType[];
  private tags: string[];
  private classNames: string[];
  private attributeNames: string[];
  private attributeValues: string[];

  constructor({ seed, selectorTypes, tags, classNames, attributeNames, attributeValues }: CssSelectorParams = {}) {
    this.rando = getRandomUtil(seed);
    this.selectorTypes = selectorTypes ?? ((DEFAULT_SELECTOR_TYPES as unknown) as CssSelectorType[]);
    this.tags = tags ?? [];
    this.classNames = classNames ?? [];
    this.attributeNames = attributeNames ?? [];
    this.attributeValues = attributeValues ?? [];
  }

  public randomSelector = (selectorTypes?: CssSelectorType[]): string => {
    const selectorType = this._selectorType(selectorTypes);

    switch (selectorType) {
      case 'class':
        return this._classSelector();

      case 'tag':
        return this._tagSelector();

      case 'nth-child':
        return this._nthChildSelector();

      case 'pseudo-element':
        return this._pseudoElement();

      case 'not-class':
        return this._notClass();

      case 'not-attribute':
        return this._notAttribute();

      case 'attribute-name':
        return this._attributeName();

      case 'attribute-value':
        return this._attributeValue();
    }
  };

  private _selectorType = (selectorTypes?: CssSelectorType[]): CssSelectorType => {
    return this.rando.choice(selectorTypes ?? this.selectorTypes) as CssSelectorType;
  };

  private _classSelector = (): string => {
    const selector = this._randomChoice(this.classNames) ?? this._randomString('random-classname');
    return `.${selector}`;
  };

  private _tagSelector = (): string => {
    return this._randomChoice(this.tags) ?? this._randomString('random-tag');
  };

  private _nthChildSelector = (): string => {
    const choices = [':first-child', ':last-child', ':nth-child'];
    const selector = this.rando.choice(choices) as string;

    if (selector === ':nth-child') {
      return `${selector}(${this.rando.range(1, 15)})`;
    }

    return selector;
  };

  private _pseudoElement = (): string => {
    const choices = ['::after', '::before', /*'::part',*/ '::placeholder', '::slotted'];
    const selector = this.rando.choice(choices) as string;

    return selector;
  };

  private _notClass = (): string => {
    return `:not(${this._classSelector()})`;
  };

  private _notAttribute = (): string => {
    return `:not(${this._attributeName()})`;
  };

  private _attributeName = (): string => {
    return `[${this._randomAttributeName()}]`;
  };

  private _attributeValue = (): string => {
    const name = this._randomAttributeName();
    const value = this._randomChoice(this.attributeValues) ?? this._randomString('random-attr-value');

    return `[${name}=${value}]`;
  };

  private _randomChoice = (choices: string[]): string | undefined => {
    if (choices.length > 0) {
      return this.rando.choice(choices) as string;
    }

    return undefined;
  };

  private _randomAttributeName = (): string => {
    return this._randomChoice(this.attributeNames) ?? this._randomString('data-random-attr');
  };

  private _randomString = (prefix = 'random-string'): string => {
    return `${prefix}-${this.rando.integer().toString(16)}`;
  };
}
