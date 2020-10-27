import React, {useEffect} from 'react'

export default function LoginPage() {

    //Component did mount
    useEffect(() => {
        document.title = 'Login'
    }, [])

    return (
        <div>
            <h1>Login page</h1>
        </div>
    )
}
