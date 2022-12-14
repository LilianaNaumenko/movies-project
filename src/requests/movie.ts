import axios from 'axios'
import {
    CastResponse,
    FindMoviesResponse,
    MovieInformationResponse,
    ReviewsResponse,
    TrendingResponse,
} from '../models'
import { API_URL, API_KEY } from '../variables'

export const fetchAllTrendingMovies = async () => {
    const language = localStorage.getItem('language')

    return await axios.get<TrendingResponse>(
        `${API_URL}trending/all/day?api_key=${API_KEY}&language=${language}`
    )
}

export const fetchMovieBySearch = async (value: string) => {
    const language = localStorage.getItem('language')

    return await axios.get<FindMoviesResponse>(
        `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1&language=${language}`
    )
}

export const fetchInformationAboutMovie = async (id: string) => {
    const language = localStorage.getItem('language')

    return await axios.get<MovieInformationResponse>(
        `${API_URL}movie/${id}?api_key=${API_KEY}&language=${language}`
    )
}

export const fetchAllMovieActors = async (id: string) => {
    const language = localStorage.getItem('language')

    return await axios.get<CastResponse>(`
    ${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=${language}`)
}

export const fetchAllReviewsAboutMovie = async (id: string) => {
    const language = localStorage.getItem('language')

    return await axios.get<ReviewsResponse>(
        `${API_URL}movie/${id}/reviews?api_key=${API_KEY}&language=${language}&page=1`
    )
}
