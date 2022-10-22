import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CastResponse } from '../../../models'
import { API_KEY, API_URL, IMAGE_URL } from '../../../variables'

function Cast() {
    const { id } = useParams<{ id: string }>()
    const [actors, updateActors] = useState<CastResponse['cast']>()

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
    }, [actors])

    return <div>cast</div>
}

export default Cast
