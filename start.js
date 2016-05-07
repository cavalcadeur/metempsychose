var W,H;
var ctx,canvas;
var Widget;
var X = 0;
var Y = 400;
var ep = 50;
var j = 0;
var keys = [];
var metampsy = 0;
var imgFond = new Image();
imgFond.src = "images/fond3.png";
var imgFeu = new Image();
imgFeu.src = "images/feu.png";
var imgBalle = new Image();
imgBalle.src = "images/psychosBalle.png";
var imgPancarte = new Image();
imgPancarte.src = "images/pancarte.png";
var imgPorte = new Image();
imgPorte.src = "images/vortex.png";
var imgBarre = new Image();
imgBarre.src = "images/barre.png";
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
var ratio = 4;
var gagne = 0;
var arti = 1000;
var t2 = 0;
var square;

imgFond.onload = function (){
    console.log(imgFond);
};

var imagesList = ["bombe","bombe2","bombe3","F3","E","bipede","boule4","bouleNeige","boxe","champi","champi4","champique","fantome","inter","jumper","psychos","T","carnivore"];
var images = {};

function loading(){
    var objectif = imagesList.length;
    imagesList.forEach(
        function(c) {
            images[c] = new Image;
            images[c].src = "images/" + c + ".png";
            images[c].onload = function (){
                objectif -= 1;
                if (objectif == 0) preparation();
            };
        }
    );
}

function Bombe() {
    this.saut = 0;
    this.vit = 3;
    this.img = "bombe";
    this.sx = 70;
    this.sy = 80;
    this.capa = "explode";
    this.IA = "allerRetour";
    this.att = [];
    this.res = [3];
    this.explode = 0;
    this.anim = ["w",0];
}

function MageFeu() {
    this.saut = 0;
    this.vit = 3;
    this.img = "F3";
    this.sx = 100;
    this.sy = 103;
    this.capa = "feu";
    this.IA = "spamFeu";
    this.att = [];
    this.res = [3];
    this.spam = 500;
    this.anim = ["w",0];
}

function MageElectro(){
    this.saut = 0;
    this.vit = 15;
    this.img = "E";
    this.sx = 100;
    this.sy = 107;
    this.capa = "courseLongue";
    this.IA = "wait";
    this.att = [7];
    this.res = [7];
    this.anim = ["w",0];
}

function MageTerre(){
    this.saut = 0;
    this.vit = 3;
    this.img = "T";
    this.sx = 70;
    this.sy = 91;
    this.capa = "";
    this.IA = "wait";
    this.att = [5];
    this.res = [1,2,3,4,5,6,7,8,9];
    this.anim = ["w",0];
}

function Boule() {
    this.saut = 27;
    this.vit = 3;
    this.img = "boule4";
    this.sx = 63;
    this.sy = 63;
    this.capa = "instable";
    this.inertie = 0;
    this.r = 0;
    this.size = 1;
    this.IA = "wait";
    this.att = [2,1];
    this.res = [];
    this.anim = ["w",0];
}

function Champique(){
    this.saut = 0;
    this.vit = 3;
    this.img = "champique";
    this.sx = 70;
    this.sy = 60;
    this.capa = "";
    this.IA = "allerRetour";
    this.att = [4];
    this.res = [1,2,4];
    this.anim = ["w",0];
}

function Champi(){
    this.saut = 0;
    this.vit = 3;
    this.img = "champi4";
    this.sx = 200;
    this.sy = 229;
    this.capa = "";
    this.IA = "allerRetour";
    this.att = [1];
    this.res = [];
    this.anim = ["w",0,0,100];
}

function GraviChampi(){
    this.saut = 0;
    this.vit = 4;
    this.img = "champi";
    this.sx = 48;
    this.sy = 50;
    this.capa = "graviteD";
    this.IA = "wait";
    this.att = [1];
    this.res = [];
    this.anim = ["w",6,0,100];
}

function Jumper(){
    this.saut = 20;
    this.vit = 1;
    this.img = "jumper";
    this.sx = 43;
    this.sy = 80;
    this.capa = "";
    this.IA = "simpleJump";
    this.att = [2,4];
    this.res = [1,2,3,4,5,6,7,9];
    this.anim = ["w",0];
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
    this.anim = ["w",0];
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
    this.anim = ["w",0];
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
    this.sx = 50;
    this.sy = 105;
    this.capa = "immateriel";
    this.IA = "maintien";
    this.att = [];
    this.res = [];
    this.spam = 80;
    this.anim = ["f",3,0,100];
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
    this.res = [2,3,4,5,6,7,8,9];
    this.mode = 0;
    this.anim = ["w",0];
}

function Bipede(){
    this.saut = 13;
    this.vit = 3;
    this.img = "bipede";
    this.sx = 150;
    this.sy = 132;
    this.capa = "lourd";
    this.IA = "wait";
    this.att = [];
    this.res = [1,2,3,4,5,6,7,8,9,10];
    this.mode = 0;
    this.anim = ["w",4,0,150];
}

