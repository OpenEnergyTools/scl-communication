/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, TemplateResult, css, html } from 'lit';

import '@material/mwc-icon-button';
import type { IconButton } from '@material/mwc-icon-button';

import '@openscd/oscd-action-pane';

import { newEditEvent } from '@openscd/open-scd-core';

import './connectedap-editor.js';
import './gse-editor.js';
import './smv-editor.js';

import { customElement, property, query, state } from 'lit/decorators.js';
import {
  compareNames,
  newCreateWizardEvent,
  newEditWizardEvent,
} from '../foundation.js';

/** [[`Communication`]] subeditor for a `SubNetwork` element. */
@customElement('subnetwork-editor')
export class SubNetworkEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  /** SCL element SubNetwork */
  @property({ attribute: false })
  element!: Element;

  /** SubNetwork attribute name */
  @state()
  get name(): string {
    return this.element.getAttribute('name')!;
  }

  /** SubNetwork attribute desc */
  @state()
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }

  /** SubNetwork attribute type */
  @state()
  get type(): string | null {
    return this.element.getAttribute('type') ?? null;
  }

  /** SubNetwork child elements BitRate label */
  @state()
  get bitrate(): string | null {
    const bitRate = this.element.querySelector('BitRate');
    if (bitRate === null) return null;
    const bitRateValue = bitRate.textContent;
    const m = bitRate.getAttribute('multiplier');
    const unit = ` ${m ?? ''}b/s`;
    return bitRateValue ? bitRateValue + unit : null;
  }

  @query('.action.add') add!: IconButton;

  @query('.action.edit') edit!: IconButton;

  @query('.action.delete') delete!: IconButton;

  private openCreateConnectedAPwizard(): void {
    this.dispatchEvent(newCreateWizardEvent(this.element, 'ConnectedAP'));
  }

  openEditWizard(): void {
    this.dispatchEvent(newEditWizardEvent(this.element));
  }

  removeElement(): void {
    if (this.element) this.dispatchEvent(newEditEvent({ node: this.element }));
  }

  private renderSmvEditors(iedName: string): TemplateResult[] {
    return Array.from(
      this.element
        .closest('Communication')
        ?.querySelectorAll(`ConnectedAP[iedName="${iedName}"] > SMV`) ?? []
    ).map(
      smv => html`<smv-editor
        class="${smv.closest('SubNetwork') !== this.element ? 'disabled' : ''}"
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${smv}
      ></smv-editor>`
    );
  }

  private renderGseEditors(iedName: string): TemplateResult[] {
    return Array.from(
      this.element
        .closest('Communication')
        ?.querySelectorAll(`ConnectedAP[iedName="${iedName}"] > GSE`) ?? []
    ).map(
      gse => html`<gse-editor
        class="${gse.closest('SubNetwork') !== this.element ? 'disabled' : ''}"
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${gse}
      ></gse-editor>`
    );
  }

  private renderConnectedApEditors(iedName: string): TemplateResult[] {
    return Array.from(
      this.element.parentElement?.querySelectorAll(
        `:scope > SubNetwork > ConnectedAP[iedName="${iedName}"]`
      ) ?? []
    ).map(
      connectedAP =>
        html`<connectedap-editor
          class="${connectedAP.parentElement !== this.element
            ? 'disabled'
            : ''}"
          .element=${connectedAP}
        ></connectedap-editor>`
    );
  }

  private renderIEDs(): TemplateResult[] {
    return Array.from(this.element.querySelectorAll(':scope > ConnectedAP'))
      .map(connAP => connAP.getAttribute('iedName')!)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(compareNames)
      .map(
        iedName => html` <oscd-action-pane id="iedSection" label="${iedName}">
          ${this.renderConnectedApEditors(iedName)}${this.renderGseEditors(
            iedName
          )}${this.renderSmvEditors(iedName)}
        </oscd-action-pane>`
      );
  }

  private subNetworkSpecs(): string {
    if (!this.type && !this.bitrate) return '';

    return `(${[this.type, this.bitrate].filter(text => !!text).join(' — ')})`;
  }

  private header(): string {
    return `${this.name} ${this.desc === null ? '' : `— ${this.desc}`}
    ${this.subNetworkSpecs()}`;
  }

  render(): TemplateResult {
    return html`<oscd-action-pane label="${this.header()}">
      <abbr slot="action" title="Edit">
        <mwc-icon-button
          class="action edit"
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="Remove">
        <mwc-icon-button
          class="action delete"
          icon="delete"
          @click=${() => this.removeElement()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="Add">
        <mwc-icon-button
          class="action add"
          icon="playlist_add"
          @click="${() => this.openCreateConnectedAPwizard()}"
        ></mwc-icon-button>
      </abbr>
      <div id="iedContainer">${this.renderIEDs()}</div>
    </oscd-action-pane> `;
  }

  static styles = css`
    #iedContainer {
      display: grid;
      box-sizing: border-box;
      gap: 12px;
      padding: 8px 12px 16px;
      grid-template-columns: repeat(auto-fit, minmax(150px, auto));
    }

    #iedSection:not(:focus):not(:focus-within) .disabled {
      display: none;
    }

    #iedSection:not(:focus):not(:focus-within) gse-editor {
      display: none;
    }

    #iedSection:not(:focus):not(:focus-within) smv-editor {
      display: none;
    }

    #iedSection .disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
