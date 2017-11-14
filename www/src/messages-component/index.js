import {Element} from '@polymer/polymer/polymer-element.js';
import DomRepeat from '@polymer/polymer/polymer.js';
import template from './template.html';

export class MessagesComponent extends Element {
  static get properties() {
    return {};
  }

  static get template() {
    return template;
  }

  constructor() {
    super()
    this.messages = [];

    let self = this;

    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:8080/messages');

    // Connection opened
    socket.addEventListener('open', function (event) {
      // socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      self.push('messages', JSON.parse(event.data));
    });

  }

  messagesChanged() {
    console.log('Messages changed');
  }

}
customElements.define('messages-component', MessagesComponent);