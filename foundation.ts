export function compareNames(a: string, b: string): number {
  return a.localeCompare(b);
}

export function getChildElementsByTagName(
  element: Element | null | undefined,
  tag: string | null | undefined
): Element[] {
  if (!element || !tag) return [];
  return Array.from(element.children).filter(child => child.tagName === tag);
}

export function createElement(
  doc: Document,
  tag: string,
  attrs: Record<string, string | null>
): Element {
  const element = doc.createElementNS(doc.documentElement.namespaceURI, tag);
  Object.entries(attrs)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== null)
    .forEach(([name, value]) => element.setAttribute(name, value!));
  return element;
}

/* eslint-disable no-undef */
interface WizardRequestBase {
  subWizard?: boolean;
}

export interface EditWizardRequest extends WizardRequestBase {
  element: Element;
}

export interface CreateWizardRequest extends WizardRequestBase {
  parent: Element;
  tagName: string;
}

export type WizardRequest = EditWizardRequest | CreateWizardRequest;

type EditWizardEvent = CustomEvent<EditWizardRequest>;
type CreateWizardEvent = CustomEvent<CreateWizardRequest>;
export type WizardEvent = EditWizardEvent | CreateWizardEvent;

export function newEditWizardEvent(
  element: Element,
  subWizard?: boolean,
  eventInitDict?: CustomEventInit<Partial<EditWizardRequest>>
): EditWizardEvent {
  return new CustomEvent<EditWizardRequest>('oscd-edit-wizard-request', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { element, subWizard, ...eventInitDict?.detail },
  });
}

export function newCreateWizardEvent(
  parent: Element,
  tagName: string,
  subWizard?: boolean,
  eventInitDict?: CustomEventInit<Partial<CreateWizardRequest>>
): CreateWizardEvent {
  return new CustomEvent<CreateWizardRequest>('oscd-create-wizard-request', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {
      parent,
      tagName,
      subWizard,
      ...eventInitDict?.detail,
    },
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit-wizard-request']: EditWizardRequest;
    ['oscd-create-wizard-request']: CreateWizardRequest;
  }
}