function BouleNeige(){
    this.saut = 0;
    this.vit = 2;
    this.img = "bouleNeige";
    this.sx = 40;
    this.sy = 40;
    this.r = 0;
    this.inertie = 0;
    this.size = 0.5;
    this.capa = "grossissement";
    this.IA = "allerRetour";
    this.att = [1,2];
    this.res = [1,2,3,4,5,6,7,8,9,10];
    this.mode = 0;
    this.anim = ["w",0];
}

function Barre(){
    this.img = "barre";
    this.sx = 0;
    this.sy = 0;
}

function Falaise(){
    this.img = "falaise";
    this.sx = 0;
    this.sy = 0;
}

function Bush(){
    this.img = "bush";
    this.sx = 0;
    this.sy = 0;
}

function Bush2(){
    this.img = "bush2";
    this.sx = 0;
    this.sy = 0;
}

function Bush3(){
    this.img = "bush3";
    this.sx = 0;
    this.sy = 0;
}

function Mushroom(){
    this.img = "mushroom";
    this.sx = 0;
    this.sy = 0;
}

function Cristal(){
    this.img = "cristal";
    this.sx = 0;
    this.sy = 0;
}

function PanneauBas(){
    this.img = "pancarte2";
    this.sx = 0;
    this.sy = 0;
}

function PanneauDanger(){
    this.img = "pancarte3";
    this.sx = 0;
    this.sy = 0;
}

function Brique(){
    this.img = "bloc1";
    this.sx = 0;
    this.sy = 0;
}

function Liane(){
    this.img = "lianeFeuille";
    this.sx = 0;
    this.sy = 20;
}

function Liane2(){
    this.img = "lianeFeuille2";
    this.sx = 0;
    this.sy = 20;
}

function Titre(){
    this.img = "Titre";
    this.sx = 0;
    this.sy = 20;
}

function Titre2(){
    this.img = "Titre2";
    this.sx = 0;
    this.sy = 20;
}


var element = {"feu":[],"balle":[],"panneau":[],"choixN":[]};

// niveau

var niveau = [];

element.balle = [];
var balles = 0;
element.panneau = [];
element.choixN = [];

var decor = [{"x":1900+ep,"y":250,"type":new Barre,"img":new Image()}];

var actor = [{"x":2000,"y":100,"vx":0,"vy":0,"g":0,"sens":1,"saut":0,"moves":new Boule,"img":new Image()}];
var victoire = [];
var nVictoire = 2;
var chute = [4000,"select"];
selection("select");
// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
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
                if (actor[n].saut != 0 && actor[n].g == 0){
                    actor[n].saut -= 1;
                    if (actor[n].moves.capa == "lourd") {c[1] += 10;
                                                         for (var iii = 0; iii < 5; iii++) {
                                                             var taille = rnd(100) + 50;
                                                             newExplosion(actor[n].x - 50 + "px",actor[n].y - 75  + "px",actor[n].x - 100 + rnd(200) + "px",actor[n].y - 155 + rnd(200)+ "px", taille + "px",1,1);
                                                         }}
                }
                actor[n].y = c[1];
                sautG = 0;
                return;
            }
        }
    );
    if (actor[n].moves.capa == "instable" | actor[n].moves.capa == "grossissement"){
        if (actor[n].moves.inertie > 0)actor[n].moves.r += sautG;
        if (actor[n].moves.inertie < 0)actor[n].moves.r -= sautG;
        if (actor[n].moves.r < Math.PI)actor[n].moves.r += 2*Math.PI;
        if (actor[n].moves.r > Math.PI)actor[n].moves.r -= 2*Math.PI;
    }
    return true;
}

function test(x,y){
    var v = 0;
    niveau.forEach(
        function(c) {
            if (c[1] < y && c[1] + c[3] > y && c[0] < x && c[0] + c[2] > x){
                v = 1;
            }
        }
    );
    if (v == 0)return false;
    else return true;
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
            else{
                
            }
        }
    );
}

function moveRight(n){
    actor[n].sens = 1;
    actor[n].vx += actor[n].moves.vit;
    if (actor[n].moves.capa == "courseLongue") actor[n].vx = actor[n].moves.vit;
    if (actor[n].moves.capa == "instable"  | actor[n].moves.capa == "grossissement"){
        actor[n].moves.inertie += 0.1;
        actor[n].moves.r += actor[n].moves.vit / actor[n].moves.sy;
        if (actor[n].moves.capa == "grossissement" && actor[n].moves.size < 20) actor[n].moves.size += actor[n].moves.vit/1000;
        if (actor[n].moves.r > Math.PI)actor[n].moves.r -= 2*Math.PI;
    }

}

