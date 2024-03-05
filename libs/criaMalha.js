module.exports = function(jogadoresTelaMesh, cena, teste) {
    return function(IDdoSocket) {
        jogadoresTelaMesh[IDdoSocket] = teste.clone()
        jogadoresTelaMesh[IDdoSocket].position.z += -15
        jogadoresTelaMesh[IDdoSocket].name = IDdoSocket
        cena.add(jogadoresTelaMesh[IDdoSocket])

        return jogadoresTelaMesh
    }
}