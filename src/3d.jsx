import { Map } from './Map';
import React from "react";
import {useLocation} from "react-router-dom";

const Start = () =>{
    const {state} = useLocation();
    const { position } = state;
    return (
        <div className='all'>
            <Map position={position}/>
        </div>
    )
}
export default Start