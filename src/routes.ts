import HomeMovies from './components/HomeMovies'
import FindMovie from './components/FindMovie'
import MovieInformation from './components/MovieInformation'
import Registration from './components/Registration'

const routes = [
    { path: '/', exact: true, component: HomeMovies },
    { path: '/movies', exact: true, component: FindMovie },
    { path: '/movies/:id', component: MovieInformation },
    { path: '/registration', component: Registration },
]

export default routes
