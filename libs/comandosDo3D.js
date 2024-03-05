let teclaPressionada = {}

function comandosDo3D(ojetoJogador, idJogador) {
    if (!ojetoJogador[idJogador]) {
        return
    }

    if (teclaPressionada.d)
        ojetoJogador[idJogador].position.x += 0.05
    if (teclaPressionada.a)
        ojetoJogador[idJogador].position.x -= 0.05
    if (teclaPressionada.w)
        ojetoJogador[idJogador].position.y += 0.05
    if (teclaPressionada.s)
        ojetoJogador[idJogador].position.y -= 0.05

    const { x, y, z } = ojetoJogador[idJogador].position
        ////////////////////////////////////////////////////////////////////////////

    let apertarTecla = function(e) {
        teclaPressionada[e.key] = true
    }

    let soltarTecla = function(e) {
        delete teclaPressionada[e.key]
    }

    window.addEventListener('keydown', apertarTecla)
    window.addEventListener('keyup', soltarTecla)

    window.document.getElementById('cima').addEventListener('mouseup', function() {
        setTimeout(function() {
            delete teclaPressionada['w']
        }, 500)
    })
    window.document.getElementById('cima').addEventListener('click', function() {
        teclaPressionada['w'] = true
    })

    window.document.getElementById('esquerda').addEventListener('mouseup', function() {
        setTimeout(function() {
            delete teclaPressionada['a']
        }, 500)
    })
    window.document.getElementById('esquerda').addEventListener('click', function() {
        teclaPressionada['a'] = true
    })

    window.document.getElementById('direita').addEventListener('mouseup', function() {
        setTimeout(function() {
            delete teclaPressionada['d']
        }, 500)
    })
    window.document.getElementById('direita').addEventListener('click', function() {
        teclaPressionada['d'] = true
    })


    window.document.getElementById('baixo').addEventListener('mouseup', function() {
        setTimeout(function() {
            delete teclaPressionada['s']
        }, 500)
    })
    window.document.getElementById('baixo').addEventListener('click', function() {
        teclaPressionada['s'] = true
    })

    ////////////////////////////////////////////////////////////////////////////////

    return {
        x,
        y,
        z,
        idJogador
    }
}

module.exports = comandosDo3D