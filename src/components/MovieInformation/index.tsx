import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom'
import { MovieInformationResponse } from '../../models'
import { API_KEY, API_URL, IMAGE_URL } from '../../variables'
import Cast from './Cast'
import Reviews from './Reviews'

function MovieInformation() {
    const { id } = useParams<{ id: string }>()
    const [infoMovie, updateInfoMovie] = useState<MovieInformationResponse>()

    const getInformationAboutMovie = async () => {
        try {
            const { data } = await axios.get<MovieInformationResponse>(
                `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
            )
            updateInfoMovie(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getInformationAboutMovie()
    }, [])

    return (
        <div>
            {infoMovie && (
                <>
                    <div>
                        <h1>{infoMovie.title}</h1>
                        <img
                            width="300"
                            height="450"
                            src={`${IMAGE_URL}${infoMovie.poster_path}`}
                            alt=""
                        />
                        <p>User Score: {infoMovie.vote_average.toFixed(1)}</p>
                        <h2>Overview:</h2>
                        <p>{infoMovie.overview}</p>
                        <h2>Genres:</h2>
                        <ul>
                            {infoMovie.genres.map(el => (
                                <li key={el.id}>{el.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <NavLink to={`/movies/${id}/cast`}>Cast</NavLink>
                        <NavLink to={`/movies/${id}/reviews`}>Reviews</NavLink>
                    </div>
                    <Route path="/movies/:id/cast" exact component={Cast} />
                    <Route
                        path="/movies/:id/reviews"
                        exact
                        component={Reviews}
                    />
                </>
            )}
        </div>
    )
}

export default MovieInformation
