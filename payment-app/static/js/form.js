import { 
    isValidName,
    isValidMessage,
    isValidEmail,
    isValidPhoneNumber,
    isValidCardType,
    isValidCardNumber,
    isValidExpirationDate,
    isValidCCV,
    isValidAmount } from './validation.js'

//apply inactive page style to all but first div of form
const formPages = document.querySelectorAll("form > div");
for (let i = 1; i < formPages.length; i++) {
    const page = formPages[i];
    page.classList.add("inactive-form-page");
}

//get all input elements and add a handler that removes error class on value change
var inputElements = document.querySelectorAll('input, textarea, div');
inputElements.forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
  });
});

//add event listener that given the index of the next button, it will take you to the next form page
const nextButtons = document.querySelectorAll(".next-button");
nextButtons.forEach((btn, btnInd) => {
    btn.addEventListener("click", (e) => 
    {
        e.preventDefault();
        const isValid = validatePage(btnInd)
        if (!isValid) return;
        navigate(btnInd, true);
        updateProgressBar(btnInd + 1);
    })
});

//add event listener that given the index of the back button, it will take you to the previous form page
const backButtons = document.querySelectorAll(".back-button");
backButtons.forEach((btn, btnInd) => {
    btn.addEventListener("click", (e) => 
    {
        //buttons inside html form elements submit the form when clicked
        e.preventDefault();
        //the page index is the back button index + 1 cuz there is no back btn on the first page
        navigate(btnInd + 1, false);
        //update progress bar
        updateProgressBar(btnInd);
    })
});

addEventListener("submit", (e) => {
    e.preventDefault();
    const isValid = validatePage(2);
    if (!isValid) return;
    const form = document.querySelector("form");
    form.submit();
});

//event listener that handles image upload
const imageUpload = document.querySelector("#image-upload");
const imagePreview = document.querySelector("#preview-image");
const imagePreviewBorder = document.querySelector("#preview-image-border");
imagePreview.style.visibility = "hidden";
imageUpload.addEventListener("change", (e) => {
    const fileInput = e.target;
    
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];

        if (selectedFile.type.startsWith("image/")) {
            const temporaryUrl = URL.createObjectURL(selectedFile);

            imagePreview.src = temporaryUrl;
            imagePreview.style.visibility = "visible";
            imagePreviewBorder.style.visibility = "hidden";
        } else {
            imagePreview.style.visibility = "hidden";
            imagePreviewBorder.style.visibility = "visible";
        }
    }
});

//handle notification checkboxes
const doNotNotifyCheckbox = document.querySelector("#do-not-notify");
doNotNotifyCheckbox.addEventListener("change", () => {
    const emailCheckbox = document.querySelector("#email");
    const smsCheckbox = document.querySelector("#sms");
    if (doNotNotifyCheckbox.checked) {
        emailCheckbox.checked = false;
        smsCheckbox.checked = false;
        emailCheckbox.disabled = true;
        smsCheckbox.disabled = true;
    } else {
        emailCheckbox.disabled = false;
        smsCheckbox.disabled = false;
    }
});

//make credit card number input easier by auto inputting dashes and preventing certain characters from being entered
const creditCardInput = document.querySelector("#card-number");
creditCardInput.addEventListener("input", (e) => {
    let creditCardNumber = e.target.value.replace(/\D/g, '');
    creditCardNumber = creditCardNumber.slice(0, 16);

    if (creditCardNumber.length > 0) {
        creditCardNumber = creditCardNumber.match(/.{1,4}/g).join('-');
    }

    e.target.value = creditCardNumber;
});

const ccvInput = document.querySelector("#ccv");
ccvInput.addEventListener('input', (e) => {
    let ccv = e.target.value.replace(/\D/g, '');
    ccv = ccv.slice(0, 4);

    e.target.value = ccv;
});

const amountInput = document.querySelector("#amount");
amountInput.addEventListener('input', (e) => {
    let amount = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = amount;
});

/**
 * 
 * @param {number} pageIndex the index of the page the button is found on
 * @param {boolean} forward if true, navigate forward, if false navigate back
 */
function navigate(pageIndex, forward) {
    for (let i = 0; i < formPages.length; i++) {
        if (forward && pageIndex == i - 1) {
            formPages[i].classList.remove("inactive-form-page");
        } else if (!forward && pageIndex == i + 1) {
            formPages[i].classList.remove("inactive-form-page");
        } else {
            formPages[i].classList.add("inactive-form-page");
        }
    }
}

