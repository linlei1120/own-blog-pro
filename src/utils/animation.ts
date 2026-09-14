import { animate } from 'animejs';

/**
 * Letter-by-letter reveal animation for display typography
 */
export function animateLetters(
  container: HTMLElement | null,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
  } = {}
) {
  if (!container) return;
  const { delay = 0, stagger = 52, duration = 850 } = options;

  const text = container.textContent || '';
  container.innerHTML = '';
  container.style.display = 'inline-flex';
  container.style.overflow = 'hidden';

  const spans: HTMLElement[] = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.transform = 'translateY(105%)';
    span.style.opacity = '0';
    span.style.willChange = 'transform, opacity';
    container.appendChild(span);
    spans.push(span);
  }

  spans.forEach((span, idx) => {
    animate(span, {
      translateY: ['105%', '0%'],
      opacity: [0, 1],
      duration,
      delay: delay + idx * stagger,
      ease: 'cubicBezier(0.16, 1, 0.3, 1)'
    });
  });
}

/**
 * Word-by-word reveal animation (perfect for quotes and testimonials)
 */
export function animateWords(
  container: HTMLElement | null,
  text: string,
  options: {
    stagger?: number;
    duration?: number;
    onComplete?: () => void;
  } = {}
) {
  if (!container) return;
  const { stagger = 22, duration = 520, onComplete } = options;

  container.innerHTML = '';
  const words = text.split(' ');
  const spans: HTMLElement[] = [];

  words.forEach((w) => {
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.marginRight = '0.3em';
    wrapper.style.verticalAlign = 'bottom';

    const span = document.createElement('span');
    span.textContent = w;
    span.style.display = 'inline-block';
    span.style.transform = 'translateY(22px)';
    span.style.opacity = '0';
    wrapper.appendChild(span);
    container.appendChild(wrapper);
    spans.push(span);
  });

  spans.forEach((span, idx) => {
    const anim = animate(span, {
      translateY: ['22px', '0px'],
      opacity: [0, 1],
      duration,
      delay: idx * stagger,
      ease: 'cubicBezier(0.165, 0.84, 0.44, 1)'
    });

    if (idx === spans.length - 1 && onComplete) {
      anim.then(onComplete);
    }
  });
}

/**
 * Intersection Observer hook helper to trigger animations when element enters viewport
 */
export function observeInView(
  element: HTMLElement | null,
  onEnter: () => void,
  threshold = 0.1
) {
  if (!element || typeof IntersectionObserver === 'undefined') {
    onEnter();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);
  return () => observer.disconnect();
}
