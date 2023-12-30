export function isValidFile(file) {
    if (file && file.mimetype?.startsWith("image/")) {
        return true;
    }
    return false;
}

export function isValidName(name) {
    return name && name.trim() != '';
}

export function isValidMessage(message) {
    return message && message.length >= 10;
}

export function isValidEmail(email) {
    return email && email.trim() != '';
}

export function isValidPhoneNumber(number) {
    return number && number.trim() != '';
}

export function isValidNotifyMethod(notifyMethod, email, phoneNumber) {
    if (notifyMethod == 'do-not-notify') {
        return true;
    } else if (notifyMethod == 'email' && isValidEmail(email)) {
        return true;
    } else if (notifyMethod == 'sms' && isValidPhoneNumber(phoneNumber)) {
        return true;
    } else if (notifyMethod.includes('email') 
                && notifyMethod.includes('sms') 
                && isValidEmail(email) 
                && isValidPhoneNumber(phoneNumber)) {
        return true;
    }
    return false;
}

export function isValidCardType(cardType) {
    if (cardType == "Visa" || cardType == "Mastercard" || cardType == "Amex") {
        return true;
    }
    return false;
}

export function isValidCardNumber(cardNumber) {
    const cardNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (cardNumber.match(cardNumberRegex)) {
        return true;
    }
    return false;
}

export function isValidExpirationDate(expiration) {
    const currentDate = new Date();
    const expirationDate = new Date(expiration);
    if (expirationDate && expirationDate > currentDate) {
        return true;
    }
    return false;
}

export function isValidCCV(ccv) {
    const ccvRegex = /^\d{3,4}$/;
    if (ccv.match(ccvRegex)) {
        return true;
    }
    return false;
}

export function isValidAmount(amount) {
    const amountRegex = /^\d+(\.\d{2})?$/;
    if (amount.match(amountRegex)) {
        return true;
    }
    return false;
}
