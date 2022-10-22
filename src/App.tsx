import routes from './routes'
import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

function App() {
    return (
        <Router>
            <NavLink to="/">Trending Today</NavLink>
            <NavLink to="/movies">Find Movies</NavLink>

            {routes.map(({ path, exact, component }) => (
                <Route
                    key={path}
                    path={path}
                    exact={exact}
                    component={component}
                />
            ))}
        </Router>
    )
}

export default App
