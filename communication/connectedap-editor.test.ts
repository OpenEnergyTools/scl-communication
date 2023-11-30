/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html } from '@open-wc/testing';

import { sendMouse, setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import { docBlob } from '../communication.testfiles.js';

import './connectedap-editor.js';
import type { ConnectedAPEditor } from './connectedap-editor.js';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

describe('ConnectedAP editor component', () => {
  let editor: ConnectedAPEditor;
  beforeEach(async () => {
    const connAp = new DOMParser()
      .parseFromString(docBlob, 'application/xml')
      .querySelector('ConnectedAP')!;

    editor = await fixture(
      html`<connectedap-editor .element="${connAp}"></connectedap-editor>`
    );
    document.body.style.width = '200';
    document.body.style.height = '200';
    editor.style.position = 'absolute';
    editor.style.top = '50';
    editor.style.left = '50';
    document.body.prepend(editor);
  });

  afterEach(async () => {
    editor.remove();
  });

  describe('with unfocused connectedap-editor', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 300, height: 300 });

      await editor.updateComplete;
      await timeout(200);
      await visualDiff(
        document.body,
        `connectedap-editor/#1 Unfocused connectedapd-editor`
      );
    });
  });

  describe('with focused connectedap-editor', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 300, height: 300 });

      await sendMouse({ type: 'move', position: [60, 60] });
      await sendMouse({ type: 'click', position: [60, 60] });

      await timeout(200);
      await visualDiff(
        document.body,
        `connectedap-editor/#2 Focused connectedap-editor`
      );
    });
  });
});
