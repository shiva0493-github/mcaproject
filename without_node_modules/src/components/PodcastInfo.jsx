import React from 'react'
import { DetailBox } from '../styles/Containers'
import { useNavigate } from 'react-router'

const PodcastInfo = ({id, artwork, collection, artist, summary}) => {

    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/podcast/${id}`)
    }

    return (
        <DetailBox className="shadow">
                <img className='pointer' src={artwork} width='80%'  height='auto' onClick={clickHandler} />
                <hr style={{ borderTop:'0.2px solid rgba(0,0,0,0.2)', width:'100%'}} />    
                <span className='pointer' onClick={clickHandler}> {collection}</span>
                <span className='pointer' onClick={clickHandler}> By {artist}</span>
                <hr style={{ borderTop:'0.2px solid rgba(0,0,0,0.2)', width:'100%'}} />
                <div>
                    Description:<br />
                <span>{summary}</span>
                </div>
        </DetailBox>
    )
}

export default PodcastInfo
