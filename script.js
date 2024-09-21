const searchForm = document.getElementsByClassName("search-form")[0];
const searchBox = document.getElementsByClassName("search-box")[0];
const searchResult = document.getElementsByClassName("search-result")[0];
const showMoreButton = document.getElementsByClassName("showmore-btn")[0];

const accessKey = 'p15t2aSYgcv9vmiQqE1j8r9acWhJrIJVhYJHrEsA_i8';
let keyword = ""
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

    let response = await fetch(url);
    let data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    let results = data.results;
    results.map((result)=>{
        let image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    })
    showMoreButton.style.display = "block";


}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreButton.addEventListener("click", () => {
    page++;
    searchImages();
})