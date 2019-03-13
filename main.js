var yyy = document.getElementById('xxx')
var context=yyy.getContext('2d')
var using=false
var eraserEnabled =false
    pen.onclick=function(){
        eraserEnabled=false
        pen.classList.add('active')
        eraser.classList.remove('active')
    }
    eraser.onclick=function(){
        eraserEnabled=true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }
    red.onclick=function(){
        context.fillStyle = 'red'
        context.stroke = 'red'
    }
    green.onclick=function(){
        context.fillStyle = 'green'
        context.strokeStyle='green'
    }
    blue.onclick=function(){
        context.fillStyle = 'blue'
        context.strokeStyle='blue'
    }

var lastPoint={x:undefined,y:undefined}
autoSetCanvasSize(yyy);
//
function autoSetCanvasSize(canvas){
setCanvasSize()
window.onresize=function(){
    
}
//封装一个自动获取页面宽高
    function setCanvasSize(){
        var pageWidth =
        document.documentElement.clientWidth
        var pageHeight = 
        document.documentElement.clientHeight
        canvas.width= pageWidth
        canvas.height= pageHeight
    }
}

//判断设备
if (document.body.ontouchstart !==undefined) {
    //触屏设备
    yyy.ontouchstart=function(event){
        var x =event.touches[0].clientX
        var y =event.touches[0].clientY
        using=true
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }
        else{
            lastPoint = {x:x,y:y}
            drawCircle(x,y,1)
        }
    }

    yyy.ontouchmove=function(event){
        var x=event.touches[0].clientX
        var y=event.touches[0].clientY
    
        if (eraserEnabled) {
        if(using){
            context.clearRect(x,y,10,10)
        }
        } else {
            if(using){
                var newPoint={"x":x,"y":y}
                drawLine(lastPoint.x ,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint=newPoint
            } 
        }
        // console.log(eraserEnabled)
        // console.log(using)
    }
    yyy.ontouchend=function(){
        using=false
    }
} else {
    //非触屏设备
        yyy.onmousedown=function(event){
        var x =event.clientX
        var y =event.clientY
        using=true
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }
        else{
            lastPoint = {x:x,y:y}
            drawCircle(x,y,1)
        }
    }

    yyy.onmousemove=function(event){
        var x=event.clientX
        var y=event.clientY
    
        if (eraserEnabled) {
        if(using){
            context.clearRect(x,y,10,10)
        }
        } else {
            if(using){
                var newPoint={"x":x,"y":y}
                drawLine(lastPoint.x ,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint=newPoint
            } 
        }
        // console.log(eraserEnabled)
        // console.log(using)
    }
    yyy.onmouseup=function(){
        using=false
    }
}



//画圆
function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}
//画直线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1)
    context.lineWidth=5
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}
// var eraserEnabled =false
// eraser.onclick = function(){
//     actions.className ='actions x' 
//     eraserEnabled=true
// }
// brush.onclick=function(){
//     actions.className='actions'
//     eraserEnabled=false
// }