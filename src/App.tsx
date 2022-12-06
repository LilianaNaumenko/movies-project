import routes from './routes'
import React, {
    createContext,
    SetStateAction,
    Suspense,
    useEffect,
    useState,
} from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'

export const LanguageContext = createContext({
    language: '',
    setLanguage: (value: SetStateAction<string>) => {},
})

function App() {
    const savedLanguage = localStorage.getItem('language')
    const [language, setLanguage] = useState(savedLanguage || 'en')

    const { t } = useTranslation()

    useEffect(() => {
        changeLanguage(language)
    }, [language])

    const contextValue = { language, setLanguage }
    return (
        <Suspense fallback={'...'}>
            <LanguageContext.Provider value={contextValue}>
                <div className="app__main-contaiter">
                    <Router>
                        <div className="app__link-container">
                            <Menu />
                            <NavLink
                                className="app__link"
                                to="/"
                                activeClassName="app__nav-link-active"
                            >
                                {t('navLink.trendingtoday')}
                            </NavLink>
                            <NavLink
                                className="app__link"
                                to="/movies"
                                activeClassName="app__nav-link-active"
                            >
                                {t('navLink.findMovies')}
                            </NavLink>
                            <NavLink to="/registration">
                                {t('navLink.registration')}
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
            </LanguageContext.Provider>
        </Suspense>
    )
}

export default App
