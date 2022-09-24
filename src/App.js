// /* global google */
// /* eslint-disable no-undef */
import './App.css';
import React from 'react';
import {capitals} from './capitals';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Map} from './Map';
import {getDistance} from './getDistance';

function App() {
    const WeatherKey = process.env.REACT_APP_WEATHER_API

    const lat = [35.66093428, 40.74352284, 51.50452146]
    const lng = [139.7290334, -74.00695075, -0.086503248]

    const id = [null, null, null, null, "Alice"]
    const tm = [4875, 2744]
    const fl = [null, null, null, 19]
    const ha = [2.314, 1.4456]
    const va = [0.612, 0.26547]
    const act = [null, null]

    // const [personPos, setPersonPos] = useState({lt: 0, ln: 0}) // person's desc
    const [personId, setPersonId] = useState('') // person's desc
    const [personTm, setPersonTm] = useState(0) // person's desc
    const [personFl, setPersonFl] = useState(0) // person's desc
    const [personHa, setPersonHa] = useState(0) // person's desc
    const [personVa, setPersonVa] = useState(0) // person's desc
    const [personAct, setPersonAct] = useState('') // person's desc

    const [randomCity, setRandomCity] = useState([])
    const [coords, setCoords] = useState([]) // city's corrds + country name + city name
    const [result, setResult] = useState(false) //verdict
    const [showResult, setShowResult] = useState(false) //if user has pressed 'check my answer'
    const [askedHint, setAskedHint] = useState(false) //if user has asked the hint
    const [pressedMap, setPressedMap] = useState(false) //if user has pressed the map
    const [position, setPosition] = useState({lat: 0, lng: 0}) //position of user's marker
    const [originalPosition, setOriginalPosition] = useState({lat: 43.238949, lng: 76.889709}) //position of original city's marker
    const [answered, setAnswered] = useState(true)
    const [distance, setDistance] = useState(0)
    const [showRules, setShowRules] = useState(true)
    const isDesktop = document.getElementsByTagName('body')[0].clientWidth > 600 //true is a desktop. false is a mobile

    function btn1() {
        setPosition({lat: lat[0], lng: lng[0]})
        setPersonId(id[0])
        setPersonTm(tm[0])
        setPersonFl(fl[0])
        setPersonHa(ha[0])
        setPersonVa(va[0])
        setPersonAct(act[0])
        setPressedMap(true)
    }

    function btn2() {
        setPosition({lat: lat[1], lng: lng[1]})
        setPersonId(id[1])
        setPersonTm(tm[1])
        setPersonFl(fl[1])
        setPersonHa(ha[1])
        setPersonVa(va[1])
        setPersonAct(act[1])
        setPressedMap(true)
    }

    return (
        <div className='all'>
            <div className='app'>
                <div id='int-area'>
                    <button onClick={btn1} type="submit">dev1</button>
                    <button onClick={btn2} type="submit">dev2</button>
                </div>

                <div className={showResult ? 'enable text result' : 'result disable text'}>
                    <h4>You are <span className={result ? 'right' : 'wrong'}>{result ? 'right' : 'wrong'}!</span> <span
                        className='capital'>{coords[3]}</span> is the capital of <span
                        className='country'> {coords[2]}</span>.</h4>
                    <h4 className={result ? 'disable' : 'enable'}>Your guess was <span
                        className='capital'>{distance} KM</span> from the correct location.</h4>
                </div><div id="map">
                <Map position={position} setPosition={setPosition} pressedMap={pressedMap}
                     setPressedMap={setPressedMap} originalPosition={originalPosition} showResult={showResult}
                     answered={answered} setAnswered={setAnswered}/>
            </div>
            </div>

        </div>
    );
}

export default App;