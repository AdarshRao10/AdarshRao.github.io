function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
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

t1.from("#page1",{
    delay:0.2,
    y:1600,
    opacity:0,
    duration:0.5,
    ease:Power4
})


t1.to("#loader",{
    display:"none"
})

t1.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
    y:150,
    stagger: 0.2
})

t1.from("#nav",{
    opacity: 0
})

t1.from("#page3",{
    opacity: 0
})

}

function cursorAnimation(){

    if (window.innerWidth > 600) {
       
    document.addEventListener("mousemove",function(e){
        gsap.to("#cursor",{
            left:e.x,
            top:e.y
        })
    })
    
    //Magnet Effect
    // Shery.makeMagnet("#nav-part2 h4");

    //page 2 animation
    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video");
    videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(e){
            gsap.to("#cursor",{
                opacity:0
            })
            gsap.to("#video-cursor",{
                left:e.x - 500,
                top:e.y - 300
            })
        })
    })

    videoContainer.addEventListener("mouseleave",function(e){
        gsap.to("#cursor",{
            opacity:1
        })
        gsap.to("#video-cursor",{
            left:"70%",
            top:"-15%"
        })
    })

    var flag = 0;
    videoContainer.addEventListener("click",function(){
        if(flag == 0){
            video.play(),
            video.style.opacity = 1,
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-line"></i>`,
            gsap.to("#video-cursor",{
                scale:0.5
            })
            flag = 1
        }else{
            video.pause(),
            video.style.opacity = 0,
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-line"></i>`,
            gsap.to("#video-cursor",{
                scale:1
            })
            flag = 0
        }
    })

}

}

function imageAnimation(){
  Shery.imageEffect(".image-div",{
    style:5,
    // debug:true,
    config:{"a":{"value":2.06,"range":[0,30]},"b":{"value":-0.92,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272611844751101},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4.31,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.18,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":1.07,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.49,"range":[0,2]},"noise_scale":{"value":13.74,"range":[0,100]}},
    gooey:true
  })
}

function flagAnimation(){
    document.addEventListener("mousemove",function(e){
        gsap.to("#flag",{
            x:e.x,
            y: e.y
        })
    })

    document.querySelector("#hero3").addEventListener("mouseenter",function(){
        gsap.to("#flag",{
            opacity:1
        })
    })

    document.querySelector("#hero3").addEventListener("mouseleave",function(){
        gsap.to("#flag",{
            opacity:0
        })
    })
}

function footerTextAnimation() {
    var spanElement = document.querySelector("#footer-heading span");

    // Mouseover event handler
    function handleMouseOver() {
        gsap.from(spanElement, {
            opacity: 0,
            delay: 0.5,
            duration: 1,
            onStart: function () {
                $(spanElement).textillate({ in: { effect: 'rollIn' } });
            }
        });
    }

    // Attach mouseover and mouseout event listeners
    spanElement.addEventListener("mouseover", handleMouseOver);
}

// function checkViewportAndAnimate() {
//     if (window.innerWidth <= 600) {
//       imageAnimation();
//     }
//   }


// Run the check initially
//checkViewportAndAnimate();

// Add event listener for window resize
//window.addEventListener('resize', checkViewportAndAnimate);

locomotiveAnimation();
loadingAnimation();
cursorAnimation();
imageAnimation();
flagAnimation();
// footerTextAnimation();

// var navBar = document.querySelector("#nav-part2");
// // logic for scale on hower
// navBar.addEventListener("mousemove",function(e){
//     gsap.to("#cursor",{
//         scale: 2
//     })
// })

// //if not howered on options
// navBar.addEventListener("mouseleave",function(e){
//     gsap.to("#cursor",{
//         scale: 1
// })
// })

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
