const pageNumbers = document.querySelectorAll('.pageNumber');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

prevButton.addEventListener('click', function () {
  if (pageNumbers[0].textContent * 1 === 1) return;

  pageNumbers.forEach(pageNumber => {
    pageNumber.textContent = pageNumber.textContent * 1 - pageNumbers.length;
  });
});

nextButton.addEventListener('click', function () {
  if (pageNumbers[pageNumbers.length - 1].textContent * 1 === pageNumbers.length) return;

  pageNumbers.forEach(pageNumber => {
    pageNumber.textContent = pageNumber.textContent * 1 + pageNumbers.length;
  });
});
