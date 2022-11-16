import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { TrendingResponse } from '../../models'
import { NavLink } from 'react-router-dom'
import Image from '../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchAllTrendingMovies } from '../../requests/movie'
import { LanguageContext } from '../../App'

function HomeMovies() {
    const [moviesTrang, updateMoviesTrand] = useState<
        TrendingResponse['results']
    >([])
    const [isLoading, updateIsLoading] = useState<boolean>(true)
    const { language } = useContext(LanguageContext)

    const getMoviesTrandToday = async () => {
        try {
            const { data } = await fetchAllTrendingMovies()
            updateMoviesTrand(data.results)
            updateIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMoviesTrandToday()
    }, [language])

    return (
        <>
            <div className="home-movies__main-contaiter">
                <div className="home-movies__main-header-container">
                    <h1 className="home-movies__main-header">Trending today</h1>
                </div>
                {isLoading ? (
                    <div className="home-movies__main-loader-container">
                        <div className="home-movies__loader-container">
                            <ThreeDots
                                height="100"
                                width="100"
                                color="White"
                                ariaLabel="three-dots-loading"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <ul className="home-movies__list-container">
                            {moviesTrang.map(
                                ({
                                    id,
                                    title,
                                    original_title,
                                    original_name,
                                    poster_path,
                                    overview,
                                }) => (
                                    <li
                                        className="home-movies__list-item"
                                        key={id}
                                    >
                                        <NavLink
                                            className="home-movies__list-item-link"
                                            to={`/movies/${id}`}
                                        >
                                            <h2 className="home-movies__list-item-text">
                                                {title ||
                                                    original_title ||
                                                    original_name}
                                            </h2>
                                            <div className="home-movies__img-or-backdrop-container">
                                                <Image
                                                    width={300}
                                                    height={450}
                                                    src={poster_path}
                                                />

                                                <div className="home-movies__backdrop">
                                                    <h2 className="home-movies__backdrop-header">
                                                        Overview:
                                                    </h2>
                                                    {overview ? (
                                                        <p className="home-movies__backdrop-text">
                                                            {overview}
                                                        </p>
                                                    ) : (
                                                        <p>Overview missing.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomeMovies
