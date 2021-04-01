const votingForm = document.querySelector(".voting-form");

async function requestUpdateData(ev) {
  ev.preventDefault();

  const { baseURI, "voting-option": { value } } = ev.target;

  try {
    const response = await fetch(baseURI, { 
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
				option: value,
			}), 
    });

    const { user, votted, isSuccessVoting } = await response.json();
		
    if (!user) {
      window.location.replace("/login");
    } // error.. push 미들웨어

    if (isSuccessVoting) {
      const votingCount = document.getElementById(`${value}`);
      votingCount?.textContent = votted;
    }
  } catch (error) {
    console.error(error);
  }
}

votingForm.addEventListener("submit", requestUpdateData);
