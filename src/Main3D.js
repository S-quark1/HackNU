import { Map } from './Map';
import React from "react";

Start();
function Start(){
    return (
        <div className='all'>
            <Map position={window.position}/>
        </div>
    )
}