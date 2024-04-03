import { SpriteAnimation } from '@/game/SpriteAnimation'
import { Game } from '@/game/Game'

const blockSpriteInfo = {
  frameWidth: 128,
  frameHeight: 100,
  fps: 8,
  frameLimit: 3,
  path: '/game_obstacles/zombie.png',
}

export class Zombie extends SpriteAnimation {
  x: number
  y: number
  size: number
  slideSpeed: number
  ctx: CanvasRenderingContext2D
  markedToDelete: boolean
  game: Game

  constructor(speed: number, ctx: CanvasRenderingContext2D, game: Game) {
    super(ctx, blockSpriteInfo, 0.8)

    this.width = 128 * 0.8
    this.x =
      ctx?.canvas.width + this.width + Math.random() * ctx?.canvas.width * 0.5
    this.size = this.width
    this.height = 100 * 0.8
    this.game = game
    this.y = this.game.height - this.height - this.game.groundMargin
    this.slideSpeed = speed * 1.3
    this.ctx = ctx
    this.markedToDelete = false
  }

  update(frameDelta = 16.67) {
    super.update(frameDelta)
  }

  slide() {
    super.draw(this.x, this.y)
    this.update()
    this.x -= this.slideSpeed
  }
}
