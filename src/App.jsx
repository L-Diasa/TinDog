import React, { useState, useEffect, useMemo } from 'react'
import { nanoid } from "nanoid"
import Header from './components/Header'
import Button from './components/Button'
import ProfCard from './components/ProfCard'
import dogs from './data.js'
import pawIcon from './images/paw-icon.png'

function App() {
  const [data, setData] = useState([])
  const [profiles, setProfiles] = useState([])
  const [profIndex, setProfIndex] = useState(dogs.length - 1)
  const [endOfContent, setEndOfContent] = useState(false)
  const [btnDissabled, setBtnDissabled] = useState(false)

  const childRefs = useMemo(
    () =>
      Array(dogs.length)
        .fill(0)
        .map(i => React.createRef()),
    [dogs]
  )

  useEffect(() => {
    setData(
      dogs.map(profile => {
        return {
          ...profile,
          id: nanoid(),
        }
      }))
  }, []);

  useEffect(() => {
    setProfiles(data.length ? data.map((profile, index) => 
    <ProfCard 
      key={profile.id}
      cardRef={childRefs[index]}
      id={profile.id}
      index={index}
      imagePath={profile.avatar} 
      name={profile.name} 
      bio={profile.bio}
      handleSwipe={handleSwipe}
    />) : [] )
  }, [data.length]);

  useEffect(() => {
    if(profIndex < 0) {
      setBtnDissabled(true)
      setTimeout(() =>
        setEndOfContent(true), 
      500)
    }
  }, [profIndex]);

  function handleSwipe(id, index, liked) {
    setData(prev => prev.map(item => {
      return (item.id === id) ? 
      {
          ...item,
          hasBeenLiked: liked
      } :
      item
    }))
    setProfIndex(index - 1)
  }
  
  return (
    <div className="app">
      <Header/>  
      {endOfContent ?
      <div className='end-div'>
        <img src={pawIcon} alt="" />
        <p>Paw bey, matches!  
          Let's give ourselves a round of appaws 
          for all the connections we've made. Don't 
          let the end of this app get your tail down 
          - we'll be back before you can say 'squirrel'!</p>
      </div>
      :
      <>
      <div className='profiles-div'>
        {profiles}
      </div>
      <div className='buttons-div'>
        <Button 
          disabled={btnDissabled}
          iconName="cross" 
          handleClick={() => 
            childRefs[profIndex].current.swipe('left')
          }
        />
        <Button 
          disabled={btnDissabled}
          iconName="heart" 
          handleClick={() => 
            childRefs[profIndex].current.swipe('right')
          }
        />
      </div> 
      </>
      }
    </div>
  )
}

export default App