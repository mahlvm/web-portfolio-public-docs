import { useEffect, useState } from 'react'
import "./TicTacToe.css"
import Header from "../components/Header";

const winnersPossibilities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const TicTacToe = () => {
    const [gameData, setGameData] = useState([0,0,0,0,0,0,0,0,0]);
    const [turn, setTurn] = useState(1);
    const [winner, setWinner] = useState(null);
    const [msg, setMsg] = useState("You Start");


    const handleClick = async (index) => {
        if(winner || turn === 2 || gameData[index] !== 0 ) {
            return;
        } 

        const newGameData = [...gameData];
        if(newGameData[index] === 0) {
            newGameData[index] = turn;
        } else {
            return;
        }
        setGameData(newGameData);

        await checkWinner(newGameData); // Verificação do vencedor antes de mudar turno

        if (!winner) setTurn(2);
        
    };

    useEffect(() => {
        if(turn === 1) {
            setMsg("Your turn");
        } else {
            setMsg("My Turn");
        }
    }, [turn]);

    useEffect(() => {
        checkWinner();
        console.log(gameData)
    }, [gameData]);


    const randomNumber = () => {
        let min = 0;
        let max = 8;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (turn === 2 && winner === null) {
            const timeout = setTimeout(async () => {
            let number = randomNumber();
            const newGameDataTurn2 = [...gameData];

            while (newGameDataTurn2[number] !== 0) {
                number = randomNumber();
            }

            newGameDataTurn2[number] = turn;
            setGameData(newGameDataTurn2);
            await checkWinner(newGameDataTurn2);

            if (!winner) setTurn(1);
    
        }, 600);
        return () => clearTimeout(timeout);

        }
    }, [turn, gameData, winner]);



    const refresh = () => {
        setGameData([0,0,0,0,0,0,0,0,0]);
        setTurn(1);
        setWinner(null);
    };

    const checkWinner = async (data) => {
        // pego o index do gameData com valor correspondente ao index 0, 1 e 2 do objeto atual do winnersPossibilities
        // ex: no 1 for será gameData[0],gameData[1],gameData[2],

        

        for (let i of winnersPossibilities) {
            if (data[i[0]] === 1 && data[i[1]] === 1 && data[i[2]] === 1) {
                setWinner("YOU win!");
                return;
            } else if (data[i[0]] === 2 && data[i[1]] === 2 && data[i[2]] === 2) {
                setWinner("I win!");
                return;
            }
        }

        if(data.every(value => value !== 0 && setWinner(null))) {
            setWinner("No winner");
            setTurn(null);
        } 
    
    
    

    };

    return (
        <>
        <Header />
            <div className="tic-tac-toe">
                <div className='winner'>
                    {!winner ? (
                        <div className='winner-players'>
                        <p>Player X </p>
                        <h2>{msg}</h2>
                        <p>Player O</p>
                        </div>
                    ) : (
                        <div className='winner-msg'>
                        {winner}
                        </div>
                    )
                    }
                </div>

                <div className="boardGame">
                {gameData.map((value, index) => (
                    <span 
                        className={value === 1 ? 'x' : value === 2 ? 'o' : ''} 
                        key={index} 
                        onClick={() => handleClick(index)}>
                            {value === 1 && "X" || value === 2 && "O"}
                    </span>
                ))}
                </div>


                <div className='button-refresh'>
                    <button onClick={refresh}> Start Again</button>
                </div>

            
            </div>
        </>
    );
};

export default TicTacToe;   