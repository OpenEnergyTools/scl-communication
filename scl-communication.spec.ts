/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import { isInsert } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob, missingCommunication } from './communication.testfiles.js';

import SclCommunicationPlugin from './scl-communication.js';

const doc = new DOMParser().parseFromString(docBlob, 'application/xml');
const missComm = new DOMParser().parseFromString(
  missingCommunication,
  'application/xml'
);

describe('Scl Communication Plugin', () => {
  customElements.define('sc-communication-plugin', SclCommunicationPlugin);

  let editor: SclCommunicationPlugin;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(
      html`<sc-communication-plugin .doc="${doc}"></sc-communication-plugin>`
    );

    editEvent = spy();
    window.addEventListener('oscd-edit', editEvent);
    window.addEventListener('oscd-create-wizard-request', editEvent);
  });

  it('sends a wizard create request on Fab click', () => {
    editor.add.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.parent).to.equal(doc.querySelector('Communication'));
  });

  it('create a Communication section parent element when missing', async () => {
    editor.doc = missComm;
    await editor.updateComplete;

    editor.add.click();

    expect(editEvent).to.have.been.calledTwice;

    const insert = editEvent.args[0][0].detail;
    expect(insert).to.satisfy(isInsert);

    const createRequest = editEvent.args[1][0].detail;
    expect(createRequest.parent).to.equal(insert.node);
    expect(createRequest.tagName).to.equal('SubNetwork');
  });
});
