import React from 'react'

const ErrorMessage = ({ e }) => {
    return (
        <div className='error'>
            <p>We have error</p>
            <p>{e}</p>
        </div>
    )
}

export default ErrorMessage