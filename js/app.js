
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

// 

loadedAllData()