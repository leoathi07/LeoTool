/* =====================================================
   LEO TOOLS
   Complete App JavaScript
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let currentTool = null;

let calculatorValue = "";

let calculatorExpression = "";

let historyData =
    JSON.parse(
        localStorage.getItem("leoToolsHistory")
    ) || [];

let favoriteTools =
    JSON.parse(
        localStorage.getItem("leoToolsFavorites")
    ) || [];



/* =====================================================
   SPLASH SCREEN
===================================================== */

const splash =
    document.getElementById(
        "splashScreen"
    );

const mainApp =
    document.getElementById(
        "mainApp"
    );

const progressBar =
    document.getElementById(
        "progressBar"
    );

const progressText =
    document.getElementById(
        "loadingPercent"
    );

const loadingText =
    document.getElementById(
        "loadingText"
    );


const loadingMessages = [

    "Initializing LeoTools...",

    "Loading smart tools...",

    "Preparing calculators...",

    "Loading converters...",

    "Securing your data...",

    "Almost ready..."

];


let progress = 0;

let messageIndex = 0;


const splashTimer =
    setInterval(() => {

        progress +=
            Math.floor(
                Math.random() * 5
            ) + 2;


        if (progress > 100) {

            progress = 100;

        }


        progressBar.style.width =
            progress + "%";


        progressText.textContent =
            progress + "%";


        const newIndex =
            Math.min(
                Math.floor(progress / 18),
                loadingMessages.length - 1
            );


        if (
            newIndex !== messageIndex
        ) {

            messageIndex = newIndex;

            loadingText.textContent =
                loadingMessages[
                    messageIndex
                ];

        }


        if (progress >= 100) {

            clearInterval(
                splashTimer
            );

            setTimeout(
                finishSplash,
                500
            );

        }

    }, 100);



