/* =====================================================
   LeoTools
   Complete Main JavaScript
===================================================== */

"use strict";


/* =====================================================
   GLOBAL
===================================================== */

let currentTool = null;

let historyData =
    JSON.parse(localStorage.getItem("leoToolsHistory")) || [];

let favoriteTools =
    JSON.parse(localStorage.getItem("leoToolsFavorites")) || [];


/* =====================================================
   SPLASH SCREEN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const splash =
        document.getElementById("splashScreen");

    const mainApp =
        document.getElementById("mainApp");

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("loadingPercent");

    const loadingText =
        document.getElementById("loadingText");


    if (!splash || !mainApp) {
        console.error("LeoTools loading error");
        return;
    }


    mainApp.classList.add("hidden");


    const messages = [
        "Initializing LeoTools...",
        "Loading smart tools...",
        "Preparing calculators...",
        "Loading converters...",
        "Securing your data...",
        "Almost ready..."
    ];


    let progress = 0;


    const timer = setInterval(() => {

        progress += Math.floor(Math.random() * 5) + 3;

        if (progress >= 100) {
            progress = 100;
        }


        if (progressBar) {
            progressBar.style.width =
                progress + "%";
        }


        if (progressText) {
            progressText.textContent =
                progress + "%";
        }


        if (loadingText) {

            const index =
                Math.min(
                    Math.floor(progress / 18),
                    messages.length - 1
                );

            loadingText.textContent =
                messages[index];

        }


        if (progress >= 100) {

            clearInterval(timer);


            setTimeout(() => {

                splash.classList.add("splashHide");


                setTimeout(() => {

                    splash.style.display = "none";

                    mainApp.classList.remove("hidden");

                    document.body.style.overflow =
                        "auto";

                }, 600);

            }, 500);

        }

    }, 100);

});


/* =====================================================
   TOOL DATA
===================================================== */

const tools = {

    calculator: {
        name: "Smart Calculator",
        description: "Calculate anything",
        icon: "🧮"
    },

    money: {
        name: "Money Splitter",
        description: "Split money easily",
        icon: "₹"
    },

    converter: {
        name: "Unit Converter",
        description: "Convert units instantly",
        icon: "⇄"
    },

    age: {
        name: "Date & Age",
        description: "Calculate age and dates",
        icon: "📅"
    },

    bills: {
        name: "Bill Calculator",
        description: "Calculate bills and GST",
        icon: "🧾"
    },

    daily: {
        name: "Daily Tools",
        description: "Useful everyday utilities",
        icon: "🧰"
    },

    security: {
        name: "Security Tools",
        description: "Generate secure passwords",
        icon: "🛡"
    },

    qr: {
        name: "QR Scanner",
        description: "Scan and generate QR",
        icon: "▦"
    },

    notes: {
        name: "Quick Notes",
        description: "Save your notes",
        icon: "📝"
    }

};


/* =====================================================
   OPEN TOOL
===================================================== */

function openTool(toolName) {

    const tool =
        tools[toolName];

    if (!tool) return;


    currentTool = toolName;


    const screen =
        document.getElementById("toolScreen");

    const name =
        document.getElementById("toolHeaderName");

    const description =
        document.getElementById(
            "toolHeaderDescription"
        );

    const icon =
        document.getElementById(
            "toolHeaderIcon"
        );

    const body =
        document.getElementById("toolBody");


    name.textContent =
        tool.name;

    description.textContent =
        tool.description;

    icon.textContent =
        tool.icon;


    if (toolName === "calculator") {

        body.innerHTML = calculatorHTML();

    }

    else if (toolName === "money") {

        body.innerHTML = moneyHTML();

    }

    else if (toolName === "converter") {

        body.innerHTML = converterHTML();

    }

    else if (toolName === "age") {

        body.innerHTML = ageHTML();

    }

    else if (toolName === "bills") {

        body.innerHTML = billHTML();

    }

    else if (toolName === "daily") {

        body.innerHTML = dailyHTML();

    }

    else if (toolName === "security") {

        body.innerHTML = securityHTML();

    }

    else if (toolName === "qr") {

        body.innerHTML = qrHTML();

    }

    else if (toolName === "notes") {

        body.innerHTML = notesHTML();

    }


    screen.classList.add("active");

    document.body.style.overflow =
        "hidden";


    history.pushState(
        { tool: toolName },
        "",
        "#tool-" + toolName
    );

}


