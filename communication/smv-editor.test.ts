/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html } from '@open-wc/testing';

import { sendMouse, setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import { docBlob } from '../communication.testfiles.js';

import './smv-editor.js';
import type { SmvEditor } from './smv-editor.js';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

describe('SMV editor component', () => {
  let editor: SmvEditor;
  beforeEach(async () => {
    const gse = new DOMParser()
      .parseFromString(docBlob, 'application/xml')
      .querySelector('SMV')!;

    editor = await fixture(html`<smv-editor .element="${gse}"></smv-editor>`);
    document.body.style.width = '180';
    document.body.style.height = '180';
    editor.style.position = 'absolute';
    editor.style.top = '50';
    editor.style.left = '50';
    document.body.prepend(editor);
  });

  afterEach(async () => {
    editor.remove();
  });

  describe('with unfocused smv-editor', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 500, height: 500 });

      await editor.updateComplete;
      await timeout(200);
      await visualDiff(document.body, `smv-editor/#1 Unfocused smv-editor`);
    });
  });

  describe('with focused smv-editor', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 500, height: 500 });

      await sendMouse({ type: 'move', position: [120, 120] });
      await sendMouse({ type: 'click', position: [120, 120] });

      await timeout(200);
      await visualDiff(document.body, `smv-editor/#2 Focused smv-editor`);
    });
  });
});
