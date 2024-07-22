import React,{useState} from "react";
import '../App.css';
import Leagues from "./Leagues";
import Teams from "./Teams";

const Content = () => {
    const [active, setActive] = useState(true);

    return (
        <div className="content">
            {active ? <Leagues /> : <Teams />}
        </div>
    )
}

export default Content;