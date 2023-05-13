// ==UserScript==
// @name         Svelte Repl Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Makes https://svelte.dev/repl dark!
// @author       Cfuen (Juan Castillo) | https://github.com/cfuendev
// @match        https://svelte.dev/repl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=svelte.dev
// @grant        none
// @run-at       document-end
// @require      https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js
// ==/UserScript==

(function() {
    'use strict';
    const toggleTheme = () => {
        localStorage.getItem('theme') === "light" ? localStorage.setItem('theme', "dark") : localStorage.setItem('theme', "light")
        cssVarsSetup();
    };
    const addThemeSwitchButton = () => {
        const svg = document.querySelector("#main > div > div.app-controls.svelte-5tus4h > div > button:nth-child(4)").cloneNode(true);
        svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094l-.707.707a1 1 0 0 1-1.497-1.32l.083-.094l.707-.707ZM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm-8 3a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 0-1.414Zm14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z"/></g></svg>`
        svg.title = "dark mode"
        svg.classList.add("icon", "svelte-5yec89");
        document.querySelector("#main > div > div.app-controls.svelte-5tus4h > div").insertBefore(svg, document.querySelector("#main > div > div.app-controls.svelte-5tus4h > div > div"));
        svg.g = document.querySelector("#main > div > div.app-controls.svelte-5tus4h > div > button.icon.svelte-5tus4h.svelte-5yec89[title='dark mode'] > svg > g");
        svg.g.style.stroke = "none";
        svg.style.transform = "translateY(2.5px)";
        document.querySelector("#main > div > div.app-controls.svelte-5tus4h > div > button[title='dark mode']").addEventListener("click", ()=>{toggleTheme()});
    }
    const cssVarsSetup = () => {
        localStorage.getItem('theme') ? ()=>{} : localStorage.setItem('theme', "light");
        const theme = localStorage.getItem('theme')
        document.querySelector(":root").style.setProperty('--srdm-bgc1', theme === "dark" ? '#767689' : 'white');
        document.querySelector(":root").style.setProperty('--srdm-bgc2', theme === "dark" ? '#4D4D5B' : 'white');
        document.querySelector(":root").style.setProperty('--srdm-shadow', theme === "dark" ? 'linear-gradient(to right,#3c3c3e 1px,#4d4d5b 1px,#4d4d5b 2px,#3c3c3e 2px,#3c3c3e 3px,#4d4d5b 3px,#4d4d5b 4px,#3c3c3e 4px)' : 'linear-gradient(to right,#dedede 1px,white 1px,white 2px,#dedede 2px,#dedede 3px,white 3px,white 4px,#dedede 4px)');

        document.querySelector(":root").style.setProperty('--back-light', theme === "dark" ? '#3d3d48' : '#f6fafd');
        document.querySelector(":root").style.setProperty('--back', theme === "dark" ? '#3d3d48' : '#f6fafd');
        document.querySelector(":root").style.setProperty('--text', theme === "dark" ? '#CBCBD1' : '#444');
    }
    const mutObserverSetup = () => {
        const consoleObserver = new MutationObserver(()=>{ document.querySelectorAll(".log").forEach((logElm)=>{ logElm.style.backgroundColor = "var(--srdm-bgc2)"; logElm.style.borderBottom = "1px solid #3d3d48"; }) });
        consoleObserver.observe(document.querySelector("div.panel-body > section > div"), {
            childList: true,
            attributes: true,
            subtree: false
        });
        const tabsObserver = new MutationObserver(()=>{ setTimeout(lightsOff(), 300); });
        tabsObserver.observe(document.querySelector(".file-tabs"), {
            childList: true,
            attributes: true,
            subtree: false
        });
    }
    const lightsOff = () => {

        document.querySelector("body > div > nav").style.backgroundColor = 'var(--srdm-bgc1)';


        document.querySelectorAll(".file-tabs > div > i").forEach((tabHandle) => {
            tabHandle.style.background = "var(--srdm-shadow)";
        })

        document.querySelectorAll(".file-tabs > *").forEach((btn) => {
            btn.style.background = "var(--srdm-bgc2)";
            btn.style.color = "var(--text)";
        })

        document.querySelector(".file-tabs > *:last-child").addEventListener("click", () => {
            setTimeout(lightsOff(), 300);
        })

        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(1)").style.backgroundColor = "var(--srdm-bgc2)";

        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(1) > section > div.component-selector.svelte-l2bxb8").style.borderBottom = "1px solid #3d3d48";

        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(1) > section > div.editor-wrapper.svelte-m7nlxn > div.editor.notranslate.svelte-m7nlxn > div > div > div.CodeMirror-scroll > div.CodeMirror-gutters").style.backgroundColor = "var(--back-light)";
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(1) > section > div.editor-wrapper.svelte-m7nlxn > div.editor.notranslate.svelte-m7nlxn > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div").style.backgroundColor = "var(--back-light)";

        document.querySelectorAll("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(2) > section > div.view-toggle.svelte-bo3jvb > *").forEach((btn) => {
            btn.style.background = "var(--srdm-bgc2)";
            btn.style.color = "var(--text)";
        })
        document.querySelector(".view-toggle").style.backgroundColor = "var(--srdm-bgc2)";
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(2) > section > div.view-toggle.svelte-bo3jvb").style.borderBottom = "none";
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(1) > section > div.component-selector.svelte-l2bxb8").style.borderBottom = "none";
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(2) > section > div.tab-content.svelte-bo3jvb.visible > div > div.container.svelte-mfwhr3 > div:nth-child(2)").style.backgroundColor = "var(--srdm-bgc2)";
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(2) > section > div.tab-content.svelte-bo3jvb.visible > div > div.container.svelte-mfwhr3 > div:nth-child(2) > section > div.panel-header.svelte-160vuma > h3").style.color = "var(--text)";

        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div").style.backgroundColor = "var(--srdm-bgc2)";
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(2) > section > div.tab-content.svelte-bo3jvb.visible > div > div.container.svelte-mfwhr3").style.backgroundColor = "var(--srdm-bgc2)";
        document.querySelectorAll(".log").forEach((logElm)=>{
            logElm.style.backgroundColor = "var(--srdm-bgc2)"
            logElm.style.borderBottom = "1px solid #3d3d48"
        });
        document.querySelector("#main > div > div.container.svelte-12gl4sr > div > div > div:nth-child(2) > section > div.tab-content.svelte-bo3jvb.visible > div > div.container.svelte-mfwhr3 > div:nth-child(1) > section").style.backgroundColor = 'white';

    }
    setTimeout(() => {cssVarsSetup(); lightsOff(); addThemeSwitchButton();}, 1000);
    setTimeout(() => {mutObserverSetup()}, 1000)
})();