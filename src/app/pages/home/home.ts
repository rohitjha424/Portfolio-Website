import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // Typing animation
  displayText = '';
  private roles = [
    'Full Stack Developer'
  ];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  // Particle canvas
  @ViewChild('particleCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private resizeHandler!: () => void;

  ngOnInit() {
    this.startTyping();
    this.initParticles();
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  // ── Typing animation ──────────────────────────────────────────────
  private startTyping() {
  const currentRole = this.roles[0]; // Always use the first role

  if (!this.isDeleting) {
    this.charIndex++;
    this.displayText = currentRole.slice(0, this.charIndex);

    if (this.charIndex === currentRole.length) {
      this.isDeleting = true;
      this.typingTimer = setTimeout(() => this.startTyping(), 1800); // Pause at full text
      return;
    }
  } else {
    this.charIndex--;
    this.displayText = currentRole.slice(0, this.charIndex);

    if (this.charIndex === 0) {
      this.isDeleting = false;
      // No need to increment roleIndex since there is only one
      this.typingTimer = setTimeout(() => this.startTyping(), 400); // Pause when empty
      return;
    }
  }

  const speed = this.isDeleting ? 55 : 110;
  this.typingTimer = setTimeout(() => this.startTyping(), speed);
}

  // ── Particle canvas ───────────────────────────────────────────────
  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.resizeHandler = () => this.resizeCanvas();
    window.addEventListener('resize', this.resizeHandler);
    this.resizeCanvas();
    this.spawnParticles();
    this.animate();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private spawnParticles() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    this.particles = Array.from(
      { length: count },
      () => new Particle(window.innerWidth, window.innerHeight),
    );
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.update(canvas.width, canvas.height);
      p.draw(this.ctx);
    }

    this.connectNearby(canvas);
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private connectNearby(canvas: HTMLCanvasElement) {
    const maxDist = 130;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.4;
          this.ctx.strokeStyle = `rgba(99,179,237,${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }
  }
}

// ── Particle class ────────────────────────────────────────────────────
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.55;
    this.vy = (Math.random() - 0.5) * 0.55;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99,179,237,${this.alpha})`;
    ctx.fill();
  }
}
