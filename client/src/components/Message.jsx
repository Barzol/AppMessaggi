import React from 'react'

export default function Message(user, content){
    return(
        <div>
            <h3> {user} </h3>
            <span> {content} </span>
        </div>
    )
}