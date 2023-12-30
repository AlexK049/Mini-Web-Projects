import { strToHTMLElement } from "../rendering.js";
import api from "../APIClient.js";

/**
 * @param {*} currentUser the current user of the system
 * @param {*} user the user that this button is associated with
 */
const followButton = async (currentUser, user) => {
    const following = await api.getFollowing(currentUser.id);

    const element = strToHTMLElement(`
        <button class="btn btn-primary">
            ${following.includes(user.id) ? 'Unfollow' : 'Follow'}
        </button>
    `);

    element.addEventListener('click', async () => {
        const following = await api.getFollowing(currentUser.id);
        if (following.includes(user.id)) {
            element.textContent = 'Follow';
            await api.unfollowUser(currentUser.id, user.id);
        } else {
            element.textContent = 'Unfollow';
            await api.followUser(currentUser.id, user.id);
        }
    });
    return element;
}

export default followButton;