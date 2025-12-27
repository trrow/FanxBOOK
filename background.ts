export class BackgroundEffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private orbs: any[];
  private width: number;
  private height: number;
  private animationId: number;

  constructor() {
    this.canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!this.canvas) throw new Error('Canvas not found');
    this.ctx = this.canvas.getContext('2d')!;
    this.orbs = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.init();
    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    window.addEventListener('resize', this.handleResize);
    this.animate();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    const numOrbs = 6;
    for (let i = 0; i < numOrbs; i++) {
      this.orbs.push(this.createOrb());
    }
  }

  createOrb() {
    const colors = [
      '229, 231, 235', // Gray
      '214, 211, 209', // Stone
      '204, 251, 241', // Teal
      '224, 231, 255', // Indigo
      '250, 245, 255'  // Purple
    ];
    
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 200 + 100,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.3 + 0.1
    };
  }

  updateOrb(orb) {
    orb.x += orb.dx;
    orb.y += orb.dy;

    if (orb.x < -orb.radius || orb.x > this.width + orb.radius) orb.dx = -orb.dx;
    if (orb.y < -orb.radius || orb.y > this.height + orb.radius) orb.dy = -orb.dy;
  }

  drawOrb(orb) {
    this.ctx.beginPath();
    const gradient = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
    gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
    gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#f5f5f4';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.orbs.forEach(orb => {
      this.updateOrb(orb);
      this.drawOrb(orb);
    });

    this.animationId = requestAnimationFrame(this.animate);
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}