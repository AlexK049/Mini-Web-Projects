import express from 'express';
import multer from 'multer';
import {
    isValidFile,
    isValidName,
    isValidMessage,
    isValidNotifyMethod,
    isValidCardType,
    isValidCardNumber,
    isValidExpirationDate,
    isValidCCV,
    isValidAmount
} from './static/js/validation.js'
//https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT;

const html_path = __dirname + '/templates/';

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: '/uploads/',
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(html_path + "form.html");
});

app.post('/send', upload.single('image-upload'), (req, res) => {
    const recipientFirstName = req.body['recipient-first-name']?.toLowerCase();
    const recipientLastName = req.body['recipient-last-name']?.toLowerCase();
    if ((recipientFirstName == 'stu' || recipientFirstName == 'stuart') && recipientLastName == 'dent') {
        res.sendFile(html_path + "error.html");
    } else if (isRequestValid(req)) {
        res.sendFile(html_path + "success.html");
    } else {
        res.sendFile(html_path + "error.html");
    }
});

function isRequestValid(req) {
    return isValidFile(req.file)
        && isValidName(req.body['sender-first-name'])
        && isValidName(req.body['sender-last-name'])
        && isValidName(req.body['recipient-first-name'])
        && isValidName(req.body['recipient-last-name'])
        && isValidMessage(req.body['message'])
        && isValidNotifyMethod(req.body['notify-method'], req.body['sender-email'], req.body['sender-number'])
        && isValidCardType(req.body['card-type'])
        && isValidCardNumber(req.body['card-number'])
        && isValidExpirationDate(req.body['expiration'])
        && isValidCCV(req.body['ccv'])
        && isValidAmount(req.body['amount'])
        && req.body['agree'] == 'on';
}

app.listen(PORT, () => console.log(`Live on http://localhost:${PORT}`));
