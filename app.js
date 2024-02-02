class App {
  constructor() {
    this.slider = document.querySelectorAll('#slider img');
    this.indicators = document.querySelectorAll('.indicator');
    this.isAuto = true;
    this.totalSlides = this.slider.length;
    this.currentSlide = 0;
    this.autoSlideInterval = null;
    this.timeOut = null;
    this.startAutoSlide(this.isAuto);
    this.updateAutoPlayButton();
    this.updateSlider(false, true, true);

    document
      .getElementById('auto-play')
      .addEventListener('click', () => this.toggleAutoPlay());

    document.getElementById('next').addEventListener('click', () => {
      this.changeSlide(this.currentSlide, true);
    });

    document.getElementById('prev').addEventListener('click', () => {
      this.changeSlide(this.currentSlide, false);
    });

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.showSlide(index));
    });
  }

  changeSlide(index, isNext = true) {
    this.currentSlide = isNext ? index + 1 : index - 1;

    if (this.currentSlide >= -1 || this.currentSlide <= this.totalSlides - 2) {
      this.updateSlider(false, isNext, true);

      if (this.currentSlide === this.totalSlides - 2) {
        this.timeOut = setTimeout(() => {
          this.currentSlide = 0;
          this.updateSlider(true, isNext, true);
        }, 300);
      }

      if (this.currentSlide === -1) {
        this.timeOut = setTimeout(() => {
          this.currentSlide = this.totalSlides - 3;
          this.updateSlider(true, isNext, true);
        }, 300);
      }
    }

    if (this.currentSlide > this.totalSlides - 2) {
      this.updateSlider(false, isNext, false);
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.currentSlide = 0;
        this.updateSlider(true, isNext, false);
      }, 1);
    }

    if (this.currentSlide < -1) {
      this.updateSlider(false, isNext, false);
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.currentSlide = this.totalSlides - 3;
        this.updateSlider(true, isNext, false);
      }, 1);
    }
  }

  showSlide(index) {
    this.resetAutoSlide();
    this.currentSlide = index;

    this.updateSlider(false, true, true);
  }

  updateSlider(skipAnimation, isNext, isValidIndex) {
    this.resetAutoSlide();

    if (skipAnimation) {
      this.slider.forEach((slide) => {
        slide.style.transition = 'none';
      });
    } else {
      if (isValidIndex) {
        this.slider.forEach((slide) => {
          slide.style.transition = 'transform 0.3s ease';
        });
      } else {
        this.slider.forEach((slide) => {
          slide.style.transition = 'transform 0.01s ease';
        });
      }
    }

    this.slider.forEach((slide, index) => {
      slide.style.transform = `translateX(${
        100 * (index - this.currentSlide - 1)
      }%)`;
    });

    this.indicators.forEach((indicator, index) => {
      let currentIndex = this.currentSlide;
      if (isNext && currentIndex === this.totalSlides - 2) {
        currentIndex = 0;
      } else if (!isNext && currentIndex === -1) {
        currentIndex = this.totalSlides - 3;
      }

      if (index === currentIndex) {
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

    this.isAuto ? this.startAutoSlide() : this.stopAutoSlide();
  }

  updateAutoPlayButton() {
    const btnAutoPlay = document.getElementById('auto-play-img');

    btnAutoPlay.src = this.isAuto
      ? '/data/images/auto-pause.png'
      : '/data/images/auto-start.png';
  }
}

new App();
