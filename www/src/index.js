import {Element as PolymerElement} from '@polymer/polymer/polymer-element.js';

import './messages-component';
import './index.css';

export class MyApp extends PolymerElement {

  static get template() {
    return `<div>
      <!--- <div>[[name]]</div> --->
      <messages-component></messages-component>
    </div>`
  }

  constructor() {
    super();
    this.name = 'Polymer 3 works!!!';
  }

  static get properties() {
    name: {
      Type: String
    }
  }
}

customElements.define('my-app', MyApp);