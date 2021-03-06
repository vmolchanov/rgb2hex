const MIN_COLOR = 0;
const MAX_COLOR = 255;

const colors = document.querySelectorAll('.color');
const resultLink = document.querySelector('.result__link');

resultLink.addEventListener('click', (e) => {
    const output = e.currentTarget.querySelector('.result__output');
    navigator.clipboard.writeText(output.textContent);
    alert('Цвет скопирован в буфер обмена');
});

[...colors].forEach((color) => {
    const select = color.querySelector('.color__value');
    const visual = color.querySelector('.color__visual');

    for (let value = MIN_COLOR; value <= MAX_COLOR; value++) {
        select.innerHTML += `<option value="${value}">${value}</option>`;
    }

    visual.style.backgroundColor = `#000000`;
    setResultOutput(0, 0, 0);
    setResultVisual(0, 0, 0);

    select.addEventListener('change', (e) => {
        const target = e.target;
        const value = target.value;

        switch (target.id) {
            case 'red':
                visual.style.backgroundColor = `rgb(${value}, 0, 0)`;
                break;
            case 'green':
                visual.style.backgroundColor = `rgb(0, ${value}, 0)`;
                break;
            case 'blue':
                visual.style.backgroundColor = `rgb(0, 0, ${value})`;
                break;
        }

        const {r, g, b} = getColors();
        setResultOutput(r, g, b);
        setResultVisual(r, g, b);
    });
});

function getColors() {
    const r = document.querySelector('#red').value;
    const g = document.querySelector('#green').value;
    const b = document.querySelector('#blue').value;
    
    return {r, g, b};
}

function decToHex(dec) {
    const hex = Number(dec).toString(16);
    return hex.length === 1 ?
        `0${hex}` :
        hex;
}

function rgbToHex(r, g, b) {
    return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`;
}

function setResultOutput(r, g, b) {
    const output = document.querySelector('.result__output');
    output.textContent = `${rgbToHex(r, g, b)}`;
}

function setResultVisual(r, g, b) {
    const visual = document.querySelector('.result__visual');
    visual.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}