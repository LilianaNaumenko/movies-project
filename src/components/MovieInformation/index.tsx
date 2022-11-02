import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom'
import { MovieInformationResponse } from '../../models'
import { API_KEY, API_URL } from '../../variables'
import Cast from './Cast'
import Reviews from './Reviews'
import Image from '../Image/Image'

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
        <div className="movie-information__main-container">
            {infoMovie ? (
                <>
                    <div className="movie-information__information-container">
                        <div>
                            <h1 className="movie-information__poster-text">
                                {infoMovie.title}
                            </h1>
                            <Image
                                width={400}
                                height={550}
                                src={infoMovie.poster_path}
                            />
                            <div className="movie-information__user-score-container">
                                <p className="movie-information__user-score-text">
                                    User Score:
                                </p>
                                <p className="movie-information__user-score-number">
                                    {infoMovie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </div>
                        <div className="movie-information__details-container">
                            <h2 className="movie-information__details-main-text">
                                Genres:
                            </h2>
                            {infoMovie.genres ? (
                                <ul className="movie-information__details-list">
                                    {infoMovie.genres.map(({ id, name }) => (
                                        <li
                                            className="movie-information__details-item-list"
                                            key={id}
                                        >
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Geners missing.</p>
                            )}

                            <h2 className="movie-information__details-main-text">
                                Overview:
                            </h2>
                            <p className="movie-information__details-text">
                                {infoMovie.overview}
                            </p>
                        </div>
                    </div>
                    <div>
                        <NavLink
                            className="movie-information__nav-link"
                            to={`/movies/${id}/cast`}
                        >
                            Cast
                        </NavLink>
                        <NavLink
                            className="movie-information__nav-link"
                            to={`/movies/${id}/reviews`}
                        >
                            Reviews
                        </NavLink>
                    </div>
                    <Route path="/movies/:id/cast" exact component={Cast} />
                    <Route
                        path="/movies/:id/reviews"
                        exact
                        component={Reviews}
                    />
                </>
            ) : (
                <>
                    <h1 className="movie-information__secondary-text">
                        There is no information available for this movie.
                    </h1>
                </>
            )}
        </div>
    )
}

export default MovieInformation
