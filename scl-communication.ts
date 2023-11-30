/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, TemplateResult, css, html } from 'lit';
import { property, query } from 'lit/decorators.js';

import '@material/mwc-fab';
import type { Fab } from '@material/mwc-fab';

import { newEditEvent } from '@openscd/open-scd-core';
import { getReference } from '@openenergytools/scl-lib';

import './communication/subnetwork-editor.js';
import {
  createElement,
  getChildElementsByTagName,
  newCreateWizardEvent,
} from './foundation.js';

export default class SclCommunicationPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @query('.action.add') add!: Fab;

  private createCommunication(): Element {
    const element: Element = createElement(this.doc, 'Communication', {});
    const scl = this.doc.documentElement;

    this.dispatchEvent(
      newEditEvent({
        parent: scl,
        node: element,
        reference: getReference(scl, 'Communication'),
      })
    );
    return element;
  }

  private openCreateSubNetworkWizard(): void {
    const parent =
      this.doc.querySelector(':root > Communication') ||
      this.createCommunication();

    this.dispatchEvent(newCreateWizardEvent(parent, 'SubNetwork'));
  }

  render(): TemplateResult {
    const communication = this.doc.querySelector('Communication');

    if (!communication)
      return html`<h1>
        <span style="color: var(--oscd-base1)"
          >Missing Communication Section</span
        ><mwc-fab
          class="action add"
          extended
          icon="add"
          label="Add SubNetwork"
          @click=${() => this.openCreateSubNetworkWizard()}
        ></mwc-fab>
      </h1>`;

    return html`<mwc-fab
        class="action add"
        extended
        icon="add"
        label="Add SubNetwork"
        @click=${() => this.openCreateSubNetworkWizard()}
      ></mwc-fab>
      <section>
        ${getChildElementsByTagName(communication, 'SubNetwork').map(
          subnetwork =>
            html`<subnetwork-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${subnetwork}
            ></subnetwork-editor>`
        )}
      </section> `;
  }

  static styles = css`
    * {
      --oscd-action-pane-theme-surface: var(--oscd-theme-base3);
      --oscd-action-pane-theme-on-surface: var(--oscd-theme-base00);
      --oscd-action-pane-theme-on-primary: var(--oscd-theme-base2);
      --oscd-action-pane-theme-font: 'Roboto';
      --oscd-action-icon-theme-font: 'Roboto';

      --oscd-action-icon-theme-on-surface: var(--oscd-theme-base00);
      --oscd-action-icon-theme-on-primary: var(--oscd-theme-base2);
    }

    :host {
      width: 100vw;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    section {
      display: flex;
      flex-direction: column;
      outline: none;
      padding: 8px 12px 16px;
    }

    subnetwork-editor {
      margin: 8px 12px 16px;
    }

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
  `;
}
