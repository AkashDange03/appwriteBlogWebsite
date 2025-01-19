import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = "bg-button",
    textColor = "text-black",
    className = '',
    ...props

}) {
    return (
        <button className={`px-4 py-2 text-lg rounded-lg ${className} ${bgColor} ${textColor} border-border`} {...props}>     
            {children}
        </button>
    )
}

export default Button