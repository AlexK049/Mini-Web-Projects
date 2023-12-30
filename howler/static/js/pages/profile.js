import profileCard from "../components/profileCard.js"
import howlCard from "../components/howlCard.js"
import { arrToHTMLElement } from "../rendering.js";
import api from '../APIClient.js';

const profilePage = async (user) => {
    const userHowls = await api.getUserHowls(user.id);
    return arrToHTMLElement([`
        <div id="top-container" class="container mt-5">
            `, await profileCard(user) ,`
        </div>
        
        <div id="feed-container" class="container mt-4 mb-5 d-flex flex-column gap-3">
            `,
                ...userHowls.map(howl => howlCard(howl))
            ,`
        </div>
    `]);
}

export default profilePage;