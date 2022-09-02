// load data from api
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

// create all menu for all categories
const createMenu = async()=>{
    const data = await loadedAllData();
    const allCategories = data.news_category;
    const menu = document.getElementById('menu-container');
    allCategories.forEach(category => {
       const li = document.createElement('li')
       li.innerHTML = `<a>${category.category_name}</a>`;
       menu.appendChild(li);

        console.log(category.category_name)
    });
}

createMenu()