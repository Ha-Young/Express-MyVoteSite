const optionButton = document.querySelector("#optionButton");
    const optionList = document.querySelector(".option-list");
    let index = 0;

    optionButton.addEventListener("click", () => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("name", "option_title");
      input.setAttribute("data-index", index);
      li.appendChild(input);
      index++;
      optionList.appendChild(li);
    });
