/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html } from '@open-wc/testing';

import { setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import { docBlob, missingCommunication } from './communication.testfiles.js';

import SclCommunicationPlugin from './scl-communication.js';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

const doc = new DOMParser().parseFromString(docBlob, 'application/xml');

describe('SclCommunication editor component', () => {
  customElements.define('sc-communication-plugin', SclCommunicationPlugin);
  let editor: SclCommunicationPlugin;

  beforeEach(async () => {
    editor = await fixture(
      html`<sc-communication-plugin .doc="${doc}"></sc-communication-plugin>`
    );
    document.body.prepend(editor);
  });

  afterEach(async () => {
    editor.remove();
  });

  describe('with missing Communication element', () => {
    beforeEach(async () => {
      const missingComm = new DOMParser().parseFromString(
        missingCommunication,
        'application/xml'
      );
      editor.doc = missingComm;
    });

    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 1200, height: 800 });

      await editor.updateComplete;
      await timeout(400);
      await visualDiff(
        document.body,
        `scl-communication-plugin/#1 Missing Communication section`
      );
    });
  });

  describe('default theming', () => {
    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 1200, height: 800 });

      await editor.updateComplete;
      await timeout(400);
      await visualDiff(
        document.body,
        `scl-communication-plugin/#1 With default theming`
      );
    });
  });

  describe('solarized theming', () => {
    beforeEach(() => {
      const style = document.createElement('style');

      style.textContent = `* {
        --oscd-theme-primary: #2aa198;
  --oscd-theme-secondary: #6c71c4;
  --oscd-theme-error: #dc322f;

  --oscd-theme-base03: #002b36;
  --oscd-theme-base02: #073642;
  --oscd-theme-base01: #586e75;
  --oscd-theme-base00: #657b83;
  --oscd-theme-base0: #839496;
  --oscd-theme-base1: #93a1a1;
  --oscd-theme-base2: #eee8d5;
  --oscd-theme-base3: #fdf6e3;

  --oscd-theme-text-font: 'Roboto';
  --oscd-theme-icon-font: 'Material Symbols Outlined';
      }`;
      document.body.prepend(style);
    });

    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 1200, height: 800 });

      await timeout(400);
      await visualDiff(
        document.body,
        `scl-communication-plugin/#2 With solarized theming`
      );
    });
  });
});
