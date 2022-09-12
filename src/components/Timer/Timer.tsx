import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import './Timer.css';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  buttonRestart: string;
  player1: string;
  player2: string;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, buttonRestart, player1, player2}) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1)
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  const handleRestart = () => {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  return (
    <div className='timer'>
      <button 
        onClick={handleRestart}
        className='timer__button-restart'
      >
        {buttonRestart}
      </button>
      <h2 className='timer__player-name'>{player1} - {blackTime}</h2>
      <h2 className='timer__player-name'>{player2} - {whiteTime}</h2>
    </div>
  );
};

export default Timer;
