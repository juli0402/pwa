import React, { useEffect, useState } from 'react'
import MD5 from 'crypto-js/md5'
function Card(props) {
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [origin, setOrigin] = useState()

  useEffect(() => {
    const url = `https://gateway.marvel.com/v1/public/characters/${props.id}${MD5(props)}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name)
        setImage(data.image)
        setOrigin(data.origin.name)
      })
  })

  if (image) {
    return (
      <div className="card">
        <img src={image} alt={name} className="card-image" />
        <h2 className="card-name"> {name}</h2>
        <h4 className="card-origin">{origin}</h4>
      </div>
    )
  }
  return 'Loading'
}

export default Card