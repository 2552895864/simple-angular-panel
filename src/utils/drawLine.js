import getAngle from './getAngle.js';
import makePoint from './makePoint.js';
import makePrompt from './makePrompt.js';

export default function drawLine(ele,circle,container){
    var x1 = ele.offsetLeft;
    var y1 = ele.offsetTop;
    var x2 = circle.x;
    var y2 = circle.y;
    var width = Math.sqrt(Math.pow(Math.abs(x2-x1),2)+Math.pow(Math.abs(y2-y1),2));
    var rotate = -getAngle(x1,-y1,x2,-y2);
    var line = document.createElement('div');
    line.classList.add('line');
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${width}px`;
    line.style.transform = `translate3d(0, -50%, 0) rotate(${rotate}rad)`;
    container.appendChild(line);
    makePoint(x2, y2, container);
    makePrompt(x2, y2, container, x2 - x1 ? false : true);
}