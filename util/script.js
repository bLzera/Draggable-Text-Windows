const debuga = document.getElementById("debugger");
const botaoadiciona = document.getElementById("adiciona");
const middlecorpo = document.getElementById("middle_corpo");
const background = document.getElementById("middle__corpo__background");
const root = document.querySelector(":root");
const botaotemaescuro = document.getElementById("temas__escuro");
const botaotemaclaro = document.getElementById("temas__branco");

let offsetX, offsetY, img, estica, janelas, movel;
janelas = 1;

var podeMover = {}; 
var qualJanela = [];

function defineDebugger(janela) {
    return janela.offsetLeft.toString() + ' x, ' + janela.offsetTop.toString() + ' y; </br> ' + janela.offsetWidth + 'px width, ' + janela.offsetHeight + 'px height; </br> ' + `${janelas - 1}` + ' janelas abridas;';
}

function moveWindow(janela) {
    document.querySelector("body").style.userSelect = "none";
    debuga.innerHTML = defineDebugger(janela);
}

const move = (e) => {
    if (podeMover[movel.getAttribute("id")]) {
        moveWindow(movel);
        movel.style.left = e.clientX - offsetX >= document.getElementById("left__menu").offsetWidth &&  e.clientX - offsetX <= (document.body.offsetWidth - movel.offsetWidth) ? `${e.clientX - offsetX}px` : movel.style.left;
        movel.style.top = e.clientY - offsetY >= 0 && e.clientY - offsetY <= (document.body.offsetHeight - movel.offsetHeight) ? `${e.clientY - offsetY}px` : movel.style.top;
    }
};

const resize = (e) => {
    let textotitulo = (document.getElementById("titulo__janela" + parseInt(movel.getAttribute("id").replace("draggable", ""))));
    let conteudo = (document.getElementById("conteudo__draggable" + parseInt(movel.getAttribute("id").replace("draggable", ""))));
    let barrabaixa = (document.getElementById("footer__draggable" + parseInt(movel.getAttribute("id").replace("draggable", ""))));
    movel.style.minHeight = conteudo.offsetHeight + (barrabaixa.offsetHeight*2);
    if (podeMover[movel.getAttribute("id")]) {
        moveWindow(movel);
        movel.style.width = (e.clientX - offsetX) >= textotitulo.offsetWidth + 60 ? `${e.clientX - offsetX}px` : movel.style.width;
        movel.style.height = `${e.clientY - offsetY}px`;
    }
};

const resizedown = (e) => {
    let barrabaixa = (document.getElementById("footer__draggable" + parseInt(movel.getAttribute("id").replace("draggable", ""))));    
    let conteudo = (document.getElementById("conteudo__draggable" + parseInt(movel.getAttribute("id").replace("draggable", ""))));    
    if (podeMover[movel.getAttribute("id")]) {
        moveWindow(movel);
        movel.style.height = e.clientY - offsetY > (conteudo.offsetHeight + (barrabaixa.offsetHeight*2)) ? `${e.clientY - offsetY}px` : movel.style.height;
    }   
};

const defineTemaClaro = (e) => {
    root.style.setProperty("--active__theme__borders", 								"var(--white__theme__borders)");
    root.style.setProperty("--active__theme__background", 							"var(--white__theme__background)");
    root.style.setProperty("--active__theme__buttons__background", 					"var(--white__theme__buttons__background)");
    root.style.setProperty("--active__theme__windows__background", 					"var(--white__theme__windows__background)");
    root.style.setProperty("--active__theme__windows__header",						"var(--white__theme__windows__header)");
    root.style.setProperty("--active__theme__windows__button__active", 				"var(--white__theme__windows__button__active)");
    root.style.setProperty("--active__theme__windows__outline", 					"var(--white__theme__windows__outline)");
    root.style.setProperty("--active__theme__left__menu__background", 				"var(--white__theme__left__menu__background)");
    root.style.setProperty("--active__theme__left__menu__container__background", 	"var(--white__theme__left__menu__container__background)");
}

