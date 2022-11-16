import routes from './routes'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Menu from './components/Menu/Menu'

export const LanguageContext = React.createContext({
    language: '',
    setLanguage: (value: SetStateAction<string>) => {},
})

function App() {
    const savedLanguage = localStorage.getItem('language')
    const [language, setLanguage] = useState(savedLanguage || 'en')

    const contextValue = { language, setLanguage }
    return (
        <LanguageContext.Provider value={contextValue}>
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
                        <Menu />
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
        </LanguageContext.Provider>
    )
}

export default App
