import React from 'react'
import './Loading.css'
import { useSelector } from 'react-redux'

function Loader() {
    const isLoading = useSelector(state => state.Loading.DataLoading)
    return (
        <div className={isLoading ? `Loader` : 'NotVisible'}>
            <div className="LoaderContent">
                <h1>uB</h1>
                
            </div>
            
        </div>
    )
}

export default Loader
