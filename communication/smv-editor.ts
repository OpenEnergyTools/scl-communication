/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, TemplateResult, html, svg } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { newEditEvent } from '@openscd/open-scd-core';

import '@material/mwc-icon';
import '@material/mwc-fab';
import type { Fab } from '@material/mwc-fab';

import '@openscd/oscd-action-icon';

import { newEditWizardEvent } from '../foundation.js';

export const sizableSmvIcon = svg`
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M11,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H9V15H13V13H11A2,2 0 0,1 9,11V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
  </svg>`;

@customElement('smv-editor')
export class SmvEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ attribute: false })
  element!: Element;

  @state()
  get label(): string {
    return `${this.element.getAttribute('ldInst')}/${this.element.getAttribute(
      'cbName'
    )}`;
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
    return html`<oscd-action-icon
      label="${this.label}"
      .icon="${sizableSmvIcon}"
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
    ></oscd-action-icon>`;
  }
}
