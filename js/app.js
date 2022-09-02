const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = categories => {
    const ulContainer = document.getElementById('ul-container');
    categories.forEach(category => {
        const categoryli = document.createElement('li');
        categoryli.classList.add('nav-item');
        categoryli.innerHTML = `
        <li>
                <a class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
            </li>
        `;
        ulContainer.appendChild(categoryli);
    })
}
loadCategory();