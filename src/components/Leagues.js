import React,{useState,useEffect} from "react";
import '../App.css';
import axios from "axios";

const Leagues = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios('https://api.football-data.org/v4/competitions/',
            {
                headers: {'X-Auth-Token': ''}}
        ).then((res) => {
            console.log(res.data.competitions)
            setData(res.data.competitions)
        })
    }, [])

    return (
        <div className="leagues">
            {data.map((data) => (
                <div key={data.id} className="league">
                    <img src={data.emblem} alt="#"/>
                    <h1>{data.name}</h1>
                </div>
            ))}
        </div>
    )
}

export default Leagues;