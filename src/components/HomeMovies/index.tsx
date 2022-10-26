import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_KEY, API_URL, IMAGE_URL } from '../../variables'
import { TrendingResponse } from '../../models'
import { NavLink } from 'react-router-dom'

function HomeMovies() {
    const [moviesTrang, updateMoviesTrand] = useState<
        TrendingResponse['results']
    >([])

    const getMoviesTrandToday = async () => {
        try {
            const { data } = await axios.get<TrendingResponse>(
                `${API_URL}trending/all/day?api_key=${API_KEY}`
            )
            updateMoviesTrand(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMoviesTrandToday()
    }, [])

    return (
        <div className="home-movies__main-contaiter">
            <h1>Traiding today</h1>
            <div>
                <ul>
                    {moviesTrang.map(movie => (
                        <NavLink key={movie.id} to={`/movies/${movie.id}`}>
                            <h1>
                                {movie.title ||
                                    movie.original_title ||
                                    movie.original_name}
                            </h1>
                            <img
                                width="300"
                                height="450"
                                src={`${IMAGE_URL}${movie.poster_path}`}
                            />
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HomeMovies
