var W,H;
var ctx,canvas;
var X = 0;
var Y = 400;
var ep = 50;
var j = 0;
var keys = [];
var metampsy = 0;
var imgFond = new Image();
imgFond.src = "images/fond.png";
var imgFeu = new Image();
imgFeu.src = "images/feu.png";
var imgBalle = new Image();
imgBalle.src = "images/psychosBalle.png";
var imgPancarte = new Image();
imgPancarte.src = "images/pancarte.png";
var imgFeuX = 70;
var imgFeuY = 35;
var imgBalleX = 35;
var imgBalleY = 35;
var cible;
var filin = 0.05;
var filinVit = 0.002;
var mort = 0;
var vj;
var trans = 0;
var laserPsy = -10;

imgFond.onload = function (){
    console.log("Ah");
};

function Bombe() {
    this.saut = 0;
    this.vit = 3;
    this.img = "bombe";
    this.sx = 35;
    this.sy = 40;
    this.capa = "explode";
    this.IA = "wait";
    this.att = [];
    this.res = [3];
    this.explode = 0;
}

function MageFeu() {
    this.saut = 0;
    this.vit = 3;
    this.img = "F";
    this.sx = 52;
    this.sy = 91;
    this.capa = "feu";
    this.IA = "spamFeu";
    this.att = [];
    this.res = [];
    this.spam = 500;
}

function Boule() {
    this.saut = 27;
    this.vit = 3;
    this.img = "boule";
    this.sx = 63;
    this.sy = 63;
    this.capa = "instable";
    this.inertie = 0;
    this.r = 0;
    this.IA = "wait";
    this.att = [2,1];
    this.res = [];
}

function Champique(){
    this.saut = 0;
    this.vit = 3;
    this.img = "champique";
    this.sx = 62;
    this.sy = 43;
    this.capa = "";
    this.IA = "allerRetour";
    this.att = [4];
    this.res = [1,2,4];
}

function Champi(){
    this.saut = 0;
    this.vit = 3;
    this.img = "champi";
    this.sx = 50;
    this.sy = 48;
    this.capa = "";
    this.IA = "allerRetour";
    this.att = [1];
    this.res = [];
}

function Jumper(){
    this.saut = 20;
    this.vit = 0;
    this.img = "jumper";
    this.sx = 60;
    this.sy = 56;
    this.capa = "";
    this.IA = "simpleJump";
    this.att = [2,4];
    this.res = [1,2,3,4,5,6,7,9];
}

function Psychos() {
    this.saut = 0;
    this.vit = 0;
    this.img = "psychos";
    this.sx = 46;
    this.sy = 40;
    this.capa = "laserPsy";
    this.IA = "tirer";
    this.att = [8];
    this.res = [8];
}

function Boxe(){
    this.saut = 0;
    this.vit = 0;
    this.img = "boxe";
    this.sx = 50;
    this.sy = 50;
    this.capa = "antipsy";
    this.IA = "wait";
    this.att = [1];
    this.res = [1,2,3,4,5,6,7,8,9];
}

function MageElectro(){
    this.saut = 0;
    this.vit = 15;
    this.img = "E";
    this.sx = 57;
    this.sy = 91;
    this.capa = "courseLongue";
    this.IA = "wait";
    this.att = [7];
    this.res = [7];

}

function Carnivore() {
    this.saut = 0;
    this.vit = 0;
    this.img = "carnivore";
    this.sx = 57;
    this.sy = 66;
    this.capa = "feu";
    this.IA = "spamFeu";
    this.att = [7];
    this.res = [1,4,5,6,7,8,9];
    this.spam = 500;
}

function Esprit() {
    this.saut = 5;
    this.vit = 6;
    this.img = "fantome";
    this.sx = 32;
    this.sy = 67;
    this.capa = "immateriel";
    this.IA = "maintien";
    this.att = [];
    this.res = [];
    this.spam = 80;
}

function Interrupteur(){
    this.saut = 0;
    this.vit = 0;
    this.img = "inter";
    this.sx = 57;
    this.sy = 59;
    this.capa = "interrupteur";
    this.IA = "wait";
    this.att = [];
    this.res = [1,3,4,5,6,7,8,9];
    this.mode = 0;
}

var element = {"feu":[],"balle":[],"panneau":[]};

// niveau