function moveLeft(n){
    actor[n].sens = -1;
    actor[n].vx -= actor[n].moves.vit;
    if (actor[n].moves.capa == "courseLongue") actor[n].vx = -1 * actor[n].moves.vit;
    if (actor[n].moves.capa == "instable"  | actor[n].moves.capa == "grossissement"){
        actor[n].moves.inertie -= 0.1;
        actor[n].moves.r -= actor[n].moves.vit / actor[n].moves.sy;
        if (actor[n].moves.capa == "grossissement" && actor[n].moves.size < 20) actor[n].moves.size += actor[n].moves.vit/1000;
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
    else if (actor[i].moves.IA == "allerRetour") {
        if (test(actor[i].x + actor[i].sens * actor[i].moves.vit,actor[i].y) == true){
            actor[i].vx = actor[i].sens * actor[i].moves.vit;
            if (actor[i].moves.capa == "instable"  | actor[i].moves.capa == "grossissement"){
                actor[i].moves.inertie += 0.1 * actor[i].sens;
                actor[i].moves.r += (actor[i].moves.vit / actor[i].moves.sy) * actor[i].sens;
                if (actor[i].moves.capa == "grossissement" && actor[i].moves.size < 20) actor[i].moves.size += actor[i].moves.vit/1000;
                if (actor[i].moves.r > Math.PI)actor[i].moves.r -= 2*Math.PI;
                if (actor[i].moves.r < -Math.PI)actor[i].moves.r += 2*Math.PI;
            }
        }
        else actor[i].sens *= -1;
    }
    else if (actor[i].moves.IA == "spamFeu") {
        if (actor[i].moves.spam > 500){
            actor[i].moves.spam = 0;
            element.feu.push([actor[i].x + 10 * actor[j].sens,actor[i].y - actor[i].moves.sy / 2,10]);
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
                if (n == laserPsy) laserPsy = -1;
            }
        }
        else if (actor[n].moves.capa == "interrupteur"){
            actor[n].moves.mode += 1;
            if (actor[n].moves.mode == 1)niveau.push(actor[n].plate);
        }
        else {actor[n].img = images[actor[n].moves.img + "2"];actor[n].moves.explode = 1;}
    }
}

function contact(i,k){
    if (actor.length == 1) return;
    var array = actor[i].moves.att;
    if (array.length != 0){
        if (Math.abs(actor[i].x - actor[k].x) < actor[i].moves.sx / 2 + actor[k].moves.sx / 2 && Math.abs(actor[i].y - actor[i].moves.sy / 2 - (actor[k].y - actor[k].moves.sy / 2)) < actor[i].moves.sy / 2 + actor[k].moves.sy / 2){
            coup(k,array[array.length - 1]);
        }
    }
}

