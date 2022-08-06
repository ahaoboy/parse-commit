import reg from "./parser/regex";
import _parser from "./parser/parser";
export type Option = {
  headerPattern?: RegExp;
  headerCorrespondence?: string[];
  referenceActions?: string[];
  issuePrefixes?: string[];
  noteKeywords?: string[];
  fieldPattern?: RegExp;
  revertPattern?: RegExp;
  revertCorrespondence?: string[];
  warn?: () => void;
  mergePattern?: RegExp;
  mergeCorrespondence?: string[];
};
const defaultOptions: Option = {
  headerPattern: /^(\w*)(?:\(([\w$.\-*/ ]*)\))?: (.*)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  referenceActions: [
    "close",
    "closes",
    "closed",
    "fix",
    "fixes",
    "fixed",
    "resolve",
    "resolves",
    "resolved",
  ],
  issuePrefixes: ["#", ": "],
  noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE"],
  fieldPattern: /^-(.*?)-$/,
  revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
  revertCorrespondence: ["header", "hash"],
  // warn: function () {},
  // mergePattern: undefined,
  // mergeCorrespondence: undefined,
};

export type defaultResult = {
  body: string | null;
  type: string | null;
  scope: string | null;
  subject: string | null;
  footer: string | null;
  header: string | null;
  mentions: string[] | null;
  merge: string | null;
  hash?: string | null;
  notes: {
    text: string | null;
    title: string | null;
  }[];
  revert: { hash: string | null; header: string | null } | null;
  references: {
    action: string | null;
    issue: string | null;
    owner: string | null;
    prefix: string | null;
    raw: string | null;
    repository: string | null;
  }[];
};

export default <Result = defaultResult>(
  s: string,
  options = defaultOptions
): Result => {
  return _parser(s, options, reg(options)) as any;
};
