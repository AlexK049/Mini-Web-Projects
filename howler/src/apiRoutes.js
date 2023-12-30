const express = require('express');
const apiRouter = express.Router();
const dao = require('./dao');

apiRouter.use(express.json());

const { TokenMiddleware } = require('./middleware/jwt');

//get a specific user based on their id
apiRouter.get('/users/:id', TokenMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const user = dao.getUser(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'user not found' });
    }
});

//get a specific user based on their username
apiRouter.get('/users/username/:username', TokenMiddleware, (req, res) => {
    const username = req.params.username;
    const user = dao.getUserByUsername(username);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'user not found' });
    }
});

//get all users howls
apiRouter.get('/users/:userId/howls', TokenMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const userHowls = dao.getUserHowls(userId);
    res.json(userHowls);
});

//post a howl for a user
apiRouter.post('/users/:userId/howls', TokenMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const newHowl = dao.postHowl(userId, req.body.text);
    res.json(newHowl);
});

//get all users a user follows
apiRouter.get('/users/:userId/following', TokenMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const userFollowing = dao.getUsersFollowing(userId);
    res.json(userFollowing);
});

//follow a user
apiRouter.post('/users/:userId/following/:followedUserId', TokenMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const followedUserId = parseInt(req.params.followedUserId);
    dao.followUser(userId, followedUserId)
    res.status(200);
});

//unfollow a user
apiRouter.delete('/users/:userId/following/:followedUserId', TokenMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const followedUserId = parseInt(req.params.followedUserId);

    dao.unfollowUser(userId, followedUserId);
    res.status(200);
});

//retrieve a users feed (their own howls and howls of users they follow)
apiRouter.get('/users/:userId/feed', TokenMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const feed = dao.getUserFeed(userId);
    res.json(feed);
});

module.exports = apiRouter;
