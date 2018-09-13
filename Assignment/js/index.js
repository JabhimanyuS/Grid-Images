'use strict';

var gridLayout = document.getElementById('gridLayout');
var shuffleImages = document.getElementById('shuffleImages');

/* Add shuffle method to array proto */
Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

/* Function for generating images based on config */
function generateImages(updateImage) {
    for (var i = 0; i < imageConfig.length; i++) {
        var image = placeholderImage;
        if (!updateImage)
            image = imageConfig[i].src;
        var elementWrapper = document.createElement('div');
        var imageFlipper = document.createElement('div');
        var imageSection = document.createElement('div');
        var imageTag = document.createElement('img');
        var imageDescription = document.createElement('div');
        var deleteImage = document.createElement('button');
        elementWrapper.setAttribute('class', 'image-wrapper-section');
        elementWrapper.setAttribute('id', 'unique_' + imageConfig[i].id);
        imageFlipper.setAttribute('class', 'image-flipper');
        imageSection.setAttribute('class', 'image-section');
        imageTag.setAttribute('src', image);
        imageDescription.setAttribute('class', 'image-description');
        imageDescription.innerHTML = '<span>' + imageConfig[i].imageDescription + '</span>';
        imageDescription.appendChild(deleteImage);
        deleteImage.innerHTML = 'Delete';
        deleteImage.setAttribute('class', 'delete-button');
        deleteImage.setAttribute('id', imageConfig[i].id);
        imageSection.appendChild(imageTag);
        imageSection.appendChild(imageDescription);
        imageFlipper.appendChild(imageSection);
        elementWrapper.appendChild(imageFlipper);
        gridLayout.appendChild(elementWrapper);
    }
}

/* Function to replace images on window load event */
function replaceImages() {
    for (var i = 0; i < imageConfig.length; i++) {
        document.querySelectorAll('.image-section img')[i].src = imageConfig[i].src;
    }
}

/* Function to shuffle array randomly */
function shuffleData() {
    imageConfig.shuffle();
    gridLayout.innerHTML = '';
    generateImages(false);
}

/* Delete Event Delegation */
gridLayout.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
    var removeId = 'unique_' + event.target.id;
    if (document.getElementById(removeId) !== null)
        document.getElementById(removeId).outerHTML = '';
});

shuffleImages.addEventListener('click', function(event) {
    shuffleData();
});

/* Initialize the app */
(function() {
    generateImages(true);
    window.onload = function() {
        setTimeout(function() {
            replaceImages();
        }, 800)
    }
})();
