const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = categories => {
    const ulContainer = document.getElementById('ul-container');
    // ulContainer.innerHTML = ``;
    categories.forEach(category => {
        const categoryli = document.createElement('li');
        categoryli.classList.add('nav-item');
        categoryli.innerHTML = `
        <li>
                <a onclick="loadNews(${category.category_id})" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
            </li>
        `;
        ulContainer.appendChild(categoryli);
    })



}
const loadNews = (newsId) => {

    // console.log(newsId);
    const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
    toggleSpinner(true);
}
const displayNews = (allNews) => {
    console.log(allNews);
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = `
    <h4 class="p-2 my-3 bg-white border rounded">${allNews.length ? allNews.length : 'No'} items found for category</h4>
    `;

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    const sortByTrending = allNews.sort((a, b) => b.total_view - a.total_view);

    // console.log(sortByTrending);
    sortByTrending.forEach(news => {
        // console.log(news.total_view);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        
        <div class="card mb-3 w-auto">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title ? news.title : 'No Data'}</h5>
                            <p class="card-text">${news.details.slice(0, 300)}...</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <img style="max-width: 50px; height: 50px; border-radius: 50%;" class=" me-3"
                                        src="${news.author.img}" alt="">
                                    <div>
                                        <p>${news.author.name ? news.author.name : 'Not Found'}</p>
                                        <p>${news.author.published_date ? news.author.published_date : 'No Data'}</p>
                                    </div>
                                </div>
                                <div><i class="fa fa-light fa-eye"></i> ${news.total_view ? news.total_view : 'no data'}</div>
                                <div> <button onclick="loadNewsDetail('${news._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button></div>
                              
                                
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    toggleSpinner(false);

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');

    }
}

const loadNewsDetail =async news_id=>{
    const url=`https://openapi.programming-hero.com/api/news/${news_id}`;
    const res= await fetch(url);
    const data= await res.json();
    displayNewsDetails(data);
}

const displayNewsDetails= news =>{
    console.log(news);
}

loadCategory();


// <!-- Modal -->
//                                     <div class="modal fade" id="newsDetailModal" tabindex="-1" aria-labelledby="newsDetailModalLabel" aria-hidden="true">
//                                     <div class="modal-dialog">
//                                         <div class="modal-content">
//                                         <div class="modal-header">
//                                             <h5 class="modal-title" id="newsDetailModalLabel">${news.title}</h5>
//                                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                         </div>
//                                         <div class="modal-body">
//                                         <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
//                                         <p class="card-text p-3">${news.details}</p>
//                                         <div class="d-flex justify-content-between">
//                                 <div class="d-flex">
//                                     <img style="max-width: 50px; height: 50px; border-radius: 50%;" class=" me-3"
//                                         src="${news.author.img}" alt="">
//                                     <div>
//                                         <p>${news.author.name ? news.author.name : 'Not Found'}</p>
//                                         <p>${news.author.published_date ? news.author.published_date : 'No Data'}</p>
//                                     </div>
//                                 </div>
//                                 <div><i class="fa fa-light fa-eye"></i>${news.total_view ? news.total_view : 'no data'}
                                        
//                                         </div>
//                                     </div>
//                                     </div>