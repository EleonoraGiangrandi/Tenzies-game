import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from "./Die"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [rolls, setRolls] = useState(0)
  const [won, setWon] = useState(false)
  const btnRef = useRef(null)
  const [time, setTime] = useState(0)
  //const intervalRef = useRef(null)

  function allNewDice() {
    return Array.from({ length: 10 }, ()=> ({
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }))
  }

  function roll(){
    setDice(prevDie => 
      prevDie.map(die => 
        die.isHeld
          ? die
          : {...die, value: Math.floor(Math.random() * 6 + 1)}
      )
    )
    setRolls(prevRolls => prevRolls + 1)
  }

  useEffect(() => {
    if (won && btnRef.current) {
      btnRef.current.focus();
    }
  }, [won]);

  function newGame() {
    setDice(allNewDice())
    setWon(false)
    setTime(0)
    setRolls(0)
  }

  useEffect(() => {
    let intervalId;
    if (!won) {
      intervalId = setInterval(()=> {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [won])

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.length > 0 && dice.every(die => die.value === dice[0].value);

    if (allHeld && allSameValue) {
      setWon(true);
    }
  }, [dice]); 

  function hold(id) {
    setDice(prevDie => 
      prevDie.map((die)=> 
        die.id === id
          ? {...die, isHeld: !die.isHeld}
          : die
      )
    )
  }

  const diceElements = dice.map(num => (
    <Die 
      key={num.id} 
      value={num.value} 
      isHeld={num.isHeld} 
      onClickEvent={() => hold(num.id)} 
    />
  ))
  
  return (
    /*<main>
      {won && <Confetti width={'1530px'} height={'725px'} />}
      <div aria-live="polite" className="sr-only">
        {won && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>      
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="info-container">
        <div className="rolls-counter info">Rolls <div>{rolls}</div></div>
        <div className="timer info">Time <div>{time} s</div></div>          
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        className="roll-btn" 
        onClick={won ? newGame : roll} 
        ref={btnRef}
      >
        {won ? 'New Game' : 'Roll'}
      </button>
    </main>*/

    <div className="container-fluid d-flex flex-column align-items-center vh-100 justify-content-center">
      {won && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div aria-live="polite" className="sr-only">
        {won && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div 
        className="card p-4 text-center w-100" 
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          height: 'auto', 
          minHeight: '450px', 
          maxHeight: '600px',
          padding: '1rem',
          boxSizing: 'border-box'
        }}
      >
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="d-flex justify-content-around w-100 mb-3">
          <div className="info text-center"><strong>Rolls</strong><div>{rolls}</div></div>
          <div className="info text-center"><strong>Time</strong><div>{time} s</div></div>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {diceElements}
        </div>
        <div className='d-flex justify-content-center'>
          <button 
            className="btn btn-primary w-50 mt-3" 
            onClick={won ? newGame : roll} 
            ref={btnRef}
          >
            {won ? 'New Game' : 'Roll'}
          </button>      
        </div>
      </div>
    </div>
  )
}

export default App