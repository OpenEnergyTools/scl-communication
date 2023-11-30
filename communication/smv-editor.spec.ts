/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';

import { SinonSpy, spy } from 'sinon';

import { isRemove } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob } from '../communication.testfiles.js';

import './smv-editor.js';
import type { SmvEditor } from './smv-editor.js';

const smv = new DOMParser()
  .parseFromString(docBlob, 'application/xml')
  .querySelector('SMV')!;

describe('SMV editor component', () => {
  let editor: SmvEditor;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(html`<smv-editor .element="${smv}"></smv-editor>`);

    editEvent = spy();
    window.addEventListener('oscd-edit', editEvent);
    window.addEventListener('oscd-edit-wizard-request', editEvent);
  });

  it('sends a wizard edit request', () => {
    editor.edit.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.element).to.equal(smv);
  });

  it('allows to remove an existing SMV element', () => {
    editor.delete.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail.node.tagName).to.equal('SMV');
  });
});