/* =====================================================
   CLOSE TOOL
===================================================== */

function closeTool() {

    const screen =
        document.getElementById("toolScreen");

    screen.classList.remove("active");

    document.body.style.overflow =
        "auto";

    currentTool = null;


    if (location.hash.startsWith("#tool-")) {

        history.replaceState(
            null,
            "",
            location.pathname
        );

    }

}


/* =====================================================
   BACK BUTTON
===================================================== */

window.addEventListener("popstate", () => {

    if (currentTool) {
        closeTool();
    }

});


/* =====================================================
   CALCULATOR
===================================================== */

function calculatorHTML() {

    return `

        <div class="calculator">

            <input
                id="calcDisplay"
                class="calcDisplay"
                value="0"
                readonly>


            <div class="calcGrid">

                <button onclick="clearCalc()">AC</button>
                <button onclick="calcInput('/')">÷</button>
                <button onclick="calcInput('*')">×</button>
                <button onclick="calcInput('-')">−</button>

                <button onclick="calcInput('7')">7</button>
                <button onclick="calcInput('8')">8</button>
                <button onclick="calcInput('9')">9</button>
                <button onclick="calcInput('+')">+</button>

                <button onclick="calcInput('4')">4</button>
                <button onclick="calcInput('5')">5</button>
                <button onclick="calcInput('6')">6</button>
                <button onclick="calcBack()">⌫</button>

                <button onclick="calcInput('1')">1</button>
                <button onclick="calcInput('2')">2</button>
                <button onclick="calcInput('3')">3</button>
                <button onclick="calculateResult()">=</button>

                <button class="zero"
                        onclick="calcInput('0')">
                    0
                </button>

                <button onclick="calcInput('.')">
                    .
                </button>

            </div>

        </div>

    `;

}


let calcValue = "";


function calcInput(value) {

    calcValue += value;

    document.getElementById(
        "calcDisplay"
    ).value = calcValue;

}


function clearCalc() {

    calcValue = "";

    document.getElementById(
        "calcDisplay"
    ).value = "0";

}


function calcBack() {

    calcValue =
        calcValue.slice(0, -1);

    document.getElementById(
        "calcDisplay"
    ).value =
        calcValue || "0";

}


function calculateResult() {

    try {

        const result =
            Function(
                `"use strict"; return (${calcValue})`
            )();

        calcValue =
            String(result);

        document.getElementById(
            "calcDisplay"
        ).value =
            calcValue;

    }

    catch {

        document.getElementById(
            "calcDisplay"
        ).value =
            "Error";

        calcValue = "";

    }

}


/* =====================================================
   MONEY
===================================================== */

function moneyHTML() {

    return `

        <div class="toolCard">

            <h3>₹ Money Splitter</h3>

            <input
                id="moneyAmount"
                type="number"
                placeholder="Total amount">

            <input
                id="moneyPeople"
                type="number"
                placeholder="Number of people">

            <button onclick="splitMoney()">
                Split Money
            </button>

            <div id="moneyResult"></div>

        </div>

    `;

}


function splitMoney() {

    const amount =
        Number(
            document.getElementById(
                "moneyAmount"
            ).value
        );

    const people =
        Number(
            document.getElementById(
                "moneyPeople"
            ).value
        );


    if (!amount || !people) {

        alert("Enter amount and people");

        return;

    }


    const each =
        amount / people;


    document.getElementById(
        "moneyResult"
    ).innerHTML =
        `Each person pays <b>₹${each.toFixed(2)}</b>`;

}


/* =====================================================
   CONVERTER
===================================================== */

