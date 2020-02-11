export default function makePoint(x, y, container){
    var point = document.createElement('div');
    point.classList.add('point');
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    container.appendChild(point);
}