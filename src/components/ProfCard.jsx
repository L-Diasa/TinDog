import { useState } from 'react'
import TinderCard from 'react-tinder-card'

import nope from '../images/badge-nope.png'
import like from '../images/badge-like.png'

export default function ProfCard({ 
        id, cardRef, index, name,
        imagePath, bio, handleSwipe
    }) {
    const [hasBeenLiked, setHasBeenLiked] = useState(false)
    const [hasBeenCrossed, setHasBeenCrossed] = useState(false)
    const [leftTheScreen, setLeftTheScreen] = useState(false)

    const swiped = (direction) => {
        if(direction === 'left') {
            handleSwipe(id, index, false)
            setHasBeenCrossed(true)
        }
        else if(direction === 'right') {
            handleSwipe(id, index, true)
            setHasBeenLiked(true)
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        setLeftTheScreen(true)
    }

    return (
        <TinderCard
            ref={cardRef}
            preventSwipe={['up','down']}
            onSwipe={swiped}
            onCardLeftScreen={onCardLeftScreen}
            className={`tinderCard 
            ${(hasBeenLiked || hasBeenCrossed) ? 
                "swiped" : ""} 
            ${leftTheScreen ? "hidden" : ""}`}
        >
            <div className="card-div">
                {hasBeenCrossed && 
                    <img 
                        src={nope}
                        alt="NOPE" 
                        className='decision-icon' 
                    />
                }
                {hasBeenLiked && 
                    <img 
                        src={like} 
                        alt="LIKED" 
                        className='decision-icon'
                    />
                }
                <img 
                    className="prof-pic-img" 
                    src={imagePath} 
                    alt="prof-pic" />
                <div className='prof-info'>
                    <p className="prof-info-name">{name}</p>
                    <p className="prof-info-bio">{bio}</p>
                </div>
            </div>
        </TinderCard>
    )
}
