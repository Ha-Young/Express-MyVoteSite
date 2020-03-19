const deleteBtn = document.querySelector('.deleteBtn');
const vote = document.querySelector('.vote');
const voteUrl = vote.href;
const option = document.querySelector('.option');


vote.addEventListener('click', () => {
    fetch(voteUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: option.value })
    })
        .then((res) => {
            return res.json();
        })
        .then((myJson) => {
            if (!myJson.result) {
                alert('로그인 하셔야 투표하실 수 있습니다.');
                window.location.href = '/login';
            } else if (myJson.result === 'overlap') {
                alert('중복 투표는 불가능합니다.');
            } else {
                alert('투표 성공');
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

if (deleteBtn) {
    const url = deleteBtn.href;
    deleteBtn.addEventListener('click', () => {
        fetch(url, {
            method: 'DELETE',
        });
    });
}