/**
 * 
 * @param {number} newPageIndex the page the user is on
 */
function updateProgressBar(pageIndex) {
    const progressSteps = document.querySelectorAll(".progress-step");
    const firstBar = document.querySelector(".connecting-bar-1");
    const secondBar = document.querySelector(".connecting-bar-2");

    //remove all styles
    progressSteps.forEach(x => {
        x.classList.remove("progress-step-done");
        x.classList.remove("progress-step-active");
    });
    firstBar.classList.remove("progress-step-done");            
    secondBar.classList.remove("progress-step-done");            

    //reapply them depending on the page
    switch (pageIndex) {
        case 0:
            progressSteps[0].classList.add("progress-step-active");
            break;
        case 1:
            progressSteps[0].classList.add("progress-step-done");
            firstBar.classList.add("progress-step-done");            
            progressSteps[1].classList.add("progress-step-active");
            break;
        case 2:
            progressSteps[0].classList.add("progress-step-done");
            firstBar.classList.add("progress-step-done");   
            progressSteps[1].classList.add("progress-step-done");
            secondBar.classList.add("progress-step-done");   
            progressSteps[2].classList.add("progress-step-active");
            break;
    }
}

/**
 * 
 * @param {number} pageIndex the index of the page the button is found on
 */
function validatePage(pageIndex) {
    let isValid = true;
    switch (pageIndex) {
        case 0:
            const imageUpload = document.querySelector("#image-upload");
            if (imageUpload.files.length == 0 || !imageUpload.files[0].type.startsWith("image/")) {
                imageUpload.classList.add("error");
                isValid = false;
            }
            const senderFirstName = document.querySelector("#sender-first-name");
            if (!isValidName(senderFirstName.value)) {
                senderFirstName.classList.add("error");
                isValid = false;
            }
            const senderLastName = document.querySelector("#sender-last-name");
            if (!isValidName(senderLastName.value)) {
                senderLastName.classList.add("error");
                isValid = false;
            }
            break;
        case 1:
            const recipientFirstName = document.querySelector("#recipient-first-name");
            if (!isValidName(recipientFirstName.value)) {
                recipientFirstName.classList.add("error");
                isValid = false;
            }
            const recipientLastName = document.querySelector("#recipient-last-name");
            if (!isValidName(recipientLastName.value)) {
                recipientLastName.classList.add("error");
                isValid = false;
            }
            const messageBox = document.querySelector("#message");
            if (!isValidMessage(messageBox.value)) {
                messageBox.classList.add("error");
                isValid = false;
            }
            const emailCheckbox = document.querySelector("#email");
            const smsCheckbox = document.querySelector("#sms");
            const doNotNotifyCheckbox = document.querySelector("#do-not-notify");
            const emailField = document.querySelector("#sender-email");
            const smsField = document.querySelector("#sender-number");
            if (!emailCheckbox.checked && !smsCheckbox.checked && !doNotNotifyCheckbox.checked) {
                document.querySelector("#notify-area").classList.add("error")
                isValid = false;
            }
            if (emailCheckbox.checked && !isValidEmail(emailField.value)) {
                emailField.classList.add("error");
                isValid = false;
            }
            if (smsCheckbox.checked && !isValidPhoneNumber(smsField.value)) {
                smsField.classList.add("error");
                isValid = false;
            }
            break;
        case 2:
            const cardType = document.querySelector("#card-type");
            const cardNumber = document.querySelector("#card-number");
            const expiration = document.querySelector("#expiration");
            const ccv = document.querySelector("#ccv");
            const amount = document.querySelector("#amount");
            const agreeCheckbox = document.querySelector("#agree");

            if (!isValidCardType(cardType.value)) {
                cardType.classList.add("error");
                isValid = false;
            }

            if (!isValidCardNumber(cardNumber.value)) {
                cardNumber.classList.add("error");
                isValid = false;
            }

            if (expiration.value == "" || !isValidExpirationDate(expiration.value)) {
                expiration.classList.add("error");
                isValid = false;
            }

            if (!isValidCCV(ccv.value)) {
                ccv.classList.add("error");
                isValid = false;
            }

            if (!isValidAmount(amount.value)) {
                amount.classList.add("error");
                isValid = false;
            }

            if (!agreeCheckbox.checked) {
                document.querySelector("#terms-group").classList.add("error");
                isValid = false;
            }
            break;
    }
    return isValid;
}
