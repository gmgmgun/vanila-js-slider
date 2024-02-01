class App {
  constructor() {
    this.slider = document.querySelectorAll('#slider img');
    this.totalSlides = this.slider.length;
    this.curIdx = 0;
    this.showSlide(this.curIdx);

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

  changeSlide(direction) {
    this.curIdx =
      (this.curIdx + direction + this.totalSlides) % this.totalSlides;
    this.showSlide(this.curIdx);
  }
}

new App();
