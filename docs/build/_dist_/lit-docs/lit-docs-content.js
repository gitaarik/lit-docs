import { LitDocsAnchors } from './lit-docs-anchors.js';
import { LitDocsStyle } from './lit-docs-style.js';
export const LitDocsContent = superclass => class extends LitDocsAnchors(LitDocsStyle(superclass)) {};