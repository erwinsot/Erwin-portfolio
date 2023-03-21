import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls2 {
    constructor() {
        
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
            
        }
        this.scrollOnceEvent = this.onScroll.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
    }

    animRoom(){
        
        this.room.scale.set(0.11, 0.11, 0.11);
        this.rectLight.width = 0.5;
        this.rectLight.height = 0.7;
        this.camera.orthographicCamera.position.set(0, 6.5, 10);
        this.room.position.set(0, 0, 0);

        this.firstMoveTimeline = new GSAP.timeline()
        this.firstCircle = new GSAP.timeline({})
        

        this.firstMoveTimeline.fromTo(
            this.room.position,
            { x: 0, y: 0, z: 0 },
            {duration:2,
                x: () => {
                    return this.sizes.width * 0.0014;
                },
            }
            
        )
        


        this.firstCircle
        .to(this.circleFirst.scale, {duration:2,
            x: 3,
            y: 3,
            z: 3,
        });
       

    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.animRoom();
            console.log("swipped up2");
        }
        else{
            console.log("scrollarria")
        }
    }


   
    resize() {}

    update() {}
}

{/* <section class="first-section section left">
<div class="progress-wrapper progress-bar-wrapper-left">
  <div class="progress-bar"></div>
</div>
<div id="about-content-container">
  <div class="wrapper">
    <div class="holder">
      <img src="/public/textures/Me4.png" alt="">
    </div>
  </div>

  <svg class="header-about" height="200" width="500">
    <polyline id="about-profile-background" class="about-box-background" points="65,170 145,170 145,50 135,40 135,10 125,0 70,0 10,0 0,10 0,160 10,170" style="opacity: 0;"></polyline>
    <polyline id="about-header-background" class="about-box-background" points="145,85 250,85 260,95 490,95 500,105 500,135 500,150 490,160 200,160 190,170 145,170" style="opacity: 0;"></polyline>
    <polyline class="about-box-line" points="65,170 10,170 0,160 0,10 10,0 70,0" style="stroke-dasharray: 293.284; stroke-dashoffset: 293.284px;"></polyline> Sorry, your browser does not support inline SVG.
    <polyline class="about-box-line" points="65,170 145,170 145,50 135,40 135,10 125,0 70,0" style="stroke-dasharray: 313.284; stroke-dashoffset: 313.284px;"></polyline>
    <polyline class="about-box-line" points="145,85 250,85 260,95 490,95 500,105 500,135" style="stroke-dasharray: 393.284; stroke-dashoffset: 393.284px;"></polyline>
    <polyline class="about-box-line" points="145,170 190,170 200,160 490,160 500,150 500,135" style="stroke-dasharray: 378.284; stroke-dashoffset: 378.284px;"></polyline>
    <g transform="translate(170 118)" fill="#eae6ca" font-weight="bold">
      <text x="0" y="0" font-size="12" class="about-header-upper-text" style="opacity: 1;">Name :</text>
      <text x="0" y="20" font-size="18" class="about-header-lower-text" style="opacity: 1;">Erwin</text>
      <text x="110" y="0" font-size="12" class="about-header-upper-text" style="opacity: 1;">From :</text>
      <text x="110" y="20" font-size="18" class="about-header-lower-text" style="opacity: 1;">Colombia</text>
      <!-- <text x="200" y="0" font-size="12" class="about-header-upper-text" style="opacity: 1;">From :</text>
      <text x="200" y="20" font-size="18" class="about-header-lower-text" style="opacity: 1;">Colombia</text> -->
    </g>
  </svg>

  <svg class="header-about" height="300" width="500" >
    <polyline id="about-skills-background" class="about-box-background" points="250,35 200,35 200,10 190,0 10,0 0,10 0,245 10,255 197,255 215,273 215,290 250,290 400,290 410,280 490,280 500,270 500,55 490,45 310,45 300,35" style="opacity: 0;"></polyline>
    <polyline class="about-box-line" points="250,35 200,35 200,10 190,0 10,0 0,10 0,245 10,255 197,255 215,273 215,290 250,290" style="stroke-dasharray: 796.882; stroke-dashoffset: 796.882px;"></polyline>
    <polyline class="about-box-line" points="250,35 300,35 310,45 490,45 500,55 500,270 490,280 410,280 400,290 250,290" style="stroke-dasharray: 731.569; stroke-dashoffset: 731.569px;"></polyline>
    <mask id="skills-header-mask"><polyline fill="white" points="0,37 0,10 10,0 190,0 200,10 200,37"></polyline><rect fill="white" x="0" y="210" width="500" height="6"></rect></mask>
    <rect id="skills-header-rect" x="0" y="0" height="47" width="500" fill="#eae6ca" opacity=".15" mask="url(#skills-header-mask)" style="width: 500px;"></rect>
    <text x="71" y="25" class="about-header" font-size="18" font-weight="bold">SKILLS</text>
    <foreignObject x="0" y="60" width="506" height="340">
      <div id="about-skills-container" class="about-container">
        <div id="about-skills-render-container">
        <div id="about-skill-container-0" class="row about-skill-container" style="opacity: 0;">
            <span id="about-skill-span-0" class="about-skill-span">WebGL</span>
            <div class="about-skill-bar-container">
                <div id="about-skill-bar-0" class="about-skill-bar" style="width: 0%;"></div>
            </div>
        </div>
    
        <div id="about-skill-container-1" class="row about-skill-container" style="opacity: 1;">
            <span id="about-skill-span-1" class="about-skill-span">ReactJS</span>
            <div class="about-skill-bar-container">
                <div id="about-skill-bar-1" class="about-skill-bar" style="width: 0%;"></div>
            </div>
        </div>
    
        <div id="about-skill-container-2" class="row about-skill-container" style="opacity: 1;">
            <span id="about-skill-span-2" class="about-skill-span">JavaScript</span>
            <div class="about-skill-bar-container">
                <div id="about-skill-bar-2" class="about-skill-bar" style="width: 0%;"></div>
            </div>
        </div>
    
        <div id="about-skill-container-3" class="row about-skill-container" style="opacity: 1;">
            <span id="about-skill-span-3" class="about-skill-span">HTML + CSS</span>
            <div class="about-skill-bar-container">
                <div id="about-skill-bar-3" class="about-skill-bar" style="width: 0%;"></div>
            </div>
        </div>
    
        <div id="about-skill-container-4" class="row about-skill-container" style="opacity: 1;">
            <span id="about-skill-span-4" class="about-skill-span">3D Modelling</span>
            <div class="about-skill-bar-container">
                <div id="about-skill-bar-4" class="about-skill-bar" style="width: 0%;"></div>
            </div>
        </div>
    </div><div id="about-others-render-container"></div></div></foreignObject>
  </svg>
  <svg class="header-about" height="400" width="500">
    <polyline id="about-about-background" class="about-box-background" points="250,35 200,35 200,10 190,0 10,0 0,10 0,35 0,315 10,325 100,325 110,335 250,335 490,335 500,325 500,55 490,45 410,45 400,35" style="opacity: 0;"></polyline>
    <polyline class="about-box-line" points="250,35 200,35 200,10 190,0 10,0 0,10 0,35 0,315 10,325 100,325 110,335 250,335" style="stroke-dasharray: 846.569; stroke-dashoffset: 846.569px;"></polyline>
    <polyline class="about-box-line" points="250,35 400,35 410,45 490,45 500,55 500,325 490,335 250,335" style="stroke-dasharray: 782.426; stroke-dashoffset: 782.426px;"></polyline>
    <mask id="about-header-mask"><polyline fill="white" points="0,37 0,10 10,0 190,0 200,10 200,37"></polyline><rect fill="white" x="0" y="210" width="500" height="6"></rect></mask>
    <rect id="about-header-rect" x="0" y="0" height="47" width="500" fill="#eae6ca" opacity=".15" mask="url(#about-header-mask)" style="width: 500px;"></rect>
    <text x="73" y="25" class="about-header" font-size="18" font-weight="bold">ABOUT</text>
    <g transform="translate(10 65)"><use class="about-icon" href="#about-icon-background" style="opacity: 1;"></use>
      <mask id="about-pixel-mask-0">
        <rect class="about-pixel-mask-rect" x="6" y="7" height="20" width="64" fill="white" style="height: 64px;"></rect>
      </mask><image mask="url(#about-pixel-mask-0)" class="about-pixel-image" height="64" width="64" href="assets/images/860561269551a65b.png" x="6" y="7">

      </image><text x="88" y="33" class="about-text" style="opacity: 0;">I am a student passionate about problem-solving </text>
      <text x="88" y="50" class="about-text" style="opacity: 0;">and constantly seeking new challenges and.</text>
      <text x="88" y="67" class="about-text" style="opacity: 0;"> opportunities to learn and grow  I consider myself  </text>
      <text x="88" y="84" class="about-text" style="opacity: 0;"> a very open and adaptable person which allows  </text>
      <text x="10" y="101" class="about-text" style="opacity: 0;">me to be versatile and effective in problem-solving. </text>
      <text x="10" y="118" class="about-text" style="opacity: 0;">I am always seeking new ways to improve and surpass my</text>
      <text x="10" y="135" class="about-text" style="opacity:0;">own limits, My goal is to combine creativity with </text>
      <text x="10" y="152" class="about-text" style="opacity: 0;">technology With this goal in mind, I am constantly seeking </text>
      <text x="10" y="169" class="about-text" style="opacity: 0;">new ways to new ways to integrate creativity and</text>
      <text x="10" y="186" class="about-text" style="opacity: 0;">technology in my work and projects. </text>
      <text x="10" y="203" class="about-text" style="opacity: 0;">I am always exploring the latest advancements in these  </text>
      <text x="10" y="220" class="about-text" style="opacity: 0;"> fields, as well as looking for ways to apply them to </text>
      <text x="10" y="237" class="about-text" style="opacity: 0;"> real-world problems  </text>
      
     </g>
  </svg>


</div>

</section> */}