const defineTemaEscuro = (e) => {
    root.style.setProperty("--active__theme__borders", 								"var(--black__theme__borders)");
    root.style.setProperty("--active__theme__background", 							"var(--black__theme__background)");
    root.style.setProperty("--active__theme__buttons__background", 					"var(--black__theme__buttons__background)");
    root.style.setProperty("--active__theme__windows__background", 					"var(--black__theme__windows__background)");
    root.style.setProperty("--active__theme__windows__header",						"var(--black__theme__windows__header)");
    root.style.setProperty("--active__theme__windows__button__active", 				"var(--black__theme__windows__button__active)");
    root.style.setProperty("--active__theme__windows__outline", 					"var(--black__theme__windows__outline)");
    root.style.setProperty("--active__theme__left__menu__background", 				"var(--black__theme__left__menu__background)");
    root.style.setProperty("--active__theme__left__menu__container__background", 	"var(--black__theme__left__menu__container__background)");
}

botaotemaescuro.addEventListener("click", defineTemaEscuro);

botaotemaclaro.addEventListener("click", defineTemaClaro);

botaoadiciona.addEventListener("click", () => {
    const newWindowId = `draggable${janelas}`;

    podeMover[newWindowId] = 1;
    qualJanela.push(newWindowId);    
    
    const novaJanela = `
    <div class="draggable" id="${newWindowId}">
        <div class="cabeca" id="cabeca${janelas}">
            <button class="botao__solta" id="botao__solta${janelas}"></button>        
            <label contenteditable="false" type="text" class="titulo__janela" id="titulo__janela${janelas}">JANELA ${janelas}</label>
            <button class="botao__fecha" id="botao__fecha${janelas}"></button>
        </div>
        <div class="corpo__janela" id="corpo__janela${janelas}">
            <label contenteditable="false" class="conteudo__draggable" id="conteudo__draggable${janelas}" contenteditable="false"></label>
        </div>
        <div class="footer__draggable" id="footer__draggable${janelas}">
            <div class="pe" id="pe${janelas}"></div>
        </div>
    </div>`;

    middlecorpo.insertAdjacentHTML('afterbegin', novaJanela);

    const janela = document.getElementById(newWindowId);
    const cabeca = document.getElementById(`cabeca${janelas}`);
    const pe = document.getElementById(`pe${janelas}`);
    const botaosolta = document.getElementById(`botao__solta${janelas}`);
    const barrabaixa = document.getElementById(`footer__draggable${janelas}`);
    const titulo = document.getElementById(`titulo__janela${janelas}`);
    const botaofecha = document.getElementById(`botao__fecha${janelas}`);
    const conteudo = document.getElementById(`conteudo__draggable${janelas}`);
    const corpojanela = document.getElementById(`corpo__janela${janelas}`);

    janela.style.zIndex = `${janelas+1}`;

    corpojanela.addEventListener("dblclick", (e) => {        
        conteudo.setAttribute("contenteditable", "true");
        conteudo.focus();
        conteudo.style.userSelect = "auto";
        console.log(conteudo.offsetWidth);
    });

    conteudo.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && !e.shiftKey) {
            conteudo.setAttribute("contenteditable", "false");
            conteudo.style.userSelect = "none";
        }
        if (janela.offsetHeight < conteudo.offsetHeight + (barrabaixa.offsetHeight*2)){
            janela.style.height = `${conteudo.offsetHeight + (barrabaixa.offsetHeight*2)}px`;
        }
    });

    conteudo.addEventListener("focus", (e) => {
        janela.setAttribute("outline", "double 5px var(--white__theme__buttons__background)");
    });    

    conteudo.addEventListener("focusout", (e) => {
        conteudo.setAttribute("contenteditable", "false");        
        conteudo.style.userSelect = "none";            
        janela.setAttribute("outline", "none");
    });       

    botaofecha.addEventListener("mouseup", (e) => {
        janela.outerHTML = "";
    });

    barrabaixa.addEventListener("mousedown", (e) => {
        offsetY = e.clientY - janela.offsetHeight;
        movel = janela;
        document.addEventListener("mousemove", resizedown);        
    });

    cabeca.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - janela.offsetLeft;
        offsetY = e.clientY - janela.offsetTop;
        movel = janela;
        document.addEventListener("mousemove", move);
    });

    titulo.addEventListener("dblclick", (e) => {
        titulo.setAttribute("contenteditable", "true");
        titulo.focus();
        janela.style.userSelect = "auto";      
        console.log(titulo.offsetWidth);
    });

    titulo.addEventListener("keydown", (e) => {
        if ((titulo.innerHTML.length >= 30 && e.code != "ArrowLeft" && e.code !=  "ArrowRight" && e.code !=  "Backspace" && e.code !=  "Home" && e.code !=  "End")  || 
            (janela.getBoundingClientRect().left + (titulo.offsetWidth + botaosolta.offsetWidth + botaofecha.offsetWidth + 50)) >= (document.body.offsetWidth)){
            e.preventDefault();
        }
        if (e.code == "Enter"){
            titulo.setAttribute("contenteditable", "false");         
            janela.style.userSelect = "none";            
        }
        if((titulo.offsetWidth + botaosolta.offsetWidth + botaofecha.offsetWidth + 30) > janela.offsetWidth){
            janela.style.width = `${titulo.offsetWidth + botaosolta.offsetWidth + botaofecha.offsetWidth + 30}px`;
        }
    });    

    titulo.addEventListener("focusout", (e) => {
        titulo.setAttribute("contenteditable", "false");        
        janela.style.userSelect = "none";            
    });

    pe.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - janela.offsetWidth;
        offsetY = e.clientY - janela.offsetHeight;

        movel = janela;
        document.addEventListener("mousemove", resize);
    });

    botaosolta.addEventListener("mousedown", (e) => {
        console.log(qualJanela[parseInt(botaosolta.getAttribute("id").replace("botao__solta", "")) - 1]);
        console.log(janela);
        if (podeMover[janela.getAttribute("id")] == 0) {
            cabeca.style.cursor = "move";
            titulo.style.cursor = "move";
            barrabaixa.style.cursor = "ns-resize";
            pe.style.cursor = "nwse-resize";
            botaosolta.style.backgroundColor = "var(--white__theme__windows__header)";            
            botaosolta.style.border = "0";            
            podeMover[janela.getAttribute("id")] = 1;
        } else {
            cabeca.style.cursor = "auto";
            titulo.style.cursor = "pointer";
            barrabaixa.style.cursor = "auto";
            pe.style.cursor = "auto";
            botaosolta.style.backgroundColor = "var(--white__theme__windows__button__active)";
            botaosolta.style.border = "solid 1px var(--white__theme__borders)";
            podeMover[janela.getAttribute("id")] = 0;            
        }
    });

    janela.addEventListener("mousedown", () => {
        let max = 0;
        janela.style.outline = "solid 3px var(--active__theme__windows__outline)";        
        let divs = document.querySelectorAll(".draggable");
        for(let i = 0; i <= divs.length - 1; i++){
            if(divs[i].getAttribute("id") != janela.getAttribute("id")){
                divs[i].style.outline = "none";
            }
        }
        for(let i = 0; i <= divs.length - 1; i++){
            if (divs[i].style.zIndex > janela.style.zIndex){
                if (divs[i].style.zIndex > max){
                    max = divs[i].style.zIndex; 
                }
                divs[i].style.zIndex -= 1;
            }
        }        
        if (janela.style.zIndex != max && max != 0){                   
            janela.style.zIndex = max;
        }
    });

    defineDebugger(janela);
    janelas++;
});

background.addEventListener("mousedown", () => {
    divs = document.querySelectorAll(".draggable");
    for(let i = 0; i <= divs.length - 1; i++){
        divs[i].style.outline = "none";
    }    
})

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mousemove", resizedown);
    /*document.removeEventListener("mousedown", defineTemaClaro);
    document.removeEventListener("mousedown", defineTemaEscuro);*/
    document.querySelector("body").style.userSelect = "auto";
});

/*imagem.addEventListener("change", (e) => {
    img = e.target.files[0];
    if (movel) {
        movel.style.backgroundImage = `url(${URL.createObjectURL(img)})`;
        console.log(`url(${URL.createObjectURL(img)})`);
    }
});*/