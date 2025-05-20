
import './Browser.css';
import { useEffect, useState } from "react";
import Header from "../components/Header";
import moonTheme from "/assets/images/icon-moon.svg";
import sunTheme from "/assets/images/icon-sun.svg";





const Browser = () => {
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [mode, setMode] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data-extension.json');
                const jsonData = await response.json();
                setDatas(jsonData);
                setFilteredData(jsonData);
            } catch (error) {
                console.error("Erro:", error);
            }
        } 

        fetchData();
        }, []);

        const toggleActive = (name) => {
            const newData = datas.map((data) => {
                if(data.name === name) {
                    return{
                        ...data,
                        isActive: !data.isActive,
                    }
                } else {
                    return {...data}
                }
            })
            setDatas(newData);
            setFilteredData(newData);
        }

        const filterActivity = (event) => {
            if(event.target.value === "active"){
                setFilteredData(datas.filter(data => data.isActive === true));
            } else if(event.target.value === "inactive"){
                setFilteredData(datas.filter(data => data.isActive === false));
            } else {
                setFilteredData(datas);
            }
        }

        const removeData = (name) => {
            const newData = datas.filter(data => data.name !== name);
            setFilteredData(newData);
                setDatas(newData);
        }

        const colorTheme = () =>{
            setMode((prevMode)=> !prevMode);
            console.log(mode);
        };


        return (
            <div className={`browser-theme ${mode ? "lightMode" : "darkMode"}`}>
                <Header />
                <div className="browser-main">
                    <div className="browser-title">
                    <h1>Browser Extension</h1>
                    <p>Find the Frontend Mentor Challenge 
                        <a href='https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp' target="_blank" > HERE</a></p>
                    </div>
            
                    <div className="browser-logo">
                        <div className="main-browser-button">
                            <button type="button" onClick={filterActivity} value={"active"}>Active</button>
                            <button type="button" onClick={filterActivity} value={"inactive"}>Inactive</button>
                            <button type="button" onClick={filterActivity} value={"all"}>All</button>
                        </div>

                        <button className={`toggle-btn ${mode ? "toggled" : ""}`} onClick={colorTheme}>
                            <div className='thumb'>
                                {mode ? <img src={moonTheme} /> : <img src={sunTheme} />}
                            </div>
                        </button>
                    </div>
            
        
            
                    <div className="browser-grid">
                    <ul>
                        {filteredData.map(data => (
                        <li key={data.name}>

                            <div className='boxTop'>
                                <div className='imageBox'>
                                    <img src={data.logo} alt={data.name} />
                                </div>
                                <div className='informationBox'>
                                    <h1>{data.name}</h1>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        
                            <div className='buttonsBox'>
                                <button className="buttonRemove"onClick={() => removeData(data.name)}>Remove</button>
                                <button className={`toggle-btn-active ${data.isActive ? "Ativo" : "Inativo"}`} onClick={() => toggleActive(data.name)}>
                                    <div className='thumb-active'> </div>
                                </button>
                            </div>

                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>
            );
            
}

export default Browser;