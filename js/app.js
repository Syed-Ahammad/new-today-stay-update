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
    newsNumber.innerText = 'All news showing';
   
    newsContainer.innerHTML = '';
    allNews.forEach(news =>{
        const {author,total_view, thumbnail_url, details, title, image_url} = news;
        const div = document.createElement('div');
        div.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl', 'lg:px-4', 'my-2', 'p-2');
        div.innerHTML = `
        <figure><img src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p class="pb-6">${details.slice(0, 300)}...</p>
          <div class="card-actions flex justify-between">
                <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src=${author.img} />
                        </div>
                        <div class="mx-3">
                            <p>${author.name ? author.name : 'Unknown'}</p>
                            <p class="text-sm">${author.published_date ? author.published_date : 'Date:.....'} </p>
                        </div>
                </div>
                <div>
                    <p><i class="fa-solid fa-eye"></i> ${total_view ? total_view : '00'}</p>
                </div>
                 <div class="rating">
                    <input type="radio" name="rating-1" class="mask mask-star" />
                    <input type="radio" name="rating-1" class="mask mask-star" checked />
                    <input type="radio" name="rating-1" class="mask mask-star" />
                    <input type="radio" name="rating-1" class="mask mask-star" />
                     <input type="radio" name="rating-1" class="mask mask-star" />
                 </div>
            <div>
            <i class="fa-solid fa-arrow-right text-primary text-xl"></i>
            </div>
          </div>
        </div>`;
        newsContainer.appendChild(div);
        console.log(news);
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