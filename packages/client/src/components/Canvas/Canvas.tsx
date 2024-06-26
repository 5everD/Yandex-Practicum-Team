import React, { useEffect, useRef } from 'react'
import { Game } from '@/game'
import { useNavigate } from 'react-router-dom'
import { playerSelector, backgroundSelector, setScore } from '@/game/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFullScreen } from '@/hooks/useFullScreen'
import {
  FullScreenEnterButton,
  FullScreenEnterButtonWrapper,
} from '@/components/FullScreenButton/style'

export const Canvas = () => {
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const player = useSelector(playerSelector)
  const background = useSelector(backgroundSelector)
  const dispatch = useDispatch()
  const toggleFullScreen = useFullScreen(canvasRef, ['Alt', 'Enter'])

  const w = 800 // document.body.clientWidth * .8
  const h = w * 0.5
  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    const context: CanvasRenderingContext2D | null = canvas!.getContext('2d')
    let animationFrameId: number

    if (context) {
      const game = new Game(context, w, h, player, background)

      game.initGame()

      let lastTimestamp = 0
      const render = (timestamp: number) => {
        const deltaTime = timestamp - lastTimestamp
        lastTimestamp = timestamp
        game.start(context, deltaTime)
        animationFrameId = window.requestAnimationFrame(render)

        if (game.gameEnd) {
          setTimeout(() => {
            navigate('/game-end')
          }, 2000)
          dispatch(setScore(game.score))
          window.cancelAnimationFrame(animationFrameId)
        }
      }

      render(0)
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} id="canvas" width="800" height="400" />
      <FullScreenEnterButtonWrapper>
        <FullScreenEnterButton
          onClick={toggleFullScreen}
          about="Переключить полноэкранный режим"
        />
      </FullScreenEnterButtonWrapper>
    </>
  )
}
