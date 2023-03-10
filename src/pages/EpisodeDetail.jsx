import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router";
import axios from "axios";
import { DetailBox, EpisodeBox, EpisodeRow } from '../styles/Containers'
import PodcastInfo from "../components/PodcastInfo";


const baseURL = 'https://itunes.apple.com/lookup?id='

const EpisodeDetail = () => {

    const [loading, setLoading] = useState(true)
    const { podcastId, episodeId } = useParams()
    const parser = new DOMParser();

    const [ podcast, setPodcast] = useState('')
    const [summary, setSummary] = useState('')
    const [epTitle, setEpTitle] = useState('')
    const [epDescription, setEpDescription] = useState('')
    const [epLink, setEpLink] = useState('')
    const [epLinkType, setEpLinkType] = useState('')

    const getPodcastDetail = async () => {

        try {
            const response = await axios.get(baseURL + `${podcastId}`)
            setPodcast(response.data.results[0])

            const response2 = await axios.get(`${response.data.results[0].feedUrl}`)
            const xmlDoc = parser.parseFromString(response2.data,"text/xml");
            setSummary(xmlDoc.getElementsByTagName('description')[0].innerHTML)
            setEpTitle(xmlDoc.getElementsByTagName('item')[episodeId].getElementsByTagName('title')[0].innerHTML)
            setEpDescription(xmlDoc.getElementsByTagName('item')[episodeId].getElementsByTagName('description')[0].innerHTML)
            setEpLink(xmlDoc.getElementsByTagName('item')[episodeId].getElementsByTagName('enclosure')[0].attributes.getNamedItem('url').value)
            setEpLinkType(xmlDoc.getElementsByTagName('item')[episodeId].getElementsByTagName('enclosure')[0].attributes.getNamedItem('type').value)

        } catch (error) {
            console.log({error})
        }
    } 

    useEffect(() => {
        getPodcastDetail()
        !epLink === false && setLoading(false)
    }, [epLink])

    return (
        <>
            <Header loader={loading}  />
            <div style={{display:'flex', gap:'5vw'}}>
                <PodcastInfo id={podcastId} artwork={podcast.artworkUrl600} artist={podcast.artistName} collection={podcast.collectionName} summary={summary}/>
                <DetailBox className='shadow' style={{width:'60%', gap:'4vh', alignItems:'flex-start'}}>
                    <span style={{fontSize:'3vh', fontWeight:'bold'}}>{epTitle}</span>
                    <span style={{fontSize:'2vh', fontStyle:'italic'}} dangerouslySetInnerHTML={{__html: epDescription}} />
                   { epLink &&  <audio controls>
                        <source src={epLink} type={epLinkType} />
                    </audio>}
                </DetailBox>
            </div>
        </>
    )
}

export default EpisodeDetail
