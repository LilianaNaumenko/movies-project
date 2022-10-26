import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CastResponse } from '../../../models'
import { API_KEY, API_URL, IMAGE_URL } from '../../../variables'
import fallbackPhoto from '../../../image/photo-profile.jpeg'

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
            {actors && (
                <div>
                    <ul>
                        {actors.map(
                            ({
                                id,
                                name,
                                original_name,
                                profile_path,
                                character,
                            }) => (
                                <li key={id}>
                                    <h3>{name || original_name}</h3>
                                    <img
                                        width="300"
                                        height="450"
                                        src={
                                            profile_path
                                                ? `${IMAGE_URL}${profile_path}`
                                                : fallbackPhoto
                                        }
                                    />
                                    <p>Character:{character}</p>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Cast
