import fetch from 'node-fetch';

async function fetchData() {
    try {
        const url = new URL("https://jsonplaceholder.typicode.com/posts");
        const response = await fetch(url);
        console.log('response', response)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}   

fetchData();