function converterHTML() {

    return `

        <div class="toolCard">

            <h3>⇄ Unit Converter</h3>

            <input
                id="convertValue"
                type="number"
                placeholder="Enter value">

            <select id="convertType">

                <option value="km">
                    Kilometer → Meter
                </option>

                <option value="m">
                    Meter → Centimeter
                </option>

                <option value="kg">
                    Kilogram → Gram
                </option>

            </select>

            <button onclick="convertUnit()">
                Convert
            </button>

            <div id="convertResult"></div>

        </div>

    `;

}


function convertUnit() {

    const value =
        Number(
            document.getElementById(
                "convertValue"
            ).value
        );

    const type =
        document.getElementById(
            "convertType"
        ).value;


    let result;


    if (type === "km") {
        result = value * 1000 + " m";
    }

    else if (type === "m") {
        result = value * 100 + " cm";
    }

    else if (type === "kg") {
        result = value * 1000 + " g";
    }


    document.getElementById(
        "convertResult"
    ).innerHTML =
        `<b>${result}</b>`;

}


/* =====================================================
   AGE
===================================================== */

function ageHTML() {

    return `

        <div class="toolCard">

            <h3>📅 Age Calculator</h3>

            <input
                id="birthDate"
                type="date">

            <button onclick="calculateAge()">
                Calculate Age
            </button>

            <div id="ageResult"></div>

        </div>

    `;

}


function calculateAge() {

    const birth =
        new Date(
            document.getElementById(
                "birthDate"
            ).value
        );

    if (isNaN(birth)) return;


    const today =
        new Date();


    let age =
        today.getFullYear() -
        birth.getFullYear();


    const month =
        today.getMonth() -
        birth.getMonth();


    if (
        month < 0 ||
        (
            month === 0 &&
            today.getDate() <
            birth.getDate()
        )
    ) {

        age--;

    }


    document.getElementById(
        "ageResult"
    ).innerHTML =
        `Your age is <b>${age} years</b>`;

}


/* =====================================================
   BILL
===================================================== */

function billHTML() {

    return `

        <div class="toolCard">

            <h3>🧾 Bill Calculator</h3>

            <input
                id="billAmount"
                type="number"
                placeholder="Bill amount">

            <input
                id="billGST"
                type="number"
                placeholder="GST %"
                value="18">

            <button onclick="calculateBill()">
                Calculate Bill
            </button>

            <div id="billResult"></div>

        </div>

    `;

}


function calculateBill() {

    const amount =
        Number(
            document.getElementById(
                "billAmount"
            ).value
        );

    const gst =
        Number(
            document.getElementById(
                "billGST"
            ).value
        );


    const tax =
        amount * gst / 100;

    const total =
        amount + tax;


    document.getElementById(
        "billResult"
    ).innerHTML =

        `GST: ₹${tax.toFixed(2)}
         <br>
         Total: <b>₹${total.toFixed(2)}</b>`;

}


/* =====================================================
   DAILY TOOLS
===================================================== */

function dailyHTML() {

    return `

        <div class="toolCard">

            <h3>🧰 Daily Tools</h3>

            <div class="dailyClock"
                 id="dailyClock">
                00:00:00
            </div>

            <button onclick="startTimer()">
                Start Timer
            </button>

        </div>

    `;

}


let timerSeconds = 0;
let timerInterval = null;


function startTimer() {

    if (timerInterval) return;


    timerInterval =
        setInterval(() => {

            timerSeconds++;


            const h =
                String(
                    Math.floor(
                        timerSeconds / 3600
                    )
                ).padStart(2, "0");


            const m =
                String(
                    Math.floor(
                        (timerSeconds % 3600) / 60
                    )
                ).padStart(2, "0");


            const s =
                String(
                    timerSeconds % 60
                ).padStart(2, "0");


            const clock =
                document.getElementById(
                    "dailyClock"
                );


            if (clock) {

                clock.textContent =
                    `${h}:${m}:${s}`;

            }

        }, 1000);

}


/* =====================================================
   SECURITY
===================================================== */

function securityHTML() {

    return `

        <div class="toolCard">

            <h3>🛡 Password Generator</h3>

            <input
                id="passwordLength"
                type="number"
                value="16"
                min="6"
                max="64">

            <button onclick="generatePassword()">
                Generate Password
            </button>

            <div
                id="passwordResult"
                class="passwordResult">
            </div>

        </div>

    `;

}


