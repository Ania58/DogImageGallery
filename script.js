document.addEventListener("DOMContentLoaded", () => {
    const dogImages = document.getElementById('image-list');
    const previousPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    let currentPage = 1;
    function fetchDogImages() {
        return fetch(`https://dog.ceo/api/breeds/image/random/6`)
        .then(response => {
            if (!response.ok) {
                throw new Error ('It is not possible to show the images');
            }
            return response.json();
        })
        .catch(error=> {
            console.error('Error fetching images:', error);
            throw error;
        });
    }
    function displayDogPictures(dogs) {
        dogImages.innerHTML = '';
        dogs.message.forEach(dogURL => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = dogURL;
            img.alt = 'Random Dog';
            li.appendChild(img);
            dogImages.appendChild(li);
        });
    } 
    function updatePage(page) {
        fetchDogImages()
        .then(data=>{
            displayDogPictures(data);
            currentPage = page;
        })
        .catch (error=>{
            console.error('Error updating page:', error);
            throw error;
        });
    }
    previousPageButton.addEventListener('click', () => {
        if(currentPage > 1){
            updatePage(currentPage - 1);
        }
    });
    nextPageButton.addEventListener('click', () => {
        updatePage(currentPage + 1);
    });
    updatePage(currentPage);
});