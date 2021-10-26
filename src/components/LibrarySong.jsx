const LibrarySong = ({ song, currentSong, changeSong }) => {
  return (
    <div
      className={`library-song ${song.id === currentSong.id ? 'selected' : 'not-selected'}`}
      onClick={() => changeSong(song)}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
