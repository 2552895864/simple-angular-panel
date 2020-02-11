export default function makePrompt(x, y, container){
    var textBox = document.createElement('div');
    point.classList.add('text-box');
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    container.appendChild(textBox);
}