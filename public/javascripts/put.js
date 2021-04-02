const votingForm = document.querySelector(".voting-form");
const votingMessage = document.querySelector(".vote-message");

async function requestUpdateData(ev) {
  ev.preventDefault();
  
  const { baseURI, "voting-option": { value } } = ev.target;
  let redirectUrl = "/login";

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
    const { isSuccessVoting, queryString, message } = await response.json();
    
    if (!isSuccessVoting) {
      if (queryString) {
        redirectUrl += `?next=${queryString}`;

        throw new Error(message);
      }
      
      votingMessage.textContent = message;

      return;
    }

    votingMessage.textContent = message;
  } catch (error) {
    console.error(error);
    window.location.href = redirectUrl;
  }
}

if (votingForm) {
  votingForm.addEventListener("submit", requestUpdateData);
}
