const div = document.querySelector(".draggable");
const resizable = document.querySelector(".resizable");
const cabeca = document.querySelector(".cabeca");
const pe = document.querySelector(".pe");
const debuga = document.getElementById("debugger");
const imagem = document.getElementById("imagem");
const cabecalho = document.querySelector(".cabecalho");
const leftmenu = document.querySelector(".left__menu");
const botaosolta = document.getElementById("botao__solta");


let offsetX, offsetY, img, movel, estica;

function defineDebugger (){
    return div.offsetLeft.toString() + ' x, ' + div.offsetTop.toString() + ' y; </br> ' + div.style.width.toString() + ' width, ' + div.style.height.toString() + ' height;';    
}

function moveWindow(){
    document.querySelector("body").style.userSelect = "none";
    debuga.innerHTML = defineDebugger();
}

const move = (e) => {
    if (movel) {
    moveWindow();
        div.style.left = e.clientX - offsetX >= 180 ? `${e.clientX - offsetX}px` : div.style.left;
        div.style.top = e.clientY - offsetY >= 80 ? `${e.clientY - offsetY}px` : div.style.top;
    }
};

const resize = (e) => {
    if (estica){
    moveWindow();
        div.style.width = `${e.clientX - offsetX}px`;
        div.style.height = `${e.clientY - offsetY}px`;
    }
}

botaosolta.addEventListener("click", (e) => {
    if (movel){
        movel = 0;
        estica = 0;
        return;
    } 
    div.style.position = "absolute";
    movel = 1;
    estica = 1;
})

cabeca.addEventListener("mousedown", (e) => {

    offsetX = e.clientX - div.offsetLeft;
    offsetY = e.clientY - div.offsetTop;    
    document.addEventListener("mousemove", move);

});

pe.addEventListener("mousedown", (e) => {

    offsetX = (e.clientX) - div.offsetWidth;
    offsetY = (e.clientY) - div.offsetHeight;    
    document.addEventListener("mousemove", resize);

})

imagem.addEventListener("change", (e) => {
    img = e.target.files[0];
    div.style.backgroundImage = `url(${URL.createObjectURL(img)})`;
    console.log(`url(${URL.createObjectURL(img)})`);
});

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mousemove", resize);

    document.querySelector("body").style.userSelect = "auto";
});

console.log(cabecalho.style.height)