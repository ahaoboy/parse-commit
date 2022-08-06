import { it, assert, describe } from 'vitest';
import parse, { type defaultResult } from '../src';

const data: [string, defaultResult][] = [
  [
    'feat(core): init',
    {
      body: null,
      footer: null,
      header: 'feat(core): init',
      mentions: [],
      merge: null,
      notes: [],
      references: [],
      revert: null,
      scope: 'core',
      subject: 'init',
      type: 'feat',
    },
  ],

  [
    'feat(core): init (close: #123)',
    {
      body: null,
      footer: null,
      header: 'feat(core): init (close: #123)',
      mentions: [],
      merge: null,
      notes: [],
      references: [
        {
          action: 'close',
          issue: '123',
          owner: null,
          prefix: '#',
          raw: '#123',
          repository: null,
        },
      ],
      revert: null,
      scope: 'core',
      subject: 'init (close: #123)',
      type: 'feat',
    },
  ],

  [
    'Revert "throw an error if a callback is passed to animate methods"\n\n' +
      'This reverts commit 9bb4d6ccbe80b7704c6b7f53317ca8146bc103ca.\n\n' +
      '-hash-\n' +
      'd7a40a29214f37d469e57d730dfd042b639d4d1f',
    {
      subject: null,
      type: null,
      body: 'This reverts commit 9bb4d6ccbe80b7704c6b7f53317ca8146bc103ca.',
      footer: null,
      hash: 'd7a40a29214f37d469e57d730dfd042b639d4d1f',
      header:
        'Revert "throw an error if a callback is passed to animate methods"',
      mentions: [],
      merge: null,
      notes: [],
      references: [],
      revert: {
        hash: '9bb4d6ccbe80b7704c6b7f53317ca8146bc103ca',
        header: 'throw an error if a callback is passed to animate methods',
      },
      scope: null,
    },
  ],

  [
    'feat(scope): broadcast $destroy event on scope destruction\n' +
      'bla bla bla\n\n' +
      'BREAKING CHANGE: some breaking change\n',
    {
      body: 'bla bla bla',
      footer: 'BREAKING CHANGE: some breaking change',
      header: 'feat(scope): broadcast $destroy event on scope destruction',
      mentions: [],
      merge: null,
      notes: [
        {
          text: 'some breaking change',
          title: 'BREAKING CHANGE',
        },
      ],
      references: [],
      revert: null,
      scope: 'scope',
      subject: 'broadcast $destroy event on scope destruction',
      type: 'feat',
    },
  ],
  [
    'fix(zzz): Very cool commit\n' +
      'bla bla bla\n\n' +
      'Closes #2, #3. Resolves #4. Fixes #5. Fixes #6.\n' +
      'What not ?\n',
    {
      body: 'bla bla bla',
      footer: 'Closes #2, #3. Resolves #4. Fixes #5. Fixes #6.\nWhat not ?',
      header: 'fix(zzz): Very cool commit',
      mentions: [],
      merge: null,
      notes: [],
      references: [
        {
          action: 'Close',
          issue: '2',
          owner: null,
          prefix: '#',
          raw: '#2',
          repository: null,
        },
        {
          action: 'Close',
          issue: '3',
          owner: null,
          prefix: '#',
          raw: ', #3',
          repository: null,
        },
        {
          action: 'Resolve',
          issue: '4',
          owner: null,
          prefix: '#',
          raw: '#4',
          repository: null,
        },
      ],
      revert: null,
      scope: 'zzz',
      subject: 'Very cool commit',
      type: 'fix',
    },
  ],
  [
    'chore(scope with spaces): some chore\n' +
      'bla bla bla\n\n' +
      'BREAKING CHANGE: some other breaking change\n',

    {
      body: 'bla bla bla',
      footer: 'BREAKING CHANGE: some other breaking change',
      header: 'chore(scope with spaces): some chore',
      mentions: [],
      merge: null,
      notes: [
        {
          text: 'some other breaking change',
          title: 'BREAKING CHANGE',
        },
      ],
      references: [],
      revert: null,
      scope: 'scope with spaces',
      subject: 'some chore',
      type: 'chore',
    },
  ],
];

describe('test parse', () => {
  it('test data', () => {
    for (const [s, res] of data) {
      assert.deepEqual(res, parse(s));
    }
  });
});
