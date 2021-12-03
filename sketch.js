// main global variables
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const controlCircleSize = 40
const mainImageTop = canvasHeight/4
const mainImageLeft = canvasWidth/4
const mainImageWidth = canvasWidth/2
const mainImageHeight = canvasHeight/2
let circlePositions
let carouselImages = []
let effect1Images = []
let counter = 0
let hovering = false
// effect 1 variables 
// we'll set this in a function
let effect1Data

// effect 2 variables
// we'll set this in a function
let effect2Data
// start position, imagesize, numsteps, count
const fx2ImageSize = 100
const fx2StartX = canvasWidth/2
const fx2StartY = canvasHeight/2
const fx2Steps = 30
let fx2Count = 0


function preload(){
    

    for(let i = 1; i < 11; i++){
        console.log(`${i}.0.png`) 
        carouselImages.push(loadImage(`assets/img/${i}.0.png`))
    }

    for(let i = 0; i < 10; i++){
        effect1Images.push(loadImage(`assets/1/1.${i}.jpg`))
    }
}

function setup (){
    createCanvas(canvasWidth, canvasHeight)
   
    circlePositions = Array.from({length: carouselImages.length}, (el, i) => {
        const x = canvasWidth/3 + (i * 1.5) * controlCircleSize
        const y = canvasHeight - canvasHeight/6
        return {
            x,y
        }
    })
    resetEffects()
}

function draw(){
    
    if(hovering){   
        runImageEffect(counter)
    }else{
        background(255)
        drawControlCircles()
        image(carouselImages[counter], mainImageLeft, mainImageTop, mainImageWidth, mainImageHeight)
    }
    
}


function mousePressed(){
    checkCircles(mouseX, mouseY)
}

function mouseMoved(){
    if(mouseX > mainImageLeft && 
        mouseX < mainImageLeft + mainImageWidth &&
        mouseY > mainImageTop && 
        mouseY < mainImageTop + mainImageHeight){
            hovering = true
        }else{
            if(hovering){
                resetEffects()
            }
            hovering = false
        }
}


const drawControlCircles = () => {
    circlePositions.forEach((position, idx) => {
        stroke(0)
        if(idx === counter){
            fill(0)
        }else{
            noFill()
        }
        
        ellipse(position.x, position.y, 30)
    })
}

const checkCircles = (mX, mY) => {
    circlePositions.forEach((circlePosition, idx) => {
        if(mouseX > circlePosition.x - controlCircleSize/2 &&
            mouseX < circlePosition.x + controlCircleSize/2 &&
            mouseY > circlePosition.y - controlCircleSize/2 &&
            mouseY < circlePosition.y + controlCircleSize/2){
                counter = idx
            }
    })
}


const runImageEffect = (counter) => {
    console.log(counter)
    // decide which effect to use
    switch(counter){
        case 0 : {
            console.log('effect 1')     
            return
        }
        case 1 : {
            effect2UpdatePosition()
            effect2Display()
            //console.log('effect 2')
            return
        }
        default: 
            return
    }
}



const effect1Init = () => {

}

const effect2Init = () => {
    const destinationX = random(0, canvasWidth - fx2ImageSize)
    const destinationY = random(0, canvasHeight - fx2ImageSize)
    const distanceX = destinationX - fx2StartX
    const distanceY = destinationY - fx2StartY
    fx2Count = 0
    effect2Data = {
        position: {x: fx2StartX, y: fx2StartY},
        distancePerStep: {x: distanceX/fx2Steps, y: distanceY/fx2Steps}
    }
}


const resetEffects = () => {
    console.log('resetting effects')
    effect1Init()
    effect2Init()
}

const effect1  = () => {
    effect1Images.forEach((img, i) => {
        image(img, randomImagePositions[i].x, randomImagePositions[i].y, 150, 150)
        background(255)
        image(carouselImages[counter], x, y, 100, 100)
        distx=destinationX-x
        disty=destinationY-y
        x+=distx/10
        image(carouselImages[counter], x, y, 100, 100)
        y+=disty/10
    })
}


const effect2UpdatePosition = () => {
    console.log(effect2Data)
    if(fx2Count < fx2Steps){
        effect2Data.position.x += effect2Data.distancePerStep.x
        effect2Data.position.y += effect2Data.distancePerStep.y
        fx2Count++
    }

}

const effect2Display = () => {
        background(255, 255, 255, 50)
        image(carouselImages[1],  effect2Data.position.x,  effect2Data.position.y, fx2ImageSize, fx2ImageSize)
}