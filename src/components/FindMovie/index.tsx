import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FindMoviesResponse } from '../../models'
import Image from '../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchMovieBySearch } from '../../requests/movie'
import { LanguageContext } from '../../App'

function FindMovie() {
    const [value, updateValue] = useState('')
    const [result, updateResults] = useState<FindMoviesResponse['results']>([])
    const [isLoading, updateIsLoading] = useState<boolean>(false)
    const { language } = useContext(LanguageContext)

    const handleChange = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        updateValue(e.target.value)
    }

    const getResultsMovies = async () => {
        updateIsLoading(true)
        try {
            const { data } = await fetchMovieBySearch(value)
            updateResults(data.results)
            updateIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        {
            value && getResultsMovies()
        }
    }, [value, language])

    return (
        <div className="find-movie__main-contaiter">
            <form className="find-movie__form-container">
                <label className="find-movie__label">
                    Find Movies
                    <input
                        className="find-movie__input"
                        value={value}
                        type="text"
                        onChange={handleChange}
                    />
                </label>
            </form>
            {isLoading ? (
                <div className="find-movie__main-loader-container">
                    <div className="find-movie__loader-container">
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
                    {value && (
                        <div>
                            <ul className="find-movie__list-container">
                                {result.map(
                                    ({
                                        id,
                                        title,
                                        original_title,
                                        poster_path,
                                        overview,
                                    }) => (
                                        <li className="find-movie__list-item">
                                            <NavLink
                                                className="find-movie__list-item-link"
                                                to={`/movies/${id}`}
                                                key={id}
                                            >
                                                <h1 className="find-movie__list-item-text">
                                                    {title || original_title}
                                                </h1>
                                                <div className="find-movie__img-or-backdrop-container">
                                                    <Image
                                                        width={300}
                                                        height={450}
                                                        src={poster_path}
                                                    />

                                                    <div className="find-movie__backdrop">
                                                        <h2 className="find-movie__backdrop-header">
                                                            Overview:
                                                        </h2>
                                                        {overview ? (
                                                            <p className="find-movie__backdrop-text">
                                                                {overview}
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                Overview
                                                                missing.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}{' '}
                </div>
            )}
        </div>
    )
}

export default FindMovie
