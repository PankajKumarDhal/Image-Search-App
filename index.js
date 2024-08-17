const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});


// const formEl = document.querySelector("form");
// const searchInputEl = document.getElementById("search-input");
// const searchResultsEl = document.querySelector(".search-results");

// async function generateAIImage(inputText) {
//   const url = 'https://ai-text-to-image-generator-api.p.rapidapi.com/realistic';
//   const options = {
//     method: 'POST',
//     headers: {
//       'x-rapidapi-key': '6f5ab9002amshae9743c3bceb51fp114a97jsnd55ed65fee24',
//       'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       inputs: inputText
//     })
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     searchResultsEl.innerHTML = `<img src="${result.image_url}" alt="AI Generated Image">`;
//   } catch (error) {
//     console.error(error);
//   }
// }

// formEl.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const inputText = searchInputEl.value;
//   generateAIImage(inputText);
// });
