let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotate:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }    
}

const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        sepia: 0,
        grayscale: 0,
        hueRotate: 0,
        blur: 0,
        invert: 0
    },

    vivid: {
        brightness: 110,
        contrast: 120,
        saturate: 165,
        sepia: 0,
        grayscale: 0,
        hueRotate: 0,
        blur: 0,
        invert: 0
    },

    cinematic: {
        brightness: 88,
        contrast: 135,
        saturate: 115,
        sepia: 12,
        grayscale: 5,
        hueRotate: -8,
        blur: 0,
        invert: 0
    },

    goldenHour: {
        brightness: 112,
        contrast: 108,
        saturate: 125,
        sepia: 28,
        grayscale: 0,
        hueRotate: -12,
        blur: 0,
        invert: 0
    },

    arcticGlass: {
        brightness: 120,
        contrast: 112,
        saturate: 125,
        sepia: 0,
        grayscale: 0,
        hueRotate: 165,
        blur: 0,
        invert: 0
    },

    vintageFilm: {
        brightness: 105,
        contrast: 92,
        saturate: 78,
        sepia: 48,
        grayscale: 8,
        hueRotate: -8,
        blur: 0,
        invert: 0
    },

    noir: {
        brightness: 92,
        contrast: 145,
        saturate: 0,
        sepia: 0,
        grayscale: 100,
        hueRotate: 0,
        blur: 0,
        invert: 0
    },

    matte: {
        brightness: 108,
        contrast: 78,
        saturate: 88,
        sepia: 8,
        grayscale: 0,
        hueRotate: 0,
        blur: 0,
        invert: 0
    },

    fadedMemory: {
        brightness: 115,
        contrast: 75,
        saturate: 68,
        sepia: 18,
        grayscale: 8,
        hueRotate: 5,
        blur: 0,
        invert: 0
    },

    bloodMoon: {
        brightness: 82,
        contrast: 148,
        saturate: 170,
        sepia: 20,
        grayscale: 0,
        hueRotate: -25,
        blur: 0,
        invert: 0
    },

    deepOcean: {
        brightness: 72,
        contrast: 140,
        saturate: 120,
        sepia: 0,
        grayscale: 5,
        hueRotate: 175,
        blur: 0,
        invert: 0
    },

    cyberpunk: {
        brightness: 105,
        contrast: 135,
        saturate: 200,
        sepia: 0,
        grayscale: 0,
        hueRotate: 55,
        blur: 0,
        invert: 0
    },

    acidPop: {
        brightness: 108,
        contrast: 125,
        saturate: 240,
        sepia: 0,
        grayscale: 0,
        hueRotate: 25,
        blur: 0,
        invert: 0
    },

    ember: {
        brightness: 94,
        contrast: 140,
        saturate: 165,
        sepia: 35,
        grayscale: 0,
        hueRotate: -18,
        blur: 0,
        invert: 0
    },

    ghost: {
        brightness: 125,
        contrast: 72,
        saturate: 18,
        sepia: 5,
        grayscale: 55,
        hueRotate: 0,
        blur: 0,
        invert: 0
    },

    chrome: {
        brightness: 102,
        contrast: 155,
        saturate: 45,
        sepia: 0,
        grayscale: 35,
        hueRotate: 0,
        blur: 0,
        invert: 0
    },

    dreamcore: {
        brightness: 118,
        contrast: 78,
        saturate: 120,
        sepia: 10,
        grayscale: 0,
        hueRotate: -8,
        blur: 1,
        invert: 0
    },

    solarized: {
        brightness: 100,
        contrast: 125,
        saturate: 130,
        sepia: 0,
        grayscale: 10,
        hueRotate: 160,
        blur: 0,
        invert: 75
    },

    dustStorm: {
        brightness: 110,
        contrast: 82,
        saturate: 55,
        sepia: 42,
        grayscale: 12,
        hueRotate: -8,
        blur: 0,
        invert: 0
    },

    pencil: {
        brightness: 118,
        contrast: 205,
        saturate: 0,
        sepia: 0,
        grayscale: 100,
        hueRotate: 0,
        blur: 0,
        invert: 0
    }
};

const filtersContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const resetBtn = document.querySelector("#reset-btn")
const downloadBtn = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")
let file = null;
let image = null;

function createFilterElement(name , unit = "%",value, min , max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type="range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name
    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",(event)=>{
        filters[name].value = input.value
        applyFilters()
    })

    return div
}

function createFilters(){
    Object.keys(filters).forEach(key =>{
    
        const filterElement = createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max)
    
        filtersContainer.appendChild(filterElement)
    
    })
}

createFilters()

imageInput.addEventListener("change",(event)=>{
    file = event.target.files[0]
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload =()=>{
        image = img
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img,0,0)
    }
    
    document.querySelector(".placeholder").style.display =  "none";
    imageCanvas.style.display = "flex"
})

function applyFilters(){
    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height)
    canvasCtx.filter =`
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturate.value}${filters.saturate.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `   
    canvasCtx.drawImage(image,0,0)
}

resetBtn.addEventListener("click",()=>{
    filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotate:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }    
    }
    applyFilters()

    filtersContainer.innerHTML=""

    createFilters()
})

downloadBtn.addEventListener("click", () =>{
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

Object.keys(presets).forEach(presetName=>{
    const presetBtn = document.createElement('button')
    presetBtn.classList.add("btn")
    presetBtn.innerText = presetName
    presetsContainer.appendChild(presetBtn)

    presetBtn.addEventListener('click',()=>{
        const preset = presets[presetName]
        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName] 
            applyFilters()
            filtersContainer.innerHTML=""
            createFilters()
        })
        
    })
})