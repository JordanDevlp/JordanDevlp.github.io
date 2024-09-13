
// POST https://translation.googleapis.com/v3/projects/PROJECT_NUMBER_OR_ID/locations/LOCATION:translateText

var box = document.getElementById('box');
var Iniciar = document.querySelector("#empezar");
var Detener = document.getElementById('detener');

const KEY = 'e3db3e3a79bb9303fd3007a0c609eb72929b54a6';




// 'wss://api.deepgram.com/v1/listen'
// 'https://api.deepgram.com/v1/listen?language=multi&model=nova-2
// 'https://api.deepgram.com/v1/listen?language=es'

Iniciar.addEventListener("click", () => {

navigator.mediaDevices.getUserMedia({ audio:true}).then((stream) => {
    
    console.log("microfono activado")
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm'})

    const socket = new WebSocket ('https://api.deepgram.com/v1/listen?language=es&model=nova', ['token', KEY])

    // const TranslateSocket = new WebSocket ('https://translation.googleapis.com/language/translate/v2');

    

    
    socket.onopen = () => {
        console.log(socket.readyState)
        mediaRecorder.addEventListener('dataavailable', event => {
            socket.send(event.data)
            
        })
        
        mediaRecorder.start(250)
    }


    //hacer que no espere a que haya una pausa para comenzar a mostrar la data//


    Detener.addEventListener('click', () => {
        mediaRecorder.stop();
        console.log("microfono desactivado");
    })
    

    
    
    socket.onmessage = (message) => {
        console.log(socket.readyState)
        const received = JSON.parse(message.data)
        const transcript = String(received.channel.alternatives[0].transcript)
        console.log(transcript)
        google_translate_element.append(transcript)


        

        
    }    
})


})



