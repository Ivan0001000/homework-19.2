document.getElementById('people-btn').addEventListener('click', () => fetchEntities('people'));
document.getElementById('planets-btn').addEventListener('click', () => fetchEntities('planets'));
document.getElementById('vehicles-btn').addEventListener('click', () => fetchEntities('vehicles'));

let currentPage = 1;
let currentCategory = 'people';

function fetchEntities (category, page = 1){
    currentCategory = category;
    currentPage = page;
    const url = `https://swapi.dev/api/${category}/?page=${page}`

    fetch(url)

    .then(res => res.json())

    .then((data => {
        displayEntities(data.results);
        setupPagination(data.count);
    }))

    .catch(error => console.error('Error fetching data:', error));
}

function displayEntities (entities){
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    entities.forEach(entity => {
        const entityDiv = document.createElement('div');
        entityDiv.classList.add('entity');

        if (currentCategory === 'people') {
            entityDiv.innerHTML = `
                <h3>${entity.name}</h3>
                <p>Height: ${entity.height}</p>
                <p>Mass: ${entity.mass}</p>
                <p>Gender: ${entity.gender}</p>
                <button onclick="fetchDetails('${entity.url}')">More Info</button>
            `;
        } else if (currentCategory === 'planets') {
            entityDiv.innerHTML = `
                <h3>${entity.name}</h3>
                <p>Climate: ${entity.climate}</p>
                <p>Terrain: ${entity.terrain}</p>
                <p>Population: ${entity.population}</p>
                <button onclick="fetchDetails('${entity.url}')">More Info</button>
            `;
        } else if (currentCategory === 'vehicles') {
            entityDiv.innerHTML = `
                <h3>${entity.name}</h3>
                <p>Model: ${entity.model}</p>
                <p>Manufacturer: ${entity.manufacturer}</p>
                <button onclick="fetchDetails('${entity.url}')">More Info</button>
            `;
        }

        contentDiv.appendChild(entityDiv);
    });
}

function setupPagination(totalItems) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = ''; 

    const totalPages = Math.ceil(totalItems / 10);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => fetchEntities(currentCategory, i);

        if (i === currentPage) {
            pageButton.style.backgroundColor = '#007fff'; 
        }

        paginationDiv.appendChild(pageButton);
    }
}

function fetchDetails(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('entity');
            detailsDiv.innerHTML = `<h3>Details:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;

            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = ''; 
            contentDiv.appendChild(detailsDiv);
        })
        .catch(error => console.error('Error fetching details:', error));
}

fetchEntities('people');