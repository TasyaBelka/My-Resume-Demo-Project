const callbackForm = document.querySelector('.callback-form-container');
const callbackTnxsModal = document.querySelector('#thanks-modal');

const userName = document.querySelector('#callback-form-input-name');
const userEmail = document.querySelector('#callback-form-input-email');
const userPhone = document.querySelector('#callback-form-input-phone');

userPhone.addEventListener('click', function() {
    if (!userPhone.value.trim()) {
        userPhone.value = '+380';
    }
});

userPhone.addEventListener('blur', function() {
    if (userPhone.value === '+380') {
        userPhone.value = '';
    }
});

callbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let hasError = false;

    if (!userName.value.trim()) {
        userName.classList.add('error-input');
        hasError = true;
    } else {
        userName.classList.remove('error-input');
    };
    if (!userEmail.value.trim() || !isEmailValid(userEmail.value)) {
        userEmail.classList.add('error-input');
        hasError = true;
    } else {
        userEmail.classList.remove('error-input');
    };
    if (!userPhone.value.trim() || !isPhoneValid(userPhone.value)) {
        userPhone.classList.add('error-input');
        hasError = true;
    } else {
        userPhone.classList.remove('error-input');
    };
    if (hasError) {
        return;
    };

    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';

    callbackTnxsModal.classList.add('modal-active');

    setTimeout(function() {
        callbackTnxsModal.classList.remove('modal-active');
    }, 2000);
});

function isPhoneValid(phone = '') {
    const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

    return phone.match(regexp);
};

function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};