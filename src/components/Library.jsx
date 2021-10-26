import LibrarySong from './LibrarySong'

const Library = ({ songs, currentSong, changeSong, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong song={song} currentSong={currentSong} changeSong={changeSong} key={song.id} />
        ))}
      </div>
    </div>
  )
}

export default Library
