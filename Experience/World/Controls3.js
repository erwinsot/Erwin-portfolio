import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";
import axios from "axios";
const url=`https://discord.com/api/webhooks/${import.meta.env.VITE_ID}/${import.meta.env.VITE_TOKEN}` 


export default class Controls3 {
    constructor() {
        //console.log(backendPort)
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        )
         {
            this.setSmoothScroll();
        }
        this.buttonClick();
        this.setScrollTrigger();
    }

    

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.5,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }



    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                GSAP.to(".wrapper",{opacity:1})
                // console.log("fired desktop");

               /*  const home = document.querySelector('#homeM');
                const about=document.querySelector("#aboutM")
        
                home.addEventListener('click', () => {
                    GSAP.fromTo("#transition-container",{bottom:9000} ,{bottom:13500, duration: 5,});
                  });
        
                  about.addEventListener('click', () => {
                    GSAP.fromTo("#transition-container",{bottom:"1120vw"} ,{bottom:"1530vw", duration: 5,});
                  }); */
                

                this.room.scale.set(0.11, 0.11, 0.11);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.7;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);
                this.room.position.set(0, 0, 0);
                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                        //markers: true,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:4,
                        
                    },
                });
                this.moveHero = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                       // markers: true,
                       // markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:3,
                        
                    },
                })
                



                this.firstMoveTimeline.fromTo(
                    this.room.position,
                    { x: 0, y: 0, z: 0 },
                    {
                        duration:4,
                        x: () => {
                            return this.sizes.width * 0.0014;
                        },
                    }
                    
                )
                .to(
                    ".about-box-line",
                    {strokeDashoffset: 0,duration:4,}
                )

                this.moveTimelineImage = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                        //markers: true,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:4,
                        
                    },
                })
                //.to(".holder",{ duration:2,opacity:1})
                .to(".about-box-background",{opacity:1})
                .to("#avatar",{ duration:0.5,opacity:1})
                .fromTo("#avatar", {xPercent:-200}, {duration: 0.5, xPercent: 0})
                .to(".about-text",{opacity:1})
                /* .fromTo(".holder", {yPercent:-100}, {duration: 0.5, yPercent:0}) */
               
                

                this.moveTimelineBarras = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                        //markers: true,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:4,
                        
                    },
                }).to(".header-about",{opacity:1})
                .to(".about-skill-bar-container",{width:500})

                .to("#about-skill-container-0",{opacity:1})
                
                .to("#about-skill-bar-0",{width:210})
                .to("#about-skill-bar-1",{width:205})
                .to("#about-skill-bar-2",{width:230})
                .to("#about-skill-bar-3",{width:220})
                .to("#about-skill-bar-4",{width:200})
               
              
     

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "-800px",
                        end: "bottom bottom",
                        scrub: 4,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:3
                    },
                })
                .to(
                    this.room.position,
                    {
                        x: () => {
                            return 1;
                        },
                        z: () => {
                            return this.sizes.height * 0.0032;
                        },
                    },
                    "same"
                )
                .to(
                    this.room.scale,
                    {
                        x: 0.4,
                        y: 0.4,
                        z: 0.4,
                        
                    },
                    
                    "same"
                )
                .to(
                    this.rectLight,
                    {
                        width: 0.5 * 4,
                        height: 0.7 * 4,
                    },
                    "same"
                )
                this.moveHero.to(".hero-wrapper",
                {
                    y: '-800px',
                }
                )
               
                // Second section -----------------------------------------
               
                 

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 1.5,
                    x: -4.1,
                    
                });
                this.thirdMoveTimelineMid = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-section",
                        start: "1200px",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        //markers:true
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 3,
                    x: 1,
                    z:-3.5
                    
                });

                // fourth section -----------------------------------------

               /*  this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 3,
                    x: 1,
                    z:-3.5
                   
                }); */

                 // fiveth section -----------------------------------------

                 this.fivethMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fiveth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                .to(
                    this.room.position,
                    {
                        x: () => {
                            return this.sizes.width * -0.0008;
                        },
                        z: () => {
                            return this.sizes.height * -0.0075;
                        },
                        /* y: () => {
                            return this.sizes.height * -0.0014;
                        }, */
                    },
                    "same"
                )
                .to(
                    this.room.scale,
                    {
                        x: 0.11,
                        y: 0.11,
                        z: 0.11,
                    },
                    "same"
                )
                .to(
                    this.rectLight,
                    {
                        width: 0.5 ,
                        height: 0.7,
                    },
                    "same"
                );
                this.ssMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".espacio",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                }).
                to(
                   ".bar",{width:600},"same" 
                )
                
                
            },

            // Mobile
            "(max-width: 968px)": () => {
                // console.log("fired mobile");
/* 
                const home = document.querySelector('#homeM');
                const about=document.querySelector("#aboutM")
        
                home.addEventListener('click', () => {
                    GSAP.fromTo("#transition-container",{bottom:9000} ,{bottom:13500, duration: 5,});
                  });
        
                  about.addEventListener('click', () => {
                    GSAP.fromTo("#transition-container",{bottom:"1120vw"} ,{bottom:"1530vw", duration: 5,});
                  });
 */
                // Resets
                this.room.scale.set(0.07, 0.07, 0.07);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);

                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                       // markers: true,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:4,
                        
                    },
                }).to(".hero-main",{opacity:0})
                .to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                }).to(
                    ".about-box-line",
                    {strokeDashoffset: 0,duration:4,}
                )

                this.moveHero = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                        //markers: true,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:3,
                        
                    },
                })


                this.moveTimelineImage = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                        //markers: true,
                        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:4,
                        
                    },
                })
                /* .to(".holder",{ duration:2,opacity:1}) */
                .to("#avatar",{ duration:0.5,opacity:1})
                //.fromTo("#avatar", {xPercent:-200}, {duration: 0.5, xPercent: 0})
                .to(".about-box-background",{opacity:1})
                .to(".about-text",{opacity:1})
                

                this.moveTimelineBarras = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 7,
                        //markers: true,
                       // markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                        invalidateOnRefresh: true,
                        duration:4,
                        
                    },
                }).to(".header-about",{opacity:1})
                .to(".about-skill-bar-container",{width:500})

                .to("#about-skill-container-0",{opacity:1})
                
                .to("#about-skill-bar-0",{width:210})
                .to("#about-skill-bar-1",{width:205})
                .to("#about-skill-bar-2",{width:230})
                .to("#about-skill-bar-3",{width:220})
                .to("#about-skill-bar-4",{width:200})

                
                

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.room.scale,
                        {
                            x: 0.25,
                            y: 0.25,
                            z: 0.25,
                        },
                        "same"
                    )
                    .to(
                        this.rectLight,
                        {
                            width: 0.3 * 3.4,
                            height: 0.4 * 3.4,
                        },
                        "same"
                    )
                    .to(
                        this.room.position,
                        {
                            x: 1.5,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    z: -4.5,
                });
                this.thirdMoveTimelineMid = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-section",
                        start: "1200px",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        //markers:true
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 3,
                    x: 1,
                    z:-3.5
                    
                });

                // fourth section -----------------------------------------

                /* this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 3,
                    x: 2.5,
                    z:-4
                   
                }); */

                 // fiveth section -----------------------------------------

                 this.fivethMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fiveth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                .to(
                    this.room.position,
                    {
                       /*  x: () => {
                            return this.sizes.width * -0.0005;
                        },
                        z: () => {
                            return this.sizes.height * -0.0021;
                        },
                        y: () => {
                            return this.sizes.height * 0.0054;
                        }, */
                        x:1,
                        y:6,
                        z:0
                    },
                    "same"
                )
                .to(
                    this.room.scale,
                    {
                        x: 0.07,
                        y: 0.07,
                        z: 0.07,
                    },
                    "same"
                )
                .to(
                    this.rectLight,
                    {
                        width: 0.3 ,
                        height: 0.4,
                    },
                    "same"
                );
                this.ssMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".espacio",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                }).
                to(
                   ".bar",{width:250} 
                )

                
            },

            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                // All animations
                // First section -----------------------------------------
                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".hero-wrapper",
                        start: "50",
                        end: "bottom bottom",
                        scrub: 4,
                        duration:3
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                // Second section -----------------------------------------
                this.secondCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "-400",
                        end: "bottom bottom",
                        scrub: 4,
                        duration:3
                    },
                })
                    .to(
                        this.circleSecond.scale,
                        {
                            x: 3,
                            y: 3,
                            z: 3,
                        },
                        "same"
                    )
                    .to(
                        this.room.position,
                        {
                            y: 0.7,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                // Mini Platform Animations
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                    },
                });

                this.room.children.forEach((child) => {
                    if (child.name === "Mini_Floor") {
                        this.first = GSAP.to(child.position, {
                            x: -5.44055,
                            z: 13.6135,
                            duration: 0.3,
                        });
                    }
                    if (child.name === "Mailbox") {
                        this.second = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3,
                        });
                    }
                    if (child.name === "Lamp") {
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                    if (child.name === "FloorFirst") {
                        this.fourth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                    if (child.name === "FloorSecond") {
                        this.fifth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3,
                        });
                    }
                    if (child.name === "FloorThird") {
                        this.sixth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                    if (child.name === "Dirt") {
                        this.seventh = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                    if (child.name === "Flower1") {
                        this.eighth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                    if (child.name === "Flower2") {
                        this.ninth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth, "-=0.2");
                this.secondPartTimeline.add(this.fifth, "-=0.2");
                this.secondPartTimeline.add(this.sixth, "-=0.2");
                this.secondPartTimeline.add(this.seventh, "-=0.2");
                this.secondPartTimeline.add(this.eighth);
                this.secondPartTimeline.add(this.ninth, "-=0.1");
            },
        });
        
        
    }

    buttonClick(){
        const miSpan = document.querySelector('#FaceD');
        GSAP.to(".wrapper",{opacity:1})
        
        document.getElementById("work-item-orange-button-Face").onclick=()=>{
            GSAP.to(miSpan, {
                duration: 3,
                textContent: 'The project involved using CUDA, Artificial Intelligence, and OpenCV to develop an application for face detection and classification based on specific characteristics. The application was designed to showcase the power of CUDA and Artificial Intelligence in image processing and analysis.To detect faces in images and videos, OpenCV, an open-source computer vision library, and integrated it with CUDA, a parallel computing platform and programming model. This combination allowed for faster processing of image data, enabling the application to detect faces in real-time.',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });
        }
        document.getElementById("work-item-orange-button-Port").onclick=()=>{
            GSAP.to("#Port", {
                duration: 3,
                textContent: 'This project is a modern web application developed using state-of-the-art technologies,including three.js, javascript, react, node.js, and express.js.The integration of these cutting-edge tools results in a dynamic and interactive user experience.The project is also designed to be highly interactive, allowing users to engage with the content in a variety of ways.For example, users may be able to manipulate objects within the 3D environment, triggering animations or sound effects, or controlling the camera view.',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });

        }
        document.getElementById("work-item-orange-button-Flut").onclick=()=>{
            GSAP.to("#Flut", {
                duration: 3,
                textContent: 'The project involved the use of Flutter, MongoDB, and Java to develop a mobile application that allowed users to create tasks, set due dates and priorities, and set reminders for each task.To store the application data, MongoDB was used as the database. The Java MongoDB Driver library was employed to connect to the MongoDB database and perform various CRUD operations.The resulting application boasted an intuitive and user-friendly interface, with distinct screens for displaying pending tasks, completed tasks, and upcoming tasks.',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });

        }
        document.getElementById("work-item-orange-button-Spa").onclick=()=>{
            GSAP.to("#Spa", {
                duration: 3,
                textContent: 'The project involved using Apache Spark, Matplotlib, SQL, and Highcharts to develop an application for data analysis and visualization. The application processed large datasets using Sparks distributed computing capabilities and stored the data in an SQL database for efficient retrieval and querying.To visualize the data, Matplotlib was used to generate various graphs and charts, providing meaningful insights and trends to the users. Highcharts was used to display the data on a web page in an interactive and visually appealing way',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });

        }
        document.getElementById("work-item-orange-button-Ntf").onclick=()=>{
            GSAP.to("#Ntf", {
                duration: 3,
                textContent: 'The project involved building a decentralized application (DApp) using Web3 to create and manage non-fungible tokens (NFTs) on the Ethereum network. NFTs are unique digital assets that are stored on a blockchain and can represent anything from artwork to virtual real estate. The application was designed to be user-friendly and accessible to users of all technical backgrounds. This enabled the team to create a user-friendly interface that could be used to create and manage NFTs without requiring users to have in-depth knowledge of blockchain technology.',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });

        }
        document.getElementById("work-item-orange-button-Ntf").onclick=()=>{
            GSAP.to("#Ntf", {
                duration: 3,
                textContent: 'The project involved building a decentralized application (DApp) using Web3 to create and manage non-fungible tokens (NFTs) on the Ethereum network. NFTs are unique digital assets that are stored on a blockchain and can represent anything from artwork to virtual real estate. The application was designed to be user-friendly and accessible to users of all technical backgrounds. This enabled the team to create a user-friendly interface that could be used to create and manage NFTs without requiring users to have in-depth knowledge of blockchain technology.',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });

        }
        document.getElementById("work-item-orange-button-Mport").onclick=()=>{
            GSAP.to("#Mport", {
                duration: 3,
                textContent: 'The project involved the use of Three.js, Blender, and Gsap, with patron Singleton to create a 3D web application with multiple scenes. The application was designed to showcase the capabilities of Three.js and React in creating interactive 3D experiences on the web.The 3D models and scenes were created using Blender, an open-source 3D modeling and animation software. The resulting 3D models were then integrated into the web application using Three.js, a JavaScript library for creating 3D graphics and animations in the browser.',
                ease:'Elastic.easeInOut.config(1,0.3)'
              });

        }




       

        const btnCon=document.querySelector("#btnCon")
        const miform=document.querySelector("#miform")

        const data={
            "content": "!! **NEW MENSSAGE RECEIVED** !!",
            "embeds": [
              {
                "title": "el nombes es tall",
                "url": "https://img.freepik.com/vector-gratis/alien-bigote-sombrero-cubo_43623-895.jpg?w=826&t=st=1679367416~exp=1679368016~hmac=bde4724ad4c29190186f61070bc74d8792c69ee014fdd931cd90e9c4b40cf54a",
                "color": 5814783,
                "author": {
                  "name": "NAME",
                  "icon_url": "https://img.freepik.com/vector-gratis/alien-bigote-sombrero-cubo_43623-895.jpg?w=826&t=st=1679367416~exp=1679368016~hmac=bde4724ad4c29190186f61070bc74d8792c69ee014fdd931cd90e9c4b40cf54a"
                },
                "thumbnail": {
                  "url": "https://img.freepik.com/vector-gratis/kitsune-lindo-personaje-dibujos-animados-espada-objeto-arte-aislado_138676-3159.jpg?w=826&t=st=1679367456~exp=1679368056~hmac=3a79ad11ad87a9aa6215bc0538c65e9e3cb4bbaefc9dd22376bf40974d612e88"
                }
              },
              {
                "title": "CORREO TAL",
                "url": "https://img.freepik.com/vector-premium/icono-sobre-correo-3d-notificacion-nuevo-mensaje-sobre-fondo-purpura-carta-correo-electronico-minima-concepto-mensaje-icono-lectura-papel-carta-renderizado-vectorial-3d-fondo-pastel-aislado_412828-881.jpg?w=1380",
                "color": 15466328,
                "author": {
                  "name": "CORREO",
                  "icon_url": "https://img.freepik.com/vector-premium/icono-sobre-correo-3d-notificacion-nuevo-mensaje-sobre-fondo-purpura-carta-correo-electronico-minima-concepto-mensaje-icono-lectura-papel-carta-renderizado-vectorial-3d-fondo-pastel-aislado_412828-881.jpg?w=1380"
                },
                "thumbnail": {
                  "url": "https://img.freepik.com/vector-premium/icono-sobre-correo-3d-notificacion-nuevo-mensaje-sobre-fondo-purpura-carta-correo-electronico-minima-concepto-mensaje-icono-lectura-papel-carta-renderizado-vectorial-3d-fondo-pastel-aislado_412828-881.jpg?w=1380"
                }
              },
              {
                "title": "THE MESSAGE IS",
                "description": "esots lostsoss sfaisasfasdas",
                "url": "https://img.freepik.com/fotos-premium/burbujas-chat-3d-concepto-minimo-mensajes-redes-sociales-ilustraciones-3d_1096-1637.jpg?w=826",
                "color": 16734296,
                "author": {
                  "name": "MESSAGE",
                  "icon_url": "https://img.freepik.com/fotos-premium/burbujas-chat-3d-concepto-minimo-mensajes-redes-sociales-ilustraciones-3d_1096-1637.jpg?w=826"
                },
                "thumbnail": {
                  "url": "https://img.freepik.com/fotos-premium/burbujas-chat-3d-concepto-minimo-mensajes-redes-sociales-ilustraciones-3d_1096-1637.jpg?w=826"
                }
              }
            ],
            "avatar_url": "https://img.freepik.com/vector-gratis/kitsune-lindo-personaje-dibujos-animados-espada-objeto-arte-aislado_138676-3159.jpg?w=826&t=st=1679367456~exp=1679368056~hmac=3a79ad11ad87a9aa6215bc0538c65e9e3cb4bbaefc9dd22376bf40974d612e88",
            "attachments": []
        }
        
        
                btnCon.addEventListener('click', (e) => {
                    e.preventDefault()
                    const mess=document.getElementById("mess").value;
                    const name=document.getElementById("name").value;
                    const email=document.getElementById("email").value;

                    data.embeds[0].title=name
                    data.embeds[2].description=mess
                    data.embeds[1].title=email
                    


                    console.log(email)
                    axios.post(url,data)
                      .then(response => {
                        // Aquí puedes procesar la respuesta del servidor
                      })
                      .catch(error => {
                        // Aquí puedes manejar los errores de la solicitud
                      });
                    miform.reset()
                    
                  });
       

        
        

        
    }
    resize() {}

    update() {}
}
