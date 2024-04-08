import React, { useEffect, useState } from 'react'
import StarRating from './StarRating'
import Loader from "./Loader"

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState(0)

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)

    const addWatched = () => {
        const newWatched = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating

        }
        onAddWatched(newWatched)
        onCloseMovie()
    }

    useEffect(() => {
        function callback(e) {
            if (e.code === "Escape") {
                onCloseMovie()
            }
        }
        document.addEventListener("keydown", callback)
        return () => { document.removeEventListener("keydown", callback) }
    }, [onCloseMovie])

    const KEY = "9656e762"
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json()
            setMovie(data)
            setIsLoading(false)
        } getMovieDetails()
    }, [selectedId])
    useEffect(() => {
        function changeTitle() {
            if (!title) return
            document.title = `Movie: ${title}`

            return function () {
                document.title = "UsePopcorn"
            }
        }
        changeTitle()
    }, [title])

    return (

        <div className="details">
            {isLoading ? <Loader /> : <>
                <header>
                    <button className="btn-back" onClick={onCloseMovie}>
                        &larr;
                    </button>
                    <img src={poster} alt={`Poster of ${movie} movie`} />
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>
                            {released} &bull; {runtime}
                        </p>
                        <p>{genre}</p>
                        <p>
                            <span>⭐️</span>
                            {imdbRating} IMDb rating
                        </p>
                    </div>
                </header>
                <section>
                    <div className='rating'>
                        {isWatched ? <p>You rated this movie</p> : !userRating ? <StarRating maxRating={10} size={24} onSetRating={setUserRating} /> :
                            <><StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                                <button className='btn-add' onClick={addWatched} >+ Add to watched</button></>}
                    </div>

                    <p>
                        <em>{plot}</em>
                    </p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>

                </section>




            </>}
        </div>

    )
}

export default MovieDetails