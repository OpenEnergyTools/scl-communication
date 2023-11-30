/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';

import { SinonSpy, spy } from 'sinon';

import { isRemove } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob } from '../communication.testfiles.js';

import './subnetwork-editor.js';
import type { SubNetworkEditor } from './subnetwork-editor.js';

const subNet = new DOMParser()
  .parseFromString(docBlob, 'application/xml')
  .querySelector('SubNetwork')!;

describe('SubNetwork editor component', () => {
  let editor: SubNetworkEditor;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(
      html`<subnetwork-editor .element="${subNet}"></subnetwork-editor>`
    );

    editEvent = spy();
    window.addEventListener('oscd-edit', editEvent);
    window.addEventListener('oscd-edit-wizard-request', editEvent);
    window.addEventListener('oscd-create-wizard-request', editEvent);
  });

  it('sends a wizard edit request', () => {
    editor.edit.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.element).to.equal(subNet);
  });

  it('sends a wizard create request', () => {
    editor.add.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.parent).to.equal(subNet);
    expect(editWizard.tagName).to.equal('ConnectedAP');
  });

  it('allows to remove an existing GSE element', () => {
    editor.delete.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail.node.tagName).to.equal('SubNetwork');
  });
});
