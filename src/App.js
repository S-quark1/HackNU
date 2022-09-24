import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import First from "./2d";
import Start from "./3d";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<First/>}/>
                <Route path="/3D" element={<Start/>}/>
                <Route to="/"/>
            </Routes>
        </BrowserRouter>
    );
}
