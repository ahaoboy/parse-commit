export * from './type';
import reg from './parser/regex';
import _parser from './parser/parser';
import type { Parse, Options } from './type';

const defaultOptions: Options = {
  headerPattern: /^(\w*)(?:\(([\w$.\-*/ ]*)\))?: (.*)$/,
  headerCorrespondence: ['type', 'scope', 'subject'],
  referenceActions: [
    'close',
    'closes',
    'closed',
    'fix',
    'fixes',
    'fixed',
    'resolve',
    'resolves',
    'resolved',
  ],
  issuePrefixes: ['#', ': '],
  noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
  fieldPattern: /^-(.*?)-$/,
  revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
  revertCorrespondence: ['header', 'hash'],
  // warn: function () {},
  // mergePattern: undefined,
  // mergeCorrespondence: undefined,
};

export const parse: Parse = (s, options = defaultOptions) => {
  return _parser(s, options, reg(options)) as any;
};
