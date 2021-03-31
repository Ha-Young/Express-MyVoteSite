/* eslint-disable no-undef */
const voteOptionItemTemplate = (function () {
  return (function () {
    return `
      <input type="text" value=""/>
      <button class="vote-option-remove-btn" type="button">
        <i class="fas fa-minus"></i>
      </button>
    `;
  });
})();

window.templates = {
  ...window.templates,
  voteOptionItemTemplate,
};
