class Slide {
  constructor() {
    this.slide = [];
    this.curIdx = 0;

    document.getElementById('next').addEventListener('click', function () {
      changeSlide(1);
    });

    document.getElementById('prev').addEventListener('click', function () {
      changeSlide(-1);
    });
  }

  changeSlide(direction) {
    this.slide[curIdx].style.display = 'none';
    curIdx = (currentSlide + direction + totalSlides) % totalSlides;
    this.slide[curIdx].style.display = 'block';
  }
}
