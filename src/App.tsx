import routes from './routes'
import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

function App() {
    return (
        <div className="app__main-contaiter">
            <Router>
                <div className="app__link-container">
                    <NavLink
                        className="app__link"
                        to="/home"
                        activeClassName="app__nav-link-active"
                    >
                        Trending Today
                    </NavLink>
                    <NavLink
                        className="app__link"
                        to="/movies"
                        activeClassName="app__nav-link-active"
                    >
                        Find Movies
                    </NavLink>
                </div>

                {routes.map(({ path, exact, component }) => (
                    <Route
                        key={path}
                        path={path}
                        exact={exact}
                        component={component}
                    />
                ))}
            </Router>
        </div>
    )
}

export default App
