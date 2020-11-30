import "./styles.scss";
import gsap from 'gsap'

const button = document.querySelector('.js-trigger')
const card = document.querySelector('.card')

let startingPath
let forwardMiddle
let backwardMiddle
let finalPath

let forward = true
let running = false

function createSvg(w, h){
  startingPath = `M${w} 0 L${w} ${h} L${w} ${h} Q${w} ${h/2} ${w} 0 Z`
  finalPath = `M${w} 0 L${w} ${h} L0 ${h} Q0 ${h/2} 0 0 Z`
  forwardMiddle = `M${w} 0 L${w} ${h} L ${h} ${h} Q 0 ${h/2} ${h} 0 Z`
  backwardMiddle = `M${w} 0 L${w} ${h} L0 ${h} Q ${h} ${h/2} 0 0 Z`
}

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

function createDOM(){
  setAttributes()
  svg.appendChild(path)
  card.appendChild(svg)
}

function setAttributes(){
  const {innerWidth, innerHeight} = window
  createSvg(innerWidth, innerHeight)
  svg.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`)
  path.setAttribute("d",!forward ? finalPath : startingPath)
}


const onClick = () => {
  if(running) return
  running = true
  let tl = gsap.timeline({ onComplete: function(){
    forward = !forward
    running = false
  }});


  if(forward){
    tl.to(path, {duration:.8, attr: { d: forwardMiddle } })
      .to(path, {duration:.8, attr: { d: finalPath }},"-=.6")
  }else{
    tl.to(path, {duration:.8, attr: { d: backwardMiddle }})
      .to(path, {duration:.8, attr: { d: startingPath }},"-=.6")
  }
}

createDOM()

window.onresize = setAttributes
button.addEventListener('click', onClick)
