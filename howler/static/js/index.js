import api from './APIClient.js';
import profilePage from './pages/profile.js'
import feedPage from './pages/feed.js';

const user = await api.getCurrentUser();
await initHeader(user);
const appContainer = document.querySelector('#app-container');
await navigateToFeed();

async function navigateToPfp(user) {
    const appContainer = document.querySelector('#app-container');
    appContainer.innerHTML = '';
    appContainer.appendChild(await profilePage(user));
}

async function navigateToFeed() {
    appContainer.innerHTML = '';
    appContainer.appendChild(await feedPage(user, navigateToPfp));
}

async function initHeader(user) {
    const usernameEle = document.querySelector('#username');
    const pfpEle = document.querySelector('#profile-picture');
    const header = document.querySelector('h1');
    header.addEventListener('click', async () => {
        await navigateToFeed();
    });

    usernameEle.innerHTML = `@${user.username}`;
    pfpEle.src = user.avatar;

    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', () => {
        api.logout();
        location.reload();
    });
}
