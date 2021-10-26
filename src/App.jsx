import { useRef, useState } from 'react'
import Library from './components/Library'
import Nav from './components/Nav'
import Player from './components/Player'
import Song from './components/Song'
import getData from './data'
import './styles/app.scss'
import { getAnimationPercentaje } from './util'

function App() {
  const audioRef = useRef(null)
  const [songs, setSongs] = useState(getData())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentaje: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration || 0
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentaje: getAnimationPercentaje(currentTime, duration),
    })
  }

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const nextSongIndex = (currentIndex + DIRECTION[direction]) % songs.length
    const nextSong = nextSongIndex > -1 ? songs[nextSongIndex] : songs[songs.length - 1]
    changeSong(nextSong)
  }

  const changeSong = (nextSong) => {
    setCurrentSong(nextSong)
    if (!autoPlay) {
      setAutoPlay(true)
    }
  }

  const onLoadedMetadata = (e) => {
    timeUpdateHandler(e)
    setIsLoading(false)
    if (autoPlay) {
      audioRef.current.play()
    }
  }

  const onError = (e) => {
    console.log(e)
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        isPlaying={isPlaying}
        audioRef={audioRef}
        skipTrackHandler={skipTrackHandler}
        isLoading={isLoading}
        currentSong={currentSong}
      />
      <Library songs={songs} currentSong={currentSong} changeSong={changeSong} libraryStatus={libraryStatus} />
      <audio
        onError={onError}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => skipTrackHandler('forward')}
        onLoadStart={() => setIsLoading(true)}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}

export default App

const DIRECTION = {
  forward: 1,
  back: -1,
}
