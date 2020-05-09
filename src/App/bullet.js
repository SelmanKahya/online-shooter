import { SCREEN, GAME_HEIGHT, GAME_WIDTH } from './constants';

// eslint-disable-next-line
export class Bullet {

    speed = 5

    dead = false

    angle;

    xPosition;

    yPosition

    speed = 5;

    constructor(angle, xPosition, yPosition) {
      this.angle = angle;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
    }

    update = () => {
      const x = Math.sin(this.angle) * this.speed;
      const y = Math.cos(this.angle) * this.speed;
      this.xPosition += x;
      this.yPosition += y;

      if (this.xPosition < 0 || this.xPosition > GAME_WIDTH) {
        this.dead = true;
      }
      if (this.yPosition < 0 || this.yPosition > GAME_HEIGHT) {
        this.dead = true;
      }
    }

    draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.xPosition, this.yPosition, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'brown';
      ctx.fill();
      ctx.lineWidth = 0.3;
      ctx.stroke();
    }
}