var limite = 2000;
var niveau = [[1900+ep,250,500,ep],[2400,0,ep,250+ep],[2400,249+ep,ep,250+ep],[1700+ep,500+ep,700,ep],[1250,250,250,ep],[1250,100,ep,150],[900,250,300,ep],[800,450,100,ep],[900,650,100,ep],[800,850,100,ep],[900,1050,100,ep],[200,1250,700,ep],[200,850,550,ep],[100,250,100,ep],[0,450,100,ep],[100,650,100,ep],[0,850,100,ep],[100,1050,100,ep],[0-ep,100,ep+1,1150+ep],[0-ep,1250+ep,300,ep],[1200,1050,1000,ep],[1200,750,ep,300],[-300,1500,600,ep*3]];

element.balle = [[1700,500],[133,215],[1300,1400]];
var balles = 2;
element.panneau = [[2000,500+ep,"Les deux mages doivent parvenir en bas en prenant le mage vert au passage."]];

var actor = [{"x":2000,"y":100,"vx":0,"vy":0,"g":0,"saut":0,"moves":new MageFeu,"img":new Image()},
             {"x":2300,"y":100,"vx":0,"vy":0,"g":0,"saut":0,"moves":new MageElectro,"img":new Image()},
             {"x":1100,"y":100,"vx":0,"vy":0,"g":0,"saut":0,"moves":new Boule,"img":new Image()},
             {"x":2300,"y":550,"vx":0,"vy":0,"g":0,"saut":0,"moves":new Interrupteur,"img":new Image(),"plate":[1499,250,402+ep,ep]},
             {"x":500,"y":300,"vx":0,"vy":0,"g":0,"saut":0,"moves":new Psychos,"img":new Image()},
             {"x":1300,"y":1000,"vx":0,"vy":0,"g":0,"saut":0,"moves":new Carnivore,"img":new Image()},
             {"x":-250,"y":2000,"vx":0,"vy":0,"g":0,"saut":0,"moves":new Esprit,"img":new Image()}];
actor[3].moves.res = [1,4,5,6,7,8,9];
// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function tombe(n){
    if (actor[n].moves.capa == "interrupteur")return false;
    if (actor[n].moves.capa == "immateriel")return true;
    var sautG = 0.2;
    niveau.forEach(
        function(c) {
            if (c[1] < actor[n].y - actor[n].moves.sy && c[1] + c[3] > actor[n].y - actor[n].moves.sy && c[0] < actor[n].x && c[0] + c[2] > actor[n].x){
                if (actor[n].g < 0) actor[n].g = 0;
                actor[n].y = c[1] + c[3] + 1 + actor[n].moves.sy;
            }
            if (c[1] < actor[n].y && c[1] + c[3] > actor[n].y && c[0] < actor[n].x && c[0] + c[2] > actor[n].x){
                if (actor[n].g > 0) actor[n].g = 0;
                actor[n].y = c[1];
                if (actor[n].saut != 0 && actor[n].g == 0)actor[n].saut -= 1;
                sautG = 0;
                return;
            }
        }
    );
    if (actor[n].moves.capa == "instable"){
        if (actor[n].moves.inertie > 0)actor[n].moves.r += sautG;
        if (actor[n].moves.inertie < 0)actor[n].moves.r -= sautG;
        if (actor[n].moves.r < Math.PI)actor[n].moves.r += 2*Math.PI;
        if (actor[n].moves.r > Math.PI)actor[n].moves.r -= 2*Math.PI;
    }
    return true;
}

function droite(n){
    if (actor[n].moves.capa == "immateriel")return;
    niveau.forEach(
        function(c) {
            if (c[1] - 1 < actor[n].y - actor[n].moves.sy / 2 && c[1] + c[3] > actor[n].y - actor[n].moves.sy / 2 && c[0] < actor[n].x + actor[n].moves.sx / 2 && c[0] + c[2] > actor[n].x + actor[n].moves.sx / 2){
                actor[n].x = c[0] - 1 - actor[n].moves.sx / 2;
                if (actor[n].moves.capa == "courseLongue") actor[n].vx = 0;
                if (actor[n].moves.capa == "instable") actor[n].moves.inertie = 0;
            }
        }
    );
}

function gauche(n){
    if (actor[n].moves.capa == "immateriel")return;
    niveau.forEach(
        function(c) {
            if  (c[1] - 1 < actor[n].y - actor[n].moves.sy / 2 && c[1] + c[3] > actor[n].y - actor[n].moves.sy / 2 && c[0] < actor[n].x - actor[n].moves.sx / 2 && c[0] + c[2] > actor[n].x - actor[n].moves.sx / 2){
                actor[n].x = c[0] + c[2] + 1 + actor[n].moves.sx / 2;
                if (actor[n].moves.capa == "courseLongue") actor[n].vx = 0;
                if (actor[n].moves.capa == "instable") actor[n].moves.inertie = 0;
            }
        }
    );
}

