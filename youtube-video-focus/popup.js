document.getElementById("focusButton").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: focusOnVideo
        });
    });
});

document.getElementById("revertButton").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: revertToNormal
        });
    });
});

function focusOnVideo() {
    const videoElement = document.querySelector('video');
    const videoContainer = videoElement.closest('.html5-video-player');

    const blackoutOverlay = document.createElement('div');
    blackoutOverlay.id = 'blackoutOverlay'; 
    blackoutOverlay.style.position = 'fixed';
    blackoutOverlay.style.top = '0';
    blackoutOverlay.style.left = '0';
    blackoutOverlay.style.width = '100%';
    blackoutOverlay.style.height = '100%';
    blackoutOverlay.style.backgroundColor = 'black';
    blackoutOverlay.style.zIndex = '9999';
    document.body.appendChild(blackoutOverlay);

    videoContainer.style.position = 'relative';
    videoContainer.style.zIndex = '10000';
}

function revertToNormal() {
    const blackoutOverlay = document.getElementById('blackoutOverlay');
    if (blackoutOverlay) {
        blackoutOverlay.remove(); 
    }

    const videoContainer = document.querySelector('.html5-video-player');
    if (videoContainer) {
        videoContainer.style.zIndex = ''; 
    }
}
