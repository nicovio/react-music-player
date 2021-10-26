import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getAnimationPercentaje } from '../util'
import PlayButton from './PlayButton'

const Player = ({ songInfo, setSongInfo, isPlaying, audioRef, skipTrackHandler, isLoading, currentSong }) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const getTime = (time) => {
    const minutos = Math.floor(time / 60)
    const segundos = ('0' + Math.floor(time % 60)).slice(-2)
    return `${minutos}:${segundos}`
  }

  const dragHandler = (e) => {
    const currentTime = e.target.value
    setSongInfo({
      ...songInfo,
      currentTime,
      animationPercentaje: getAnimationPercentaje(currentTime, songInfo.duration),
    })
    audioRef.current.currentTime = currentTime
  }

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentaje}%)`,
  }

  const trackBackground = `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{ background: trackBackground }} className="track">
          <input value={songInfo.currentTime} min={0} max={songInfo.duration} onChange={dragHandler} type="range" />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler('back')} className="skip-back" size="2x" icon={faAngleLeft} />
        <PlayButton isPlaying={isPlaying} isLoading={isLoading} playSongHandler={playSongHandler} />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}

export default Player
