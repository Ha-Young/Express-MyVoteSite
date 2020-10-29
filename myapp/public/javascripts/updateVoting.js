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
      return alert(data.message);
    }
  } catch (err) {
    console.log('PUT 요청 에러');
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
    console.log(err);
  }
}
