import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  // ── Typing animation ─────────────────────────────────────────
  displayText = '';
  private roles = [
    'Full Stack Developer',
    'Angular Enthusiast',
    'UI/UX Craftsman',
    'Problem Solver',
  ];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Particle canvas ──────────────────────────────────────────
  @ViewChild('particleCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private resizeHandler!: () => void;

  // ── Skills data ──────────────────────────────────────────────
  skillGroups = [
    {
      category: 'Frontend',
      icon: '🖥️',
      skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3 / SCSS', 'RxJS'],
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Express', 'REST APIs', 'Java', 'Spring Boot'],
    },
    {
      category: 'Tools & DevOps',
      icon: '🛠️',
      skills: ['Git & GitHub', 'VS Code', 'Postman', 'Linux', 'Firebase'],
    },
    {
      category: 'Databases',
      icon: '🗄️',
      skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
    },
  ];

  // ── Projects data ────────────────────────────────────────────
  projects = [
    {
      title: 'Portfolio Website',
      description: 'This very site — migrated from plain HTML/CSS/JS to Angular 21 with a dark-themed, single-page scroll experience.',
      tags: ['Angular', 'TypeScript', 'SCSS'],
      github: 'https://github.com/rohitjha424/Portfolio-Website',
      live: 'https://rohitjha424.github.io/Portfolio-Website/',
    },
    {
      title: 'Project Two',
      description: 'Add your project description here. Keep it concise — 1 to 2 sentences covering the problem it solves.',
      tags: ['Node.js', 'Express', 'MongoDB'],
      github: '#',
      live: '#',
    },
    {
      title: 'Project Three',
      description: 'Add your project description here. Highlight what makes it interesting or what you learned building it.',
      tags: ['React', 'Firebase', 'CSS'],
      github: '#',
      live: '#',
    },
  ];

  // ── Services data ────────────────────────────────────────────
  services = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'End-to-end web apps with modern frameworks — fast, responsive, and production-ready.',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Pixel-perfect UIs that look great on every screen size, from mobile to desktop.',
    },
    {
      icon: '🔌',
      title: 'API Integration',
      description: 'RESTful API design and integration, connecting frontends to robust backend services.',
    },
    {
      icon: '⚡',
      title: 'Performance Optimisation',
      description: 'Auditing and tuning web apps for speed — lazy loading, caching, and bundle optimization.',
    },
  ];

  ngOnInit() {
    this.startTyping();
    this.initParticles();
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  scrollTo(anchor: string) {
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  // ── Typing ───────────────────────────────────────────────────
  private startTyping() {
    const currentRole = this.roles[this.roleIndex];

    if (!this.isDeleting) {
      this.displayText = currentRole.slice(0, this.charIndex);
      this.charIndex++;

      if (this.charIndex > currentRole.length) {
        this.cdr.detectChanges();
        this.typingTimer = setTimeout(() => {
          this.isDeleting = true;
          this.startTyping();
        }, 1800);
        return;
      }
    } else {
      this.displayText = currentRole.slice(0, this.charIndex);
      this.charIndex--;

      if (this.charIndex < 0) {
        this.isDeleting = false;
        this.charIndex = 0;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.cdr.detectChanges();
        this.typingTimer = setTimeout(() => this.startTyping(), 400);
        return;
      }
    }

    this.cdr.detectChanges();
    this.typingTimer = setTimeout(
      () => this.startTyping(),
      this.isDeleting ? 55 : 110
    );
  }

  // ── Particles ────────────────────────────────────────────────
  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.spawnParticles();
    };
    window.addEventListener('resize', this.resizeHandler);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.spawnParticles();
    this.animate();
  }

  private spawnParticles() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    this.particles = Array.from(
      { length: count },
      () => new Particle(window.innerWidth, window.innerHeight)
    );
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of this.particles) {
      p.update(canvas.width, canvas.height);
      p.draw(this.ctx);
    }
    this.connectNearby();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private connectNearby() {
    const maxDist = 130;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i], b = this.particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.35;
          this.ctx.strokeStyle = `rgba(99,179,237,${alpha})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  x: number; y: number; vx: number; vy: number; radius: number; alpha: number;
  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.8 + 0.8;
    this.alpha = Math.random() * 0.45 + 0.15;
  }
  update(w: number, h: number) {
    this.x += this.vx; this.y += this.vy;
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