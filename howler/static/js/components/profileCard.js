import api from '../APIClient.js';
import followButton from './followButton.js';
import { arrToHTMLElement } from '../rendering.js';

const profileCard = async (user) => {
    const currentUser = await api.getCurrentUser();
    const followingIds = (await api.getFollowing(user.id)).filter(id => id !== currentUser.id);
    const following = await Promise.all(followingIds.map(async userId => await api.getUser(userId)));
    
    const followCard = async (followingUser) => {
        return arrToHTMLElement([`
            <div class="d-flex justify-content-between">
                <div>${followingUser.username}</div>
                `,await followButton(currentUser, followingUser),`
            </div>
        `]);
    };

    const profileCardHTML = arrToHTMLElement([`
        <div class="d-flex justify-content-between align-items-center ml-3">
            <div class="d-flex gap-2">
                <div>
                    <img src="${user.avatar}" alt="Profile Picture" class="user-img" width="30" height="30">
                </div>
                <div>
                    <h5 class="card-title mb-1">${user.first_name} ${user.last_name}</h5>
                    <a class="card-subtitle text-muted text-decoration-none">${user.username}</a>
                </div>
            </div>
            <div>
                `,user.id !== currentUser.id ? await followButton(currentUser, user) : '',`
            </div>
        </div>
        <div class="container p-0 mt-2">
            <div class="card">
                <div class="card-header p-0">
                    <button class="btn w-100 p-10 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Following
                    </button>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne">
                    <div class="card-body d-flex flex-column gap-2">
                        `,...await Promise.all(following.map(async followingUser => await followCard(followingUser))),`
                    </div>
                </div>
            </div>
        </div>
    `]);

    return profileCardHTML;
};

export default profileCard;
