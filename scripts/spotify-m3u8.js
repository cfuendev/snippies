window.cfuendev = {
  m3u8: {
    state: { counter: 0 },
    playlist: {
      size: parseInt(
        document
          .querySelector(
            ".NNafsIKjQaOOVJsH > div:nth-of-type(2) > div:nth-of-type(2) > span:first-of-type, .jQEzizWq_N0wiIS3 > span:first-of-type",
          )
          .textContent.replace(/\ssongs/, ""),
      ),
      title: document.querySelector('[data-testid="entityTitle"]').textContent,
      items: [],
      listElm: document.querySelector(`[data-testid="internal-track-link"]`)
        .parentElement.parentElement.parentElement.parentElement.parentElement,
    },
    config: {
      music_folder: "C:\\Users\\cfuen\\Music\\actual music\\propertly tagged",
    },
  },
};

function writeToFile(content, filename, mimeType) {
  // Create a blob from the content
  const blob = new Blob([content], {
    type: mimeType,
  });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Append to body, click, and clean up
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Revoke the blob URL to free memory
  URL.revokeObjectURL(url);
}

const scrapingInterval = setInterval(() => {
  window.cfuendev.m3u8.playlist.listElm.childNodes[
    window.cfuendev.m3u8.playlist.listElm.childNodes.length - 1
  ].scrollIntoView();

  Array.from(window.cfuendev.m3u8.playlist.listElm.childNodes).map((cN) => {
    const elm = cN.querySelector('[data-testid="internal-track-link"]');

    // Push all items to the playlist
    const artistsJoined =
      Array.from(elm.parentElement.querySelectorAll('[href*="/artist/"]')).length > 1
        ? Array.from(
            elm.parentElement.querySelectorAll(
              '[href*="/artist/"]',
            ),
          )
            .map((_elm) => _elm.textContent.replace(/<|>|"|\/|\\|\||\?|\*/gm, ''))
            .join(", ")
        : elm.parentElement.querySelector(
            '[href*="/artist/"]'
          ).textContent.replace(/<|>|:|"|\/|\\|\||\?|\*/gm, '');
    const songTitle = elm.parentElement.querySelector(
      'a[tabindex="-1"]:first-of-type',
    ).textContent.replace(/<|>|"|\/|\\|\||\?|\*/gm, '');
    
    const songDurationSplit = elm.parentElement.parentElement.parentElement
      .querySelector('[role="gridcell"]:last-of-type')
      .textContent.match(/\d{1,}\:\d{1,}/)[0]
      .split(":");
    const songDuration =
      parseInt(songDurationSplit[0]) * 60 + parseInt(songDurationSplit[1]);
    const songMeta = `#EXTINF:${songDuration},${artistsJoined} - ${songTitle}`;
    const songFilepath = `${window.cfuendev.m3u8.config.music_folder.replace(/\w$/, `${window.cfuendev.m3u8.config.music_folder.split("")[window.cfuendev.m3u8.config.music_folder.length - 1]}\\`)}${artistsJoined.replace(':', '-')} - ${songTitle.replace(':', '-')}.mp3`;
    const m3u8Tag = `${songMeta}\n${songFilepath}`;
    if (!window.cfuendev.m3u8.playlist.items.includes(m3u8Tag)) {
      window.cfuendev.m3u8.playlist.items.push(m3u8Tag);
    }
  });

  if (
    document
      .querySelector('[data-testid="recommended-track"]')
      .getBoundingClientRect().bottom < 1347
  ) {
    clearInterval(scrapingInterval);
    writeToFile(
      `#EXTM3U #PLAYLIST ${window.cfuendev.m3u8.playlist.title}\n${window.cfuendev.m3u8.playlist.items.join("\n")}`,
      `${window.cfuendev.m3u8.playlist.title}.m3u8`,
      `text/plain`,
    );
  }
}, 2000);