function finishSplash() {

    splash.style.opacity = "0";

    splash.style.transform =
        "scale(1.05)";


    setTimeout(() => {

        splash.classList.add(
            "hidden"
        );

        mainApp.classList.remove(
            "hidden"
        );

        window.scrollTo(
            0,
            0
        );

    }, 700);

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
   TOOL DATA
===================================================== */

const toolData = {

    calculator: {

        title: "Smart Calculator",

        description: "Calculate anything",

        icon: "🧮"

    },


    money: {

        title: "Money Splitter",

        description: "Split expenses easily",

        icon: "₹"

    },


    converter: {

        title: "Unit Converter",

        description: "Convert any unit",

        icon: "⇄"

    },


    age: {

        title: "Date & Age",

        description: "Calculate your age",

        icon: "📅"

    },


    bills: {

        title: "Bill Calculator",

        description: "Bills, GST & expenses",

        icon: "🧾"

    },


    daily: {

        title: "Daily Tools",

        description: "Useful everyday tools",

        icon: "🧰"

    },


    security: {

        title: "Security Tools",

        description: "Protect your information",

        icon: "🛡"

    },


    qr: {

        title: "QR Scanner",

        description: "Scan & generate QR",

        icon: "▦"

    },


    notes: {

        title: "Quick Notes",

        description: "Write notes quickly",

        icon: "📝"

    }

};



/* =====================================================
   OPEN TOOL
===================================================== */

function openTool(toolName) {

    const data =
        toolData[toolName];


    if (!data) return;


    currentTool =
        toolName;


    closeSideMenu();


    document
        .getElementById("toolHeaderName")
        .textContent =
        data.title;


    document
        .getElementById("toolHeaderDescription")
        .textContent =
        data.description;


    document
        .getElementById("toolHeaderIcon")
        .textContent =
        data.icon;


    const body =
        document.getElementById(
            "toolBody"
        );


    switch (toolName) {

        case "calculator":

            body.innerHTML =
                calculatorHTML();

            break;


        case "money":

            body.innerHTML =
                moneyHTML();

            break;


        case "converter":

            body.innerHTML =
                converterHTML();

            break;


        case "age":

            body.innerHTML =
                ageHTML();

            break;


        case "bills":

            body.innerHTML =
                billsHTML();

            break;


        case "daily":

            body.innerHTML =
                dailyHTML();

            break;


        case "security":

            body.innerHTML =
                securityHTML();

            break;


        case "qr":

            body.innerHTML =
                qrHTML();

            break;


        case "notes":

            body.innerHTML =
                notesHTML();

            break;

    }


    document
        .getElementById("toolScreen")
        .classList.add("active");


    document.body.style.overflow =
        "hidden";


    history.pushState(
        {
            tool: toolName
        },
        "",
        "#tool-" + toolName
    );

}



/* =====================================================
   CLOSE TOOL
===================================================== */

function closeTool() {

    const screen =
        document.getElementById(
            "toolScreen"
        );


    screen.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    currentTool = null;


    if (
        location.hash.startsWith(
            "#tool-"
        )
    ) {

        history.replaceState(
            null,
            "",
            location.pathname
        );

    }

}



/* =====================================================
   ANDROID / BROWSER BACK
===================================================== */

window.addEventListener(
    "popstate",
    () => {

        if (currentTool) {

            document
                .getElementById(
                    "toolScreen"
                )
                .classList.remove(
                    "active"
                );

            document.body.style.overflow =
                "";

            currentTool = null;

        }

    }
);



/* =====================================================
   CALCULATOR HTML
===================================================== */

function calculatorHTML() {

    return `

        <div class="toolCard">

            <div
                class="calculatorDisplay">

                <div
                    id="calcExpression"
                    class="calcExpression">

                </div>

                <div
                    id="calcResult"
                    class="calcResult">

                    0

                </div>

            </div>


            <div
                class="calcButtons">


                <button
                    class="calcButton operator"
                    onclick="clearCalculator()">

                    AC

                </button>


                <button
                    class="calcButton operator"
                    onclick="calculatorInput('%')">

                    %

                </button>


                <button
                    class="calcButton operator"
                    onclick="deleteCalculator()">

                    ⌫

                </button>


                <button
                    class="calcButton operator"
                    onclick="calculatorInput('/')">

                    ÷

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('7')">

                    7

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('8')">

                    8

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('9')">

                    9

                </button>


                <button
                    class="calcButton operator"
                    onclick="calculatorInput('*')">

                    ×

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('4')">

                    4

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('5')">

                    5

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('6')">

                    6

                </button>


                <button
                    class="calcButton operator"
                    onclick="calculatorInput('-')">

                    −

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('1')">

                    1

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('2')">

                    2

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('3')">

                    3

                </button>


                <button
                    class="calcButton operator"
                    onclick="calculatorInput('+')">

                    +

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('0')">

                    0

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('00')">

                    00

                </button>


                <button
                    class="calcButton"
                    onclick="calculatorInput('.')">

                    .

                </button>


                <button
                    class="calcButton equal"
                    onclick="calculateResult()">

                    =

                </button>


            </div>

        </div>

    `;

}



/* =====================================================
   CALCULATOR FUNCTIONS
===================================================== */

function calculatorInput(value) {

    calculatorValue += value;

    document
        .getElementById(
            "calcExpression"
        )
        .textContent =
        calculatorValue;

}


function clearCalculator() {

    calculatorValue = "";

    document
        .getElementById(
            "calcExpression"
        )
        .textContent = "";

    document
        .getElementById(
            "calcResult"
        )
        .textContent = "0";

}


function deleteCalculator() {

    calculatorValue =
        calculatorValue.slice(
            0,
            -1
        );

    document
        .getElementById(
            "calcExpression"
        )
        .textContent =
        calculatorValue;

}


function calculateResult() {

    try {

        let expression =
            calculatorValue
            .replace(
                /%/g,
                "/100"
            );


        const result =
            Function(
                "return " +
                expression
            )();


        document
            .getElementById(
                "calcResult"
            )
            .textContent =
            Number(result)
            .toLocaleString(
                "en-IN",
                {
                    maximumFractionDigits: 8
                }
            );


        addHistory(
            calculatorValue,
            result
        );

    }
    catch {

        document
            .getElementById(
                "calcResult"
            )
            .textContent =
            "Error";

    }

}



/* =====================================================
   MONEY SPLITTER
===================================================== */

function moneyHTML() {

    return `

        <div class="toolCard">

            <h2>
                💰 Money Splitter
            </h2>

            <br>

            <input
                id="moneyAmount"
                class="toolInput"
                type="number"
                placeholder="Total Amount">


            <input
                id="moneyPeople"
                class="toolInput"
                type="number"
                placeholder="Number of People">


            <button
                class="toolAction"
                onclick="splitMoney()">

                SPLIT MONEY

            </button>


            <div
                id="moneyResult"
                class="resultCard">

                <small>
                    Each Person Pays
                </small>

                <div
                    class="resultValue">

                    ₹0.00

                </div>

            </div>

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


    if (
        amount <= 0 ||
        people <= 0
    ) {

        alert(
            "Enter valid amount and people."
        );

        return;

    }


    const result =
        amount / people;


    document
        .getElementById(
            "moneyResult"
        )
        .innerHTML = `

            <small>
                Each Person Pays
            </small>

            <div class="resultValue">
                ₹${result.toFixed(2)}
            </div>

        `;


    addHistory(
        "Split ₹" + amount,
        result
    );

}



/* =====================================================
   CONVERTER
===================================================== */

function converterHTML() {

    return `

        <div class="toolCard">

            <div class="converterTabs">

                <button
                    class="converterTab active"
                    onclick="setConversion('length')">

                    Length

                </button>


                <button
                    class="converterTab"
                    onclick="setConversion('weight')">

                    Weight

                </button>


                <button
                    class="converterTab"
                    onclick="setConversion('volume')">

                    Volume

                </button>

            </div>


            <input
                id="convertValue"
                class="toolInput"
                type="number"
                value="5"
                placeholder="Enter value">


            <select
                id="convertFrom"
                class="toolSelect">

                <option value="km">
                    Kilometer
                </option>

                <option value="m">
                    Meter
                </option>

                <option value="cm">
                    Centimeter
                </option>

                <option value="mile">
                    Mile
                </option>

            </select>


            <select
                id="convertTo"
                class="toolSelect">

                <option value="m">
                    Meter
                </option>

                <option value="km">
                    Kilometer
                </option>

                <option value="cm">
                    Centimeter
                </option>

                <option value="mile">
                    Mile
                </option>

            </select>


            <button
                class="toolAction"
                onclick="convertUnit()">

                ⇄ CONVERT

            </button>


            <div
                id="convertResult"
                class="resultCard">

                <small>
                    Converted Result
                </small>

                <div class="resultValue">
                    5,000 m
                </div>

            </div>

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


    const from =
        document.getElementById(
            "convertFrom"
        ).value;


    const to =
        document.getElementById(
            "convertTo"
        ).value;


    const meterValues = {

        km: 1000,

        m: 1,

        cm: .01,

        mile: 1609.344

    };


    const result =
        value *
        meterValues[from] /
        meterValues[to];


    const names = {

        km: "km",

        m: "m",

        cm: "cm",

        mile: "mi"

    };


    document
        .getElementById(
            "convertResult"
        )
        .innerHTML = `

            <small>
                Converted Result
            </small>

            <div class="resultValue">

                ${Number(result.toFixed(6)).toLocaleString()}
                ${names[to]}

            </div>

        `;


    addHistory(
        value + " " + names[from],
        result + " " + names[to]
    );

}


function setConversion(type) {

    const from =
        document.getElementById(
            "convertFrom"
        );

    const to =
        document.getElementById(
            "convertTo"
        );


    if (type === "weight") {

        from.innerHTML = `

            <option value="kg">
                Kilogram
            </option>

            <option value="g">
                Gram
            </option>

            <option value="lb">
                Pound
            </option>

        `;


        to.innerHTML = `

            <option value="g">
                Gram
            </option>

            <option value="kg">
                Kilogram
            </option>

            <option value="lb">
                Pound
            </option>

        `;

    }
    else if (type === "volume") {

        from.innerHTML = `

            <option value="l">
                Liter
            </option>

            <option value="ml">
                Milliliter
            </option>

        `;


        to.innerHTML = `

            <option value="ml">
                Milliliter
            </option>

            <option value="l">
                Liter
            </option>

        `;

    }
    else {

        from.innerHTML = `

            <option value="km">
                Kilometer
            </option>

            <option value="m">
                Meter
            </option>

            <option value="cm">
                Centimeter
            </option>

            <option value="mile">
                Mile
            </option>

        `;


        to.innerHTML = `

            <option value="m">
                Meter
            </option>

            <option value="km">
                Kilometer
            </option>

            <option value="cm">
                Centimeter
            </option>

            <option value="mile">
                Mile
            </option>

        `;

    }

}



/* =====================================================
   AGE CALCULATOR
===================================================== */

function ageHTML() {

    return `

        <div class="toolCard">

            <h2>
                📅 Age Calculator
            </h2>

            <br>

            <input
                id="birthDate"
                class="toolInput"
                type="date">


            <button
                class="toolAction"
                onclick="calculateAge()">

                CALCULATE AGE

            </button>


            <div
                id="ageResult"
                class="resultCard">

                <small>
                    Your Age
                </small>

                <div
                    class="resultValue">

                    -- Years

                </div>

            </div>

        </div>

    `;

}


function calculateAge() {

    const value =
        document.getElementById(
            "birthDate"
        ).value;


    if (!value) {

        alert(
            "Select your date of birth."
        );

        return;

    }


    const birth =
        new Date(value);

    const today =
        new Date();


    let age =
        today.getFullYear()
        -
        birth.getFullYear();


    const month =
        today.getMonth()
        -
        birth.getMonth();


    if (
        month < 0 ||
        (
            month === 0 &&
            today.getDate()
            <
            birth.getDate()
        )
    ) {

        age--;

    }


    document
        .getElementById(
            "ageResult"
        )
        .innerHTML = `

            <small>
                Your Age
            </small>

            <div class="resultValue">
                ${age} Years
            </div>

        `;

}



/* =====================================================
   BILL CALCULATOR
===================================================== */

function billsHTML() {

    return `

        <div class="toolCard">

            <h2>
                🧾 Bill Calculator
            </h2>

            <br>

            <input
                id="billAmount"
                class="toolInput"
                type="number"
                placeholder="Bill Amount">


            <input
                id="billGST"
                class="toolInput"
                type="number"
                value="18"
                placeholder="GST %">


            <button
                class="toolAction"
                onclick="calculateBill()">

                CALCULATE BILL

            </button>


            <div
                id="billResult"
                class="resultCard">

                <small>
                    Total Amount
                </small>

                <div
                    class="resultValue">

                    ₹0.00

                </div>

            </div>

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


    if (amount <= 0) {

        alert(
            "Enter bill amount."
        );

        return;

    }


    const gstAmount =
        amount * gst / 100;


    const total =
        amount + gstAmount;


    document
        .getElementById(
            "billResult"
        )
        .innerHTML = `

            <small>
                Total Amount
            </small>

            <div class="resultValue">
                ₹${total.toFixed(2)}
            </div>

            <p style="
                color:#858799;
                margin-top:8px;
                font-size:11px">

                GST:
                ₹${gstAmount.toFixed(2)}

            </p>

        `;


    addHistory(
        "Bill + " + gst + "% GST",
        total
    );

}



/* =====================================================
   DAILY TOOLS
===================================================== */

function dailyHTML() {

    return `

        <div class="toolCard">

            <h2>
                🧰 Daily Utilities
            </h2>

            <br>


            <div class="quickGrid">


                <button
                    class="quickCard"
                    onclick="startTimer()">

                    <div class="quickCardIcon">
                        ⏱
                    </div>

                    Timer

                </button>


                <button
                    class="quickCard"
                    onclick="randomNumber()">

                    <div class="quickCardIcon">
                        🎲
                    </div>

                    Random Number

                </button>


                <button
                    class="quickCard"
                    onclick="showDate()">

                    <div class="quickCardIcon">
                        📅
                    </div>

                    Today

                </button>


                <button
                    class="quickCard"
                    onclick="showTime()">

                    <div class="quickCardIcon">
                        🕐
                    </div>

                    Current Time

                </button>

            </div>


            <div
                id="dailyResult"
                class="resultCard">

                <small>
                    Result
                </small>

                <div
                    class="resultValue">

                    Ready

                </div>

            </div>

        </div>

    `;

}


function randomNumber() {

    const number =
        Math.floor(
            Math.random() * 100
        ) + 1;


    showDailyResult(
        number
    );

}


function showDate() {

    showDailyResult(
        new Date()
        .toLocaleDateString()
    );

}


function showTime() {

    showDailyResult(
        new Date()
        .toLocaleTimeString()
    );

}


function showDailyResult(value) {

    document
        .getElementById(
            "dailyResult"
        )
        .innerHTML = `

            <small>
                Result
            </small>

            <div class="resultValue">
                ${value}
            </div>

        `;

}


function startTimer() {

    let seconds = 10;

    showDailyResult(
        seconds
    );


    const timer =
        setInterval(() => {

            seconds--;


            showDailyResult(
                seconds
            );


            if (
                seconds <= 0
            ) {

                clearInterval(timer);

                showDailyResult(
                    "Done!"
                );

            }

        }, 1000);

}



/* =====================================================
   SECURITY
===================================================== */

function securityHTML() {

    return `

        <div class="toolCard">

            <h2>
                🛡 Secure Password
            </h2>

            <br>

            <input
                id="passwordLength"
                class="toolInput"
                type="number"
                value="16"
                min="6"
                max="64"
                placeholder="Password length">


            <button
                class="toolAction"
                onclick="generatePassword()">

                GENERATE PASSWORD

            </button>


            <div
                id="passwordResult"
                class="resultCard">

                <small>
                    Secure Password
                </small>

                <div
                    id="generatedPassword"
                    class="resultValue"
                    style="
                        font-size:18px;
                        word-break:break-all">

                    ••••••••••••

                </div>

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
        "0123456789" +
        "!@#$%^&*";


    let password = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        password +=
            chars[
                Math.floor(
                    Math.random()
                    *
                    chars.length
                )
            ];

    }


    document
        .getElementById(
            "generatedPassword"
        )
        .textContent =
        password;

}



