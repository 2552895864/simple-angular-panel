export default function getAngle(x1,y1,x2,y2){
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