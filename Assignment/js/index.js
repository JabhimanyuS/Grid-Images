'use strict';

var gridLayout = document.getElementById('gridLayout');
var deleteIcon = './assets/rubbish-bin.svg';

Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length - 1 ; i >= 0 ; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

function generateImages() {
    for (var i = 0 ; i < imageConfig.length ; i ++) {
        var elementWrapper = document.createElement('div');
        var imageFlipper = document.createElement('div');
        var imageSection = document.createElement('div');
        var imageTag = document.createElement('img');
        var imageDescription = document.createElement('div');
        var deleteImage = document.createElement('button');
        elementWrapper.setAttribute('class', 'image-wrapper-section');
        imageFlipper.setAttribute('class', 'image-flipper');
        imageSection.setAttribute('class', 'image-section');
        imageTag.setAttribute('src', imageConfig[i].src);
        imageTag.setAttribute('id', imageConfig[i].id);
        imageDescription.setAttribute('class', 'image-description');
        imageDescription.innerHTML = 'This is flipped text';
        deleteImage.innerHTML = "Delete <img src="+ deleteIcon +" />";
        deleteImage.setAttribute('class', 'delete-button');
        imageSection.appendChild(imageTag);
        imageSection.appendChild(imageDescription);
        imageFlipper.appendChild(imageSection);
        elementWrapper.appendChild(imageFlipper);
        elementWrapper.appendChild(deleteImage);
        gridLayout.appendChild(elementWrapper);
    }
}

function shuffleData() {
    imageConfig.shuffle();
    gridLayout.innerHTML = '';
    generateImages();
}

/* Event Delegation */
gridLayout.addEventListener('click', function(event) {
    event.target.parentNode.outerHTML = '';
});

generateImages();
