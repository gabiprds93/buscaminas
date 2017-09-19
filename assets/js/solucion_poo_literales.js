'use strict';
const aplicacion =
{
    elemento:
    {
        mapa: undefined,
        tablero: undefined,
        btnReiniciar: undefined,
        celdas: undefined,
        cont: undefined,
    },
    
    inicio: function()
    {
        aplicacion.elemento.mapa = [
            "*1_1*1__",
            "11_111__",
            "11___111",
            "*11111*1",
            "111*2211",
            "__12*321",
            "___12**1",
            "____1221"];
        aplicacion.elemento.tablero = document.getElementById("tablero");
        aplicacion.elemento.btnReiniciar = document.getElementById("btnReiniciar");
        aplicacion.elemento.cont = 0;
        aplicacion.elemento.celdas = aplicacion.iniciarMatriz(aplicacion.elemento.mapa.length);
        aplicacion.crearCeldas(aplicacion.elemento.mapa.length);
        aplicacion.establecer();
    },
    
    establecer: function()
    {
        aplicacion.elemento.btnReiniciar.addEventListener("click", aplicacion.reiniciar);
    },
    
    iniciarMatriz: function(num)
    {
        let matriz = new Array(num);
        for (let i = 0; i < num; i++)
        {
            matriz[i]= new Array(num);    
        }
        return matriz;
    },
    
    crearCeldas: function(lados)
    {
        while(aplicacion.elemento.tablero.childNodes.length >= 1)
        {
            aplicacion.elemento.tablero.removeChild(tablero.firstChild);
        }
        for(let i = 0; i < lados; i++)
        {
            let fila = document.createElement('tr');
            for(let j = 0; j < lados; j++)
            {
                let columna = document.createElement('td');
                columna.id = `${i}${j}`;
                columna.addEventListener("click", aplicacion.mostrar);
                fila.appendChild(columna);
                aplicacion.elemento.celdas[i][j] = columna;
            }
            aplicacion.elemento.tablero.appendChild(fila);
        }
    },
    
    mostrar: function()
    {
        if(aplicacion.elemento.mapa[this.id[0]][this.id[1]] == "_")
        {
            this.setAttribute("class", "mostrar");
            aplicacion.elemento.cont++;
            this.removeEventListener("click", aplicacion.mostrar);
            aplicacion.abrirAlrededor(this.id[0], this.id[1], aplicacion.elemento.mapa);
        }
        else
        {
            if(aplicacion.elemento.mapa[this.id[0]][this.id[1]] != "*")
            {
                this.textContent = aplicacion.elemento.mapa[this.id[0]][this.id[1]];
                this.setAttribute("class", "mostrar");
                this.removeEventListener("click", aplicacion.mostrar);
                aplicacion.elemento.cont++;
            }
            else
            {						
                aplicacion.abrirBombas(aplicacion.elemento.mapa);
                setTimeout(function(){alert("Perdiste")}, 100);
            }
        }
    },
    
    abrirAlrededor: function(x, y, mapa)
    {
        let coordenadas = [[-1,-1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        x = parseInt(x);
        y = parseInt(y);
        for(let i of coordenadas)
        {
            if((x+i[0]) >= 0 && (x+i[0]) < aplicacion.elemento.mapa.length && (y+i[1]) >= 0 && (y+i[1]) < aplicacion.elemento.mapa.length)
            {
                if(aplicacion.elemento.celdas[x+i[0]][y+i[1]].className != "mostrar")
                {
                    if(aplicacion.elemento.mapa[x+i[0]][y+i[1]] == "_")
                    {
                        aplicacion.elemento.celdas[x+i[0]][y+i[1]].setAttribute("class", "mostrar");
                        aplicacion.elemento.celdas[x+i[0]][y+i[1]].removeEventListener("click", aplicacion.mostrar);
                        aplicacion.elemento.cont++;
                        aplicacion.abrirAlrededor(x+i[0], y+i[1], aplicacion.elemento.mapa);
                    }
                    else if(aplicacion.elemento.mapa[x+i[0]][y+i[1]] != "*")
                    {
                        aplicacion.elemento.celdas[x+i[0]][y+i[1]].textContent = mapa[x+i[0]][y+i[1]];
                        aplicacion.elemento.celdas[x+i[0]][y+i[1]].setAttribute("class", "mostrar");
                        aplicacion.elemento.celdas[x+i[0]][y+i[1]].removeEventListener("click", aplicacion.mostrar);
                        aplicacion.elemento.cont++;
                    }
                }
            }
        }   
    },

    abrirBombas: function(mapa)
    {
        for(let i = 0; i < aplicacion.elemento.mapa.length; i++)
        {
            for(let j = 0; j < aplicacion.elemento.mapa.length; j++)
            {
                aplicacion.elemento.celdas[i][j].removeEventListener("click", aplicacion.mostrar);
                if(aplicacion.elemento.mapa[i][j] == "*")
                {
                    aplicacion.elemento.celdas[i][j].setAttribute("class", "bomba");
                }
            }
        }
    },

    reiniciar: function()
    {
        aplicacion.elemento.cont = 0;
        aplicacion.elemento.celdas = aplicacion.iniciarMatriz(aplicacion.elemento.mapa.length);
        aplicacion.crearCeldas(aplicacion.elemento.mapa.length);
    },
}

function comenzar()
{
    aplicacion.inicio();
}

comenzar();