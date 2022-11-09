import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CastResponse } from '../../../models'
import Image from '../../Image/Image'
import { ThreeDots } from 'react-loader-spinner'
import { fetchAllMovieActors } from '../../../requests/movie'

function Cast() {
    const { id } = useParams<{ id: string }>()
    const [actors, updateActors] = useState<CastResponse['cast']>([])
    const [isLoading, updateIsLoading] = useState<boolean>(true)

    const getInfoActors = async () => {
        try {
            const { data } = await fetchAllMovieActors(id)
            updateActors(data.cast)
            updateIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getInfoActors()
    }, [])

    return isLoading ? (
        <div className="cast__loader-container">
            <ThreeDots
                height="75"
                width="75"
                color="White"
                ariaLabel="three-dots-loading"
            />
        </div>
    ) : (
        <div>
            {actors.length ? (
                <div>
                    <ul className="cast__list-container">
                        {actors.map(
                            ({
                                id,
                                name,
                                original_name,
                                profile_path,
                                character,
                            }) => (
                                <li className="cast__list-item" key={id}>
                                    <h3 className="cast__list-item-text">
                                        {name || original_name}
                                    </h3>
                                    <Image
                                        width={300}
                                        height={450}
                                        src={profile_path}
                                    />

                                    <div className="cast__character-text-container">
                                        <p className="cast__character-text">
                                            Character:
                                        </p>
                                        <p> {character ? character : '-'}</p>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ) : (
                <>
                    <p className="cast__secondary-text">
                        No information about the cast.
                    </p>
                </>
            )}
        </div>
    )
}

export default Cast
