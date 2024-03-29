function start() {

    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class= 'anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class= 'anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2' ></div>");
    $("#fundoGame").append("<div id='amigo' class= 'anima3'></div>");
   
    var podeAtirar = true;
    var fimdejogo=flase;
    var jogo = {}
    var velocidade = 5
    var posicaoY = parseInt(Math.random() * 334)

    var TECLA = {
        W: 87,
        S: 83,
        D: 68
        }

        jogo.presionou = [];
        
        $(document).keydown(function(e){
            jogo.presionou[e.which] = true;
        });

        $(document).keyup(function(e){
            jogo.presionou[e.which] = false;
        })
    
    jogo.timer = setIterval(loop, 30);

    function loop() {
        
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
    }

    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda -1);
    }

    function movejogador(){
        if(jogo.presionou[TECLA.W]) {
            var topo = parseInt($("#fundoGame").css("background-position"));
            $("#jogador").css("top", topo-10);

            if(topo<=0){
                $("#jogador").css("top", topo+10);
            }

        }

        if(jogo.presionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo-10);

            if (topo >= 434) {
                $("#jogador").css("top", topo-10);
            }
        }

        if (jogo.presionou[TECLA.D]){
            disparo();
        }
    }

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);

            if(posicaoX<=0){
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left", 694);
                $("#inimigo1").css("top",posicaoY);
            }
    }

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX-3);

        if(posicaoX<= 0){
            $("#inimigo2").css("left", 775);
        }
    }

    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX+1);

        if(posicaoX>906) {
            $("#amigo").css("left", 0);
        }
    }

    function disparo() {
        if(podeAtirar === true){
            podeAtirar = false;
            
            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX;
            topoTiro = topo + 37;
            $("#fundoGamer").append("<div id = 'disparo'>,</div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30)
        }

        function executaDisparo(){
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX+15);
    
            if (posicaoX>900){
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }

 
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")))
        var colisao2 = ($("#jogador").collision($("#inimigo2")))
        var colisao3 = ($("#disparo").collision($("#inimigo1")))
        var colisao4 = ($("#disparo").collision($("#inimigo2")))
        var colisao5 = ($("#jogador").collision($("#amigo")))
        var colisao6 = ($("#inimigo2").collision($("#amigo")))

        if (colisao1.length>0){
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    
        if (colisao2.length>0){
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao1(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();

            reposicionaInimigo2();
        }

        if (colisao3.length>0){
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            
            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        } 
        
        if (colisao4.length>0){
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove()

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            reposicionaInimigo2()

        }

        if (colisao5.length>0){
            reposicionaAmigo();
            $("#amigo").remove();

        }
        
    }


    function explosao1(inimigo1X, inimigo1Y) {
        $("#fundoGamer").append("<div id= 'explosao' ></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div=$("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity: 0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

            function removeExplosao() {
                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao=null;
            }
                
    }
    
    function explosao2(inimigo2X, inimigo2Y) {
        $("#fundoGamer").append("<div id= 'explosao2' ></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity: 0}, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

            function removeExplosao2() {
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
            }
                
    }
    
    function reposicionaInimigo2() {
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
        
            if (fimdejogo == false){
            $("#fundoGame").append("<div id= 'inimigo2'></div>");
            }
        }
    }

    function reposicionaAmigo() {
        var tempoAmigo=window.setInterval(reposiciona6, 6000);

        function reposiciona6(){
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;

            if(fimdejogo == false) {
                $("#fundoGame").append("<div id= 'amigo' class= 'anima3'></div>")
            }
        }
    }
}