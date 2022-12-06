import { NormalizerFn } from '@testing-library/react'

export type TrendingResponse = {
    total_pages: number
    total_results: number
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        original_language: string
        original_title?: string
        original_name?: string
        overview: string
        poster_path: string
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
        popularity: number
    }[]
}

export type FindMoviesResponse = {
    total_pages: number
    total_results: number
    page: number
    results: {
        poster_path: string
        adult: boolean
        overview: string
        release_date: string
        genre_ids: number[]
        id: number
        original_title: string
        original_name?: string
        original_language: string
        title: string
        backdrop_path: string
        popularity: number
        vote_count: number
        video: boolean
        vote_average: boolean
    }[]
}

export type MovieInformationResponse = {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: null
    budget: number
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]

    production_countries: {
        iso_3166_1: string
        name: string
    }[]

    release_date: string
    revenue: number
    runtime: number
    spoken_languages: {
        iso_639_1: string
        name: string
    }[]

    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type CastResponse = {
    id: number
    cast: {
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
        cast_id: number
        character: string
        credit_id: string
        order: number
    }[]
    crew: {
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
        credit_id: string
        department: string
        job: string
    }[]
}

export type ReviewsResponse = {
    id: number
    page: number
    results: {
        author: string
        author_details: {
            name: string
            username: string
            avatar_path: string
            rating: boolean
        }
        content: string
        created_at: string
        id: string
        updated_at: string
        url: string
    }[]
    total_pages: number
    total_results: number
}