/* =====================================================
   QR
===================================================== */

function qrHTML() {

    return `

        <div class="toolCard">

            <h2>
                ▦ QR Scanner
            </h2>

            <br>

            <div class="resultCard">

                <div style="
                    font-size:70px">

                    ▦

                </div>

                <p style="
                    color:#858799;
                    margin-top:10px">

                    Camera scanner ready

                </p>

            </div>

            <br>

            <button
                class="toolAction"
                onclick="startQR()">

                OPEN CAMERA

            </button>

            <br><br>

            <button
                class="toolAction"
                onclick="generateQRText()">

                GENERATE QR

            </button>

        </div>

    `;

}


function startQR() {

    alert(
        "Camera permission will be requested when the QR scanner module is connected."
    );

}


function generateQRText() {

    const text =
        prompt(
            "Enter text for QR:"
        );


    if (text) {

        alert(
            "QR Generator ready for: "
            + text
        );

    }

}



/* =====================================================
   NOTES
===================================================== */

function notesHTML() {

    const savedNote =
        localStorage.getItem(
            "leoToolsNote"
        ) || "";


    return `

        <div class="toolCard">

            <h2>
                📝 Quick Notes
            </h2>

            <br>

            <textarea
                id="noteText"
                class="toolTextarea"
                placeholder="Write your note here...">${savedNote}</textarea>

            <br><br>

            <button
                class="toolAction"
                onclick="saveNote()">

                SAVE NOTE

            </button>

        </div>

    `;

}


