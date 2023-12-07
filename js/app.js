// Get Search Input Value
const getInputValue = () => {
    // search input
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    return searchText;
}
// Load Data
const loadData = () => {
    // clean container
    const container = document.getElementById('container');
    // search text
    const searchText = getInputValue();
    // url
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    if (searchText) {
        // display spinner
        toggleSpinner(true);
        container.textContent = '';
        // fetch
        fetch(url)
            .then(response => response.json())
            .then(data => displayData(data.meals))
    }
    else {
        // error
        alert('Please write something!!');
    }
}
// Display Data
const displayData = (data) => {
    // container
    const container = document.getElementById('container');
    // condition
    if (data) {
        // Foreach
        data?.forEach(meal => {
            // slice meal instructions
            const slicedInstruction = meal.strInstructions.slice(0, 120) + '.....';
            // create div
            const div = document.createElement('div');
            div.innerHTML = `
                <!-- Card -->
                <div class="card border shadow">
                    <!-- Card image -->
                    <img src="${meal.strMealThumb}" class="card-img-top border-bottom" alt="image">
                    <!-- Card body -->
                    <div class="card-body">
                      <!-- Card title -->
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <!-- Card text -->
                      <p class="card-text fw-500">${meal.strInstructions.length > 120 ? slicedInstruction : meal.strInstructions}</p>
                      <!-- Card button -->
                      <button class="btn text-white fw-bold" style="background: rgb(241, 16, 147);" 
                      onclick="loadMealDetail('${meal.idMeal}')">Details</button>
                    </div>
                </div>
            `;
            // append
            container.appendChild(div);
            // hide spinner
            toggleSpinner(false);
        });
    } 
    else {
        // hide spinner
        toggleSpinner(false);
        // error
        alert('No Food Found!!');
    }
}
// Load meal detail
const loadMealDetail = (idMeal) => {
    // display spinner
    toggleSpinner(true);
    // url
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetail(data.meals))
}
// Display meal detail
const displayMealDetail = (data) => {
    // container
    const container = document.getElementById('container');
    container.textContent = '';
    // Foreach
    data?.forEach(meal => {
        // create div
        const div = document.createElement('div');
        div.innerHTML = `
            <!-- Card -->
            <div class="card border shadow">
                <!-- Card image -->
                <img src="${meal.strMealThumb}" class="card-img-top border-bottom" alt="image">
                <!-- Card body -->
                <div class="card-body">
                  <!-- Card title -->
                  <h4 class="card-title">${meal.strMeal}</h4>
                  <h5 class="card-title">${meal.strCategory}</h5>
                  <!-- Card text -->
                  <p class="card-text fw-500">${meal.strInstructions}</p>
                  <!-- Card button -->
                  <a href="${meal.strYoutube}" target="_blank">
                    <button class="btn btn-danger fw-bold">Youtube</button>
                  </a>
                </div>
            </div>
        `;
        container.appendChild(div);
        // hide spinner
        toggleSpinner(false);
    });
}
// Toggle Spinner 
const toggleSpinner = (isLoading) => {
    // spinner
    const spinner = document.getElementById('spinner');
    // condition
    if (isLoading) {
        spinner.style.display = 'block';
    }
    else {
        spinner.style.display = 'none';
    }
}
// Search food by press Enter
document.addEventListener('keypress', function (event) {
    // condition
    if (event.key === 'Enter') {
        // load data
        loadData();
    }
})