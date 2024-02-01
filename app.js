class App {
  constructor() {
    this.slider = document.querySelectorAll('#slider img');
    this.indicators = document.querySelectorAll('.indicator');
    this.isAuto = true;
    this.totalSlides = this.slider.length;
    this.currentSlide = 0;
    this.autoSlideInterval = null;

    this.startAutoSlide(this.isAuto);
    this.updateAutoPlayButton();
    this.updateSlider();

    document
      .getElementById('auto-play')
      .addEventListener('click', () => this.toggleAutoPlay());

    document
      .getElementById('next')
      .addEventListener('click', () =>
        this.changeSlide(this.currentSlide, true)
      );

    document
      .getElementById('prev')
      .addEventListener('click', () =>
        this.changeSlide(this.currentSlide, false)
      );

    this.indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', () => this.showSlide(idx));
    });
  }

  changeSlide(index, isNext) {
    this.resetAutoSlide();

    if (isNext) {
      if (index === this.totalSlides - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide = index + 1;
      }
    } else {
      if (index === 0) {
        this.currentSlide = this.totalSlides - 1;
      } else {
        this.currentSlide = index - 1;
      }
    }

    this.updateSlider();
  }

  showSlide(index) {
    this.resetAutoSlide();

    this.currentSlide = index;

    this.updateSlider();
  }

  updateSlider() {
    this.slider.forEach((slide, index) => {
      slide.style.transform = `translateX(${
        100 * (index - this.currentSlide)
      }%)`;
    });

    this.indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('black');
        indicator.classList.remove('white');
      } else {
        indicator.classList.add('white');
        indicator.classList.remove('black');
      }
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.changeSlide(this.currentSlide, true);
    }, 2000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  resetAutoSlide() {
    if (this.isAuto) {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
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

  updateAutoPlayButton() {
    const btnAutoPlay = document.getElementById('auto-play-img');

    btnAutoPlay.src = this.isAuto
      ? '/data/images/auto-pause.png'
      : '/data/images/auto-start.png';
  }
}

new App();
