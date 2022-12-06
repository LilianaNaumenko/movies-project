import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Image from '../Image/Image'
import { LanguageContext } from '../../App'
import { useTranslation } from 'react-i18next'
import { FindMoviesResponse, TrendingResponse } from '../../models'

type Props = {
    arrMovies: FindMoviesResponse['results'] | TrendingResponse['results']
}

function ListMovie({ arrMovies }: Props) {
    const { language } = useContext(LanguageContext)

    const { t } = useTranslation()
    return (
        <ul className="home-movies__list-container">
            {arrMovies.map(
                ({
                    id,
                    title,
                    original_title,
                    original_name = 'Unknown name',
                    poster_path,
                    overview,
                }) => (
                    <li className="home-movies__list-item" key={id}>
                        <NavLink
                            className="home-movies__list-item-link"
                            to={`/movies/${id}`}
                        >
                            <h2 className="home-movies__list-item-text">
                                {title || original_title || original_name}
                            </h2>
                            <div className="home-movies__img-or-backdrop-container">
                                <Image
                                    width={300}
                                    height={450}
                                    src={poster_path}
                                />

                                <div className="home-movies__backdrop">
                                    <h2 className="home-movies__backdrop-header">
                                        {t('trending.overview')}
                                    </h2>
                                    {overview ? (
                                        <p className="home-movies__backdrop-text">
                                            {overview}
                                        </p>
                                    ) : (
                                        <p>{t('trending.notOverview')}</p>
                                    )}
                                </div>
                            </div>
                        </NavLink>
                    </li>
                )
            )}
        </ul>
    )
}

export default ListMovie

// {/* <ul className="find-movie__list-container">
//                                 {result.map(
//                                     ({
//                                         id,
//                                         title,
//                                         original_title,
//                                         poster_path,
//                                         overview,
//                                     }) => (
//                                         <li className="find-movie__list-item">
//                                             <NavLink
//                                                 className="find-movie__list-item-link"
//                                                 to={`/movies/${id}`}
//                                                 key={id}
//                                             >
//                                                 <h1 className="find-movie__list-item-text">
//                                                     {title || original_title}
//                                                 </h1>
//                                                 <div className="find-movie__img-or-backdrop-container">
//                                                     <Image
//                                                         width={300}
//                                                         height={450}
//                                                         src={poster_path}
//                                                     />

//                                                     <div className="find-movie__backdrop">
//                                                         <h2 className="find-movie__backdrop-header">
//                                                             {t(
//                                                                 'trending.overview'
//                                                             )}
//                                                         </h2>
//                                                         {overview ? (
//                                                             <p className="find-movie__backdrop-text">
//                                                                 {overview}
//                                                             </p>
//                                                         ) : (
//                                                             <p>
//                                                                 {t(
//                                                                     'trending.notOverview'
//                                                                 )}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </NavLink>
//                                         </li>
//                                     )
//                                 )}
//                             </ul> */}
