import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  label: string;
  anchor: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  activeSection = 'hero';
  isScrolled = false;
  mobileOpen = false;

  navLinks: NavLink[] = [
    { label: 'Home',     anchor: 'hero' },
    { label: 'About',    anchor: 'about' },
    { label: 'Skills',   anchor: 'skills' },
    { label: 'Projects', anchor: 'projects' },
    { label: 'Services', anchor: 'services' },
    { label: 'Contact',  anchor: 'contact' },
  ];

  private observer!: IntersectionObserver;

  ngOnInit() {
    this.setupScrollSpy();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  scrollTo(anchor: string) {
    const el = document.getElementById(anchor);
    if (el) {
      const offset = 72; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    this.mobileOpen = false;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  private setupScrollSpy() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -55% 0px', // fires when section is in the middle viewport band
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      }
    }, options);

    // Observe after a tick so sections are rendered
    setTimeout(() => {
      this.navLinks.forEach(({ anchor }) => {
        const el = document.getElementById(anchor);
        if (el) this.observer.observe(el);
      });
    }, 100);
  }
}