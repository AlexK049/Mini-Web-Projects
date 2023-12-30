const fs = require('fs');
const path = require('path');

const followsPath = path.join(__dirname, 'data/follows.json');
const howlsPath = path.join(__dirname, 'data/howls.json');
const usersPath = path.join(__dirname, 'data/users.json');

const dao = {
    getUser(id) {
        const users = JSON.parse(fs.readFileSync(usersPath));
        return users.find(user => user.id === id);
    },

    getUserByUsername(username) {
        const users = JSON.parse(fs.readFileSync(usersPath));
        return users.find(user => user.username === username);
    },

    getUserHowls(userId) {
        const users = JSON.parse(fs.readFileSync(usersPath));
        const howls = JSON.parse(fs.readFileSync(howlsPath));

        const user = users.find(user => user.id === userId);
        const userHowls = howls.filter(howl => howl.userId === userId)
            .map(howl => ({ ...howl, user: user }));
        userHowls.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

        return userHowls;
    },

    postHowl(userId, text) {
        const howls = JSON.parse(fs.readFileSync(howlsPath));
        const newHowl = { id: howls.length + 1, userId, text: text, datetime: new Date() };
        howls.push(newHowl);
        fs.writeFileSync(howlsPath, JSON.stringify(howls, null, 2));
        return newHowl;
    },

    getUsersFollowing(userId) {
        const following = JSON.parse(fs.readFileSync(followsPath));
        const userFollowingData = following[userId];
        if (userFollowingData && userFollowingData.following) {
            return userFollowingData.following;
        } else {
            return [];
        }
    },

    followUser(userId, userToFollowId) {
        let following = JSON.parse(fs.readFileSync(followsPath));

        if (following[userId]) {
            following[userId].following.push(userToFollowId);
        } else {
            following[userId] = { userId, following: [userToFollowId] };
        }

        fs.writeFileSync(followsPath, JSON.stringify(following, null, 2));
    },

    unfollowUser(userId, userToUnfollowId) {
        let following = JSON.parse(fs.readFileSync(followsPath));

        if (following[userId]) {
            const index = following[userId].following.indexOf(userToUnfollowId);
            if (index !== -1) {
                following[userId].following.splice(index, 1);
            }
        }

        fs.writeFileSync(followsPath, JSON.stringify(following, null, 2));
    },

    getUserFeed(userId) {
        const howls = JSON.parse(fs.readFileSync(howlsPath));
        const users = JSON.parse(fs.readFileSync(usersPath));

        const allowedUsersInFeed = [...this.getUsersFollowing(userId)];
        allowedUsersInFeed.push(userId);

        const feed = howls.filter(howl => allowedUsersInFeed.includes(howl.userId))
            .map(howl => ({ ...howl, user: users.find(user => user.id === howl.userId) }));
        feed.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

        return feed;
    }
};

module.exports = dao;
