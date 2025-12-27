import { MAGAZINE_CONTENT } from './data';
import { renderPageContent } from './renderer';
import { BackgroundEffect } from './background';

// App Logic
class App {
  private currentSheetIndex = 0;
  private totalSheets = Math.ceil(MAGAZINE_CONTENT.length / 2);
  private bookContainer: HTMLElement;
  private pageIndicator: HTMLElement;
  private btnPrev: HTMLButtonElement;
  private btnNext: HTMLButtonElement;

  constructor() {
    this.bookContainer = document.getElementById('book-container')!;
    this.pageIndicator = document.getElementById('page-indicator')!;
    this.btnPrev = document.getElementById('btn-prev') as HTMLButtonElement;
    this.btnNext = document.getElementById('btn-next') as HTMLButtonElement;

    this.init();
  }

  init() {
    new BackgroundEffect(); // Now runs as a foreground overlay
    this.renderSheets();
    this.updateControls();
    this.setupListeners();
    // No translation layout update needed for full-screen

    // Initial Trigger for animations
    setTimeout(() => {
        this.updateActiveContent();
    }, 100);
  }

  renderSheets() {
    // Clear existing sheets
    const existingSheets = this.bookContainer.querySelectorAll('.sheet');
    existingSheets.forEach(el => el.remove());

    for (let i = 0; i < this.totalSheets; i++) {
      const zIndex = this.totalSheets - i;
      const frontContent = MAGAZINE_CONTENT[i * 2];
      const backContent = MAGAZINE_CONTENT[i * 2 + 1];

      const sheet = document.createElement('div');
      sheet.className = `sheet sheet-${i}`;
      sheet.style.zIndex = zIndex.toString();
      sheet.dataset.index = i.toString();

      sheet.innerHTML = `
        <div class="face face-front">
          <div class="relative w-full h-full overflow-hidden">
             ${renderPageContent(frontContent)}
             <!-- Spine Shadow Gradient (Front/Right Page) -->
             <div class="absolute top-0 left-0 w-12 md:w-24 h-full bg-gradient-to-r from-stone-500/10 to-transparent pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>
        <div class="face face-back">
          <div class="relative w-full h-full overflow-hidden">
             ${renderPageContent(backContent)}
             <!-- Spine Shadow Gradient (Back/Left Page) -->
             <div class="absolute top-0 right-0 w-12 md:w-24 h-full bg-gradient-to-l from-stone-500/10 to-transparent pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>
      `;

      // Add Click Listener to sheet (clicking the right side flips it)
      sheet.addEventListener('click', (e) => {
        // Simple logic: clicking anywhere on the sheet flips it forward if it's the top one
        if (i === this.currentSheetIndex) {
          this.goNext();
        } else if (i === this.currentSheetIndex - 1) {
           // Clicking the left page (flipped sheet) goes back
           this.goPrev();
        }
      });

      this.bookContainer.appendChild(sheet);
    }
  }

  setupListeners() {
    this.btnPrev.addEventListener('click', (e) => { e.stopPropagation(); this.goPrev(); });
    this.btnNext.addEventListener('click', (e) => { e.stopPropagation(); this.goNext(); });
    
    // Swipe gestures
    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    document.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) this.goNext();
      if (touchEndX - touchStartX > 50) this.goPrev();
    }, {passive: true});
  }

  updateZIndexes() {
    const sheets = document.querySelectorAll('.sheet') as NodeListOf<HTMLElement>;
    sheets.forEach((sheet, index) => {
      let zIndex;
      if (index < this.currentSheetIndex) {
        // Flipped pages (Left Side): Higher index = Higher Z-index (Visible on top of stack)
        zIndex = index;
      } else {
        // Unflipped pages (Right Side): Lower index = Higher Z-index (Visible on top of stack)
        zIndex = this.totalSheets - index;
      }
      sheet.style.zIndex = zIndex.toString();
    });
  }

  updateActiveContent() {
      // Remove active class from all faces
      document.querySelectorAll('.face').forEach(f => f.classList.remove('active'));

      // Determine visible faces
      // Right side: Front of currentSheetIndex
      if (this.currentSheetIndex < this.totalSheets) {
          const sheet = document.querySelector(`.sheet-${this.currentSheetIndex}`);
          const front = sheet?.querySelector('.face-front');
          front?.classList.add('active');
      }

      // Left side: Back of currentSheetIndex - 1
      if (this.currentSheetIndex > 0) {
          const sheet = document.querySelector(`.sheet-${this.currentSheetIndex - 1}`);
          const back = sheet?.querySelector('.face-back');
          back?.classList.add('active');
      }
  }

  goNext() {
    if (this.currentSheetIndex >= this.totalSheets) return;
    
    const sheet = document.querySelector(`.sheet-${this.currentSheetIndex}`);
    if (sheet) {
        sheet.classList.add('flipped');
    }
    
    this.currentSheetIndex++;
    this.updateZIndexes();
    this.updateControls();
    this.updateActiveContent();
  }

  goPrev() {
    if (this.currentSheetIndex <= 0) return;
    
    this.currentSheetIndex--;
    const sheet = document.querySelector(`.sheet-${this.currentSheetIndex}`);
    if (sheet) {
        sheet.classList.remove('flipped');
    }
    
    this.updateZIndexes();
    this.updateControls();
    this.updateActiveContent();
  }

  updateControls() {
    if (this.currentSheetIndex === 0) {
      this.pageIndicator.innerText = "COVER";
    } else if (this.currentSheetIndex === this.totalSheets) {
       this.pageIndicator.innerText = "END";
    } else {
       this.pageIndicator.innerText = `${this.currentSheetIndex * 2} — ${this.currentSheetIndex * 2 + 1}`;
    }
    
    this.btnPrev.disabled = this.currentSheetIndex === 0;
    this.btnNext.disabled = this.currentSheetIndex === this.totalSheets;
  }
}

// Start
new App();