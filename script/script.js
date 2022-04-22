const links = [
    {
        label: "Week 1 notes",
        url: "week1/index.html"
    },
    {
        label: "Week 2 notes",
        url: "week2/index.html"
    }
]


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