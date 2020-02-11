export default function makePrompt(x, y, name, live, host, container, isLeft){
    var textBox = document.createElement('div');
    var nameBox = document.createElement('div');
    var countBox = document.createElement('div');
    var length = String(name + live + host).length;
    textBox.classList.add('text-box');
    nameBox.classList.add('name-box');
    countBox.classList.add('count-box');
    console.log(length);
    textBox.style.width = `${length}rem`;
    textBox.style.left = `${x}px`;
    textBox.style.top = `${y}px`;
    textBox.style.transform = `translate3d(${isLeft ? '-100%' : 0}, -50%, 0)`;
    console.log(textBox.style);
    nameBox.innerText = name;
    countBox.innerText = `${live} / ${host}`;
    textBox.appendChild(nameBox);
    textBox.appendChild(countBox);
    container.appendChild(textBox);
}