function moveRight(n){
    actor[n].vx += actor[n].moves.vit;
    if (actor[n].moves.capa == "courseLongue") actor[n].vx = actor[n].moves.vit;
    if (actor[n].moves.capa == "instable"){
        actor[n].moves.inertie += 0.1;
        actor[n].moves.r += actor[n].moves.vit / actor[n].moves.sy;
        if (actor[n].moves.r > Math.PI)actor[n].moves.r -= 2*Math.PI;
    }

}

function moveLeft(n){
    actor[n].vx -= actor[n].moves.vit;
    if (actor[n].moves.capa == "courseLongue") actor[n].vx = -1 * actor[n].moves.vit;
    if (actor[n].moves.capa == "instable"){
        actor[n].moves.inertie -= 0.1;
        actor[n].moves.r -= actor[n].moves.vit / actor[n].moves.sy;
        if (actor[n].moves.r < Math.PI)actor[n].moves.r += 2*Math.PI;
    }
}

function proche(){
    var dist = 600;
    var truc = j;
    for (var i = 0;i < actor.length;i++){
        if (Math.hypot(actor[i].x-actor[j].x , actor[i].y-actor[j].y) < dist && Math.hypot(actor[i].x-actor[j].x , actor[i].y-actor[j].y) != 0 && actor[i].moves.capa != "antipsy" && actor[i].moves.capa != "interrupteur"){dist = Math.hypot(actor[i].x-actor[j].x , actor[i].y-actor[j].y);truc = i;}
    }
    return truc;
}

function IA(i){
    if (actor[i].moves.IA == "simpleJump") {
        if (actor[i].g == 1 && actor[i].saut == 0){
            actor[i].g = -1 * actor[i].moves.saut;
            actor[i].saut = 2;
        }
    }
    else if (actor[i].moves.IA == "spamFeu") {
        if (actor[i].moves.spam > 500){
            actor[i].moves.spam = 0;
            element.feu.push([actor[i].x,actor[i].y - actor[i].moves.sy / 2,10]);
        }
    }
    else if (actor[i].moves.IA == "maintien") {
        if (actor[i].moves.spam > 100){
            actor[i].moves.spam = 0;
            actor[i].g = -1 * actor[i].moves.saut;
        }
    }
    else if (actor[i].moves.IA == "tirer" && actor[i].moves.capa == "laserPsy") {
        if (Math.abs(actor[i].x - actor[j].x) < actor[i].moves.sx / 2 + actor[j].moves.sx / 2 + 150 && Math.abs(actor[i].y - actor[i].moves.sy / 2 - (actor[j].y - actor[j].moves.sy / 2)) < actor[i].moves.sy / 2 + actor[j].moves.sy / 2 + 150){
            laserPsy = i;
            coup(j,8);
        }
    }
    contact(i,j);
}

function transfert(){
    balles -= 1;
    keys[96] = 0;
    vj = proche();
    if (vj == j) return;
    trans = 1;
}

function death(){
    mort = 1;
    actor[j].g = 10;
}

function coup(n,att){
    if (actor[n].moves.res.indexOf(att) == -1){
        if (actor[n].moves.capa != "explode" && actor[n].moves.capa != "interrupteur"){
            if (j == n)death();
            else {
                actor.splice(n,1);
                if (j > n) j -= 1;
            }
        }
        else if (actor[n].moves.capa == "interrupteur"){
            actor[n].moves.mode += 1;
            if (actor[n].moves.mode == 1)niveau.push(actor[n].plate);
            else {
                actor[n].moves.mode = 0;
                niveau.splice(niveau.indexOf(actor[n].plate),1);
            }
        }
        else {actor[n].img.src = "images/" + actor[n].moves.img + "2.png";actor[n].moves.explode = 1;}
    }
}

function contact(i,k){
    var array = actor[i].moves.att;
    if (array.length != 0){
        if (array.indexOf(2) != -1 && actor[i].x > actor[k].x - actor[k].moves.sx / 2 && actor[i].x < actor[k].x + actor[k].moves.sx / 2 && actor[i].y > actor[k].y - actor[k].moves.sy && actor[i].y < actor[k].y - actor[k].moves.sy / 2){
            coup(k,2);
        }
        else {
            if (Math.abs(actor[i].x - actor[k].x) < actor[i].moves.sx / 2 + actor[k].moves.sx / 2 && Math.abs(actor[i].y - actor[i].moves.sy / 2 - (actor[k].y - actor[k].moves.sy / 2)) < actor[i].moves.sy / 2 + actor[k].moves.sy / 2) coup(k,array[array.length - 1]);
        }
    }
}

