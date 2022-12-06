import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { TrendingResponse } from '../../models'
import { NavLink } from 'react-router-dom'
import Image from '../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchAllTrendingMovies } from '../../requests/movie'
import { LanguageContext } from '../../App'
import { useTranslation } from 'react-i18next'
import ListMovie from '../ListMovie'

function HomeMovies() {
    const [moviesTrang, updateMoviesTrand] = useState<
        TrendingResponse['results']
    >([])
    const [isLoading, updateIsLoading] = useState<boolean>(true)
    const { language } = useContext(LanguageContext)

    const { t } = useTranslation()

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
                    <h1 className="home-movies__main-header">
                        {t('trending.title')}
                    </h1>
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
                        <ListMovie arrMovies={moviesTrang} />
                    </div>
                )}
            </div>
        </>
    )
}

export default HomeMovies
