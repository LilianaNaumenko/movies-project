import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FindMoviesResponse } from '../../models'
import Image from '../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchMovieBySearch } from '../../requests/movie'
import { LanguageContext } from '../../App'
import { useTranslation } from 'react-i18next'
import ListMovie from '../ListMovie'

function FindMovie() {
    const [value, updateValue] = useState('')
    const [result, updateResults] = useState<FindMoviesResponse['results']>([])
    const [isLoading, updateIsLoading] = useState<boolean>(false)
    const { language } = useContext(LanguageContext)

    const { t } = useTranslation()

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
                    {t('findMovie.title')}
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
                            <ListMovie arrMovies={result} />
                        </div>
                    )}{' '}
                </div>
            )}
        </div>
    )
}

export default FindMovie
