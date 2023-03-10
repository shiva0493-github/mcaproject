import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { HeaderTitle } from '../styles/TextImages'
import disc from "../assets/disc_loader.png"

const Header = ({loader}) => {

    const navigate = useNavigate()

    return (
        <div style={{ width:'90%', position:'relative'}}>
            <HeaderTitle onClick={ () => navigate('/')}>Podcaster</HeaderTitle>
            {/* {<span style={{position:'absolute', right:'0', top:'20%'}}>...loading</span>} */}
           {  loader && <img style={{position:'absolute', right:'0', top:'20%', animation:'spin 2s linear infinite'}} src={disc} alt="img" height='20px' width='auto' />}
            <hr />
        </div>
    )
}

export default Header
