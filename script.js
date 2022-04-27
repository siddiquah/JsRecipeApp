const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal')
const closeBtn = document.getElementById('recipe-close-btn')
const mealDetails = document.querySelector('.meal-details')
//console.log(searchBtn,mealList,closeBtn,mealDetails)

searchBtn.addEventListener('click', getMeallist)
mealList.addEventListener('click', () => {
    mealDetails.classList.add("showRecipe")
    getMealDetails();
})

function clicking() {
    console.log("dfgs");
}

closeBtn.addEventListener("click", () => {
    mealDetails.classList.remove("showRecipe")
})

function getMeallist() {
    let searchInputTxt = searchInput.value.trim();
    //console.log(searchInputTxt);
    let api ='https://api.edamam.com/search?q='+searchInputTxt+'&app_id=8972d130&app_key=1e295ab53e8bacd6e6b33e6689f9b90d';
    fetch(api) 
    .then(res => res.json())
    .then(data => {
        let reciepeArray = data.hits
        //console.log(reciepeArray)

        let html = "";
        if(reciepeArray) {
            for(let i = 0; i<=reciepeArray.length; i++) {

                let image = data.hits[i].recipe.image;
                let label = data.hits[i].recipe.label;
                html += `<div class="meal-item">
                            <div class="meal-img">
                                <img src="${image}" alt="Food Image">
                            </div>
                            <div class="meal-name">
                                <h3>${label}</h3>
                                <a href="#" class="recipe-btn" onclick="${clicking()}">Get Recipe</a>
                            </div>
                        </div>`;
                //console.log(a,b);
                mealList.innerHTML = html;
            }
            mealList.classList.remove('notFound');
        }
        else {
            html = "Sorry no recipe's found."
            mealList.classList.add('notFound');
        }
    })
}

function getMealDetails() {
    let searchInputTxt = searchInput.value.trim();
    let api ='https://api.edamam.com/search?q='+searchInputTxt+'&app_id=8972d130&app_key=1e295ab53e8bacd6e6b33e6689f9b90d';
    fetch(api) 
    .then(res => res.json())
    .then(data => {
        let reciepeArray = data.hits
        let html = "";
        if(reciepeArray) {
            for(let i = 0; i<=reciepeArray.length; i++) {

                let image = data.hits[i].recipe.image;
                let label = data.hits[i].recipe.label;
                let category = data.hits[i].recipe.cuisineType;
                let url = data.hits[i].recipe.url;
                //mealList.innerHTML = html;
                //<iframe src="demo_iframe.htm" height="200" width="300" title="Iframe Example"></iframe>

                html += ` 

                <div class="meal-details-content">
                            <h2 class="recipe-title">&=${label}</h2>
                            <p class="recipe-category">${category}</p>
                            <div class="recipe-instruct">
                                <h3>Instructions:</h3>

                                <div class="iframe">
                                    <iframe src="${url}" height="400" width="500" title="Iframe Example"></iframe>
                                </div>

                            </div>

                            <div class="recipe-meal-img">
                                <img src="${image}" alt="">
                            </div>

                            <div class="recipe-link">
                                <a href="#" target="_blank">watch Video</a>
                            </div>
                        </div>`;
                        mealDetails.innerHTML = html;
                    }
                    mealDetails.classList.remove('notFound');
                }
                else {
                    html = "Sorry no recipe's found."
                    mealDetails.classList.add('notFound');
                }
    })
}
