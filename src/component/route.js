import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lay from "./layout";
import BookFinder from "./bookfinder";
import About from "./about";




export default function Rout() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Lay />}>
                        <Route index element={<BookFinder />} />
                        <Route path="about" element={<About />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>

    )
}