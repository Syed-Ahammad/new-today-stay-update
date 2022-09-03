// blogs object 
const blogs = [
    {question: 'What is var, let and const?',
    answer: `var is function scoped when it is declared within a function. This 
            means that it is available and can be accessed only within that function.
            let is now preferred for variable declaration. It's no surprise as it comes
             as an improvement to var declarations. It also solves the problem with var 
            that we just covered. Let's consider why this is so.
            Variables declared with the const maintain constant values. const declarations share some similarities with let declarations.`},
    {question: 'What is different between arrow function and regular function?',
    answer: 'Regular functions created using function declarations or expressions are constructible and callable. Since regular functions are constructible, they can be called using the new keyword. However, the arrow functions are only callable and not constructible, i.e arrow functions can never be used as constructor functions.'},
    {question: 'What are the different map, forEach, find and filter?',
    answer: ' forEach just loop over the array and executes the callback but filter executes the callback and check its return value.The map() method creates an entirely new array. The forEach() method returns “undefined“. The map() method returns the newly created array according to the provided callback function. find() method search through all the child elements only.'},
    {question: 'Why we are writing template string?',
    answer: 'Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders). However, a tagged template literal may not result in a string; it can be used with a custom tag function to perform whatever operations you want on the different parts of the template literal.'}
];

// blog post
const blogsLoaded = (blogs)=> {
    const blogsContainer = document.getElementById('blogs-container');
    blogs.forEach(blog =>{
        const div = document.createElement('div');
        div.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl');
        div.innerHTML = `
        <div class="card-body">
                  <h2 class="card-title">${blog.question}</h2>
                  <p>${blog.answer}</p>
                </div>`;
        blogsContainer.appendChild(div);
    })

}
blogsLoaded(blogs);




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
    allNews.sort((a,b)=> {
        return b.total_view - a.total_view;
    });
   
    const newsContainer = document.getElementById('news-container');
    const newsNumber = document.getElementById('news-number');
    newsNumber.innerText = 'All news showing';
    newsContainer.classList.remove('hidden');
   
    newsContainer.innerHTML = '';
    allNews.forEach(news =>{
        const {author,total_view, thumbnail_url, details, title, _id} = news;
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
            <label onclick="newsDetails('${_id}')" for="my-modal-4" class="btn modal-button"> <i class="fa-solid fa-arrow-right text-primary text-xl"></i></label>
           
            </div>
          </div>
        </div>`;
        newsContainer.appendChild(div);
        // console.log(news);
    })
    

        // catching error
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

//  loading news deatails
const newsDetails = async(news_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const response = await fetch(url);
    const newsLoaded = await response.json();
    const newsDetails = newsLoaded.data;

    const title = document.getElementById('heading');
    const details = document.getElementById('details');
    const image = document.getElementById('image');
    

    title.innerText = newsDetails[0].title;
    details.innerText = newsDetails[0].details;
    image.src = newsDetails[0].image_url;
   
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