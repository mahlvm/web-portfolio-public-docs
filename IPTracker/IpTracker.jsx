import "./IPTracker.css";
import Header from "../components/Header";
import MapLeaflet from "../components/MapLeaflet";
import axios from "axios";
import {useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';


const IPTracker = () => {
    // const [apiResponse, setApiResponse] = useState({});
    const [ip, setIp] = useState("");
    const [location, setLocation] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [isp, setIsp] = useState("");
    const [findIp, setFindIp] = useState("");
    const [lat, setLat] = useState("32.69922");
    const [lng, setLng] = useState("-117.11281");
    

    const URL = "https://geo.ipify.org/api/v2/country,city";
    const fetchIPTracker = async (e) => {
        if(e){e.preventDefault();};
        try{
            const response = await axios.get(URL,
                {
                    params: {
                        apiKey: 'at_CvVmEW3Dl8aYlAJx6rqPiNmBI4jvb',
                        ipAddress: findIp,
                    }
                }
            );
            // setApiResponse(response.data);
            setLat(response.data.location.lat);
            setLng(response.data.location.lng);
            setIp(response.data.ip);
            setLocation(response.data.location.city);
            setTimeZone(response.data.location.timezone);
            setIsp(response.data.isp);
        } catch (error){
            console.log("Error", error)
        }
    };

    useEffect(() =>{
        fetchIPTracker();
    }, []);



    return(
        <div className="tracker-container">
            <Header />
            <div className="tracker-form">
                <form onSubmit={fetchIPTracker}>
                        <input
                            type="text"
                            value={findIp}
                            onChange={(event) => {setFindIp(event.target.value);}}
                            placeholder="find a location using an IP"
                        />
                        <button type="submit">Find</button>
                    </form>
                    <div className="mentor">
                    <p>Find this Frontend Mentor Challenge 
                    <a href='https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0' target="_blank" > HERE</a></p>
                    </div>    
                    

                <dl className="tracker-data-box">
                    <div className="data-pair">
                        {findIp ? (
                        <>
                            <dt>IP ADRESS:</dt>
                            <dd>{ip}</dd>
                        </>
                        ) : (
                        <>  
                            <dt>YOUR IP ADDRESS NOW:</dt>
                            <dd>{ip}</dd>
                        </>
                        )}
                    </div>
                    <div className="data-pair">
                        <dt>LOCATION:</dt>
                        <dd>{location}</dd> 
                    </div>
                    <div className="data-pair">
                        <dt>TIMEZONE:</dt>
                        <dd>GMT {timeZone}</dd> 
                    </div>
                    <div className="data-pair">
                        <dt>ISP:</dt>
                        <dd>{isp}</dd> 
                    </div>
                </dl>

                
            </div>

            <div className="tracker-map">
                <MapLeaflet lat={lat} lng={lng} />
            </div>
        </div>
    );
};

export default IPTracker;