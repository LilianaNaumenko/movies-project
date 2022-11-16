import React, { ChangeEvent, useContext } from 'react'
import { LanguageContext } from '../../App'

function Menu() {
    const { language, setLanguage } = useContext(LanguageContext)

    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        localStorage.setItem('language', e.target.value)
        setLanguage(e.target.value)
    }

    const options = [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Русский' },
    ]

    return (
        <select onChange={changeLanguage} name="select" className="app__select">
            {options.map(({ value, label }) => (
                <option selected={language === value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )
}

export default Menu
