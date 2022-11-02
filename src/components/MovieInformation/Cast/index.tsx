import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CastResponse } from '../../../models'
import { API_KEY, API_URL, IMAGE_URL } from '../../../variables'
import fallbackPhoto from '../../../image/photo-profile.jpeg'
import Image from '../../Image/Image'

function Cast() {
    const { id } = useParams<{ id: string }>()
    const [actors, updateActors] = useState<CastResponse['cast']>([])

    const getInfoActors = async () => {
        try {
            const { data } = await axios.get<CastResponse>(`
            ${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`)

            updateActors(data.cast)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getInfoActors()
    }, [])

    return (
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
