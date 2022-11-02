import React, { CSSProperties } from 'react'
import { IMAGE_URL } from '../../variables'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'

type Props = {
    width: number
    height: number
    src?: string
}

function Image({ width, height, src }: Props) {
    const style = { width, height } as CSSProperties

    return (
        <div style={style}>
            {src ? (
                <img
                    width={width}
                    height={height}
                    src={`${IMAGE_URL}/w${width}/${src}`}
                    alt=""
                />
            ) : (
                <ImagePlaceholder />
            )}
        </div>
    )
}

export default Image
