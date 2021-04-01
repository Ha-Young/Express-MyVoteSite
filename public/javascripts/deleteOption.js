const $deleteButton = document.querySelector(".voting-delete-btn");

$deleteButton.addEventListener("click", handleDeleteBtnClick)

const handleDeleteBtnClick = async () => {
    const option = {
      method: 'DELETE',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`${location.origin}/votings/${votingId}`, option);

      if (response.result = 'ok') {
        window.location.href = `${location.origin}/`;
      }
    } catch (error) {
      throw new Error(error);
    }
  };