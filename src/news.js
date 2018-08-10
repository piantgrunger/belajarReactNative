var urlNews =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=1b5258f3f9424e2facc9937e4159b039&pageSize=10";
    const urlSources =
    "https://newsapi.org/v2/sources?apiKey=1b5258f3f9424e2facc9937e4159b039";

export async function getNews(source) {

   if(source=== null)
   {
         let result = await fetch(urlNews).then(response => response.json());
         return result.articles;
   } else {
         let result = await fetch(urlNews+"&source="+source).then(response => response.json());
         return result.articles;
   }


}
export async function getSources() {
    let result = await fetch(urlSources).then(response => response.json());
     return result.sources;
}