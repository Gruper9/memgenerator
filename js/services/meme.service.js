'use strict'


const gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['baby', 'strong'] },
{ id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'man'] },
{ id: 3, url: 'imgs/3.jpg', keywords: ['man', 'toast', 'movie'] },
{ id: 4, url: 'imgs/4.jpg', keywords: ['man', 'movie'] },
{ id: 5, url: 'imgs/5.jpg', keywords: ['man', 'funny', 'movie'] },
{ id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'movie'] }
]


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'edit this text',
            size: 50,
            color: 'white'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'movie': 16, 'man': 2 }

//send the selected img to the controller
function getSelectedImg() {
    return gMeme.selectedImgId
}

function getGalery() {
    return gImgs
}
//update the generated meme to contain the right img
function setSelectedImg(id) {
    gMeme.selectedImgId = id
}

function returnImgById(id) {
    return gImgs[id - 1]
}
//send the text line from the model to the controller
function getLine() {
    return gMeme.lines[0].txt
}
//get text from user input and update the model 
function setLine(txt) {
    gMeme.lines[0].txt = txt
}
//send the text color to the controller
function getLineColor() {
    return gMeme.lines[0].color
}
//send the font size to the controller
function getLineSize() {
    return gMeme.lines[0].size
}
//update the model with the text color the user choose
function setColor(color) {
    gMeme.lines[0].color = color
}

function setFontSizze(value) {

    if (gMeme.lines[0].size > 70 && value > 0) return
    else if (gMeme.lines[0].size < 40 && value < 0) return
    else gMeme.lines[0].size += value
}

function removeLine() {
    gMeme.lines[0].txt = ''
    gMeme.lines[0].size = 50
    gMeme.lines[0].color = 'white'   
}
function resetLine(){
    gMeme.lines[0].txt = 'edit this text'
}