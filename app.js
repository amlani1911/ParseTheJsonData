const api_url = "https://s3.amazonaws.com/open-to-cors/assignment.json";

    async function getapi(url) {
        const response = await fetch(url);
        const data = await response.json();
        
        // Get the table body element
        const tbody = document.querySelector('#dataTable tbody');

        // Check if 'products' key exists in the data
        if ('products' in data) {
            const products = data['products'];

            // Sort the items based on popularity in descending order
            const sortedItems = Object.keys(products).sort((a, b) => {
                return products[b].popularity - products[a].popularity;
            });

            // Iterate over the sorted items and populate the table
            sortedItems.forEach(id => {
                const item = products[id];
                const row = document.createElement('tr');
                row.innerHTML = `<td>${id}</td><td>${item.subcategory}</td><td>${item.title}</td><td>${item.price}</td><td>${item.popularity}</td>`;
                tbody.appendChild(row);
            });

            // Display the total number of records
            const countElement = document.getElementById('count');
            countElement.textContent = sortedItems.length;
        } else {
            console.error('Invalid data format. "products" key not found.');
        }
    }

    document.getElementById("button").addEventListener('click',()=>{
        document.getElementById("firstData").style.display= 'none';
        document.getElementById("secondData").style.display= 'block';
    })

    // Calling the async function to fetch data and populate the table
    getapi(api_url);