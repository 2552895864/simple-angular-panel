export default function makePrompt(x, y, name, live, host, container, isLeft){
    var textBox = document.createElement('div');
    var nameBox = document.createElement('div');
    var countBox = document.createElement('div');
    textBox.classList.add('text-box');
    nameBox.classList.add('name-box');
    countBox.classList.add('count-box');
    textBox.style.left = `${x}px`;
    textBox.style.top = `${y}px`;
    textBox.style.transform = `translate3d(calc(${isLeft? -100 : 0}% + ${isLeft ? -2 : 2}rem), -50%, 0)`;
    nameBox.innerText = name;
    countBox.innerText = `${live} / ${host}`;
    textBox.appendChild(nameBox);
    textBox.appendChild(countBox);
    container.appendChild(textBox);
}