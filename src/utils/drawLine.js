export default function drawLine(ele,circle,container){
    var x1 = ele.offsetLeft;
    var y1 = ele.offsetTop;
    var x2 = circle.x;
    var y2 = circle.y;
    var width = Math.sqrt(Math.pow(Math.abs(x2-x1),2)+Math.pow(Math.abs(y2-y1),2));
    var rotate = -getAngle(x1,-y1,x2,-y2);
    var line = document.createElement('div');
    var point = document.createElement('div');
    point.classList.add('point');
    line.classList.add('line');
    point.style.width = '4px';
    point.style.height = '4px';
    point.style.left = `${x2}px`;
    point.style.top = `${y2}px`;
    point.style.backgroundColor = 'rgb(211, 169, 104)';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${width}px`;
    line.style.transform = `rotate(${rotate}rad)`;
    container.appendChild(line);
    container.appendChild(point);
}

function getAngle(x1,y1,x2,y2){
    var xx = x2 - x1;
    var yy = y2 - y1;
    var angle = 0;
    if(xx == 0){
        angle = Math.PI / 2;
    }else if(yy == 0){
        if(xx >= 0){
            angle = 0;
        }else{
            angle = Math.PI;
        }
    }else{
        angle = Math.atan(Math.abs(yy / xx));
    }
    if(xx < 0 && yy > 0){
        angle = Math.PI - angle;
    }else if (xx < 0 && yy < 0){
        angle = Math.PI + angle;
    }else if(xx > 0 && yy < 0){
        angle = 2 * Math.PI - angle;
    }
    return angle;
}