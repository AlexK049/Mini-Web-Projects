const fs = require('fs');
const crypto = require('crypto');

// Read user data from user.json file
const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));

// Function to update user password with hashed password
const updateUserPassword = user => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(user.password, user.salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                reject({ code: 400, message: "Error: " + err });
            }

            const hashedPassword = derivedKey.toString('hex');
            user.password = hashedPassword;
            resolve(user);
        });
    });
};

// Update passwords for all users
const updatePasswordsPromises = users.map(user => updateUserPassword(user));

// Wait for all password updates to complete
Promise.all(updatePasswordsPromises)
    .then(updatedUsers => {
        // Write updated user data to updatedUsers.json file
        fs.writeFileSync('updatedUsers.json', JSON.stringify(updatedUsers, null, 2), 'utf-8');
        console.log('Updated user data has been written to updatedUsers.json');
    })
    .catch(error => {
        console.error('Error updating passwords:', error.message);
    });
