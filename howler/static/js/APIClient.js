import HTTPClient from "./HTTPClient.js"

const API_BASE = 'api';

export default {
    getCurrentUser: () => {
        return HTTPClient.get(API_BASE + '/users/current')
            .then(res => {
                return res.user;
            })
    },

    login: (username, password) => {
        let data = {
            username: username,
            password: password
        }
        return HTTPClient.post(API_BASE + '/users/login', data);
    },

    logout: () => {
        return HTTPClient.post(API_BASE + '/users/logout', {});
    },

    getUser: (id) => HTTPClient.get(API_BASE + `/users/${id}`),

    getUserByUsername: (username) => HTTPClient.get(API_BASE + `/users/username/${username}`),

    getUserHowls: (userId) => HTTPClient.get(API_BASE + `/users/${userId}/howls`),

    postUserHowl: (userId, howl) => HTTPClient.post(API_BASE + `/users/${userId}/howls`, howl),

    getFollowing: (userId) => HTTPClient.get(API_BASE + `/users/${userId}/following`),

    followUser: (userId, followUserId) => HTTPClient.post(API_BASE + `/users/${userId}/following/${followUserId}`),

    unfollowUser: (userId, followedUserId) => HTTPClient.delete(API_BASE + `/users/${userId}/following/${followedUserId}`),

    getUserFeed: (userId) => HTTPClient.get(API_BASE + `/users/${userId}/feed`)
};
