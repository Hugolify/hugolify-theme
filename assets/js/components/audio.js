document.addEventListener('DOMContentLoaded', function () {
  let lazyAudios = [].slice.call(
    document.querySelectorAll('.js-audio.is-lazy')
  );
  if (lazyAudios.length > 0) {
    if ('IntersectionObserver' in window) {
      let lazyAudioObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (audio) {
          if (audio.isIntersecting) {
            for (let source in audio.target.children) {
              let audioSource = audio.target.children[source];
              if (
                typeof audioSource.tagName === 'string' &&
                audioSource.tagName === 'SOURCE'
              ) {
                audioSource.src = audioSource.dataset.src;
              }
            }

            audio.target.load();
            audio.target.classList.remove('is-lazy');
            lazyAudioObserver.unobserve(audio.target);
          }
        });
      });

      lazyAudios.forEach(function (lazyAudio) {
        lazyAudioObserver.observe(lazyAudio);
      });
    }
  }
});
