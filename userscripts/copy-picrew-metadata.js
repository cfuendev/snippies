// ==UserScript==
// @name         Picrew Metadata JSON Button
// @version      2025-07-27
// @description  Adds a button that copies the JSON metadata of the Picrew to your clipboard
// @author       CFUEN (https://github.com/cfuendev)
// @namespace    https://github.com/cfuendev/snippies
// @supportURL   https://github.com/cfuendev/snippies
// @author       CFUEN (A. Castillo)
// @match        https://picrew.me/en/image_maker/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=picrew.me
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(()=> {
        if (document.querySelector('.play-Imagemaker.is_info_show')) {
            if (!document.querySelector('#skytp-json-copy')) {
                const _li = document.createElement('li')
                _li.innerHTML = '<button id="skytp-json-copy" class="imagemaker_info_btn_help" style="width: 100%; gap: 5px;"><img src="https://api.iconify.design/mingcute/copy-line.svg?color=white"><span>COPY</span></button>'
                _li.querySelector('button').addEventListener('click', ()=>{
                    navigator.clipboard.writeText(JSON.stringify({
                        name: document.querySelector('.imagemaker_info_title').textContent.replace(/\n|\s{2,}/mg, ''),
                        url: location.href,
                        img: getComputedStyle(document.querySelector('.imagemaker_info_icon')).backgroundImage.match(/(?<=url\(").+(?="\))/)[0],
                        author: document.querySelector('.imagemaker_info_creator a').textContent.replace(/\n|\s{2,}/mg, ''),
                        authorURL: document.querySelector('.imagemaker_info_creator a').href,
                    }))
                })
                document.querySelector('.imagemaker_info_footer_btns').appendChild(_li)
            }
        }
    }, 500)
})();