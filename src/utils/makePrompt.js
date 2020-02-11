export default function makePrompt(x, y, name, live, host, container, isLeft){
    var textBox = document.createElement('div');
    var nameBox = document.createElement('div');
    var countBox = document.createElement('div');
    var length = String(name + live + host).length;
    var reduceFac = Math.round((length - 7) / 7);
    length = length * (1 - 0.1 * reduceFac);
    textBox.classList.add('text-box');
    nameBox.classList.add('name-box');
    countBox.classList.add('count-box');
    textBox.style.width = `${length}rem`;
    textBox.style.left = `${x}px`;
    textBox.style.top = `${y}px`;
    textBox.style.transform = `translate3d(${isLeft ? '-100%' : 0}, -50%, 0)`;
    nameBox.innerText = name;
    countBox.innerText = `${live} / ${host}`;
    textBox.appendChild(nameBox);
    textBox.appendChild(countBox);
    container.appendChild(textBox);
}