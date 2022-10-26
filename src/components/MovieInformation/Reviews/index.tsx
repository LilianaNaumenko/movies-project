import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReviewsResponse } from '../../../models'
import { API_KEY, API_URL } from '../../../variables'

function Reviews() {
    const { id } = useParams<{ id: string }>()
    const [review, updateReview] = useState<ReviewsResponse['results']>([])

    const getReviewsAboutMovie = async () => {
        try {
            const { data } = await axios.get<ReviewsResponse>(
                `${API_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
            )
            updateReview(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getReviewsAboutMovie()
    }, [])

    return review ? (
        <div>
            <ul>
                {review.map(({ id, author_details, content }) => (
                    <li key={id}>
                        <p>
                            Author:{' '}
                            {author_details.name
                                ? author_details.name
                                : 'No name'}
                        </p>
                        <p>{content}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <>
            <p>There are no reviews for this film. Yours may be the first.</p>
        </>
    )
}

export default Reviews