function action(){
    element.panneau.forEach(
        function(e,index) {
            if (Math.hypot(actor[j].x - e[0],actor[j].y - e[1]) < 20){
                alert (e[2]);
                element.panneau.splice(index,1);
                actor[j].vx = 0;
            }
        }
    );
    if (actor[j].moves.capa == "immateriel")  actor[j].g = -1 * actor[j].moves.saut;
    if (actor[j].moves.capa != "feu" && actor[j].g == 1 && actor[j].saut == 0){
        actor[j].g = -1 * actor[j].moves.saut;
        actor[j].saut = 2;
    }
    if (actor[j].moves.capa == "feu" && actor[j].moves.spam > 100){
        actor[j].moves.spam = 0;
        keys[32] = 0;
        element.feu.push([actor[j].x,actor[j].y - actor[j].moves.sy / 2,10]);
    }
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    actor.forEach(
        function(c) {
            c.img.src = "images/" + c.moves.img + ".png";
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            keys[event.keyCode] = 1;
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            keys[event.keyCode] = 0;
        }
    );
    canvas.addEventListener("click",function(evt) {
                                evt.stopPropagation();
                                evt.preventDefault();
                                //evt = evt.changedTouches[0];
                                var rect = canvas.getBoundingClientRect();
                                var x = evt.screenX - rect.left;
                                var y = evt.screenY - rect.top;
                                click(x, y);
                            });
    animation();
}

function animation(){
    var f = function(t) {
        if (trans == 0){
            if (mort != 1){
                paint(t);
                window.requestAnimationFrame(f);
            }
            else window.requestAnimationFrame(drawDeath);
        }
        else window.requestAnimationFrame(drawTransfert);
    };
    window.requestAnimationFrame(f);
}

function paint(t){
    filin += filinVit;
    if (filin > 0.2 | filin < 0.05) filinVit = filinVit * -1;
    if (1 == keys[39]) moveRight(j);
    if (1 == keys[37]) moveLeft(j);
    if ((1 == keys[96] | 1 == keys[88]) && balles > 0) transfert();
    if (1 == keys[32]) action();
    for (var i = 0;i < actor.length;i++){
        if (actor[i].moves.capa == "feu" | actor[i].moves.IA == "maintien")actor[i].moves.spam += 1;
        if (actor[i].moves.capa == "explode" && actor[i].moves.explode == 1){
            actor[i].moves.res = [1,2,3,4,5,6,7,8,9,10];
            actor[i].moves.vit = 0;
            actor[i].moves.explode = t;
        }
        else if (actor[i].moves.capa == "explode" && actor[i].moves.explode > 0 && t - actor[i].moves.explode > 2000){
            actor[i].moves.capa = "explosive";
            actor[i].moves.att.push(10);
            actor[i].img.src = actor[i].img.src = "images/" + actor[i].moves.img + "3.png";
            actor.forEach(
                function(c,index) {
                    contact(i,index);
                }
            );
        }
        else if (actor[i].moves.capa == "explosive" && t - actor[i].moves.explode > 2200)coup(i,15);
        else{
            if (actor[i].moves.capa == "instable"){
                actor[i].vx += actor[i].moves.inertie;
                if (actor[i].moves.inertie > 0)actor[i].moves.inertie -= 0.001;
                if (actor[i].moves.inertie < 0)actor[i].moves.inertie += 0.001;
                actor[i].moves.r += actor[i].moves.inertie / actor[i].moves.sy;
                if (actor[i].moves.r > Math.PI)actor[i].moves.r -= 2*Math.PI;
                if (actor[i].moves.r < Math.PI)actor[i].moves.r += 2*Math.PI;
            }
            if (tombe(i)) {
                actor[i].g += 1;
                if (actor[i].moves.capa == "immateriel") actor[i].g -= 0.9;
            }
            if (i != j){
                IA(i);
                contact(j,i);
            }
            if (actor[i].vx > 0) droite(i);
            else if (actor[i].vx < 0) gauche(i);
            actor[i].vy += actor[i].g;
            actor[i].x += actor[i].vx;
            actor[i].y += actor[i].vy;
            if (actor[i].moves.capa != "courseLongue"){
                actor[i].vx = 0;
            }
            actor[i].vy = 0;
        }
    }
    X = actor[j].x - 300;
    Y = actor[j].y - H / 2;
    draw();
    cible = proche();
    ctx.lineWidth = filin;
    ctx.beginPath();
    ctx.moveTo(actor[j].x - X,actor[j].y  - actor[j].moves.sy / 2 - Y);
    ctx.lineTo(actor[cible].x - X,actor[cible].y - actor[cible].moves.sy / 2 - Y);
    ctx.closePath();
    ctx.stroke();
}

