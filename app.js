class App {
  constructor() {
    this.slider = document.querySelectorAll('#slider img');
    this.isAuto = true;
    this.totalSlides = this.slider.length;
    this.curIdx = 0;
    this.autoSlideInterval = null;
    this.showSlide(this.curIdx);
    this.startAutoSlide(this.isAuto);
    this.updateAutoPlayButton();

    document
      .getElementById('auto-play')
      .addEventListener('click', () => this.toggleAutoPlay());
    document
      .getElementById('next')
      .addEventListener('click', () => this.changeSlide(1));
    document
      .getElementById('prev')
      .addEventListener('click', () => this.changeSlide(-1));
  }

  showSlide(index) {
    this.slider.forEach((img, i) => {
      img.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 2000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  toggleAutoPlay() {
    this.isAuto = !this.isAuto;
    this.updateAutoPlayButton();

    if (this.isAuto) {
      this.startAutoSlide();
    } else {
      this.stopAutoSlide();
    }
  }

  changeSlide(direction) {
    this.curIdx =
      (this.curIdx + direction + this.totalSlides) % this.totalSlides;
    this.showSlide(this.curIdx);
  }

  updateAutoPlayButton() {
    const btnAutoPlay = document.getElementById('auto-play-img');

    btnAutoPlay.src = this.isAuto
      ? '/data/images/auto-pause.png'
      : '/data/images/auto-start.png';
  }
}

new App();
