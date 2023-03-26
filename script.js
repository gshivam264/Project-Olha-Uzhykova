function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

var a = -200;

setInterval(function () {
  if (a >= -600) {
    gsap.to("#inner h3", {
      opacity: 1,
    });
    gsap.to("#inner h3", {
      y: a + "%",
      opacity: 1,
      delay: 1,
    });
  } else {
    a = 0;
    gsap.to("#inner h3", {
      y: "0%",
      opacity: 0,
    });
  }
  a -= 200;
}, 2000);

gsap.from("#nav", {
  y: -100,
  opacity: 0,
  delay: 0.2,
  duration: 0.8,
});

gsap.from("#platform", {
  y: 200,
  opacity: 0,
  delay: 0,
  duration: 0.9,
});
gsap.from("#gola", {
  y: -800,
  opacity: 0,
  delay: 0.6,
  duration: 1.2,
});
gsap.from("#page1>h1", {
  y: 100,
  opacity: 0,
  delay: 1.6,
  duration: 1.2,
  onStart: function () {
    $("#page1>h1").textillate({ in: { effect: "fadeIn" } });
  },
});

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    start: "top -5%",
    scrub: 2,
  },
});
var tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    start: "top -105%",
    end: "top 10%",
    scrub: 1,
  },
});
var tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    start: "top 70%",
    end: "top 90%",
    scrub: 2,
  },
});
var tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 70%",
    end: "top 90%",
    scrub: 2,
  },
});
var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main",
    start: "top 100%",
    end: "top -100%",
    scrub: 2,
  },
});

tl.to(
  "#gola",
  {
    left: "100%",
    top: "63vh",
    rotate: 360,
    duration: 2,
  },
  "anim1"
);

tl.to(
  "#platform",
  {
    rotate: 20,
  },
  "anim1"
);

tl1.to(
  "#platform",
  {
    rotate: 0,
  },
  "anim4"
);

tl.to(
  "#page2-in h1",
  {
    delay: 0.5,
    onStart: function () {
      $("#page2-in h1").textillate({ in: { effect: "fadeInUp" } });
    },
  },
  "anim1"
);

tl.to(
  "#page2-circle svg .snake__text-path",
  {
    onStart: function snake() {
      var a = document.querySelector("#page2-circle svg .snake__text-path");
      var b = 100;
      if (b > 0) {
        setInterval(function () {
          a.setAttribute("startOffset", `${b--}%`);
        }, 50);
      }
    },
  },
  "anim1"
);

tl4.to(
  "#page4 h1",
  {
    // delay:0.5,
    onStart: function () {
      $("#page4 h1").textillate({ in: { effect: "fadeInUp" } });
    },
  },
  "animes"
);

tl4.to(
  "#page4-cir",
  {
    scale: 10,
    delay: 10,
    duration: 5,
  },
  "animes"
);

tl5.to(
  "#page5 #right h1",
  {
    delay: 5,
    onStart: function () {
      $("#page5 #right h1").textillate({ in: { effect: "fadeInUp" } });
    },
  },
  "anim1"
);

tl6.to(
  "#page6 h1",
  {
    // delay:2,
    onStart: function () {
      $("#page6 h1").textillate({ in: { effect: "fadeInUp" } });
    },
  },
  "anime"
);

document.querySelector("#p5elem1").addEventListener("mouseenter", function () {
  document.querySelector("#p5elem1 img").style.opacity = 1;
});

document.querySelector("#p5elem1").addEventListener("mouseleave", function () {
  document.querySelector("#p5elem1 img").style.opacity = 0;
});

document
  .querySelector("#p5elem1")
  .addEventListener("mousemove", function (dets) {
    document.querySelector("#p5elem1 img").style.left = `${dets.x / 3}px`;
  });
document.querySelector("#p5elem2").addEventListener("mouseenter", function () {
  document.querySelector("#p5elem2 img").style.opacity = 1;
});

document.querySelector("#p5elem2").addEventListener("mouseleave", function () {
  document.querySelector("#p5elem2 img").style.opacity = 0;
});

document
  .querySelector("#p5elem2")
  .addEventListener("mousemove", function (dets) {
    document.querySelector("#p5elem2 img").style.left = `${dets.x / 3}px`;
  });
document.querySelector("#p5elem3").addEventListener("mouseenter", function () {
  document.querySelector("#p5elem3 img").style.opacity = 1;
});

document.querySelector("#p5elem3").addEventListener("mouseleave", function () {
  document.querySelector("#p5elem3 img").style.opacity = 0;
});

document
  .querySelector("#p5elem3")
  .addEventListener("mousemove", function (dets) {
    document.querySelector("#p5elem3 img").style.left = `${dets.x / 3}px`;
  });
document.querySelector("#p5elem4").addEventListener("mouseenter", function () {
  document.querySelector("#p5elem4 img").style.opacity = 1;
});

document.querySelector("#p5elem4").addEventListener("mouseleave", function () {
  document.querySelector("#p5elem4 img").style.opacity = 0;
});

document
  .querySelector("#p5elem4")
  .addEventListener("mousemove", function (dets) {
    document.querySelector("#p5elem4 img").style.left = `${dets.x / 3}px`;
  });
document.querySelector("#p5elem5").addEventListener("mouseenter", function () {
  document.querySelector("#p5elem5 img").style.opacity = 1;
});

document.querySelector("#p5elem5").addEventListener("mouseleave", function () {
  document.querySelector("#p5elem5 img").style.opacity = 0;
});

document
  .querySelector("#p5elem5")
  .addEventListener("mousemove", function (dets) {
    document.querySelector("#p5elem5 img").style.left = `${dets.x / 3}px`;
  });
