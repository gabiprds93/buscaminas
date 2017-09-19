'use strict';
class Aplicacion
{
    constructor()
    {
        this.mapa = undefined;
        this.tablero = undefined;
        this.btnReiniciar = undefined;
        this.celdas = undefined;
        this.cont = undefined;
    }
    inicio()
    {
        this.mapa = [
            "*1_1*1__",
            "11_111__",
            "11___111",
            "*11111*1",
            "111*2211",
            "__12*321",
            "___12**1",
            "____1221"];
        this.tablero = document.getElementById("tablero");
        this.btnReiniciar = document.getElementById("btnReiniciar");
        this.cont = 0;
        this.celdas = this.iniciarMatriz(this.mapa.length);
        this.crearCeldas(this.mapa.length);
        this.establecer();
    }
    establecer()
    {
        this.btnReiniciar.addEventListener("click", () => {this.reiniciar()});
    }

    iniciarMatriz(num)
    {
        let matriz = new Array(num);
        for (let i = 0; i < num; i++)
        {
            matriz[i]= new Array(num);    
        }
        return matriz;
    }

    crearCeldas(lados)
    {
        while(this.tablero.childNodes.length >= 1)
        {
            this.tablero.removeChild(this.tablero.firstChild);
        }
        for(let i = 0; i < lados; i++)
        {
            let fila = document.createElement('tr');
            for(let j = 0; j < lados; j++)
            {
                let columna = document.createElement('td');
                columna.id = `${i}${j}`;
                columna.addEventListener("click", () => 
                {
                    this.mostrar(columna.id);
                }, false);
                fila.appendChild(columna);
                this.celdas[i][j] = columna;
            }
            this.tablero.appendChild(fila);
        }
    }
    
    mostrar(id)
    {
        if(this.mapa[id[0]][id[1]] == "_")
        {
            this.celdas[id[0]][id[1]].setAttribute("class", "mostrar");
            this.cont++;
            this.celdas[id[0]][id[1]].removeEventListener("click", () => 
            {
                this.mostrar(id);
            }, false);
            this.abrirAlrededor(id[0], id[1], this.mapa);
        }
        else
        {
            if(this.mapa[id[0]][id[1]] != "*")
            {
                this.celdas[id[0]][id[1]].textContent = this.mapa[id[0]][id[1]];
                this.celdas[id[0]][id[1]].setAttribute("class", "mostrar");
                this.celdas[id[0]][id[1]].removeEventListener("click", this.mostrar);
                this.cont++;
            }
            else
            {						
                this.abrirBombas(this.mapa);
                setTimeout(function(){alert("Perdiste")}, 100);
            }
        }
    }
    
    abrirAlrededor(x, y, mapa)
    {
        let coordenadas = [[-1,-1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        x = parseInt(x);
        y = parseInt(y);
        for(let i of coordenadas)
        {
            if((x+i[0]) >= 0 && (x+i[0]) < this.mapa.length && (y+i[1]) >= 0 && (y+i[1]) < this.mapa.length)
            {
                if(this.celdas[x+i[0]][y+i[1]].className != "mostrar")
                {
                    if(this.mapa[x+i[0]][y+i[1]] == "_")
                    {
                        this.celdas[x+i[0]][y+i[1]].setAttribute("class", "mostrar");
                        this.celdas[x+i[0]][y+i[1]].removeEventListener("click", this.mostrar);
                        this.cont++;
                        this.abrirAlrededor(x+i[0], y+i[1], this.mapa);
                    }
                    else if(this.mapa[x+i[0]][y+i[1]] != "*")
                    {
                        this.celdas[x+i[0]][y+i[1]].textContent = this.mapa[x+i[0]][y+i[1]];
                        this.celdas[x+i[0]][y+i[1]].setAttribute("class", "mostrar");
                        this.celdas[x+i[0]][y+i[1]].removeEventListener("click", this.mostrar);
                        this.cont++;
                    }
                }
            }
        }   
    }

    abrirBombas(mapa)
    {
        for(let i = 0; i < this.mapa.length; i++)
        {
            for(let j = 0; j < this.mapa.length; j++)
            {
                this.celdas[i][j].removeEventListener("click", this.mostrar);
                if(this.mapa[i][j] == "*")
                {
                    this.celdas[i][j].setAttribute("class", "bomba");
                }
            }
        }
    }

    reiniciar()
    {
        this.cont = 0;
        this.celdas = this.iniciarMatriz(this.mapa.length);
        this.crearCeldas(this.mapa.length);
    }
}

let aplicacion = new Aplicacion();
aplicacion.inicio();