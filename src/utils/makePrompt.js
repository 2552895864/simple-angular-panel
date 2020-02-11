export default function makePrompt(x, y, container){
    var textBox = document.createElement('div');
    textBox.classList.add('text-box');
    textBox.style.left = `${x}px`;
    textBox.style.top = `${y}px`;
    container.appendChild(textBox);
}