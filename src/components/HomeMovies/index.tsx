import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_KEY, API_URL, IMAGE_URL } from '../../variables'
import { TrendingResponse } from '../../models'
import { NavLink } from 'react-router-dom'
import Image from '../Image/Image'

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
            <div className="home-movies__main-header-container">
                <h1 className="home-movies__main-header">Trending today</h1>
            </div>
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
                            <li className="home-movies__list-item" key={id}>
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
        </div>
    )
}

export default HomeMovies
