'use strict';
const mapa = [
    "*1_1*1__",
    "11_111__",
    "11___111",
    "*11111*1",
    "111*2211",
    "__12*321",
    "___12**1",
    "____1221"];

let tablero = undefined;
let btnReiniciar = undefined;
let celdas = undefined;
let cont = undefined;
inicio();

function inicio()
{
    tablero = document.getElementById("tablero");
    btnReiniciar = document.getElementById("btnReiniciar");
    cont = 0;
    celdas = iniciarMatriz(mapa.length);
    crearCeldas(mapa.length);
    establecer();
}

function establecer()
{
    btnReiniciar.addEventListener("click", reiniciar);
}

function iniciarMatriz(num)
{
    let matriz = new Array(num);
    for (let i = 0; i < num; i++)
    {
        matriz[i]= new Array(num);    
    }
    return matriz;
}

function crearCeldas(lados)
{
    while(tablero.childNodes.length >= 1)
    {
        tablero.removeChild(tablero.firstChild);
    }
    for(let i = 0; i < lados; i++)
    {
        let fila = document.createElement('tr');
        for(let j = 0; j < lados; j++)
        {
            let columna = document.createElement('td');
            columna.id = `${i}${j}`;
            columna.addEventListener("click", mostrar);
            fila.appendChild(columna);
            celdas[i][j] = columna;
        }
        tablero.appendChild(fila);
    }
}
function mostrar()
{
    if(mapa[this.id[0]][this.id[1]] == "_")
    {
        this.setAttribute("class", "mostrar");
        cont++;
        this.removeEventListener("click", mostrar);
        abrirAlrededor(this.id[0], this.id[1], mapa);
    }
    else
    {
        if(mapa[this.id[0]][this.id[1]] != "*")
        {
            this.textContent = mapa[this.id[0]][this.id[1]];
            this.setAttribute("class", "mostrar");
            this.removeEventListener("click", mostrar);
            cont++;
        }
        else
        {						
            abrirBombas(mapa);
            setTimeout(function(){alert("Perdiste")}, 100);
        }
    }
}
    
function abrirAlrededor(x, y, mapa)
{
    let coordenadas = [[-1,-1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    x = parseInt(x);
    y = parseInt(y);
    for(let i of coordenadas)
    {
        if((x+i[0]) >= 0 && (x+i[0]) < mapa.length && (y+i[1]) >= 0 && (y+i[1]) < mapa.length)
        {
            if(celdas[x+i[0]][y+i[1]].className != "mostrar")
            {
                if(mapa[x+i[0]][y+i[1]] == "_")
                {
                    celdas[x+i[0]][y+i[1]].setAttribute("class", "mostrar");
                    celdas[x+i[0]][y+i[1]].removeEventListener("click", mostrar);
                    cont++;
                    abrirAlrededor(x+i[0], y+i[1], mapa);
                }
                else if(mapa[x+i[0]][y+i[1]] != "*")
                {
                    celdas[x+i[0]][y+i[1]].textContent = mapa[x+i[0]][y+i[1]];
                    celdas[x+i[0]][y+i[1]].setAttribute("class", "mostrar");
                    celdas[x+i[0]][y+i[1]].removeEventListener("click", mostrar);
                    cont++;
                }
            }
        }
    }   
}

function abrirBombas(mapa)
{
    for(let i = 0; i < mapa.length; i++)
    {
        for(let j = 0; j < mapa.length; j++)
        {
            celdas[i][j].removeEventListener("click", mostrar);
            if(mapa[i][j] == "*")
            {
                celdas[i][j].setAttribute("class", "bomba");
            }
        }
    }
}

function reiniciar()
{
    cont = 0;
    celdas = iniciarMatriz(mapa.length);
    crearCeldas(mapa.length);
}