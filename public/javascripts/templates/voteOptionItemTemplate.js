/* eslint-disable no-undef */
window.templates = {
  ...window.templates,
  voteOptionItemTemplate: function () {
    return `
      <input type="text" value=""/>
      <button class="vote-option-remove-btn" type="button">
        <i class="fas fa-minus"></i>
      </button>
    `;
  },
};
