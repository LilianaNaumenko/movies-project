import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom'
import { MovieInformationResponse } from '../../models'
import Cast from './Cast'
import Reviews from './Reviews'
import Image from '../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchInformationAboutMovie } from '../../requests/movie'
import { LanguageContext } from '../../App'
import { useTranslation } from 'react-i18next'

function MovieInformation() {
    const { id } = useParams<{ id: string }>()
    const [infoMovie, updateInfoMovie] = useState<MovieInformationResponse>()
    const [isLoading, updateIsLoading] = useState<boolean>(true)
    const { language } = useContext(LanguageContext)

    const { t } = useTranslation()

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
    }, [language])

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
                                    {t('movieInformation.userScore')}
                                </p>
                                <p className="movie-information__user-score-number">
                                    {infoMovie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </div>
                        <div className="movie-information__details-container">
                            <h2 className="movie-information__details-main-text">
                                {t('movieInformation.genres')}
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
                                <p>{t('movieInformation.notGenres')}</p>
                            )}

                            <h2 className="movie-information__details-main-text">
                                {t('trending.overview')}
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
                            {t('navLink.cast')}
                        </NavLink>
                        <NavLink
                            className="movie-information__nav-link"
                            to={`/movies/${id}/reviews`}
                        >
                            {t('navLink.reviews')}
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
                        {t('movieInformation.notInfoMovie')}
                    </h1>
                </>
            )}
        </div>
    )
}

export default MovieInformation
