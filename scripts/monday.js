const buttons = document.querySelectorAll("#problem-container button");
const defaultGifIndex = 0;
let problemsData = [];

fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
        problemsData = data;
        loadProblem(defaultGifIndex);
    });

function loadProblem(index) {
    if (!problemsData[index]) return;

    const data = problemsData[index];
    const header = document.getElementById("heading-container");
    const valid = document.querySelector("#valid-container ul");
    const constraint = document.querySelector("#constraint-container ul");
    const codeContainer = document.getElementById("code-container");

    header.innerHTML = "";
    valid.innerHTML = "";
    constraint.innerHTML = "";
    codeContainer.innerHTML = "";

    header.innerHTML = `
        <a href="${data.link}" target="_blank">
            <h2>
                ${data.number} <span id="link">${data.title}</span><span style="font-size: 16px; margin-left: 16px">${data.site}</span>
            </h2>
        </a>
        <p>
            ${data.description}
        </p>
    `;

    data.rules.forEach((rule) => {
        const li = document.createElement("li");
        li.textContent = rule;
        valid.appendChild(li);
    });

    data.constraints.forEach((constraints) => {
        const li = document.createElement("li");
        li.textContent = constraints;
        constraint.appendChild(li);
    });

    data.examples.forEach((example, index) => {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = `Input: ${example.input}\nOutput: ${example.output}`;
        pre.appendChild(code);
        codeContainer.appendChild(pre);

        if (index !== data.examples.length - 1) {
            codeContainer.appendChild(document.createElement("br"));
        }
    });
}

buttons.forEach((button, index) => {
    const images = button.querySelectorAll("img");
    const staticImg = images[0];
    const gifImg = images[1];

    if (index === defaultGifIndex) {
        staticImg.style.display = "none";
        gifImg.style.display = "block";
    } else {
        gifImg.style.display = "none";
        staticImg.style.display = "block";
    }

    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            const imgs = btn.querySelectorAll("img");
            imgs[0].style.display = "block";
            imgs[1].style.display = "none";
        });

        staticImg.style.display = "none";
        gifImg.style.display = "block";

        loadProblem(index);
    });
});
