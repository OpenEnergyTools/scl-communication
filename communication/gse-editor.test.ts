/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html } from '@open-wc/testing';

import { sendMouse, setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import { docBlob } from '../communication.testfiles.js';

import './gse-editor.js';
import type { GseEditor } from './gse-editor.js';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

describe('GSE editor component', () => {
  let editor: GseEditor;
  beforeEach(async () => {
    const gse = new DOMParser()
      .parseFromString(docBlob, 'application/xml')
      .querySelector('GSE')!;

    editor = await fixture(html`<gse-editor .element="${gse}"></gse-editor>`);
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

  describe('with unfocused gse-editor', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 500, height: 500 });

      await editor.updateComplete;
      await timeout(200);
      await visualDiff(document.body, `gse-editor/#1 Unfocused gse-editor`);
    });
  });

  describe('with focused gse-editor', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 500, height: 500 });

      await sendMouse({ type: 'move', position: [120, 120] });
      await sendMouse({ type: 'click', position: [120, 120] });

      await timeout(200);
      await visualDiff(document.body, `gse-editor/#2 Focused gse-editor`);
    });
  });
});
