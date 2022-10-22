import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, API_URL, IMAGE_URL } from '../../variables'
import { NavLink } from 'react-router-dom'
import { FindMoviesResponse } from '../../models'

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
        <div>
            <form>
                <label>
                    Find Movies
                    <input value={value} type="text" onChange={handleChange} />
                    <button type="submit">Search</button>
                </label>
            </form>
            {value && (
                <div>
                    <ul>
                        {result.map(movie => (
                            <NavLink to={`/movies/${movie.id}`} key={movie.id}>
                                <h1>{movie.title || movie.original_title}</h1>
                                <img src={`${IMAGE_URL}${movie.poster_path}`} />
                            </NavLink>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FindMovie