function action(){
    var inAction = 1;
    element.panneau.forEach(
        function(e,index) {
            if (Math.hypot(actor[j].x - e[0],actor[j].y - e[1]) < 20){
                alert (e[2]);
                keys[32] = 0;
                keys[39] = 0;
                keys[37] = 0;
                keys[96] = 0;
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
        element.feu.push([actor[j].x + 10 * actor[j].sens,actor[j].y - actor[j].moves.sy / 2,10 * actor[j].sens]);
    }
    element.choixN.forEach(
        function(e) {
            if (inAction == 1 && Math.hypot(actor[j].x - e[0],actor[j].y - e[1]) < 30){
                selection (e[2]);
                keys[32] = 0;
                keys[39] = 0;
                keys[37] = 0;
                keys[96] = 0;
                inAction = 0;
                j = 0;
            }
        }
    );
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    resize();
    Widget = require("wdg");
    square = new Widget({id: "square"});
    decor.forEach(
        function(c) {
            c.img.src = "images/" + c.type.img + ".png";
        }
    );
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
    loading();
}

function preparation(){
    actor.forEach(
        function(c) {
            c.img = images[c.moves.img];
        }
    );
    animation();
}

function animation(){
    var f = function(t) {
        if (keys[77] == 1){
            window.requestAnimationFrame(drawMap);
        }
        else if (trans == 0){
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
    if (actor[j].y > chute[0]) selection(chute[1]);
    filin += filinVit;
    if (filin > 0.2 | filin < 0.05) filinVit = filinVit * -1;
    if (1 == keys[39]) moveRight(j);
    if (1 == keys[37]) moveLeft(j);
//    if (1 == keys[67]) cross();
    if ((1 == keys[96] | 1 == keys[88]) && balles > 0) transfert();
    if (1 == keys[32]) action();
    var victorieux = 0;
    for (var i = 0;i < actor.length;i++){
        if ((actor[i].moves.img == "E" | actor[i].moves.img == "F2" | actor[i].moves.img == "T") && actor[i].x > victoire[0] && actor[i].x < victoire[0] + victoire[2] && actor[i].y > victoire[1] && actor[i].y < victoire[1] + victoire[3]){ 
            victorieux += 1 ;
            if (victorieux == nVictoire) finNiveau();
        }        
        if (actor[i].moves.capa == "feu" | actor[i].moves.IA == "maintien")actor[i].moves.spam += 1;
        if (actor[i].moves.capa == "explode" && actor[i].moves.explode == 1){
            actor[i].moves.res = [1,2,3,4,5,6,7,8,9,10];
            actor[i].moves.vit = 0;
            actor[i].moves.explode = t;
        }
        else if (actor[i].moves.capa == "explode" && actor[i].moves.explode > 0 && t - actor[i].moves.explode > 2000){
            actor[i].moves.capa = "explosive";
            actor[i].moves.att.push(10);
            actor[i].img.src = actor[i].img = images[actor[i].moves.img + "3"];
            for (var iii = 0; iii < 5; iii++) {
                var taille = rnd(100) + 50;
                newExplosion(actor[i].x - 50 + "px",actor[i].y - 105  + "px",actor[i].x - 70 - rnd(30) + "px",actor[i].y - 155 - rnd(30)+ "px", taille + "px",0,1);
            }
            actor.forEach(
                function(c,index) {
                    contact(i,index);
                }
            );
        }
        else if (actor[i].moves.capa == "explosive" && t - actor[i].moves.explode > 2200){
            coup(i,15);
        }
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
            if (actor[i].vx > 0) droite(i);
            else if (actor[i].vx < 0) gauche(i);
            if (actor[i].moves.capa == "graviteD") actor[i].vx += actor[i].g;
            else actor[i].vy += actor[i].g;
            if (actor[i].moves.capa == "lourd") actor[i].vy += actor[i].g;
            actor[i].x += actor[i].vx;
            actor[i].y += actor[i].vy;
            if (actor[i].moves.capa != "courseLongue"){
                actor[i].vx = 0;
            }
            actor[i].vy = 0;
            if (i != j){
                IA(i);
                contact(j,i);
            }
        }
    }
    X = actor[j].x - W / 2;
    Y = actor[j].y - H / 2;
    draw();
    cible = proche();
    ctx.lineWidth = filin;
    ctx.strokeStyle = "rgb(230,230,230)";
    ctx.beginPath();
    ctx.moveTo(actor[j].x - X,actor[j].y  - actor[j].moves.sy / 2 - Y);
    ctx.lineTo(actor[cible].x - X,actor[cible].y - actor[cible].moves.sy / 2 - Y);
    ctx.closePath();
    ctx.stroke();
    t2 = t;
    square.css({
        position: "absolute",
        left: -X + "px",
        top: -Y + "px"
    });
}

function draw() {
    if (chute[1] == "aveugle" || chute[1] == "aveugle2"){
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0,0,W,H);
    }
    else ctx.drawImage(imgFond,0,0,W,H);
    ctx.strokeStyle = "rgb(0,0,0)";
    element.panneau.forEach(
        function(e) {
            ctx.drawImage(imgPancarte,e[0] - X - 30,e[1] - 70 - Y);
        }
    );
    element.choixN.forEach(
        function(e) {
            ctx.drawImage(imgPorte,e[0] - X - 30,e[1] - 70 - Y);
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
            if ((chute[1] == "aveugle" || chute[1] == "aveugle2") && c.moves.capa != "interrupteur") return;
            if (c.moves.capa == "instable"  | c.moves.capa == "grossissement"){
                ctx.save();
                ctx.translate(c.x - X,c.y - c.moves.sy * c.moves.size / 2 - Y);
                ctx.scale(c.moves.size,c.moves.size);
                ctx.rotate(c.moves.r);
                ctx.drawImage(c.img,- c.moves.sx / 2,- c.moves.sy / 2);
                ctx.restore();
            }
            else {
                ctx.save();
                ctx.translate(c.x - X,c.y - c.moves.sy / 2 - Y);
                ctx.scale(c.sens,1);
                ctx.drawImage(c.img,- c.moves.sx / 2,- c.moves.sy / 2);
                ctx.restore();
            }
        }
    );
    niveau.forEach(
        function(c) {
            ctx.fillStyle = "rgb(104,91,12)";
            if (chute[1] == "aveugle" || chute[1] == "aveugle2") ctx.fillStyle = "rgb(150,150,150)";
            ctx.fillRect(c[0] - X,c[1] - Y,c[2],c[3]);
        }
    );
    decor.forEach(
        function(c) {
            ctx.drawImage(c.img,c.x - c.type.sx - X,c.y - c.type.sy - Y);
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
    if (actor[j].y > Y + 1000) {
        selection(chute[1]);
        mort = 0;
        animation();
    }
    else{
        actor[j].g -= 1;
        actor[j].y -= actor[j].g;
        draw();
        window.requestAnimationFrame(drawDeath);
    }
}

function drawTransfert() {
    if (((actor[vj].x - actor[j].x > 0 && X >= actor[vj].x - W / 2) | (actor[vj].x - actor[j].x < 0 && X <= actor[vj].x - W / 2)) | ((actor[vj].y - actor[j].y > 0 && Y >= actor[vj].y - H / 2) | (actor[vj].y - actor[j].y < 0 && Y <= actor[vj].y - H / 2))){
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

function drawMap() {
    ctx.drawImage(imgFond,0,0,W,H);
    ctx.fillStyle = "rgb(0,114,15)";
    niveau.forEach(
        function(c) {
            ctx.fillRect(c[0] / ratio,c[1] / ratio,c[2] / ratio,c[3] / ratio);
        }
    );
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(X / ratio,Y / ratio,1000 / ratio,800 / ratio);
    animation();
}

function finNiveau(){
    element.choixN.push([victoire[4],victoire[5],"select"]);
    nVictoire = 1000;
    victoire = [0,0,0,0,0,0];
}

function selection(choixNiveau){
    laserPsy = -10;
    j = 0;
    element = {"feu":[],"balle":[],"panneau":[],"choixN":[]};
    if (choixNiveau == "select"){
        niveau = [[0,20,500,ep],[200,320,1500,ep],[0,620,500,ep],[200,920,500,ep]];

        element.balle = [];
        balles = 0;
        element.panneau = [[130,20,"Monde 1 : difficile"],[640,320,"Monde 2 : adresse"],[130,620,"Monde 3 : moyennement dur"],[640,920,"Monde 4 : a l'aveugle"]];
        element.choixN = [[300,20,"1-1"],[450,20,"1-2"],[450,320,"2-1"],[300,320,"2-2"],[900,320,"2-3"],[1050,320,"2-4"],[750,320,"2-5"],[1200,320,"2-6"],[1350,320,"2-7"],[300,620,"3-1"],[450,620,"3-2"],[450,920,"aveugle"],[300,920,"aveugle2"]];

        decor = [{"x":0,"y":20,"type":new Barre,"frame":0,"img":new Image()},
                 {"x":200,"y":320,"type":new Barre,"img":new Image()},
                 {"x":700,"y":320,"type":new Barre,"img":new Image()},
                 {"x":1200,"y":320,"type":new Barre,"img":new Image()},
                 {"x":-200,"y":-400,"type":new Titre,"img":new Image()},
                 {"x":0,"y":620,"type":new Barre,"img":new Image()},
                 {"x":200,"y":920,"type":new Barre,"img":new Image()}];

        actor = [{"x":20,"y":0,"vx":0,"vy":0,"g":-20,"sens":1,"saut":0,"moves":new Boule}];
        victoire = [0,0,0,0];
        nVictoire = 0;
        chute = [5000,"aide"];
    }
    else if (choixNiveau == "aide"){
        niveau = [[0,20,500,ep],[ep * -1,20 - ep,ep,ep],[500,20 - ep,ep,ep],[0,420,500,ep]];

        element.balle = [[450,-20]];
        balles = 0;
        element.panneau = [[50,20,"Bienvenue dans l'aide : pour faire disparaître les messages cliquez dessus."],[200,20,"Vous pouvez sauter avec la barre espace ou tirer des boules de feu."],[350,20,"Si vous ramassez une sphère bleue vous pourrez vous métempsychoser avec 0 ou x."],[350,420,"Maintenant que vous avez compris le principe, vous pouvez retourner au menu avec la porte."]];
        element.choixN = [[450,420,"select"]];

        decor = [{"x":0,"y":20,"type":new Barre,"frame":0,"img":new Image()},
                 {"x":0,"y":-300,"type":new Titre2,"frame":0,"img":new Image()}];

        actor = [{"x":50,"y":0,"vx":0,"vy":0,"g":-20,"sens":1,"saut":0,"moves":new Boule},{"x":50,"y":420,"vx":0,"vy":0,"g":0,"sens":1,"saut":0,"moves":new Champique}];
        victoire = [0,0,0,0];
        nVictoire = 0;
        chute = [5000,"aide"];
    }
    else if (choixNiveau == "2-1"){
        niveau = [[0,20,500,ep],[200,320,100,ep],[450,800,400,ep],[600,1400,900,ep],[550,1600,200,ep],[1350,1000,150,ep],[1700,800,150,ep],[1900,0,ep,850],[1900,849,600,ep],[1750,1250,400,ep]];

        element.balle = [[250,280],[1030,1360],[630,1560],[1730,700],[2070,1150]];
        balles = -4;
        element.panneau = [[130,20,"Attention, il vous faut les 5 balles pour finir le niveau."]];
        element.choixN = [[2300,849]];

        decor = [{"x":0,"y":20,"type":new Barre,"img":new Image()},
                 {"x":100,"y":90,"type":new Liane,"img":new Image()},
                 {"x":400,"y":-50,"type":new PanneauBas,"img":new Image()},
                 {"x":750,"y":720,"type":new PanneauDanger,"img":new Image()},
                 {"x":700,"y":1310,"type":new Bush,"img":new Image()},
                 {"x":740,"y":1310,"type":new Bush,"img":new Image()},
                 {"x":800,"y":1310,"type":new Bush2,"img":new Image()},
                 {"x":830,"y":1310,"type":new Bush,"img":new Image()},
                 {"x":890,"y":1310,"type":new Bush,"img":new Image()},
                 {"x":1300,"y":1310,"type":new Bush,"img":new Image()},
                 {"x":940,"y":1310,"type":new Bush3,"img":new Image()},
                 {"x":1000,"y":1310,"type":new Bush2,"img":new Image()},
                 {"x":1070,"y":1310,"type":new Bush2,"img":new Image()},
                 {"x":1200,"y":1310,"type":new Bush3,"img":new Image()},
                 {"x":1700,"y":800,"type":new Brique,"img":new Image()},
                 {"x":1749,"y":800,"type":new Brique,"img":new Image()},
                 {"x":1798,"y":800,"type":new Brique,"img":new Image()}];

        actor = [{"x":20,"y":0,"vx":0,"vy":0,"sens":1,"g":-20,"frame":0,"saut":0,"moves":new Boule},
                 {"x":550,"y":700,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Interrupteur,"plate":[200,320,1000,ep]},
                 {"x":1380,"y":920,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Interrupteur,"plate":[1350,520,150,ep]},
                 {"x":800,"y":1300,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Champi},
                 {"x":2000,"y":500,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu},
                 {"x":2000,"y":1100,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Bombe}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 1;
        chute = [5000,"2-1"];
    }
    else if (choixNiveau == "2-2"){
        niveau = [[0,200,1500,ep],[1500,0,200,ep],[0,550,500,ep],[0,200,ep,351]];

        element.balle = [[1450,160]];
        balles = 0;
        element.panneau = [];
        element.choixN = [[300,550,"select"]];

        decor = [];

        actor = [{"x":160,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule},
                 {"x":160,"y":500,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu},
                 {"x":10,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Champi},
                 {"x":900,"y":0,"vx":0,"vy":0,"sens":-1,"g":0,"frame":0,"saut":0,"moves":new Champi}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 1;
        chute = [5000,"2-2"];
    }
    else if (choixNiveau == "2-3"){
        niveau = [[0,20,500,ep],[500,-200,500,ep],[1000,20,1000,ep],[500-ep,-500,ep,300],[1000,-400,ep,440]];

        element.balle = [[200,-20],[300,-20]];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1900,20,"select"]];

        decor = [];

        actor = [{"x":20,"y":0,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule},
                 {"x":800,"y":-250,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Bipede}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [500,"2-3"];
    }
    else if (choixNiveau == "2-4"){
        niveau = [[0,20,500,ep],[700,20,ep,ep],[1000,20,ep,ep],[1300,20,ep,ep],[1600,20,ep,ep],[1600+ep,120,500,ep],[1700+ep,-300,ep,ep],[1600,-500,ep,ep],[1100,-700,200,ep]];

        element.balle = [];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1940+ep,120,"select"],[1160,-700,"bonus"]];

        decor = [{"x":0,"y":20,"type":new Barre,"img":new Image()}];

        actor = [{"x":20,"y":0,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [500,"2-4"];
    }
    else if (choixNiveau == "bonus"){
        niveau = [[0,120,200,ep],[0,320,200,ep],[0,520,200,ep],[0,120,ep,400+ep],[200-ep,120,ep,400+ep],[300,120,200,ep],[300,520,200,ep],[300,120,ep,400+ep],[500-ep,120,ep,400+ep],[600,120,ep,400+ep],[900,120,ep,400+ep],[599+ep,120,(300-ep)/4 + 1,(400+ep)/4],[600+ep+(300-ep)/4,120+(400+ep)/4,(300-ep)/4,(400+ep)/4],[600+ep+(300-ep)/2,120+(400+ep)/2,(300-ep)/4,(400+ep)/4],[600+ep+(300-ep)/4*3,120+(400+ep)/4*3,(300-ep)/4+1,(400+ep)/4],[1000+ep,120,ep,400+ep],[1300,120,ep,400+ep],[1000+ep,520,300-ep,ep],[1400,120,200,ep],[1400,320,200,ep],[1400,520,200,ep],[1400,120,ep,201],[1600-ep,320,ep,201]];
        element.balle = [];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1510,320,"bonus2"],[1450,520,"select"]];

        decor = [];

        actor = [{"x":20,"y":0,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule},
                 {"x":300,"y":-0,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Interrupteur,"plate":[1100,520,500,ep]}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [2000,"2-4"];
    }
    else if (choixNiveau == "bonus2"){
        niveau = [[0,200,2000,50],[100,190,900,60],[200,180,800,70],[300,170,700,80],[400,160,600,90],[500,150,500,100],[600,140,400,110],[700,130,300,120],[800,120,200,130],[900,110,100,140]];
        element.balle = [];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1800,200,"select"]];

        decor = [];

        actor = [{"x":20,"y":0,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule},
                 {"x":300,"y":-0,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Champi}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [2000,"2-4"];
    }
    else if (choixNiveau == "2-5"){
        niveau = [[0,20,ep,ep],[200,220,ep,ep],[400,420,ep,ep],[600,620,ep,ep],[800,820,ep,ep],[1000,1020,ep,ep],[1200,1220,ep,ep],[1000,620,ep,ep],[1200,420,ep,ep],[1400,220,ep,ep],[1700,220,ep,ep],[400,820,ep,ep],[200,1020,ep,ep],[1400,1420,300,ep],[1400,1420,ep,300],[1700-ep,1420,ep,300],[1400,1720-ep,300,ep]];

        element.balle = [[200,980],[1700,170]];
        balles = -1;
        element.panneau = [[0,10,"Il vous faut deux balles pour la fin."]];
        element.choixN = [[1500,1720-ep,"select"]];

        decor = [];

        actor = [{"x":10,"y":0,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule},
                 {"x":1550,"y":1700-ep,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [2000,"2-5"];
    }
    else if (choixNiveau == "2-6"){
        niveau = [[0,0,200,50],[200,300,200,50],[800,800,200,50],[1000,1100,200,50]];

        element.balle = [];
        balles = -1;
        element.panneau = [];
        element.choixN = [[1050,1100,"select"]];

        decor = [];

        actor = [{"x":50,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageElectro}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [2000,"2-6"];
    }
    else if (choixNiveau == "2-7"){
        niveau = [[0,100,1000,50]];

        element.balle = [];
        balles = -1;
        element.panneau = [];
        element.choixN = [[950,100,"select"]];

        decor = [];

        actor = [{"x":50,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageElectro},
                 {"x":150,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Jumper},
                 {"x":750,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Jumper}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 180;
        chute = [2000,"2-7"];
    }
    else if (choixNiveau == "en travaux"){
        niveau = [[1900+ep,250,500,ep],[2400,0,ep,250+ep],[2400,249+ep,ep,250+ep],[1700+ep,500+ep,700,ep],[1250,250,250,ep],[1250,100,ep,150],[900,250,300,ep],[800,450,100,ep],[900,650,100,ep],[800,850,100,ep],[900,1050,100,ep],[200,1250,700,ep],[200,850,550,ep],[100,250,100,ep],[0,450,100,ep],[100,650,100,ep],[0,850,100,ep],[100,1050,100,ep],[0-ep,100,ep+1,1150+ep],[0-ep,1250+ep,300,ep],[1200,1050,1000,ep],[1200,750,ep,300],[-300,1500,600,ep*3],[2400,900+ep,ep,400+ep],[2200,1500,200,ep],[1500,1800,900,ep],[1500,1700,ep,100],[1300,1550,350,ep],[2500,1500,ep+1,ep+1]];

        element.balle = [[1700,500],[133,215],[1300,1400],[810,1200],[2250,1750],[500,1000],[2400,-50],[1200,700]];
        balles = 2;
        element.panneau = [[2000,500+ep,"Les deux mages doivent parvenir en bas en prenant le mage vert au passage."]];

        decor = [{"x":1900+ep,"y":250,"type":new Barre,"img":new Image()},
                 {"x":2000+ep,"y":160,"type":new Bush,"img":new Image()},
                 {"x":2100+ep,"y":160,"type":new Bush2,"img":new Image()},
                 {"x":2100+ep,"y":470,"type":new Mushroom,"img":new Image()},
                 {"x":2370,"y":-90,"type":new Cristal,"img":new Image()}];

        actor = [{"x":2000,"y":100,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new MageFeu},
                 {"x":2300,"y":100,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new MageElectro },
                 {"x":1100,"y":100,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boule},
                 {"x":2300,"y":550,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Interrupteur,"plate":[1499,250,402+ep,ep]},
                 {"x":500,"y":300,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Psychos},
                 {"x":1300,"y":1000,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Carnivore},
                 {"x":1600,"y":1200,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new MageTerre},
                 {"x":-250,"y":2000,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Esprit},
                 {"x":2180,"y":1600,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Champi},
                 {"x":2500 + ep / 2,"y":1400,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper}];
        actor[3].moves.res = [1,4,5,6,7,8,9];
        victoire = [0,0,0,0,0,0];
        nVictoire = 3;
        chute = [5000,"1-2"];
    }
    else if (choixNiveau == "1-1"){
        niveau = [[5,800,400,ep],[405,500,200,ep],[640,320,210+ep,ep],[850,450,ep,200],[850,650-ep,250+ep,ep],[850,1000,500,ep],[1099+ep,650-2*ep,500,2*ep],[1300+ep,800,100,ep],[1650,750,150,ep],[1650,1050,300,ep],[1400+ep,1300,200,ep],[1300+ep,1300,50,50],[1550+ep,1300+ep,400,ep],[1900+ep,1550,500,ep],[2400,1300,ep,250+ep]];

        element.balle = [[350,750],[650,750],[800,100],[1700,700],[1600,800]];
        balles = 0;
        element.panneau = [[300,800,"Impossible de passer ... Il faudrait actionner l'interrupteur là en bas.Mais vous ne pouvez pas l'atteindre.Appuyez sur zero ou x pour prendre l'esprit du monstre le plus proche."],[830,320,"Là encore le passage est impossible ... Vous savez ce qu'il reste à faire."]];

        decor = [];

        actor = [{"x":50,"y":750,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new MageFeu,"img":new Image()},
                 {"x":450,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":1290,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":1200,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Champique,"img":new Image()},
                 {"x":1370,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":1450,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":1530,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":1610,"y":500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":900,"y":700,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":2300,"y":1200,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new MageElectro,"img":new Image()},
                 {"x":870,"y":885,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Interrupteur,"img":new Image(),"plate":[404,800,450,ep]},
                 {"x":1900,"y":900,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Interrupteur,"img":new Image(),"plate":[1100,1000,850,ep]},
                 {"x":1370,"y":640,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Bombe,"img":new Image()},
                 {"x":1370,"y":1000,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Psychos,"img":new Image()}];
        victoire = [2000,1200,400,400,2000,1550];
        nVictoire = 2;
        chute = [5000,"1-1"];
    }
    else if (choixNiveau == "1-2"){
        niveau = [[0,2500,200,ep],[250,2500,50,50],[400,2500,50,50],[500,2500,200,50],[700,2000,50,50],[300,1300,50,50],[500,1500,50,50],[800,1300,50,50],[0,900,1000,50]];

        element.balle = [[550,2450]];
        balles = 0;
        element.panneau = [];
        element.choixN = [[600,1100,"select"]];

        decor = [];

        actor = [{"x":50,"y":2000,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":350,"y":2500,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Esprit,"img":new Image()},
                 {"x":725,"y":1900,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Psychos,"img":new Image()},
                 {"x":325,"y":1100,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Psychos,"img":new Image()},
                 {"x":525,"y":1400,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":825,"y":1100,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Psychos,"img":new Image()},
                 {"x":300,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":400,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":500,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":600,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":700,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":800,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()},
                 {"x":900,"y":800,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Boxe,"img":new Image()}];
        victoire = [2000,1200,400,400,2000,1550];
        nVictoire = 2;
        chute = [5000,"1-2"];
    }
    else if (choixNiveau == "3-1"){
        niveau = [[0,300,100,ep],[250,300,400,ep],[650,0,400,ep],[650-ep,450,ep,ep],[450,750,600,ep],[250,650,ep,ep],[100,500,ep,ep],[1050,300,400,ep]];

        element.balle = [[600,230],[700,650],[700,230]];
        balles = 0;
        element.panneau = [[400,300,"Ammenez le mage sur la plate-forme d'en face."]];
        element.choixN = [[1940+ep,120,"select"]];

        decor = [];

        actor = [{"x":300,"y":100,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu,"img":new Image()},
                 {"x":900,"y":0,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Bipede,"img":new Image()},
                 {"x":660-ep,"y":450,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":800,"y":700,"vx":1,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Champi,"img":new Image()}];
        victoire = [950,0,500,500,1250,300];
        nVictoire = 1;
        chute = [2000,"3-1"];
    }
    else if (choixNiveau == "3-2"){
        niveau = [[600,0,500,50],[1050,0,50,500],[600,0,50,500],[600,450,500,50],[0,150,500,50],[0,450,500,50],[0,750,500,50],[1150,450,50,50],[1400,450,100,50]];

        element.balle = [[700,230],[0,100],[450,400],[900,230]];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1450,450,"select"]];

        decor = [];

        actor = [{"x":700,"y":100,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":200,"y":100,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageElectro,"img":new Image()},
                 {"x":200,"y":700,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":10,"y":730,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Interrupteur,"img":new Image(),"plate":[1200,450,200,ep]},
                 {"x":1175,"y":400,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu,"img":new Image()}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 1;
        chute = [2000,"3-2"];
    }
    else if (choixNiveau == "aveugle"){
        niveau = [[0,0,500,50],[0,300,500,50],[0,0,50,300],[450,0,50,300],[600,300,500,50],[1300,0,50,50],[1400,300,500,50]];

        element.balle = [[400,-50],[400,250],[1000,250]];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1700,300,"select"]];

        decor = [];

        actor = [{"x":50,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu,"img":new Image()},
                 {"x":100,"y":100,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":1325,"y":-10,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Jumper,"img":new Image()},
                 {"x":200,"y":250,"vx":0,"vy":0,"sens":1,"frame":0,"g":0,"saut":0,"moves":new Interrupteur,"img":new Image(),"plate":[500,0,200,ep]},
                 {"x":1500,"y":50,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Champi,"img":new Image()}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 1;
        chute = [2000,"aveugle"];
    }
    else if (choixNiveau == "aveugle2"){
        niveau = [[0,0,500,50],[400,250,250,50],[0,250,50,200],[0,450,300,50],[0,700,300,50],[500,700,300,50],[1000,700,300,50],[500,350,1200,50]];

        element.balle = [[400,-50],[100,400]];
        balles = 0;
        element.panneau = [];
        element.choixN = [[1100,700,"select"]];

        decor = [];

        actor = [{"x":50,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageFeu,"img":new Image()},
                 {"x":100,"y":650,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new Boule,"img":new Image()},
                 {"x":600,"y":0,"vx":0,"vy":0,"sens":1,"g":0,"frame":0,"saut":0,"moves":new MageElectro,"img":new Image()}];
        victoire = [0,0,0,0,0,0];
        nVictoire = 1;
        chute = [2000,"aveugle2"];
    }
    decor.forEach(
        function(c) {
            c.img.src = "images/" + c.type.img + ".png";
        }
    );
    actor.forEach(
        function(c) {
            c.img = images[c.moves.img];
        }
    );
}
