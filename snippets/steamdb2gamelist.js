function formatDateStringAlt(input) {
  // Alternative: using your exact pattern but allowing optional digit
  const regex = /(\d{1,2})\s+(\w+)\s+(\d{4})/; // \d\d? means: digit followed by optional digit

  const match = input.match(regex);

  if (!match) {
    throw new Error("Invalid date format");
  }

  const day = match[1]; // This is still a string, could be "7" or "07"
  const monthName = match[2];
  const year = match[3];

  const months = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const monthLower = monthName.toLowerCase();
  const monthNum = months[monthLower];

  if (!monthNum) {
    throw new Error(`Invalid month: ${monthName}`);
  }

  // Convert day to number and validate
  const dayNum = parseInt(day, 10);
  if (dayNum < 1 || dayNum > 31) {
    throw new Error(`Invalid day: ${day}`);
  }

  // Validate date using Date object
  const date = new Date(year, parseInt(monthNum, 10) - 1, dayNum);
  if (
    date.getMonth() + 1 !== parseInt(monthNum, 10) ||
    date.getDate() !== dayNum
  ) {
    throw new Error("Invalid date");
  }

  // Format day with leading zero
  const dayFormatted = dayNum.toString().padStart(2, "0");

  return `${year}${monthNum}${dayFormatted}T000000`;
}

function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  console.log("Copied to clipboard!");
}

function escapeXML(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateGameXMLToClipboard() {
  try {
    const nameElement = document.querySelector("#main > div > div.header-wrapper > div > div.pagehead > div.pagehead-title > h1")

    const name = nameElement.textContent

    const descElement = document.querySelector(
      "#main > div > div.header-wrapper > div > div.row.app-row > div.span4 > p"
    );
    const desc = descElement ? descElement.textContent.trim() : "";

    const dateElement = document.querySelector(
      "#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(9) > td:nth-child(2)"
    );
    const releasedate =
      dateElement && typeof formatDateStringAlt === "function"
        ? formatDateStringAlt(dateElement.textContent.trim())
        : dateElement
        ? dateElement.textContent.trim()
        : "";

    const developerElement = document.querySelector(
      "#info > table.table.table-bordered.table-hover.table-fixed.table-responsive-flex > tbody > tr:nth-child(1) > td:nth-child(2)"
    );
    const developer = developerElement
      ? developerElement.textContent.trim()
      : "";

    const publisherElement = document.querySelector("#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(4) > td:nth-child(2)")

    const publisher = publisherElement.textContent

    const genreElements = document.querySelectorAll(".header-app-tags a");
    const genre = Array.from(genreElements)
      .map((a) =>
        a.textContent.replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|[\r])/gm,
          ""
        )
      )
      .join(",");

    // Create XML
    const xmlContent = `<game>
  <path>...</path>
  <name>${escapeXML(name)}</name>
  <desc>${escapeXML(desc)}</desc>
  <releasedate>${escapeXML(releasedate)}</releasedate>
  <developer>${escapeXML(developer)}</developer>
  <publisher>${escapeXML(publisher)}</publisher>
  <genre>${escapeXML(genre)}</genre>
</game>`;

    // Copy to clipboard instead of downloading
    const success = copyToClipboard(xmlContent);

    if (success) {
      console.log("✅ XML copied to clipboard!");
      console.log("Preview of copied XML:");
      console.log(
        xmlContent.substring(0, 200) + (xmlContent.length > 200 ? "..." : "")
      );
    }

    return xmlContent;
  } catch (error) {
    console.error("Error generating XML:", error);
    return null;
  }
}

export default generateGameXMLToClipboard;
