var playerElements = document.querySelectorAll('.js-vimeo-player');

if (playerElements.length === 0) {
    return;
}

// 1. Load the Vimeo Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://player.vimeo.com/api/player.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Initialize players after script load
tag.onload = function() {
    playerElements.forEach(function(playerElement) {
        // Extract the video ID from the "data-video-id" attribute
        var videoId = playerElement.dataset.videoId;
        var videoAutoplay = playerElement.dataset.videoAutoplay === undefined ? 1 : parseInt(playerElement.dataset.videoAutoplay);
        var videoControls = playerElement.dataset.videoControls === undefined ? 0 : parseInt(playerElement.dataset.videoControls);

        var options = {
            id: videoId,
            autoplay: videoAutoplay,
            loop: 1,
            controls: videoControls
        };
        var player = new Vimeo.Player(playerElement, options);

        if (options.autoplay) {
            player.setVolume(0);
            player.play().catch(function(error) {
                console.warn('Vimeo autoplay failed:', error);
            });
        }
    });
};
