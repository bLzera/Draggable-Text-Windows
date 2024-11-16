const debuga = document.getElementById("debugger");
const imagem = document.getElementById("imagem");
const botaoadiciona = document.getElementById("adiciona");
const middlecorpo = document.getElementById("middle_corpo");

let offsetX, offsetY, img, estica, janelas, movel;
janelas = 1;

var podeMover = {};
var qualJanela = [];

function defineDebugger(janela) {
    return janela.offsetLeft.toString() + ' x, ' + janela.offsetTop.toString() + ' y; </br> ' + janela.style.width.toString() + ' width, ' + janela.style.height.toString() + ' height; </br> ' + `${janelas - 1}` + ' janelas abertas;';
}

function moveWindow(janela) {
    document.querySelector("body").style.userSelect = "none";
    debuga.innerHTML = defineDebugger(janela);
}

const move = (e) => {
    if (podeMover[movel.getAttribute("id")]) {
        moveWindow(movel);
        movel.style.left = e.clientX - offsetX >= document.getElementById("left__menu").offsetWidth ? `${e.clientX - offsetX}px` : movel.style.left;
        movel.style.top = e.clientY - offsetY >= document.getElementById("cabecalho").offsetHeight ? `${e.clientY - offsetY}px` : movel.style.top;
    }
};

const resize = (e) => {
    if (podeMover[movel.getAttribute("id")]) {
        moveWindow(movel);
        movel.style.width = `${e.clientX - offsetX}px`;
        movel.style.height = `${e.clientY - offsetY}px`;
    }
};

const resizedown = (e) => {
    if (podeMover[movel.getAttribute("id")]) {
        moveWindow(movel);
        movel.style.height = `${e.clientY - offsetY}px`;
    }    
}

botaoadiciona.addEventListener("click", () => {
    const newWindowId = `draggable${janelas}`;
    
    const novaJanela = `
    <div class="draggable" id="${newWindowId}">
        <div class="cabeca" id="cabeca${janelas}">
            <button class="botao__solta" id="botao__solta${janelas}"></button>
        </div>
        <div class="footer__draggable" id="footer__draggable${janelas}">
            <div class="pe" id="pe${janelas}"></div>
        </div>
    </div>`;
    middlecorpo.insertAdjacentHTML('afterbegin', novaJanela);

    const janela = document.getElementById(newWindowId);

    janela.style.zIndex = `${janelas+1}`;

    const cabeca = document.getElementById(`cabeca${janelas}`);
    const pe = document.getElementById(`pe${janelas}`);
    const botaosolta = document.getElementById(`botao__solta${janelas}`);
    const barrabaixa = document.getElementById(`footer__draggable${janelas}`);

    podeMover[newWindowId] = 0;
    qualJanela.push(newWindowId);

    barrabaixa.addEventListener("mousedown", (e) => {
        let window = document.getElementById(qualJanela[parseInt(pe.getAttribute("id").replace("pe", "")) - 1])        
        offsetY = e.clientY - window.offsetHeight;

        movel = window;
        estica = 1;
        document.addEventListener("mousemove", resizedown);        
    })

    cabeca.addEventListener("mousedown", (e) => {
        let window = document.getElementById(qualJanela[parseInt(cabeca.getAttribute("id").replace("cabeca", "")) - 1])
        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;

        movel = window;
        document.addEventListener("mousemove", move);
    });

    pe.addEventListener("mousedown", (e) => {
        let window = document.getElementById(qualJanela[parseInt(pe.getAttribute("id").replace("pe", "")) - 1])        
        offsetX = e.clientX - window.offsetWidth;
        offsetY = e.clientY - window.offsetHeight;

        movel = window;
        estica = 1;
        document.addEventListener("mousemove", resize);
    });

    botaosolta.addEventListener("mousedown", (e) => {
        console.log(qualJanela[parseInt(botaosolta.getAttribute("id").replace("botao__solta", "")) - 1]);
        let window = document.getElementById(`${qualJanela[parseInt(botaosolta.getAttribute("id").replace("botao__solta", "")) - 1]}`)                
        console.log(window);
        if (podeMover[window.getAttribute("id")] == 0) {
            window.style.position = "absolute";
            podeMover[window.getAttribute("id")] = 1;
        } else {
            podeMover[window.getAttribute("id")] = 0;
        }
    });

    janela.addEventListener("mousedown", () => {
        let max = 0;
        let window = document.getElementById(`${qualJanela[parseInt(janela.getAttribute("id").replace("draggable", "")) - 1]}`)          
        let divs = document.querySelectorAll(".draggable");
        for(let i = 0; i <= divs.length - 1; i++){
            if (divs[i].style.zIndex > window.style.zIndex){
                if (divs[i].style.zIndex > max){
                    max = divs[i].style.zIndex; 
                }
                divs[i].style.zIndex -= 1;
            }
        }        
        if (window.style.zIndex != max && max != 0){                   
            window.style.zIndex = max;
        }
    })
    
    janelas++;
});

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mousemove", resizedown);
    document.querySelector("body").style.userSelect = "auto";
});

imagem.addEventListener("change", (e) => {
    img = e.target.files[0];
    if (movel) {
        movel.style.backgroundImage = `url(${URL.createObjectURL(img)})`;
        console.log(`url(${URL.createObjectURL(img)})`);
    }
});