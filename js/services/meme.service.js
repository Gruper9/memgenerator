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
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getSelectedImg() {
    return gMeme.selectedImgId
}
function getGalery() {
    return gImgs
}

function setSelectedImg(id) {
    gMeme.selectedImgId = id
    console.log(gMeme.selectedImgId);
}

function returnImgById(id) {
    return gImgs[id - 1]
}
function getLine() {
    return gMeme.lines[0].txt
}
function setLine(txt) {
    gMeme.lines[0].txt = txt
}
function getLineColor() {
    return gMeme.lines[0].color
}
function getLineSize() {
    return gMeme.lines[0].size
}
function setColor(color) {
    gMeme.lines[0].color = color
}