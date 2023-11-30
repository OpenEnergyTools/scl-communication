/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '@material/mwc-fab';
import type { Fab } from '@material/mwc-fab';

import '@openscd/oscd-action-icon';

import { newEditEvent } from '@openscd/open-scd-core';
import { newEditWizardEvent } from '../foundation.js';

/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
@customElement('connectedap-editor')
export class ConnectedAPEditor extends LitElement {
  /** SCL element ConnectedAP */
  @property({ attribute: false })
  element!: Element;

  /** ConnectedAP attribute apName */
  @property({ type: String })
  get apName(): string {
    return this.element.getAttribute('apName')!;
  }

  @query('.action.edit') edit!: Fab;

  @query('.action.delete') delete!: Fab;

  private openEditWizard(): void {
    this.dispatchEvent(newEditWizardEvent(this.element));
  }

  private removeElement(): void {
    if (this.element) this.dispatchEvent(newEditEvent({ node: this.element }));
  }

  render(): TemplateResult {
    return html`
      <oscd-action-icon label="${this.apName}" icon="settings_input_hdmi"
        ><mwc-fab slot="action" mini style="opacity:0;"></mwc-fab>
        <mwc-fab slot="action" mini style="opacity:0;"></mwc-fab>
        <mwc-fab
          class="action edit"
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}"
        ></mwc-fab>
        <mwc-fab
          class="action delete"
          slot="action"
          mini
          icon="delete"
          @click="${() => this.removeElement()}"
        ></mwc-fab
      ></oscd-action-icon>
    `;
  }
}
