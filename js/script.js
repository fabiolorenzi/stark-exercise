let activitiesArr = new Array();

class Activity {
    constructor(activity, type, participants, price, link, key, accessibility) {
        this.activity = activity;
        this.type = type;
        this.participants = participants;
        this.price = price;
        this.link = link;
        this.key = key;
        this.accessibility = accessibility;
    }

    renderBody() {
        document.getElementById("entry_point").innerHTML += `
            <a href=${this.link} key=${this.key} class="activity">
                <div class="activity_main">
                    <p>${this.activity}</p>
                </div>
                <div class="activity_data">
                    <h2>Type: ${this.type}</h2>
                    <h2>Partecipants: ${this.participants}</h2>
                    <h2>Price: ${this.price}</h2>
                    <h2>Accessibility: ${this.accessibility}</h2>
                    <h2>Key: ${this.key}</h2>
                </div>
            </a>
        `;
    }
};


// this below here is the function that is going to call the API

async function getData() {
    await fetch("https://www.boredapi.com/api/activity", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => activitiesArr.push(new Activity(
        data.activity,
        data.type,
        data.participants,
        data.price,
        data.link,
        data.key,
        data.accessibility
    )))
    .catch(err => console.log(err));
};


// the function below is to repeat the getData function multiple times

async function reTrigger() {
    for (let i = 0; i < 10; i++) {
        await getData();
    };
};


// this below here is the function that is going to be called everytime that someone clicks the button

async function startCall() {
    activitiesArr = [];
    renderingBody(false);
    await reTrigger();
    renderingBody(true);
};


// this below here is the function that is going to be called as soon as someone is going to open the page

document.addEventListener("DOMContentLoaded", () => {
    startCall();
});


// the code below is to show in the front end a basic "Loading..." message while waiting for the API call and then
// is going to show the data that we get from the call

function renderingBody(status) {
    if (status) {
        document.getElementById("entry_point").innerHTML = "";
        activitiesArr.forEach(act => {
            act.renderBody();
        });
    } else {
        document.getElementById("entry_point").innerHTML = "<p id='loadingMsg'>Loading...</p>";
    };
};