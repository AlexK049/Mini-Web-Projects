import howlForm from "../components/howlForm.js"
import howlCard from "../components/howlCard.js"
import { arrToHTMLElement } from "../rendering.js";
import api from '../APIClient.js';

const feedPage = async (user, navigateToPfp) => {
    const userFeed = await api.getUserFeed(user.id);
    return arrToHTMLElement([`
        <div id="top-container" class="container mt-5">
            `, howlForm(user) ,`
        </div>
        
        <div id="feed-container" class="container mt-4 mb-5 d-flex flex-column gap-3">
            `,
                ...userFeed.map(howl => howlCard(howl, navigateToPfp))
            ,`
        </div>
    `]);
}

export default feedPage;