import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[reveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  // Animation variant — pass as reveal="fade-up" | "fade-left" | "fade-right" | "zoom"
  @Input('reveal') variant: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom' = 'fade-up';

  // Delay in ms — pass as [revealDelay]="200"
  @Input() revealDelay = 0;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const el = this.el.nativeElement;

    // Set initial hidden state via data attribute (CSS reads this)
    el.setAttribute('data-reveal', this.variant);
    el.style.transitionDelay = `${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element entered the view
          el.classList.add('revealed');
        } else {
          // Element left the view (scrolled past or above)
          el.classList.remove('revealed');
        }
      },
      { threshold: 0.12 },
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
  if (this.observer) {
    this.observer.disconnect();
  }
}
}
