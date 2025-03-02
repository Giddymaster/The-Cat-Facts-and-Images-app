const quoteButton = document.getElementById("quote");
const catButton = document.getElementById("cat");
const factInput = document.querySelector(".cat-quotes-input");
const imageInput = document.querySelector(".cat-images-input");
const meowFacts = document.querySelector(".result-cat-quotes");
const resultImages = document.querySelector(".result-cat-images");

// Create an error message container at the top
const errorMessage = document.createElement("p");
errorMessage.classList.add("error-message");
errorMessage.style.fontSize:25px;
errorMessage.style.color = "red";
errorMessage.style.textAlign = "center";
errorMessage.style.fontWeight = "bold";
document.body.prepend(errorMessage); // Add to the top of the page

quoteButton.onclick = async function fetchMeowFacts() {
    let maxFacts = parseInt(factInput.value);

    if (!factInput.value) {
        errorMessage.textContent = "Please enter the number of cat facts you want.";
        maxFacts = 1; // Show 1 fact by default
    } else {
        errorMessage.textContent = ""; // Clear error if input is valid
    }

    if (isNaN(maxFacts) || maxFacts < 1) {
        maxFacts = 1;
    } else if (maxFacts > 50) {
        maxFacts = 50;
    }

    try {
        meowFacts.innerHTML = ""; // Clear previous facts

        for (let i = 0; i < maxFacts; i++) {
            const response = await fetch("https://meowfacts.herokuapp.com/");
            const data = await response.json();

            const p = document.createElement("p");
            p.textContent = `${i + 1}. ${data.data}`;
            meowFacts.appendChild(p);
        }

    } catch (error) {
        console.error("Error fetching cat facts!", error);
        meowFacts.innerHTML = "<p class='error'>Failed to load cat facts. Try again!</p>";
    }
};

catButton.onclick = async function fetchCatImages() {
    let maxImages = parseInt(imageInput.value);

    if (!imageInput.value) {
        errorMessage.textContent = "Please enter the number of cat images you want.";
        maxImages = 1; // Show 1 image by default
    } else {
        errorMessage.textContent = ""; // Clear error if input is valid
    }

    if (isNaN(maxImages) || maxImages < 1) {
        maxImages = 1;
    } else if (maxImages > 10) {
        maxImages = 10;
    }

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${maxImages}`);
        const data = await response.json();
        
        resultImages.innerHTML = ""; // Clear previous images

        data.slice(0, maxImages).forEach(cat => {
            const img = document.createElement("img");
            img.src = cat.url;
            img.alt = "A cute cat";
            img.classList.add("cat-image");
            resultImages.appendChild(img);
        });

    } catch (error) {
        console.error("Error fetching cat images!", error);
        resultImages.innerHTML = "<p class='error'>Failed to load images. Try again!</p>";
    }
};
