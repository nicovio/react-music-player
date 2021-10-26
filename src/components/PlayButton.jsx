import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from './Spinner'

const PlayButton = ({ isPlaying, isLoading, playSongHandler }) => {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
      )}
    </>
  )
}

export default PlayButton