function saveNote() {

    const note =
        document.getElementById(
            "noteText"
        ).value;


    localStorage.setItem(
        "leoToolsNote",
        note
    );


    alert(
        "Note saved successfully! ✓"
    );

}



/* =====================================================
   HISTORY
===================================================== */

function addHistory(
    name,
    result
) {

    historyData.unshift({

        name: name,

        result: result,

        time:
            new Date()
            .toLocaleTimeString()

    });


    historyData =
        historyData.slice(
            0,
            50
        );


    localStorage.setItem(
        "leoToolsHistory",
        JSON.stringify(
            historyData
        )
    );

}



/* =====================================================
   BOTTOM NAV
===================================================== */

function changePage(
    page,
    element
) {

    document
        .querySelectorAll(
            ".bottomItem"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    element.classList.add(
        "active"
    );


    const grid =
        document.getElementById(
            "toolGrid"
        );


    const hero =
        document.querySelector(
            ".heroCard"
        );


    const info =
        document.querySelector(
            ".infoStrip"
        );


    if (page === "home") {

        grid.style.display =
            "grid";

        hero.style.display =
            "block";

        info.style.display =
            "block";

        return;

    }


    hero.style.display =
        "none";

    info.style.display =
        "none";


    if (page === "tools") {

        grid.style.display =
            "grid";

        return;

    }


    grid.style.display =
        "none";


    if (page === "history") {

        showHistory();

    }


    if (page === "favorites") {

        showFavorites();

    }

}



/* =====================================================
   HISTORY PAGE
===================================================== */

function showHistory() {

    const page =
        document.getElementById(
            "pageContent"
        );


    page.innerHTML = `

        <div class="toolCard"
             style="margin:20px">

            <h2>
                🕘 History
            </h2>

            <br>

            ${
                historyData.length
                ?
                historyData.map(
                    item => `

                    <div style="
                        padding:14px 0;
                        border-bottom:
                        1px solid #222437">

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        <small style="
                            color:#35ff72">

                            ${item.result}

                        </small>

                        <small style="
                            float:right;
                            color:#77798a">

                            ${item.time}

                        </small>

                    </div>

                `
                ).join("")
                :
                `
                    <p style="
                        color:#858799">

                        No history yet.

                    </p>
                `
            }

        </div>

    `;

}



/* =====================================================
   FAVORITES
===================================================== */

function showFavorites() {

    const page =
        document.getElementById(
            "pageContent"
        );


    page.innerHTML = `

        <div class="toolCard"
             style="margin:20px">

            <h2>
                ⭐ Favorites
            </h2>

            <br>

            <p style="
                color:#858799">

                Favorite tools will
                appear here.

            </p>

        </div>

    `;

}



/* =====================================================
   SEARCH
===================================================== */

function searchTools() {

    const value =
        document.getElementById(
            "searchInput"
        ).value
        .toLowerCase();


    document
        .querySelectorAll(
            ".homeTool"
        )
        .forEach(tool => {

            const name =
                tool.dataset.name
                .toLowerCase();


            if (
                name.includes(value)
            ) {

                tool.style.display =
                    "";

            }
            else {

                tool.style.display =
                    "none";

            }

        });

}



/* =====================================================
   QUICK TOOLS
===================================================== */

function openQuickTools() {

    openTool("daily");

}



/* =====================================================
   VOICE SEARCH
===================================================== */

function voiceSearch() {

    if (
        !("webkitSpeechRecognition"
        in window)
    ) {

        alert(
            "Voice search is not supported in this browser."
        );

        return;

    }


    const recognition =
        new webkitSpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.start();


    recognition.onresult =
        function(event) {

            const text =
                event.results[0][0]
                .transcript;


            document
                .getElementById(
                    "searchInput"
                )
                .value =
                text;


            searchTools();

        };

}



/* =====================================================
   PREMIUM
===================================================== */

function showPremium() {

    alert(
        "👑 LeoTools Premium\n\n" +
        "100+ Tools\n" +
        "No Ads\n" +
        "Advanced Tools\n" +
        "Premium Themes\n" +
        "Cloud Backup"
    );

}



/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            currentTool
        ) {

            closeTool();

        }

    }
);
