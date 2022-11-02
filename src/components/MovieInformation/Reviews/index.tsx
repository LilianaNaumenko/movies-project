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

    return review.length ? (
        <div className="reviews__main-container">
            <ul className="reviews__list-container">
                {review.map(({ id, author_details, content }) => (
                    <li className="reviews__list-item" key={id}>
                        <div className="reviews__text-author-container">
                            <p className="reviews__text-author-list-item">
                                Author:
                            </p>
                            <p className="reviews__text-author-list-item">
                                {author_details.name
                                    ? author_details.name
                                    : 'No name'}
                            </p>
                        </div>
                        <p className="reviews__text-content">{content}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <>
            <p className="reviews__secondary-text">
                There are no reviews for this film. Yours may be the first.
            </p>
        </>
    )
}

export default Reviews
