// ==UserScript==
// @name         Fuck AI Results
// @version      2025-06-21
// @description  Hides that god awful google AI results widget while keeping the actual search results good-looking
// @author       CFUEN (https://github.com/cfuendev)
// @namespace    https://github.com/cfuendev/snippies
// @supportURL   https://github.com/cfuendev/snippies
// @author       CFUEN (A. Castillo)
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelector('.bzXtMb.M8OgIe.dRpWwb').style.display = 'none';
    document.querySelector('#rcnt').style.paddingTop = '10px';
})();