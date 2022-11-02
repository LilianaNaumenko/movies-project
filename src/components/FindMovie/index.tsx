import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, API_URL, IMAGE_URL } from '../../variables'
import { NavLink } from 'react-router-dom'
import { FindMoviesResponse } from '../../models'
import Image from '../Image/Image'

function FindMovie() {
    const [value, updateValue] = useState('')
    const [result, updateResults] = useState<FindMoviesResponse['results']>([])

    const handleChange = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        updateValue(e.target.value)
    }

    const getResultsMovies = async () => {
        try {
            const { data } = await axios.get<FindMoviesResponse>(
                `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1`
            )
            updateResults(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        {
            value && getResultsMovies()
        }
    }, [value])

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
    )
}

export default FindMovie
