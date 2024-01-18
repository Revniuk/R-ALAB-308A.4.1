async function handleBreedSelect() {
    const selectedBreedId = document.getElementById("breedSelect").value;
    const carousel = document.getElementById("carousel");
    const infoDump = document.getElementById("infoDump");

    // Clear previous content
    carousel.innerHTML = "";
    infoDump.innerHTML = "";

    try {
        // Fetch images and breed information concurrently
        const [imagesResponse, breedInfoResponse] = await Promise.all([
            fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=5`),
            fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`),
        ]);

        const breedImages = await imagesResponse.json();
        const breedData = await breedInfoResponse.json();

        // Create carousel elements for each image
        breedImages.forEach((image) => {
            const imgElement = document.createElement("img");
            imgElement.src = image.url;
            carousel.appendChild(imgElement);
        });

        // Create informational section within infoDump
        const infoTitle = document.createElement("h2");
        infoTitle.textContent = breedData.name;

        const infoDescription = document.createElement("p");
        infoDescription.textContent = breedData.description;

        infoDump.appendChild(infoTitle);
        infoDump.appendChild(infoDescription);
    } catch (error) {
        console.error("Error fetching breed information:", error);
    }
}
