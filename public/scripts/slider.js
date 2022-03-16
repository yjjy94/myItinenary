document.addEventListener("DOMContentLoaded", function () {
  renderSlider(".course-slider");
});

const nextSlide = () => {
  let activeSlide = document.querySelector(".course-slide--active");
  let nextSlide = activeSlide.nextElementSibling;
  if (nextSlide) {
    activeSlide.classList.remove("course-slide--active");
    nextSlide.classList.remove("next");
    nextSlide.classList.add("course-slide--active");
    renderSlides();
    renderBtns();
  }
};

const renderBtns = () => {
  let nextBtn = document.querySelector("#forward");
  let prevBtn = document.querySelector("#back");

  let activeSlide = document.querySelector(".course-slide--active");
  let prevSlide = activeSlide.previousElementSibling;
  !prevSlide
    ? prevBtn.classList.add("disabled")
    : prevBtn.classList.remove("disabled");

  let nextSlide = activeSlide.nextElementSibling;
  !nextSlide
    ? nextBtn.classList.add("disabled")
    : nextBtn.classList.remove("disabled");
};

const prevSlide = () => {
  let activeSlide = document.querySelector(".course-slide--active");
  let prevSlide = activeSlide.previousElementSibling;
  if (prevSlide) {
    activeSlide.classList.remove("course-slide--active");
    prevSlide.classList.remove("prev");
    prevSlide.classList.add("course-slide--active");
    renderSlides();
    renderBtns();
  }
};

const renderSlides = () => {
  let slides = document.querySelectorAll(".course-slide");
  let viewCourseLink = document.getElementById("viewCourseLink");
  if (!slides) {
    return;
  }
  let activeSlide = document.querySelector(".course-slide--active");

  if (!activeSlide) {
    activeSlide = slides.item(0);
    activeSlide.classList.add("course-slide--active");
  }

  let courseId = activeSlide.querySelector("#courseId").value;
  viewCourseLink.href = `/user/viewcourse/${courseId}`;

  [].forEach.call(slides, function (slide) {
    slide.classList.remove("prev", "next");
  });

  let prevSlide = activeSlide.previousElementSibling;
  prevSlide && prevSlide.classList.add("prev");

  let nextSlide = activeSlide.nextElementSibling;
  nextSlide && nextSlide.classList.add("next");
};

const renderSlider = (element) => {
  const slider = document.querySelector(element);
  if (slider) {
    let nextButton = document.querySelector("#forward");

    nextButton.addEventListener("click", function () {
      nextSlide();
    });

    let prevButton = document.querySelector("#back");
    prevButton.addEventListener("click", function () {
      prevSlide();
    });
    renderSlides();
  }
};
