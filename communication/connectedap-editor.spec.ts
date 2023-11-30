/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';

import { SinonSpy, spy } from 'sinon';

import { isRemove } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob } from '../communication.testfiles.js';

import './connectedap-editor.js';
import type { ConnectedAPEditor } from './connectedap-editor.js';

const connAp = new DOMParser()
  .parseFromString(docBlob, 'application/xml')
  .querySelector('ConnectedAP')!;

describe('ConnectedAP editor component', () => {
  let editor: ConnectedAPEditor;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(
      html`<connectedap-editor .element="${connAp}"></connectedap-editor>`
    );

    editEvent = spy();
    window.addEventListener('oscd-edit', editEvent);
    window.addEventListener('oscd-edit-wizard-request', editEvent);
  });

  it('sends a wizard edit request', () => {
    editor.edit.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.element).to.equal(connAp);
  });

  it('allows to remove an existing GSE element', () => {
    editor.delete.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail.node.tagName).to.equal('ConnectedAP');
  });
});
