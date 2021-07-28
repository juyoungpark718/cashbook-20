import core from '../core';

import { qs } from '../utils';
import '../scss/alert.scss';

export default class Alert extends core.RootComponent {
  template() {
    const { color = 'danger', text } = this.$props;
    return `
    <div class="alert-${color} alert-box">
      <div class="alert-content">
        ${text}
      </div>
      <button>
        <svg class="remove" viewBox="0 0 100 100">
          <line stroke="white" x1="30" y1="30" x2="70" y2="70" />
          <line stroke="white" x1="70" y1="30" x2="30" y2="70" />
        </svg>
      </button>
      <div class="alert-pin"></div>
    </div>
    `;
  }
  mounted() {
    setTimeout(() => {
      const alertBox = qs('.alert-box');
      if (!alertBox) return;
      alertBox.classList.add('erase');
      setTimeout(() => {
        removeAlertWrapper();
      }, 300);
    }, 3000);
  }
  setEvent() {
    this.addEvent('click', '.alert-box > button', removeAlertWrapper);
  }
}

function removeAlertWrapper() {
  const wrapperParent = qs('.alert-wrapper').parentNode;
  if (!wrapperParent) return;
  while (wrapperParent.hasChildNodes()) {
    if (!wrapperParent.lastChild) return;
    wrapperParent.removeChild(wrapperParent.lastChild);
  }
}
