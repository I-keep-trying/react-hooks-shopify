import React, { useState, useEffect } from 'react'

const MyComp = (props) => {

    const initState = {
        newAttribs: [...props.attribs]
    };

    const [state, setState] = useState(initState)

    useEffect (() => { 
          setState({ ...state, newAttribs: [...props.attribs] }) 
    }, [props.attribs])
    console.log(state)


};

const App = () => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    const getS3Songs = async () => {
      const s3Songs = await Storage.list('', { level: 'public' })
      s3Songs.forEach(async song => {
        const artist = song.key.split(' ||| ')[0]
        const title = song.key.split(' ||| ')[1].slice(0, -4)
        const metadata = await API.get('SongList', `/songs/${artist}/${title}`)
        // setSongs([...songs, metadata]); <= causes loop
      })
    }
    getS3Songs()
  }, [songs]) // <= "songs" auto added by linter in create-react-app in vsCode.  Removing "songs" and disabling linter on that line doesn't help.

  const renderSongs = () => {
    return songs.map(song => {
      return <li>{song.title}</li>
    })
  }

  return (
    <div>
      <ul>{renderSongs()}</ul>
    </div>
  )
}

export default App
