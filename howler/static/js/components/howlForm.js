import { strToHTMLElement } from "../rendering.js";
import api from "../APIClient.js"

const howlForm = (user) => {
    const howlFormEle = strToHTMLElement(`
        <div class="card">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <textarea placeholder="howl something..." type="text" class="form-control" id="howl-content" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary float-end">Howl!</button>
                </form>
            </div>
        </div>
    `);
    const howlTextEle = howlFormEle.querySelector('textarea');
    howlFormEle.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (howlTextEle.value) {
            api.postUserHowl(user.id, { text: howlTextEle.value });
        }
        location.reload();
    });
    return howlFormEle;
}

export default howlForm;