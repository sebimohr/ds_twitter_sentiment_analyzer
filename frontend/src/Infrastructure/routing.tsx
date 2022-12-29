import { Routes, Route, Navigate } from "react-router-dom";
import ChooseEventHashtag from "../StartScreen/choose-event-hashtag";

export function Routing() {
    return (
        <Routes>
            <Route index element={<Navigate to='/hashtag'/>}/>
            <Route path="/hashtag" element={<ChooseEventHashtag/>}/>
        </Routes>
    )
}