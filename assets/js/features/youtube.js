var playerElements = document.querySelectorAll('.js-youtube-player');

if (playerElements.length === 0) {
    return;
}

// 1. Load the YouTube IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player) after the API code downloads
window.onYouTubeIframeAPIReady = function() {
    playerElements.forEach(function(playerElement) {
        // Extract the video ID from the "data-video-id" attribute
        var videoId = playerElement.dataset.videoId;
        var videoAutoplay = playerElement.dataset.videoAutoplay === undefined ? 1 : parseInt(playerElement.dataset.videoAutoplay);
        var videoControls = playerElement.dataset.videoControls === undefined ? 0 : parseInt(playerElement.dataset.videoControls);

        new YT.Player(playerElement, {
            videoId: videoId, // Insert the extracted ID here
            host: 'https://www.youtube-nocookie.com',
            playerVars: {
                'autoplay': videoAutoplay,   // Auto-play the video
                'controls': videoControls,   // Hide player controls
                'showinfo': 0,               // Hide video title and info
                'modestbranding': 1,         // Minimize YouTube logo
                'loop': 1,                   // Loop the video
                'fs': 0,                     // Hide fullscreen button
                'cc_load_policy': 0,         // Hide closed captions
                'iv_load_policy': 3,         // Hide annotations
                'autohide': 0,               // Auto-hide controls
                'playsinline': 1,            // Play inline on mobile
                'playlist': videoId          // REQUIRED: The video ID is needed here again to loop a single video
            },
            events: {
                'onReady': function(event) {
                    onPlayerReady(event, videoAutoplay);
                },
                'onStateChange': function(event) {
                    onPlayerStateChange(event);
                }
            }
        });
    });
}

// 3. The API will call this function when the video player is ready
function onPlayerReady(event, autoplay) {
    if (autoplay) {
        // CRITICAL: Mute the video to allow autoplay on modern browsers (Chrome, Safari, etc.)
        event.target.mute();
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    // YT.PlayerState.PLAYING is 1
    if (event.data === 1) {
        var iframe = event.target.getIframe();
        if (iframe && iframe.parentNode) {
            iframe.parentNode.classList.add('is-playing');
        }
    }
}