function draw() {
    ctx.drawImage(imgFond,0,0);
    ctx.fillStyle = "rgb(45,150,0)";
    element.panneau.forEach(
        function(e) {
            ctx.drawImage(imgPancarte,e[0] - X - 30,e[1] - 70 - Y);
        }
    );
    element.balle.forEach(
        function(e) {
            ctx.drawImage(imgBalle,e[0] - X,e[1] - Y);
            if (actor[j].y - actor[j].moves.sy < e[1] + imgBalleY / 2 && actor[j].y > e[1] + imgBalleY / 2 && actor[j].x - actor[j].moves.sx / 2 < e[0] + imgBalleX / 2 && actor[j].x + actor[j].moves.sx / 2 > e[0] + imgFeuX / 2){
                element.balle.splice(element.balle.indexOf(e),1);
                balles += 1;
            }
        }
    );
    actor.forEach(
        function(c) {
            c.img.onload = function (){
                console.log("coucou");
            };
            if (c.moves.capa == "instable"){
                ctx.save();
                ctx.translate(c.x - X,c.y - c.moves.sy / 2 - Y);
                ctx.rotate(c.moves.r);
                ctx.drawImage(c.img,- c.moves.sx / 2,- c.moves.sy / 2);
                ctx.restore();
            }
            else ctx.drawImage(c.img,c.x - c.moves.sx / 2 - X,c.y - c.moves.sy - Y);
        }
    );
    niveau.forEach(
        function(c) {
            ctx.fillRect(c[0] - X,c[1] - Y,c[2],c[3]);
        }
    );
    element.feu.forEach(
        function(e) {
            ctx.drawImage(imgFeu,e[0] - X,e[1] - Y);
            e[0] += e[2];
            niveau.forEach(
                function(c) {
                    if (c[1] - 1 < e[1] + imgFeuY / 2 && c[1] + c[3] > e[1] + imgFeuY / 2 && c[0] < e[0] + imgFeuX / 2 && c[0] + c[2] > e[0] + imgFeuX / 2){
                        element.feu.splice(element.feu.indexOf(e),1);
                    }
                }
            );
            actor.forEach(
                function(c,index) {
                    if (c.y - c.moves.sy < e[1] + imgFeuY / 2 && c.y > e[1] + imgFeuY / 2 && c.x - c.moves.sx / 2 < e[0] + imgFeuX / 2 && c.x + c.moves.sx / 2 > e[0] + imgFeuX / 2){
                        element.feu.splice(element.feu.indexOf(e),1);
                        coup(index,3);
                    }
                }
            );
        }
    );
    if (laserPsy > -1 && Math.abs(actor[j].y - actor[laserPsy].y) < 500) {
        ctx.strokeStyle = "rgb(100,0,100)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(actor[j].x - X,actor[j].y  - actor[j].moves.sy / 2 - Y);
        ctx.lineTo(actor[laserPsy].x - X,actor[laserPsy].y - actor[laserPsy].moves.sy / 2 - Y);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawDeath() {
    actor[j].g -= 1;
    actor[j].y -= actor[j].g;
    draw();
    window.requestAnimationFrame(drawDeath);
}

function drawTransfert() {
    if (((actor[vj].x - actor[j].x > 0 && X >= actor[vj].x - 300) | (actor[vj].x - actor[j].x < 0 && X <= actor[vj].x - 300)) | ((actor[vj].y - actor[j].y > 0 && Y >= actor[vj].y - H / 2) | (actor[vj].y - actor[j].y < 0 && Y <= actor[vj].y - H / 2))){
        j = vj;
        trans = 0;
        animation();
    }
    else{
        X += Math.round((actor[vj].x - actor[j].x) / 30) ;
        Y += Math.round((actor[vj].y - actor[j].y) / 30) ;
        draw();
        window.requestAnimationFrame(drawTransfert);
    }
}
