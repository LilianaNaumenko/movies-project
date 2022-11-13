import React from 'react'

function Menu() {
    return (
        <select name="select" className="app__select">
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="ua">Українська</option>
        </select>
    )
}

export default Menu
