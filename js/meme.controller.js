'use strict'

let gElCanvas
let gCtx
let gStartPos= getPos()

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderGalery()
}


function renderGalery() {
    const elGalery = document.querySelector('.img-galerey')
    const galery = getGalery()
    elGalery.innerHTML = galery.map(img => `<img src="${img.url}" onclick="coverCanvasWithImg(this)" data-id="${img.id}">`).join('')
}


function onDraw(ev) {
    const { offsetX, offsetY } = ev
    drawText(getLine().txt, offsetX, offsetY)
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
    const imgId = returnImgById(elImg.dataset.id)
    setSelectedImg(imgId)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(getLine().txt, gStartPos.x, gStartPos.y)
    onNav('editor')
}

function onEditLine(elInput) {
    setLine(elInput.value)
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    coverCanvasWithImg(document.querySelector(`[data-id="${getSelectedImg().id}"]`))
}
function onSetColor(elInput) {
    setColor(elInput.value)

    drawText(getLine().txt, 200, 50)
}


function onChangeFontSize(elBtn) {
    const value = +elBtn.value
    setFontSizze(value)
    coverCanvasWithImg(document.querySelector(`[data-id="${getSelectedImg().id}"]`))
}

function onRemoveLine() {
    removeLine()
    coverCanvasWithImg(document.querySelector(`[data-id="${getSelectedImg().id}"]`))
    const elInput = document.querySelector('.line-input')
    elInput.value = ''
    resetLine()
}

function onNav(section) {
    const elEditor = document.querySelector('.editor')
    const elGalery = document.querySelector('.galery')

    switch (section) {
        case 'galery':
            elEditor.classList.add('hide')
            elGalery.classList.remove('hide')
            break;
        case 'editor':
            elEditor.classList.remove('hide')
            elGalery.classList.add('hide')
            break;
    }
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        createCircle(center)
        renderCanvas()
    })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTxtClicked(pos)) return
    setTxtDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine() 
    if (!isDrag) return
    console.log('Moving the txt')

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveTxt(dx, dy)
    gStartPos = pos
    renderCanvas()
}

function onUp() {
    // console.log('onUp')
    setTxtDrag(false)
    document.body.style.cursor = 'grab'
}
function renderCanvas() {
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    coverCanvasWithImg(document.querySelector(`[data-id="${getSelectedImg().id}"]`))
}


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
