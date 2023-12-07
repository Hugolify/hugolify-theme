const NOTE_REGEX = /\[\*\]/gm;

const blocks = document.querySelectorAll('.block-paragraph, .block-editorial');
blocks.forEach((block, blockIndex) => {
  try {
    const paragraph = block.querySelector('.text');

    let index = 0;
    paragraph.innerHTML = paragraph.innerHTML.replace(NOTE_REGEX, () => {
      const annotationIndex = ++index;
      const id = `${blockIndex}-${annotationIndex}`;
      const linkId = `nh-${id}`;
      const noteId = `nb-${id}`;
      const noteContent = block.querySelector(
        `#${noteId} .note-content`
      )?.innerText;

      if (!noteContent) {
        return '';
      }

      return `<sup class="text-note"><a id="${linkId}" href="#${noteId}" aria-describedby="${noteId}" data-bs-toggle="tooltip" title="${noteContent}" ><span class="bracket">[</span>${annotationIndex}<span class="bracket">]</span></a></sup>`;
    });
  } catch (e) {
    console.error('Unable to parse annotated text', e);
  }
});
