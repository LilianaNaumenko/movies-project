import React, { useEffect, useState } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom'
import { MovieInformationResponse } from '../../models'
import Cast from './Cast'
import Reviews from './Reviews'
import Image from '../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchInformationAboutMovie } from '../../requests/movie'

function MovieInformation() {
    const { id } = useParams<{ id: string }>()
    const [infoMovie, updateInfoMovie] = useState<MovieInformationResponse>()
    const [isLoading, updateIsLoading] = useState<boolean>(true)

    const getInformationAboutMovie = async () => {
        try {
            const { data } = await fetchInformationAboutMovie(id)
            updateInfoMovie(data)
            updateIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getInformationAboutMovie()
    }, [])

    return isLoading ? (
        <div className="movie-information__main-loader-container">
            <div className="movie-information__loader-container">
                <ThreeDots
                    height="100"
                    width="100"
                    color="White"
                    ariaLabel="three-dots-loading"
                />
            </div>
        </div>
    ) : (
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
