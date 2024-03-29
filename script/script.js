const links = [
    {
        label: "Week 1 notes",
        url: "week1/index.html"
    },
    {
        label: "Week 2 notes",
        url: "week2/index.html"
    },
    {
        label: "Week 3 notes",
        url: "week3/index.html"
    },
    {
        label: "Week 4 notes",
        url: "week4/index.html"
    },
    {
        label: "Week 5 notes",
        url: "week5/index.html"
    },
    {
        label: "Week 6 - No Tasks",
        url: ""
    },
    {
        label: "Week 7 notes",
        url: "week7/index.html"
    },
    {
        label: "Week 8 notes",
        url: "week8/index.html"
    },
    {
        label: "Week 9 notes",
        url: "week9/index.html"
    },
    {
        label: "Week 10 notes",
        url: "week10/index.html"
    },
    {
        label: "Final Project",
        url: "project/index.html"
    }
]

function indexMain(){
    let div = document.querySelector(".content");
    let ol = document.createElement("ol");
    ol.setAttribute("class", "myList");
    div.appendChild(ol);
        links.forEach((stories) => {
        let liLabel = document.createElement('li');
        let aLiUrl = document.createElement('a');
        aLiUrl.setAttribute("href",stories.url);
        aLiUrl.textContent = stories.url;
        
        liLabel.textContent = stories.label;
        liLabel.appendChild(aLiUrl);
        
        ol.appendChild(liLabel);

        })
    div.appendChild(ol);
}




/* WEEK 1 INDEX.HTML */

function loadStory(){
    let storyName = document.getElementById("name_input").value;
    let storyHTML = localStorage.getItem(storyName);
    document.getElementById("story_editor").value = storyHTML;
    document.getElementById("story_display").innerHTML = "";
}

function saveStory(){
    let storyName = document.getElementById("name_input").value;
    let storyHTML = document.getElementById("story_editor").value;
    localStorage.setItem(storyName, storyHTML);
}

function displayStory(){
    let storyHTML = document.getElementById("story_editor").value;
    
    if (storyHTML == ""){
        document.getElementById("story_display").innerHTML = "Sorry, you don't have this story";
    }else{
        document.getElementById("story_display").innerHTML = storyHTML;
    }
}

function removeStory(){
    let storyName = document.getElementById("name_input").value;
    localStorage.removeItem(storyName);
    document.getElementById("story_editor").value = "";
    document.getElementById("story_display").innerHTML = "Story removed.";
}

/* END WEEK 1 INDEX.HTML */


/* WEEK 2 INDEX.HTML */
function functionWeek2(){

    let ch_list = new Map();

    ch_list.set('ch2', 'Programming Basics').set('ch3', 'Arrays, Logic, and Loops').set('ch4', 'Functions');

    for (const [key, value] of ch_list.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = value;
        document.getElementById("content-week2").appendChild(link);
    }
}
/* END WEEK 2 INDEX.HTML */


/* WEEK 3 INDEX.HTML */
function functionWeek3(){
    let ch_list_3 = new Map();

    ch_list_3.set('article', 'Object Methods: this / This in JavaScript').set('ch5', 'Objects').set('ch6', 'Document Object Model').set('ch7', 'Events');

    for (const [key, value] of ch_list_3.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week3").appendChild(link);
    }
}
/* END WEEK 3 INDEX.HTML */

/* WEEK 4 INDEX.HTML */
function functionWeek4(){
    let ch_list_4 = new Map();

    ch_list_4.set('ch8', 'Forms').set('ch12', 'Object-Oriented Programming in JavaScript').set('ch15', 'Modern JavaScript Development');

    for (const [key, value] of ch_list_4.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week4").appendChild(link);
    }
}
/* END WEEK 4 INDEX.HTML */

/* WEEK 5 INDEX.HTML */
function functionWeek5(){
    let ch_list_5 = new Map();

    ch_list_5.set('ch10', 'Testing and Debugging').set('challenge', 'Todo List');

    for (const [key, value] of ch_list_5.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week5").appendChild(link);
    }
}
/* END WEEK 5 INDEX.HTML */

/* WEEK 7 INDEX.HTML */
function functionWeek7(){
    let ch_list_7 = new Map();

    ch_list_7.set('ch11', 'Further Functions').set('ch13', 'Ajax');

    for (const [key, value] of ch_list_7.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week7").appendChild(link);
    }
}
/* END WEEK 7 INDEX.HTML */

/* WEEK 8 INDEX.HTML */
function functionWeek8(){
    let ch_list_8 = new Map();

    ch_list_8.set('ch8', 'Transforms and Transitions').set('ch12', 'Canvas, SVG, Drag and Drop');

    for (const [key, value] of ch_list_8.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week8").appendChild(link);
    }
}
/* END WEEK 8 INDEX.HTML */

/* WEEK 9 INDEX.HTML */
function functionWeek9(){
    let ch_list_9 = new Map();

    ch_list_9.set('ch9', 'The Window Object').set('ch14', 'HTML5 APIs');

    for (const [key, value] of ch_list_9.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week9").appendChild(link);
    }
}
/* END WEEK 9 INDEX.HTML */

/* WEEK 10 INDEX.HTML */
function functionWeek10(){
    let ch_list_10 = new Map();

    ch_list_10.set('mdn1', 'Validating Forms').set('mdn2', 'Using Fetch').set('team/teamWork', 'Team Assignment');

    for (const [key, value] of ch_list_10.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `${key}/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week10").appendChild(link);
    }
}
/* END WEEK 10 INDEX.HTML */

/* FINAL PROJECT */
function functionWeek10(){
    let ch_list_14 = new Map();

    ch_list_14.set('project', 'Final Project');

    for (const [key, value] of ch_list_14.entries()){
        let link = document.createElement('a');
        link.setAttribute('href', `./project/index.html`);
        link.textContent = `${key} - ${value}`;
        document.getElementById("content-week14").appendChild(link);
    }
}
/* END FINAL PROJECTL */