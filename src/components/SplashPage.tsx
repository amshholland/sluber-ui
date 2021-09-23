import React, { useState } from "react";
import '../styles/SplashPage.css'
import BounceLoader from 'react-spinners/BounceLoader'

export function SplashPage() {
    let [loading, setLoading] = useState(true);

    return (
        <div className='SplashPage'>
            <BounceLoader loading={loading} color='white' />
        </div>
    )
}