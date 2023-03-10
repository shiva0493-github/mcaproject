import axios from "axios";

export const getPodcasts = async () => {

    let yesterday = JSON.parse(localStorage.getItem('DateAPI'));
    let today = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)

    if(today === yesterday){
        let podcastsList = JSON.parse(localStorage.getItem('Podcasts'));
        return podcastsList
    } else {
        const list = await axios.get(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)
        const podcasts = list.data.feed.entry
        localStorage.setItem('Podcasts', JSON.stringify(podcasts))

        let current = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)
        localStorage.setItem('DateAPI', JSON.stringify(current));

        return podcasts
    }
}


export const getPodcastDetail2 = async (id) => {

    const parser = new DOMParser();

    try {
        const response = await axios.get(`https://itunes.apple.com/lookup?id=${id}`)

        if(!response){
            const response2 = await axios.get(`${response.data.results[0].feedUrl}`)
            if(!response2){
                const xmlDoc = parser.parseFromString(response2.data,"text/xml");
                return xmlDoc
            }else{
                console.log("Feel Url API Failed")
            }
        } else {
            console.log("Podcast Detail API Failed")
        }
    } catch (error) {
        console.log({error})
    }

}