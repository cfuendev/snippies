// ==UserScript==
// @name         Gamelist.xml Metadata Button
// @namespace    http://tampermonkey.net/
// @version      2026-01-15
// @description  Adds a button that copies the metadata of the current game in gamelist.xml format to your clipboard
// @author       CFUEN (https://github.com/cfuendev)
// @match        https://steamdb.info/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamdb.info
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

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

    const pageHeaderActionsElm = document.querySelector('.pagehead-actions.app-links');

    const xmlDlBtnElm = document.createElement('button');
    xmlDlBtnElm.role = "button"
    xmlDlBtnElm.classList = "btn tooltipped tooltipped-s"
    xmlDlBtnElm.ariaLabel = "Copy ES-DE XML to Clipboard"
    xmlDlBtnElm.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-tools" aria-hidden="true"><path d="M5.433 2.304A4.492 4.492 0 0 0 3.5 6c0 1.598.832 3.002 2.09 3.802.518.328.929.923.902 1.64v.008l-.164 3.337a.75.75 0 1 1-1.498-.073l.163-3.33c.002-.085-.05-.216-.207-.316A5.996 5.996 0 0 1 2 6a5.993 5.993 0 0 1 2.567-4.92 1.482 1.482 0 0 1 1.673-.04c.462.296.76.827.76 1.423v2.82c0 .082.041.16.11.206l.75.51a.25.25 0 0 0 .28 0l.75-.51A.249.249 0 0 0 9 5.282V2.463c0-.596.298-1.127.76-1.423a1.482 1.482 0 0 1 1.673.04A5.993 5.993 0 0 1 14 6a5.996 5.996 0 0 1-2.786 5.068c-.157.1-.209.23-.207.315l.163 3.33a.752.752 0 0 1-1.094.714.75.75 0 0 1-.404-.64l-.164-3.345c-.027-.717.384-1.312.902-1.64A4.495 4.495 0 0 0 12.5 6a4.492 4.492 0 0 0-1.933-3.696c-.024.017-.067.067-.067.16v2.818a1.75 1.75 0 0 1-.767 1.448l-.75.51a1.75 1.75 0 0 1-1.966 0l-.75-.51A1.75 1.75 0 0 1 5.5 5.282V2.463c0-.092-.043-.142-.067-.159Z"></path></svg>
    XML`
    xmlDlBtnElm.addEventListener('click', generateGameXMLToClipboard)

    pageHeaderActionsElm.insertAdjacentElement('beforeend', xmlDlBtnElm);
})();