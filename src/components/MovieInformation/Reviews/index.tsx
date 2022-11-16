import React, { useContext, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { LanguageContext } from '../../../App'
import { ReviewsResponse } from '../../../models'
import { fetchAllReviewsAboutMovie } from '../../../requests/movie'

function Reviews() {
    const { id } = useParams<{ id: string }>()
    const [review, updateReview] = useState<ReviewsResponse['results']>([])
    const [isLoading, updateIsLoading] = useState<boolean>(true)
    const { language } = useContext(LanguageContext)

    const getReviewsAboutMovie = async () => {
        try {
            const { data } = await fetchAllReviewsAboutMovie(id)
            updateReview(data.results)
            updateIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getReviewsAboutMovie()
    }, [language])

    return isLoading ? (
        <div className="reviews__loader-container">
            <ThreeDots
                height="75"
                width="75"
                color="White"
                ariaLabel="three-dots-loading"
            />
        </div>
    ) : (
        <div>
            {review.length ? (
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
                                <p className="reviews__text-content">
                                    {content}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <>
                    <p className="reviews__secondary-text">
                        There are no reviews for this film. Yours may be the
                        first.
                    </p>
                </>
            )}{' '}
        </div>
    )
}

export default Reviews
