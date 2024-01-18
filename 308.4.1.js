<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Breeds</title>
</head>
<body>

<select id="breedSelect"></select>

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
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }
}

// Execute the function immediately
initialLoad();
</script>

</body>
</html>
