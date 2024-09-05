// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

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



gsap.from("#page1 #box",{
    scale:0,
    duration:1,
    delay:1,
    opacity:0,
    rotate: 360
})

gsap.from("#page2 #box",{
    scale:0,
    duration:1,
    opacity:0,
    rotate: 360,
    // scrolltrigger helps in triggerring animation when required
    scrollTrigger:{
        trigger:"#page2 #box",
        scroller:"#main",
        start:"top 50%",
        markers:true
    }
})

function loadingAnimation(){

    var t1 = gsap.timeline();
    t1.from(".line h1",{
        y:150, //upper aao +150
        stagger: 0.25, //elements ko ek ek karke uppar lao 
        duration: 0.6,
        delay: 0.5,
    });
    
    t1.from("#line1-part1, .line h2",{
        opacity:0,
        onStart: function(){
            var h5timer = document.querySelector('#line1-part1 h5')
    var grow = 0
    setInterval(function(){
     if(grow < 100){
        grow++;
        h5timer.innerHTML = grow
        
     }else{
        h5timer.innerHTML = grow;
     }
    },25);
        }
    });
    
    t1.to("#loader",{
    opacity:0,
    duration:0.4,
    delay:2,
    }); 
        
    t1.to("#loader",{
        display:"none"
    })

    t1.from("#page1",{
        delay:0.2,
        y:1600,
        opacity:0,
        duration:0.5,
        ease:Power4
    })
    
    t1.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
        y:150,
        stagger: 0.2
    })
    
    t1.from("#nav",{
        opacity: 0
    })
    
    t1.from("#page2",{
        opacity: 0
    })
    
    }

function imageAnimation(){
        Shery.imageEffect(".image-div",{
          style:5,
          // debug:true,
          config:{"a":{"value":2.06,"range":[0,30]},"b":{"value":-0.92,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272611844751101},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4.31,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.18,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":1.07,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.49,"range":[0,2]},"noise_scale":{"value":13.74,"range":[0,100]}},
          gooey:true
        })
    }    

    loadingAnimation();
  
    // Check screen width and execute the function if greater than 600px
if (window.innerWidth > 600) {
    imageAnimation();
}

// Optionally, add an event listener to handle window resizing
window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
        imageAnimation();
    }
});

function toggleSecondImage() {
    var imageDivs = document.querySelectorAll('#page3 #image-div-container .image-div');
    imageDivs.forEach(function(div) {
        var secondImage = div.querySelector('img:nth-child(2)');
        if (window.innerWidth < 600) {
            secondImage.style.display = 'none';
        } else {
            secondImage.style.display = 'block';
        }
    });

    document.querySelector('.page3-circle').style.display = 'none';
    document.querySelector('.page3-circle2').style.display = 'none';
}


// Initial check
toggleSecondImage();

// Add event listener for window resize
window.addEventListener('resize', toggleSecondImage);

function playVideo(){
    var flag = 0;
    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video");
    videoContainer.addEventListener("click",function(){
        if(flag == 0){
            video.play(),
            video.style.opacity = 1,
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-line"></i>`,
            gsap.to("#video-cursor",{
                scale:0.5,
                top:15,
                left:20
            })
            flag = 1
        }else{
            video.pause(),
            video.style.opacity = 0,
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-line"></i>`,
            gsap.to("#video-cursor",{
                top:120,
                left:170,
                scale:1
            })
            flag = 0
        }
    })
}

playVideo();


const navIcon = document.querySelector('.nav-icon');
const menuOptions = document.getElementById('menuOptions');

navIcon.addEventListener('click', () => {
    menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
});

// Close the menu when an option is clicked
menuOptions.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        menuOptions.style.display = 'none';
    }
});

//scroll functionality
menuOptions.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scrolling
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Close the menu
        menuOptions.style.display = 'none';
    }
});

const images = ["./assets/ut_campus.jpeg", "./assets/UT2.jpg"];
let currentIndex = 0;

function changeImage() {
    const imgElement = document.getElementById("dynamicImage");
    imgElement.style.opacity = 0; // Start fading out

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // Cycle through images
        imgElement.src = images[currentIndex];
        imgElement.style.opacity = 1; // Fade in the new image
    }, 1000); // Delay to match the CSS transition duration
}

// Change image every 10 seconds
setInterval(changeImage, 10000);





