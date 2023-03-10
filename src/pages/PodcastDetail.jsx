import { useEffect, useState } from "react";
import { useParams } from "react-router"
import axios from "axios";
import { useNavigate } from "react-router";
import PodcastInfo from "../components/PodcastInfo";
import PodcastThumbnail from "../components/PodcastThumbnail";
import { Thumbnail, TextBox, DetailBox, EpisodeBox, EpisodeRow } from '../styles/Containers'
import { ThumbnailImg, ThumbnailText } from '../styles/TextImages'
import Header from "../components/Header";


const baseURL = 'https://itunes.apple.com/lookup?id='

const PodcastDetail = () => {

    const [loading, setLoading] = useState(true)
    const { podcastId } = useParams();

    const navigate = useNavigate()

    const parser = new DOMParser();

    const [ podcast, setPodcast] = useState('')
    const [summary, setSummary] = useState('')
    const [episodes, setEpisodes] = useState({})

    const getPodcastDetail = async () => {

        try {
            const response = await axios.get(baseURL + `${podcastId}`)
            setPodcast(response.data.results[0])
            const response2 = await axios.get(`${response.data.results[0].feedUrl}`)
            const xmlDoc = parser.parseFromString(response2.data,"text/xml");
            setSummary(xmlDoc.getElementsByTagName('description')[0].innerHTML)
            setEpisodes(xmlDoc.getElementsByTagName('item'))

        } catch (error) {
            console.error({error})
        }
    } 

    const dateFormatter = (date) => {
        return new Date(date).toLocaleDateString('en-UK')
    }

    const durationFormatter = (secs) => {

        const check = secs.match(":")
        if(check){
            return secs
        } else {
            let epTime = new Date(null)
            epTime = new Date(secs * 1000).toISOString().substring(11, 19)
            return epTime
        }
    }

    let y = []
    const renderEpisodes =  (episodes) => { 
        try{
            for( let i = 0; i < episodes.length; i++) {
                const title = episodes[i].getElementsByTagName('title')[0]?.innerHTML
                const pubDate = episodes[i].getElementsByTagName('pubDate')[0]?.innerHTML
                const date = dateFormatter(pubDate)
                const dur = episodes[i].getElementsByTagName('itunes:duration')[0]?.innerHTML
                const duration = dur !== undefined ? durationFormatter(dur) : ""
                y.push({"title":title, "date":date, "duration":duration})   
            }
        }catch(error){
            console.log({error})
        }

        return <EpisodeBox>
                <EpisodeRow>
                    <span style={{width:'60%', fontSize:'4vh'}}>Title</span>
                    <span style={{width:'20%', fontSize:'4vh'}}>Date</span>
                    <span style={{width:'20%', fontSize:'4vh'}}>Duration</span>
                </EpisodeRow>
                {y.map((item, index) => <EpisodeRow className='pointer episodeTitle' key={index} onClick={() => navigate(`/podcast/${podcastId}/episode/${index}`)}>
                        <span className='episdodeTitle' style={{width:'60%'}}>{item.title}</span>
                        <span style={{width:'20%', fontSize:'2vh'}}>{item.date}</span>
                        <span style={{width:'20%', fontSize:'2vh'}}>{item.duration}</span>
                </EpisodeRow>)}
                </EpisodeBox>
    }

    useEffect(() => {
        getPodcastDetail()
        !episodes === false && setLoading(false)
    }, [])


    return (
        <>
             <Header loader={loading} />
            <div style={{display:'flex', gap:'2vw'}}>
                <PodcastInfo id={podcastId} artwork={podcast.artworkUrl600} artist={podcast.artistName} collection={podcast.collectionName} summary={summary}/>
                <div style={{width:'60vw', display:'flex', flexDirection:'column', gap:'2vh'}}>
                    <div style={{width:'100%', padding:'2vh 0vh',}} className="shadow"><span style={{marginLeft:'2vh'}}>Episode Count:{podcast.trackCount}</span></div>
                    <div className='shadow'>
                    { episodes ? renderEpisodes(episodes): "Please give us a moment while it loads"}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PodcastDetail
