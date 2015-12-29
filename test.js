function start() {
    var body = document.body;
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', 3000);
    canvas.setAttribute('height', 2000);
    canvas.style.width = '3000px';
    canvas.style.height = '2000px';
    
    var ctx = canvas.getContext("2d");
    for (var i=0 ; i < 1000 ; i++) {
        ctx.fillStyle = "rgb(" + Math.floor(256 * Math.random()) + "," + Math.floor(256 * Math.random()) + "," + Math.floor(256 * Math.random()) + ")";
        ctx.fillRect(Math.random() * 3000, Math.random() * 2000, 30, 30);
    }

    var keys = {};
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
        }
    );

    var paint = function() {
        if (keys[39]) {
            body.scrollLeft += 5;
        }
        if (keys[40]) {
            body.scrollTop += 5;
        }
        requestAnimationFrame(paint);
    };

    paint();
}