function generatePassword() {

    const length =
        Number(
            document.getElementById(
                "passwordLength"
            ).value
        );


    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789!@#$%^&*";


    let password = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        password +=
            chars[
                Math.floor(
                    Math.random() *
                    chars.length
                )
            ];

    }


    document.getElementById(
        "passwordResult"
    ).textContent =
        password;

}


/* =====================================================
   QR
===================================================== */

function qrHTML() {

    return `

        <div class="toolCard qrCard">

            <h3>▦ QR Scanner</h3>

            <p>
                QR Scanner & Generator
            </p>

            <button onclick="alert('QR Scanner ready')">
                Open Scanner
            </button>

        </div>

    `;

}


/* =====================================================
   NOTES
===================================================== */

function notesHTML() {

    return `

        <div class="toolCard">

            <h3>📝 Quick Notes</h3>

            <textarea
                id="quickNote"
                placeholder="Write your note...">
            </textarea>

            <button onclick="saveNote()">
                Save Note
            </button>

            <div id="notesResult"></div>

        </div>

    `;

}


function saveNote() {

    const note =
        document.getElementById(
            "quickNote"
        ).value.trim();


    if (!note) {

        alert("Write something first");

        return;

    }


    const notes =
        JSON.parse(
            localStorage.getItem(
                "leoToolsNotes"
            )
        ) || [];


    notes.push({

        text: note,

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "leoToolsNotes",
        JSON.stringify(notes)
    );


    document.getElementById(
        "notesResult"
    ).innerHTML =
        "✅ Note saved successfully";

}


/* =====================================================
   SIDE MENU
===================================================== */

function openSideMenu() {

    document
        .getElementById("sideMenu")
        .classList.add("active");

    document
        .getElementById("sideOverlay")
        .classList.add("active");

}


function closeSideMenu() {

    document
        .getElementById("sideMenu")
        .classList.remove("active");

    document
        .getElementById("sideOverlay")
        .classList.remove("active");

}


/* =====================================================
   SEARCH
===================================================== */

function searchTools() {

    const query =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();


    document
        .querySelectorAll(".homeTool")
        .forEach(tool => {

            const name =
                tool.dataset.name || "";


            tool.style.display =
                name.includes(query)
                    ? "flex"
                    : "none";

        });

}


/* =====================================================
   BOTTOM NAV
===================================================== */

function changePage(page, element) {

    document
        .querySelectorAll(".bottomItem")
        .forEach(item =>
            item.classList.remove("active")
        );


    element.classList.add("active");


    const grid =
        document.getElementById("toolGrid");


    const hero =
        document.querySelector(".heroCard");


    const info =
        document.querySelector(".infoStrip");


    if (page === "home") {

        grid.style.display = "grid";
        hero.style.display = "block";
        info.style.display = "block";

        return;

    }


    hero.style.display = "none";
    info.style.display = "none";


    if (page === "tools") {

        grid.style.display = "grid";

        return;

    }


    grid.style.display = "none";


    if (page === "history") {

        alert("History coming soon");

    }


    if (page === "favorites") {

        alert("Favorites coming soon");

    }

}


/* =====================================================
   QUICK TOOLS
===================================================== */

function openQuickTools() {

    openTool("calculator");

}


/* =====================================================
   PREMIUM
===================================================== */

function showPremium() {

    alert(
        "LeoTools Premium 🚀\n\n" +
        "More powerful tools coming soon!"
    );

}


/* =====================================================
   VOICE SEARCH
===================================================== */

function voiceSearch() {

    if (
        !("webkitSpeechRecognition" in window)
    ) {

        alert(
            "Voice search is not supported."
        );

        return;

    }


    const recognition =
        new webkitSpeechRecognition();


    recognition.lang = "en-IN";


    recognition.onresult =
        function(event) {

            const text =
                event.results[0][0].transcript;


            document.getElementById(
                "searchInput"
            ).value =
                text;


            searchTools();

        };


    recognition.start();

}


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            currentTool
        ) {

            closeTool();

        }

    }
);
