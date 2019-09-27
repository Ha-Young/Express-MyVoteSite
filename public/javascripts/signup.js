(function () {
  var $checkIdButton = document.querySelector('.check-duplicate-email');
  var $repeatedPassword = document.querySelector('.password-repeat');

  $checkIdButton.addEventListener('click', function(event) {
    event.preventDefault();
    var $emailId = document.querySelector('.email-id');
    var $resultMessage = document.querySelector('.check-result');

    fetch('/signup/checkid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: $emailId.value })
    })
    .then(function(res) {return res.json();})
    .then(function(res) {
      if (res.hasUser) {
        $resultMessage.textContent = 'The email is already in use.';
        $resultMessage.classList.add('disabled');
        return;
      }
      $resultMessage.classList.remove('disabled');
      $resultMessage.textContent = 'The email is available.';
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  });

  $repeatedPassword.addEventListener('keyup', function(event) {
    var $password = document.querySelector('.password');
    var $checkMessage = document.querySelector('.check-password');

    if ($password.value !== event.target.value) {
      $checkMessage.classList.add('disabled');
      $checkMessage.textContent = 'Please write the same password.';
      return;
    }
    $checkMessage.classList.remove('disabled');
    $checkMessage.textContent = 'Good!';
  });


})();
