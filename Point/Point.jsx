import { useState } from 'react';
import './Point.css';
import Header from "../components/Header";



const Point = () => {
    const [listPoint, setListPoint] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [dotSize, setDotSize] = useState(5);
    const [redoList, setRedoList] = useState([]);

    const startDrawing = (event) => {
        console.log('mouse down');
        setIsDrawing(true);
        handleClick(event);
    };


    const drawingMovement = (event) => {
        if (!isDrawing) return;
        handleClick(event);
    };

    const stopDrawing = () => {
        console.log('mouse up');
        setIsDrawing(false);
    };

    

    const handleClick = (event) => {
        if (event.target.className !== 'point-container') return;
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setListPoint([...listPoint, { x, y, color, dotSize }]);

        console.log('clicked', listPoint, color);
    };

    const handleRestart = () => {
        setListPoint([]);
    };

    const handleUndo = () => {
        if (listPoint.length === 0) return;
        const lastItem = listPoint[listPoint.length -1];
        setRedoList([...redoList, lastItem]);

        setListPoint((prev) => {
            const list = [...prev];
            return list.slice(0, -1);
        });

        console.log('redo', redoList);
    
    }

    const handleRedo = () => {
        if (redoList.length === 0) return;
        setRedoList((prev) => {
            const listRedo = [...prev];
            const lastItem = listRedo[listRedo.length -1];
            setListPoint([...listPoint, lastItem]);
            return listRedo.slice(0, -1);
        });
    };

    const handleColor = (event) => {
        setIsDrawing(false);
        setColor(event.target.value);
    };

    const increase = () => {
        setDotSize(dotSize + 5);
    };

    const decrease = () => {
        if (dotSize > 5) {
            setDotSize(dotSize - 5);
        }
    };


    return (
        <>
            
        <Header />
            <div className='point-screen'>
                
                <div className='point-settings'>
                    <input 
                        type="color" 
                        onChange={handleColor}
                        value={color}
                    />
                    <button onClick={increase}>+</button>
                    <span>{dotSize}</span>
                    <button onClick={decrease}>-</button>
                    <button onClick={handleUndo}>Undo</button>
                    <button onClick={handleRedo}>Redo</button>
                    <button onClick={handleRestart}>Restart</button>
                </div>


                <div className="point-container" 
                    onMouseDown={startDrawing} 
                    onMouseMove={drawingMovement}
                    onMouseUp={stopDrawing}

                >
                    {listPoint.map((point, index) => (
                        <span
                            key={index}
                            className="dot"
                            style={{ 
                                left: point.x, 
                                top: point.y, 
                                backgroundColor: point.color, 
                                width: point.dotSize,  
                                height: point.dotSize
                            }}
                        />
                    )) }

                </div>
            </div>    
        </>
    );
};

export default Point;
