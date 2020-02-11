export default function makePrompt(x, y, container, isLeft){
    var textBox = document.createElement('div');
    textBox.classList.add('text-box');
    textBox.style.left = `${x}px`;
    textBox.style.top = `${y}px`;
    textBox.style.transform = `translate3d(calc(${isLeft? -100 : 0}% + ${isLeft ? -2 : 2}rem), -50%, 0)`;
    container.appendChild(textBox);
}