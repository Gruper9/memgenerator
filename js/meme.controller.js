'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGalery()
}


function renderGalery() {
    const elGalery = document.querySelector('.img-galerey')
    const galery = getGalery()
    elGalery.innerHTML = galery.map(img => `<img src="${img.url}" onclick="coverCanvasWithImg(this)" data-id="${img.id}">`).join('')
}


function onDraw(ev) {
    const { offsetX, offsetY } = ev
    drawText(getLine(), offsetX, offsetY)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = getLineColor()
    gCtx.font = `${getLineSize()}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function coverCanvasWithImg(elImg) {
   const imgId= returnImgById(elImg.dataset.id)
    setSelectedImg(imgId)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onEditLine(elInput){
    setLine(elInput.value)
}
function onSetColor(elInput){
    setColor(elInput.value)
}