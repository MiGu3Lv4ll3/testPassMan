var slider = tns({
    container: ".categories-slider",
    items: 1,
    slideBy: 1,
    center: true,
    startIndex: 1,
    mouseDrag: true,
    autoplay: false,
    autoplayButtonOutput: false,
    controlsContainer: "#custom-control",
    responsive: {
      570: {
        edgePadding: 20,
        items: 3,
        nav: false
      },
      768: {
        items: 5,
        nav: true
      },
      992: {
        items: 8
      }
    },
    nav: false,
    loop: true,
  });