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
const fx1ImageSize = 50
const fx1NumImages = 100
const fx1Steps = 10
let fx1Count = 0
// effect 2 variables
// we'll set this in a function
let effect2Data
// start position, imagesize, numsteps, count
const fx2ImageSize = 100
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
    resetEffects(canvasWidth/2, canvasHeight/2)
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

    if(counter === 1){
        effect2Init(effect2Data.position.x, effect2Data.position.y)
    }

    if(mouseX > mainImageLeft && 
        mouseX < mainImageLeft + mainImageWidth &&
        mouseY > mainImageTop && 
        mouseY < mainImageTop + mainImageHeight){
            hovering = true
        }else{
            if(hovering){
                resetEffects(canvasWidth/2, canvasHeight/2)
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
            effect1UpdatePositions()
            effect1Display()   
            return
        }
        case 1 : {
            effect2UpdatePosition()
            effect2Display()
            //console.log('effect 2')
            return
        }

        case 2 : {
            effect3Display()
            console.log('effect 3')
            return
        }
        default: 
            return
    }
}



const effect1Init = () => {
    fx1Count = 0
    effect1Data = Array.from({ length: fx1NumImages}, () => {
        const destinationX = random((fx1ImageSize * 2), canvasWidth - (fx1ImageSize * 4))
        const destinationY = random((fx1ImageSize * 2), canvasHeight - (fx1ImageSize * 4))
        const startX = random(mainImageLeft, mainImageWidth)
        const startY = random(mainImageTop, mainImageHeight)
        const distanceX = destinationX - startX
        const distanceY = destinationY - startY
        return {
            position: {x: startX, y: startY},
            distancePerStep: {x: distanceX/fx1Steps, y: distanceY/fx1Steps}
        }
    })
}

const effect2Init = (oldX, oldY) => {
    // const destinationX = random(0, canvasWidth - fx2ImageSize)
    // const destinationY = random(0, canvasHeight - fx2ImageSize)
    const destinationX = mouseX - fx2ImageSize/2
    const destinationY = mouseY - fx2ImageSize/2
    const distanceX = destinationX - oldX
    const distanceY = destinationY - oldY
    fx2Count = 0
    effect2Data = {
        position: {x: oldX, y: oldY},
        distancePerStep: {x: distanceX/fx2Steps, y: distanceY/fx2Steps}
    }
}

const effect3Init = () => {
    return
}


const resetEffects = (x, y) => {
    console.log('resetting effects')
    effect1Init()
    effect2Init(x, y)
    effect3Init()
}

const effect1UpdatePositions  = () => {
    console.log(effect1Data)
    if(fx1Count < fx1Steps){
        effect1Data.forEach(datum => {
            datum.position.x += datum.distancePerStep.x
            datum.position.y += datum.distancePerStep.y
        })
        fx1Count++
    }



    // effect1Images.forEach((img, i) => {
    //     image(img, randomImagePositions[i].x, randomImagePositions[i].y, 150, 150)
    //     background(255)
    //     image(carouselImages[counter], x, y, 100, 100)
    //     distx=destinationX-x
    //     disty=destinationY-y
    //     x+=distx/10
    //     image(carouselImages[counter], x, y, 100, 100)
    //     y+=disty/10
    // })
}

const effect1Display = () => {
    background(255, 255, 255, 50)
    effect1Data.forEach(datum => {
        image(carouselImages[0],  datum.position.x,  datum.position.y, fx1ImageSize, fx1ImageSize)
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

const effect3Display = () => {
    background(0)
    textSize(60)
    fill(255)
    text('hi shayne!' , canvasWidth/2, canvasHeight/2)
}