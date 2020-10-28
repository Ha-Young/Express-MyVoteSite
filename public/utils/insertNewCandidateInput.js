const addCandidateBtn = document.getElementById('addCandidate');
const ballotFormChildren = document.getElementsByClassName('ballotForm')[0].children;

addCandidateBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const inputLength = ballotFormChildren.length - 1;

  if (inputLength >= 5) {
    alert('후보는 최대 5개까지 추가할 수 있습니다');
    return;
  }

  const newCandidateInput = document.createElement('div');
  const title = document.createElement('div');
  const content = document.createElement('div');
  newCandidateInput.classList.add('input-wrapper');
  title.classList.add('input-wrapper');
  content.classList.add('input-wrapper');

  title.innerHTML = `
    <label>
      후보 ${inputLength + 1}
    </label>
    <input type="text" name="candidates[${inputLength}][title]" required />
  `
  content.innerHTML = `
    <label>
      설명
    </label>
    <textarea name="candidates[${inputLength}][content]" required />
  `

  newCandidateInput.appendChild(title);
  newCandidateInput.appendChild(content);

  ballotFormChildren[inputLength].insertAdjacentElement('beforeBegin', newCandidateInput);
});
