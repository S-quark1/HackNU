import './App.css';
import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Map2D} from './2DMap';
import {Routes, Route, useNavigate} from 'react-router-dom';

const First = () => {
    const navigate = useNavigate();
    const lat = [35.66093428, 40.74352284, 51.50452146, 40.74848925, 51.50843075, 40.78047792, 52.37059295]
    const lng = [139.7290334, -74.00695075, -0.086503248, -73.98557857, -0.098585086, -73.96793906, 4.905730799]
    const alt = [0, 0, 60.63483719, 89.38082797, 0.658117563, 0.627920173, 0.692590481]

    const id = [null, null, null, null, "Alice", "Bob", "Jane"]
    const tm = [4875, 2744, 3266, 21545, 210541, 318233, 40818]
    const fl = [null, null, null, 19, null, null, null]
    const ha = [2.314, 1.4456, 8.1, 8.67, 2.3764, 3.68891, 4.81812]
    const va = [0.612, 0.26547, 8.9, 14.6, 5.484818, 2.049941, 3.93011]
    const act = [null, null, null, null, 'walking', "running", "cycling"]

    // const [personPos, setPersonPos] = useState({lt: 0, ln: 0}) // person's desc
    const [personId, setPersonId] = useState('') // person's desc
    const [personTm, setPersonTm] = useState(0) // person's desc
    const [personFl, setPersonFl] = useState(0) // person's desc
    const [personHa, setPersonHa] = useState(0) // person's desc
    const [personVa, setPersonVa] = useState(0) // person's desc
    const [personAct, setPersonAct] = useState('') // person's desc

    const [position, setPosition] = useState({lat: lat[1], lng: lng[1], alt: alt[2]}) //position of user's marker

    function btn1() {
        setPosition({lat: lat[0], lng: lng[0], alt: alt[0]})
        setPersonId(id[0])
        setPersonTm(tm[0])
        setPersonFl(fl[0])
        setPersonHa(ha[0])
        setPersonVa(va[0])
        setPersonAct(act[0])
    }

    function btn2() {
        setPosition({lat: lat[1], lng: lng[1], alt: alt[1]})
        setPersonId(id[1])
        setPersonTm(tm[1])
        setPersonFl(fl[1])
        setPersonHa(ha[1])
        setPersonVa(va[1])
        setPersonAct(act[1])
    }

    function btn3() {
        setPosition({lat: lat[2], lng: lng[2], alt: alt[2]})
        setPersonId(id[2])
        setPersonTm(tm[2])
        setPersonFl(fl[2])
        setPersonHa(ha[2])
        setPersonVa(va[2])
        setPersonAct(act[2])
    }

    function btn4() {
        setPosition({lat: lat[3], lng: lng[3], alt: alt[3]})
        setPersonId(id[3])
        setPersonTm(tm[3])
        setPersonFl(fl[3])
        setPersonHa(ha[3])
        setPersonVa(va[3])
        setPersonAct(act[3])
    }

    function btn5() {
        setPosition({lat: lat[4], lng: lng[4], alt: alt[4]})
        setPersonId(id[4])
        setPersonTm(tm[4])
        setPersonFl(fl[4])
        setPersonHa(ha[4])
        setPersonVa(va[4])
        setPersonAct(act[4])
    }

    function btn6() {
        setPosition({lat: lat[5], lng: lng[5], alt: alt[5]})
        setPersonId(id[5])
        setPersonTm(tm[5])
        setPersonFl(fl[5])
        setPersonHa(ha[5])
        setPersonVa(va[5])
        setPersonAct(act[5])
    }

    function btn7() {
        setPosition({lat: lat[6], lng: lng[6], alt: alt[6]})
        setPersonId(id[6])
        setPersonTm(tm[6])
        setPersonFl(fl[6])
        setPersonHa(ha[6])
        setPersonVa(va[6])
        setPersonAct(act[6])
    }

    // function btn8() {
    //     setPosition({lat: lat[7], lng: lng[7]})
    //     setPersonId(id[7])
    //     setPersonTm(tm[7])
    //     setPersonFl(fl[7])
    // }
    function handleCheck() {
        navigate("/3D", { state: { position: position } })
    }

    return (
        <div className='all'>
            <div className='app'>
                <div id='desc-wrapper'>
                    {/* <h3 className='text'>{coords[2]}</h3>
            <h4 className='text'>{coords[3]}</h4> */}
                    <div>
                        <button onClick={btn1} type="submit">dev1</button>
                        <button onClick={btn2} type="submit">dev2</button>
                        <button onClick={btn3} type="submit">dev3</button>
                        <button onClick={btn4} type="submit">dev4</button>
                        <button onClick={btn5} type="submit">dev5</button>
                        <button onClick={btn6} type="submit">dev6</button>
                        <button onClick={btn7} type="submit">dev7</button>
                    </div>
                    <div>
                        <p className='text hint'>ID: <b> {personId} </b></p>
                        <p className='text hint'>Current Time: <b> {personTm == null ? 'No data': personTm}</b></p>
                        <p className='text hint'>Current Floor: <b> {personFl == null ? 'No data': personFl} </b></p>
                        <p className='text hint'>Vertical accuracy: <b> {personVa} </b></p>
                        <p className='text hint'>Horizontal accuracy: <b> {personHa} </b></p>
                        <p className='text hint'>Confidence in location accuracy : <b> 0,6827 </b></p>
                        <p className='text hint'>Current activity: <b> {personAct == null ? "No data": personAct} </b></p>
                    </div>
                </div>

                <div id='int-area'>
                    <button type="submit" onClick={handleCheck}>View 3D</button>
                </div>
            </div>
            <Map2D position={position}/>
        </div>
    )
}
export default First;