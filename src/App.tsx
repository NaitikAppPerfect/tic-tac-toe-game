import { useState } from "react";
import "./index.css"

type squareProps={
  value: string | null;
  onSquareClick: ()=>void;
}

function Square({value, onSquareClick}: squareProps){
  return <button className="square" onClick={onSquareClick} >{value}</button>
}


type boardProps={
  xIsNext: boolean;
  square:  Array<string | null>;
  onPlay: ( updateSquare : Array<string | null> )=>void;
}

function Board({xIsNext, square, onPlay}: boardProps) {

  function handleClick(i: number){

    if(calculateWinner(square) || square[i]  ){
      return;
    }

    const updateSquare= square.slice();
    updateSquare[i]= xIsNext ?"X" :"O";
    onPlay(updateSquare);
  }

  const winner= calculateWinner(square);
      let status;
      status = winner? 'winner: '+winner: 'Next Player: '+ (xIsNext? 'X':'O');
  


  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
      <Square value={square[0]} onSquareClick={()=>handleClick(0)}/>
      <Square value={square[1]} onSquareClick={()=>handleClick(1)}/>
      <Square value={square[2]} onSquareClick={()=>handleClick(2)}/>
      </div>

      <div className="board-row">
      <Square value={square[3]} onSquareClick={()=>handleClick(3)}/>
      <Square value={square[4]} onSquareClick={()=>handleClick(4)}/>
      <Square value={square[5]} onSquareClick={()=>handleClick(5)}/>
      </div>

      <div className="board-row">
      <Square value={square[6]} onSquareClick={()=>handleClick(6)}/>
      <Square value={square[7]} onSquareClick={()=>handleClick(7)}/>
      <Square value={square[8]} onSquareClick={()=>handleClick(8)}/>
      </div>

      
    </>
  );
}



function calculateWinner(square : Array<string | null>){
      const list= [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]

      for(let i=0; i<list.length; i++){
          const[a, b, c]= list[i];
          if(square[a] && square[a]===square[b] && square[a]===square[c]){
            return square[a];
          }
      }
      return null;
}


function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const[currentMove, setCurrentMove]= useState<number>(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove%2===0;

  function handlePlay(updateSquare : Array<string | null>){
    const nextHistory = [...history.slice(0,currentMove+1), updateSquare];
     setHistory(nextHistory);
     setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove : number){
    setCurrentMove(nextMove);
  }

  const moves= history.map( ( _ , move)=>{ 
    let text;
    if(move>0){
      text='go to move #'+move;
    }else{
      text='go to game start';
    }
    return (
      <li key={move} >
        <button onClick={()=>jumpTo(move)}>{text}</button>
      </li>
    )
  } )

  return (
     <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} square={currentSquare}  onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
     </>
  );
}


export default Game
