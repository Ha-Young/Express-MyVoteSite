const $votingSubmitBtn = document.querySelector('.voting-submit-btn');
const $options = document.querySelectorAll('.option-radio');
const $votingInfo = document.querySelector(".voting-info");
const $optionsList = Array.from($options);
console.log($votingSubmitBtn)

//const $options = document.getElementsByName('.option');

async function handleVotingSubmit(e) {
  try {
    e.preventDefault();

    let selectedOptionValue = null;
    let selectedOptionId = null;

    for (let option of $optionsList) {
      console.log(option, "list")
      if (option.checked) {
        selectedOptionValue = option.value;
        selectedOptionId = option.id;

        break;
      }
    }

    const originPath = window.location.origin;
    const votingPath = window.location.pathname;
    const votingId = votingPath.split("/").pop();

    console.log(selectedOptionId, selectedOptionValue, votingId, "idddddd")
    console.log(`${originPath}${votingPath}`, "path")

    if (!selectedOptionId || !selectedOptionValue) {
      console.log(selectedOptionId, selectedOptionValue, "inside")

      const errorMessage = document.createElement("p");
      $votingInfo.appendChild(errorMessage);
      errorMessage.textContent = "please select at least one option";
      window.location.href = `${originPath}${votingPath}`;
    }



    const fetching = await fetch(
      `${originPath}${votingPath}`,
      {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ votingId, selectedOptionValue, selectedOptionId })
      });
      const content = await fetching.json();

      if (content === "no user") {
        window.location.href = "/login"
        return;
      } else if (content === "user exist")  {
        
        window.location.href = `${originPath}${votingPath}`
      } else if (content === "already voted") {
        const errorMessage = document.createElement("p");
      $votingInfo.appendChild(errorMessage);
      errorMessage.textContent = "alraedy voted for this voting";
        window.location.href = `${originPath}${votingPath}`
      }

    // const content = await fetching.json();
    // //     console.log(content, "contet")

    // if (fetching.status === 200) {
    //   window.location = "/";
    // } else 
    // }
    // if (fetching.status === 400){ // 굉장히 취약한듯..
      //   window.location = "/login";
    // const result = await fetching.json();
    // console.log(result);

    // window.location.href = result;
    // }
  } catch (error) {
    console.warn(error);
  }
}

if ($votingSubmitBtn) {
  $votingSubmitBtn.addEventListener("click", handleVotingSubmit);
}




// $votingSubmitBtn.addEventListener('click', async (e) => {
//     try {
//       console.log($options[0].checked, "????")

//     //   let data = {};

//     //   for (let i = 1; i < optionInput.length; i++) {
//     //     if (optionInput[i].checked) {
//     //       data.option = optionInput[i].value;
//     //     }
//     //   }

//     //   const response = await fetch(`http://localhost:3000/votings/${id}`, {
//     //     method: 'PUT',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(data),
//     //   });

//     //   const result = await response.json();

//     //   switch (result.message) {
//     //     case SUCCESS_MESSAGE_VOTING:
//     //       return location.assign(`http://localhost:3000/success/${result.message}`);
//     //     case ERROR_MESSAGE_REQUEST_FAIL:
//     //       return location.assign('http://localhost:3000/login');
//     //     case ERROR_MESSAGE_DELETE_FAIL:
//     //       return location.assign(`http://localhost:3000/error/${result.message}`);
//     //   }
//     } catch (err) {
//       console.error(err);
//     }
//   });



const $deleteButton = document.querySelector(".voting-delete-btn");

if ($deleteButton) {
  $deleteButton.addEventListener("click", handleDeleteBtnClick)
}



async function handleDeleteBtnClick(e) {
  //response.result
  // 성공 표시
  // redirect to 문제, flash 가져갈것
  try {
    e.preventDefault();

    const originPath = window.location.origin;
    const votingPath = window.location.pathname;

    const rawResponse = await fetch(`${originPath}${votingPath}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    const content = await rawResponse.json();
    console.log(rawResponse, content, "!?")

    if (content.result === "ok") {
      window.location.href = "/";
    }

  } catch (error) {
    console.warn(error)
  }
}


// const handleDeleteBtnClick = async () => {

//     const option = {
//       method: 'DELETE',
//       redirect: 'follow',
//       headers: { 'Content-Type': 'application/json' },
//     };

//     try {
//       const response = await fetch(`${location.origin}/votings/${votingId}`, option);

//       if (response.result = 'ok') {
//         window.location.href = `${location.origin}/`;
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   };