import React from 'react'

function Registration() {
    return (
        <div>
            <h1 className="registration__title">Registration</h1>
            <div className="registration__container-input">
                <label className="registration__label">
                    Email
                    <input className="registration__input" />
                </label>

                <label className="registration__label">
                    Name
                    <input className="registration__input" />
                </label>
                <label className="registration__label">
                    Password
                    <input className="registration__input" />
                </label>
            </div>
            <button>Registration</button>
        </div>
    )
}

export default Registration
