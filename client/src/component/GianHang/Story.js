import { Avatar } from '@material-ui/core'
import React from 'react'
import './Story.css'
export default function Story({ image, profileSrc, Title }) {
    return (
        <div style={{ backgroundImage: `url(${image})` }} className="Story">
            <Avatar className="Story_Avatar" src={profileSrc} />
            <h3>{Title}</h3>
        </div>
    )
}


