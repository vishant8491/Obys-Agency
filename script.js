function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingpage() {
    var tl = gsap.timeline()
tl.from(".line h1",{
    y:150,
    stagger:0.25,
    duration:0.6,
    delay:0.5
})

tl.from("#line1-part1",{
    opacity:0,
    onStart:function () {
    var h5timer = document.querySelector("#line1-part1 h5")
    var grow = 0

setInterval(function(){
    if(grow < 100){
        h5timer.innerHTML = grow++
    } else {
        h5timer.innerHTML = grow
    }
    },25);
    },
});
tl.to(".line h2",{
    animationName:"anime",
    opacity:1
})
tl.to("#loader",{
    opacity:0,
    duration:0.2,
    delay:2.6
});
tl.from("#page1",{
    x:1600,
    delay:0,
    duration:0.32,
    ease:Power4
})
tl.to("#loader",{
    display:"none"
})
tl.from("#nav",{
   opacity:0
})
tl.from(".hero h1, #hero2 h1, #hero3 h2, #hero4 h1",{
    y:120,
    stagger:0.2
})
}
function cursorAnimation() {
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });

    Shery.makeMagnet("#nav-part2 h4");
}
function sheryAnimation() {
    Shery.imageEffect(".image-div",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.27,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.66,"range":[0,10]},"metaball":{"value":0.43,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.43,"range":[0,2]},"noise_scale":{"value":7.44,"range":[0,100]}},
        gooey:true
    })
}
function flagAnimation() {
    const hero3 = document.querySelector("#hero3");
    const flag = document.querySelector("#flag");

    // Mousemove event to move the flag within #hero3
    hero3.addEventListener("mousemove", function (event) {
        const rect = hero3.getBoundingClientRect();
        const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
        const y = rect.top + rect.height / 2; // Keep the flag vertically centered in #hero3

        gsap.to(flag, {
            x: x + rect.left - flag.offsetWidth / 2, // Center the flag horizontally
            y: y - flag.offsetHeight / 2, // Center the flag vertically
            opacity: 1, // Ensure opacity is 1 inside #hero3
            duration: 0.1,
        });
    });

    // Mouseenter event to show the flag
    hero3.addEventListener("mouseenter", function () {
        gsap.to(flag, {
            opacity: 1, // Set opacity to 1 when entering #hero3
            duration: 0.3,
        });
    });

    // Mouseleave event to hide the flag
    hero3.addEventListener("mouseleave", function () {
        gsap.to(flag, {
            opacity: 0, // Set opacity to 0 when leaving #hero3
            duration: 0.3,
        });
    });
}
function videoCursor() {
    const videoContainer = document.querySelector("#video-container");
    const videoCursor = document.querySelector("#video-cursor");
    const videoIcon = videoCursor.querySelector("i");
    const video = document.querySelector("#video"); // Ensure this selects the correct video element
    const mouseFollower = document.querySelector(".mousefollower");

    let isPlaying = false; // Track whether the video is playing

    // Show custom cursor and hide default cursor on mouse enter
    videoContainer.addEventListener("mouseenter", function () {
        mouseFollower.style.opacity = "0"; // Hide the default cursor
        videoCursor.style.opacity = "1"; // Show the custom cursor
    });

    // Hide custom cursor and show default cursor on mouse leave
    videoContainer.addEventListener("mouseleave", function () {
        mouseFollower.style.opacity = "1"; // Show the default cursor
        videoCursor.style.opacity = "0"; // Hide the custom cursor
    });

    // Move the custom cursor within the bounds of the video container
    videoContainer.addEventListener("mousemove", function (event) {
        const rect = videoContainer.getBoundingClientRect();
        const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
        const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);

        gsap.to(videoCursor, {
            left: x - videoCursor.offsetWidth / 2,
            top: y - videoCursor.offsetHeight / 2,
            duration: 0.1,
        });
    });

    // Toggle play/pause on click
    videoCursor.addEventListener("click", function () {
        if (isPlaying) {
            video.pause();
            videoIcon.classList.remove("ri-pause-line");
            videoIcon.classList.add("ri-play-fill"); // Change to play icon
        } else {
            video.play();
            videoIcon.classList.remove("ri-play-fill");
            videoIcon.classList.add("ri-pause-line"); // Change to pause icon
        }
        isPlaying = !isPlaying; // Toggle the state
    });
}
locomotiveAnimation();
loadingpage();
cursorAnimation();
sheryAnimation();
flagAnimation();
videoCursor();