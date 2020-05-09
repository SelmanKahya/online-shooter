import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import { Bullet } from './bullet';

// eslint-disable-next-line
export class Player {
    lastFireAt = Date.now()

    angle = 0;

    health = 100

    ammo = 100

    dead = false

    score = 0

    constructor(positionX, positionY) {
      this.positionX = positionX;
      this.positionY = positionY;
    }

    increaseScore = () => {
      this.score += 10;
    }

    update = (fireCb) => {
      if (this.health <= 0) {
        this.dead = true;
      }

      this.angle = (this.angle - 0.08) % 360;

      if (window.meter && window.meter.volume * 100 > 20) {
        if (Date.now() - this.lastFireAt > 300) {
          fireCb(this.angle, GAME_WIDTH / 2, GAME_HEIGHT / 2);
          this.lastFireAt = Date.now();
        }
      }
    }

    deductHealth = () => {
      this.health -= 10;
    }

    draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'cornflowerblue';
      ctx.fill();
      ctx.lineWidth = 0.3;
      ctx.stroke();

      ctx.font = '14px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Health: ${this.health}`, GAME_WIDTH - 90, GAME_HEIGHT - 15);

      // ctx.font = '14px Arial';
      // ctx.fillStyle = 'black';
      // ctx.fillText(`Ammo: ${this.ammo}`, GAME_WIDTH - 180, GAME_HEIGHT - 15);

      ctx.font = '14px Arial';
      ctx.fillStyle = 'darkgreen';
      ctx.fillText(`Score: ${this.score}`, 15, 30);


      if (window.meter) {
        ctx.font = '14px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Volume: ${(window.meter.volume * 100).toFixed(1)}`, 10, GAME_HEIGHT - 15);
      }

      const edgeX = Math.sin(this.angle) * 70;
      const edgeY = Math.cos(this.angle) * 70;
      ctx.beginPath();
      drawArrow(ctx, GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH / 2 + edgeX, GAME_HEIGHT / 2 + edgeY);
      ctx.stroke();
    }
}

function drawArrow(context, fromx, fromy, tox, toy) {
  const headlen = 10; // length of head in pixels
  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
