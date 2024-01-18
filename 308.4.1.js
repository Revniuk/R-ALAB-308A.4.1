<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Breeds</title>
    <style>
        /* Add your custom styles here */
    </style>
</head>
<body>

<select id="breedSelect"></select>
<div id="carousel"></div>
<div id="infoDump"></div>

<script>
async function initialLoad() {
    const breedSelect = document.getElementById('breedSelect');
    
    try {
        // Fetch the list of cat breeds from the Cat API
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        const breeds = await response.json();
        
        // Create options for each breed and append them to breedSelect
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
        
        // Add event listener to breedSelect
        breedSelect.addEventListener('change', handleBreedSelect);
        
        // Call the function to create the initial carousel
        handleBreedSelect();
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }
}

async function handleBreedSelect() {
    const selectedBreedId = document.getElementById('breedSelect').value;
    const carousel = document.getElementById('carousel');
    const infoDump = document.getElementById('infoDump');
    
    // Clear previous content
    carousel.innerHTML = '';
    infoDump.innerHTML = '';

    try {
        // Fetch information on the selected breed from the Cat API
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=5`);
        const breedImages = await response.json();

        // Create carousel elements for each image
        breedImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            carousel.appendChild(imgElement);
        });

        // Create an informational section within infoDump
        const breedInfo = await fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`);
        const breedData = await breedInfo.json();

        const infoTitle = document.createElement('h2');
        infoTitle.textContent = breedData.name;

        const infoDescription = document.createElement('p');
        infoDescription.textContent = breedData.description;

        infoDump.appendChild(infoTitle);
        infoDump.appendChild(infoDescription);
    } catch (error) {
        console.error('Error fetching breed information:', error);
    }
}

// Execute the function immediately
initialLoad();
</script>

</body>
</html>
