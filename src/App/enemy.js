import { getRandomNumber } from './utils';
import { SCREEN, GAME_HEIGHT, GAME_WIDTH } from './constants';

const centerX = GAME_WIDTH / 2;
const centerY = GAME_HEIGHT / 2;

// eslint-disable-next-line
export class Enemy {
    speed = 2;

    dead = false

    xPosition

    yPosition

    constructor(xPosition, yPosition) {
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.radius = getRandomNumber(10, 20);
    }

    isDead = () => {
      const relativeX = Math.abs(this.xPosition - centerX);
      const relativeY = Math.abs(this.yPosition - centerY);

      if (relativeX < 20 && relativeY < 20) {
        return true;
      }
    }

    update = (player, bullets) => {
      if (this.dead) return;
      const relativeX = this.xPosition - centerX;
      const relativeY = this.yPosition - centerY;
      const angle = Math.atan2(relativeY, relativeX) * 180 / Math.PI;
      const x = Math.sin((angle * Math.PI) / 180) * this.speed;
      const y = Math.cos((angle * Math.PI) / 180) * this.speed;
      this.xPosition -= y;
      this.yPosition -= x;

      if (!this.dead && this.isDead()) {
        this.dead = true;
        player.deductHealth();
      }

      if (!this.dead) {
        bullets.forEach((bullet) => {
          if (Math.abs(bullet.xPosition - this.xPosition) < this.radius && Math.abs(bullet.yPosition - this.yPosition) < this.radius) {
        player.increaseScore();
            this.dead = true;
            bullet.dead = true;
          }
        });
      }
    }

    draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();

      ctx.lineWidth = 0.3;
      ctx.stroke();
    }
}
