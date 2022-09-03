// load data from api for category
const loadedAllData = async()=>{
    try{
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        const news = data.data;
        return news; 

    }
    catch(error){
        console.log(error)
    }
}

// get card content from api by id
const getNews = async(id)=>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
       return data;

    }
    catch(error){
        console.log(error)
    }
}

// create function for display card
const displayCard = async(id, event)=>{
    loadSpinner(true);
    const getAllData = await getNews(id);
    const allNews = getAllData.data;
    const newsContainer = document.getElementById('news-container');
    const newsNumber = document.getElementById('news-number');
   
    newsContainer.innerHTML = '';
    allNews.forEach(news =>{
        const {author, rating, thumbnail_url, details, title} = news;
        const div = document.createElement('div');
        div.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl', 'lg:p-4', 'my-4', 'p-2');
        div.innerHTML = `
        <figure><img src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details.slice(0, 200)}...</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Details...</button>
          </div>
        </div>`;
        newsContainer.appendChild(div);
        // console.log(news);
    })
    // console.log(event.children[0].innerText);

    try{
        if(allNews.length > 0){
            newsNumber.innerText = `${allNews.length} items found for category ${event.children[0].innerText}`;
            newsNumber.classList.remove('hidden');
        }
        else{
            newsNumber.innerText = `No items found for category ${event.children[0].innerText}`;
            newsNumber.classList.remove('hidden');
        }
    }
    catch(error){
        console.log(error)
    }

   
    loadSpinner(false);

}


// create all menu for all categories
const createMenu = async()=>{
    const data = await loadedAllData();
    const allCategories = data.news_category;
    const menu = document.getElementById('menu-container');
    allCategories.forEach(category => {
       const li = document.createElement('li')
       li.innerHTML = `<a>${category.category_name}</a>`;
       li.setAttribute('onclick', `displayCard('${category.category_id}', this)`);
       menu.appendChild(li);

        // console.log(category)
    });
}

// create function for spinner
const loadSpinner = (isLoading)=>{
    const spinner = document.getElementById('spinner');
    if(isLoading === true){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}


createMenu()
displayCard("08")