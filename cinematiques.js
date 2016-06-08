function drawCinema(){
    ctx.fillStyle = "rgb(98,0,123)";
    if (cinema == "intro1"){
        ctx.drawImage(imgCin.fond4,0,0,W,H);
        if (nCine < 410){
            ctx.drawImage(imgCin.heroine,W/3 + 45 - imgCin.heroine.width/2,H - imgCin.heroine.height);
        }
        if (nCine == 300){
            for (var iii = 0; iii < 15; iii++) {
                var taille = rnd(200) + 300;
                newExplosion(W/3*2 - taille/2 + rnd(50) - 25 + "px",H - imgCin.magePsy.height/2 - taille/2 +  rnd(50) - 25 + "px",W/3*2 - taille/2 - rnd(600) + 300 + "px",H - imgCin.magePsy.height/2 - taille/2 - rnd(600) + 300 + "px", taille + "px",3,1);
            }
        }
        if (nCine > 100 && nCine < 400) ctx.drawImage(imgCin.note1,W/3 + 75,H - imgCin.heroine.height - imgCin.note1.height);
        if (nCine > 150 && nCine < 400) ctx.drawImage(imgCin.note2,W/3 + 105,H - imgCin.heroine.height - imgCin.note2.height - 10);
        if (nCine > 200 && nCine < 400) ctx.drawImage(imgCin.note3,W/3 + 135,H - imgCin.heroine.height - imgCin.note3.height);
        if (nCine < 440) ctx.drawImage(imgCin.palmier1,W/3 - imgCin.palmier1.width / 2,H - imgCin.palmier1.height);
        else ctx.drawImage(imgCin.heroine2,W/3 - imgCin.palmier1.width / 2,H - imgCin.palmier1.height);
        if (nCine > 300 && nCine < 400){
            ctx.drawImage(imgCin.magePsy,W/3*2 - imgCin.magePsy.width / 2,H - imgCin.magePsy.height);
        }
        else if (nCine >= 400 && nCine < 410){
            ctx.drawImage(imgCin.magePsy,W/3*2 - imgCin.magePsy.width / 2 - (W/3*2 - W/3 - 10)*(nCine-400)/10,H - imgCin.magePsy.height);
            for (var iii = 0; iii < nCine - 399; iii++) {
                ctx.globalAlpha = 0.4 - (nCine-400 - iii)/40;
                ctx.drawImage(imgCin.magePsy,W/3*2 - imgCin.magePsy.width / 2 - (W/3*2 - W/3 - 10)*iii/10,H - imgCin.magePsy.height);
                ctx.globalAlpha = 1;
            }
        }
        else if (nCine > 410 && nCine < 440){
            ctx.drawImage(imgCin.heroine,W/3 + 45 - imgCin.heroine.width/2,H - imgCin.heroine.height - 80);
            ctx.globalAlpha = 0.2;
            for (var iii = 0; iii < nCine - 410; iii++) {
                ctx.beginPath();
                ctx.arc(W/3 + 45,H - imgCin.heroine.height/2 - 80,(nCine - 410 + iii*5)*20,-Math.PI,Math.PI);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.drawImage(imgCin.magePsy,W/3 + 120 - imgCin.magePsy.width / 2,H - imgCin.magePsy.height);
        }
        else if (nCine >= 440 && nCine < 490){
            ctx.drawImage(imgCin.esprit,W/3 + 45 - imgCin.heroine.width/2,H - imgCin.heroine.height - 80);
            ctx.globalAlpha = 0.2 - (nCine - 440)/30;
            if (0.2 -( nCine - 440)/30 > 0){
                for (var iii = 0; iii < 30; iii++) {
                    ctx.beginPath();
                    ctx.arc(W/3 + 45,H - imgCin.heroine.height/2 - 80,(nCine - 410 + iii*5)*20,-Math.PI,Math.PI);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
            ctx.drawImage(imgCin.magePsy,W/3 + 120 - imgCin.magePsy.width / 2,H - imgCin.magePsy.height);
        }  
        else if (nCine >= 490 && nCine < 690){
            ctx.drawImage(imgCin.magePsy2,W/3 + 120 - imgCin.magePsy.width / 2 + (W - W/3 - 120)*(nCine-490)/200,H - imgCin.magePsy.height);
        }
        if (nCine >= 740){
            nCine = -1;
            cinema = "intro2";
        }
        if (nCine == 410) ctx.fillRect(0,0,W,H);
    }
    else if (cinema == "intro2"){
        ctx.drawImage(imgCin.fond5,0,0,W,H);
        if (nCine < 400) ctx.drawImage(imgCin.vortex2,0,0,W,H);
        if (nCine < 200) ctx.drawImage(imgCin.magePsy2,- imgCin.magePsy2.width / 2 + (W/2-100)*(nCine)/200,H - imgCin.magePsy2.height);
        else if (nCine < 400) ctx.drawImage(imgCin.magePsy2,- imgCin.magePsy2.width / 2 + W/2-100,H - imgCin.magePsy2.height - (H-H/4*3)*(nCine-200)/200);
        else if (nCine < 450) ctx.drawImage(imgCin.magePsy2,- imgCin.magePsy2.width / 2 + W/2-100,H - imgCin.magePsy2.height - H/4);
        else if (nCine < 500) ctx.drawImage(imgCin.magePsy2,- imgCin.magePsy2.width / 2 + W/2-100 + (100)*(nCine-450)/50,H - imgCin.magePsy2.height - H/4);


        if (nCine >= 510){
            nCine = -1;
            cinema = "intro3";
        }
    }
    else if (cinema == "intro3"){
        ctx.drawImage(imgCin.fond3,0,0,W,H);
        ctx.drawImage(imgCin.barre,0,H/2);
        ctx.drawImage(imgCin.barre,W - 500,H/3);
        ctx.drawImage(imgCin.boule4,W - 500,H/3-imgCin.boule4.height);
        if (nCine < 100) ctx.drawImage(imgCin.magePsy2,100,H/2 - imgCin.magePsy2.height);
        else if (nCine == 100) {
            ctx.fillRect(0,0,W,H);
            taille = rnd(50)+100;
            newExplosion(100 + imgCin.magePsy2.width/2 - taille/2 + "px",H/2 - imgCin.magePsy2.height/2 - taille/2 + "px",100 + imgCin.magePsy2.width/2 - taille/2 - rnd(400) + 200 + "px",H/2 - imgCin.magePsy2.height/2 - taille/2 - rnd(200) + "px", taille + "px",3,1);
        }
        else if (nCine <= 150){
            ctx.drawImage(imgCin.magePsy,100,H/2 - imgCin.magePsy.height);
            ctx.drawImage(imgCin.esprit,100 + (W/2-100)*(nCine-100)/50,H/2 - imgCin.esprit.height);
        }
        else if (nCine < 200){
            ctx.drawImage(imgCin.magePsy,100,H/2 - imgCin.magePsy.height);
            ctx.drawImage(imgCin.esprit,W/2,H/2 - imgCin.esprit.height);
        }
        if (nCine >= 550){
            if (jeuCharge == 1){
                nCine = -2;
            }
        }
    }
    nCine += 1;
    if (nCine != -1) animation();
    else preparation();
}

