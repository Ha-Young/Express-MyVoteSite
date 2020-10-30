async function putRequestFunc(votingID) {
  const [targetVotingId, targetOptionId] = votingID.split(',');
  const lastPageURL = `/votings/${targetVotingId}`;
  const lastPageAndOptionInfo = { lastPageURL, targetOptionId };

  try {
    const response = await fetch(`/votings/${targetVotingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(lastPageAndOptionInfo)
    });

    if (response.status === 401) {
      window.location.href = '/login';
    } else {
      const data = await response.json();
      alert(data.message);
      return window.location.href = `/votings/${targetVotingId}`;
    }
  } catch (err) {
    return alert('새로운 투표를 생성하는 도중 문제가 발생했습니다. 다시 시도해주세요.');
  }
}

async function deleteRequestFunc(votingID) {
  try {
    const response = await fetch(`/votings/${votingID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    });

    const data = await response.json();
    alert(data.message);
    return window.location.href = '/';
  } catch (err) {
    return alert('삭제하는 도중 문제가 발생했습니다. 다시 시도해주세요.');
  }
}
