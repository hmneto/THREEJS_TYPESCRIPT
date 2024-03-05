import Elements3D from './libs/Element3D'
const io = require('socket.io-client')

class Index{
    elements3D: Elements3D
    socket: any
    constructor() {
        // this.socket = io("http://localhost:3001");
        this.elements3D = new Elements3D()
        this.animate = this.animate.bind(this);
        document.body.appendChild(this.elements3D.renderer.domElement)
    }

    animate() {
        requestAnimationFrame(this.animate)

        if (this.elements3D.RESOURCES_LOADED == false) {    
            this.elements3D.loadingScreen.box2.position.x -= 0.05
            if (this.elements3D.loadingScreen.box2.position.x < -10) this.elements3D.loadingScreen.box2.position.x = 10
            this.elements3D.loadingScreen.box2.position.y = Math.sin(this.elements3D.loadingScreen.box2.position.x)    
            this.elements3D.renderer.render(this.elements3D.loadingScreen.scene2, this.elements3D.loadingScreen.camera2)
            return
        }

        this.elements3D.bulletMoviment()

        this.elements3D.cubo.rotation.x+=0.01
        this.elements3D.cubo.rotation.y+=0.01

        // this.elements3D.s_pressed()
        // this.elements3D.w_pressed()
        // this.elements3D.a_pressed()
        // this.elements3D.d_pressed()

        // this.elements3D.left_pressed()
        // this.elements3D.right_pressed()

        this.elements3D.space_pressed()
        // this.elements3D.gun_moviment()

        this.elements3D.Orbit()
        this.elements3D.renderer.render(this.elements3D.cena, this.elements3D.camera)
    }
}

new Index().animate()





// const io = require('socket.io-client')

// const URL2 = "http://localhost:3001";


// const { cena, camera, renderer, cubo } = require('./libs/elementosDo3D')(THREE)
// let jogadoresTela :any = {}

// const mesh = require('./libs/criaMalha')(jogadoresTela, cena, cubo)
// const comandosDo3D = require('./libs/comandosDo3D')


// const socket = io(URL2);





// window.onload = function() {

//     document.body.appendChild(renderer.domElement)
//     renderer.setSize(window.innerWidth - 40, window.innerHeight - 40)
//     animar()
// }

// new Promise(function(resolve) {
//     socket.on('connect', function() {
//         resolve(socket.id)
//     })
// }).then(resolvePromise)

// function resolvePromise(IDdoSocket:any) {
//     jogadoresTela = mesh(IDdoSocket)
//     const { x, y, z } = jogadoresTela[IDdoSocket].position
//     socket.emit('adicionarJogador', JSON.stringify({ x, y, z, IDdoSocket }))
// }


// function animar() {
//     requestAnimationFrame(animar)
//     renderer.render(cena, camera)
//     const ObjJsonSocket = comandosDo3D(jogadoresTela, socket.id)
//     socket.emit('jogadorAtual', JSON.stringify(ObjJsonSocket))
// }


// socket.on('listaDeJogadoresPosicionados', function(jogadoresConectados: string) {
//     const jogadoresConectadosParsedJson = JSON.parse(jogadoresConectados)
//     const jogadoresConectadosParsedArray = Object.keys(jogadoresConectadosParsedJson)

//     jogadoresConectadosParsedArray.forEach(array)


//     function array(JogadorConectado:any) {
//         // console.log(jogadoresConectadosParsedJson)
//         const { idJogador, x, y, z } = jogadoresConectadosParsedJson[JogadorConectado]

//         if (idJogador != socket.id) {

//             if (!jogadoresTela[JogadorConectado]) {
//                 jogadoresTela = mesh(JogadorConectado)

//             }
//             jogadoresTela[idJogador].position.set(x, y, z)
//         }

//     }

// })

// socket.on('jogadorSaiu',jogadorSaiu )

// function jogadorSaiu(idDoJogadorQueSaiu: any) {
//     let selectedObject = cena.getObjectByName(JSON.parse(idDoJogadorQueSaiu))
//     cena.remove(selectedObject)
// }