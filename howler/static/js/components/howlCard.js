import { strToHTMLElement } from "../rendering.js";

function getFormattedDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;

    if (day >= 11 && day <= 13) {
        day += "th";
    } else {
        switch (day % 10) {
            case 1:
                day += "st";
                break;
            case 2:
                day += "nd";
                break;
            case 3:
                day += "rd";
                break;
            default:
                day += "th";
                break;
        }
    }
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[month]} ${day}, ${year}, ${formattedTime}`;
}

const howlCard = (howl, navigateToPfp) => {
    const howlCard = strToHTMLElement(`
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <div class="d-flex align-items-center gap-3">
                            <img src="${howl.user.avatar}" alt="Profile Picture" class="user-img" width="30" height="30">
                            <div>
                                <h5 class="card-title mb-1">${howl.user.first_name + howl.user.last_name}</h5>
                                <p class="card-subtitle text-muted username">@${howl.user.username}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 offset-3">
                        <p class="float-end"><i>${getFormattedDateTime(howl.datetime)}</i></p>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="card-text mt-3">
                    <p>${howl.text}</p>
                </div>
            </div>
        </div>
    `);
    
    howlCard.querySelector(".username").addEventListener("click", () => {
        navigateToPfp(howl.user);
    });
    return howlCard;
}

export default howlCard;