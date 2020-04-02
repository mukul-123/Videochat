// navigator.mediaDevices.getUserMedia(constraints);
navigator.getUserMedia({
    video: true,
    audio: true
}, function (stream) {

    var Peer = require('simple-peer');

    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream:stream,
    });

    peer.on('signal', function (data) {
        // console.log(data);
        document.getElementById("user_id").value = JSON.stringify(data)
    })

    document.getElementById("connect").addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById("other_id").value);
        peer.signal(otherId);
    })

    document.getElementById('send').addEventListener('click', function () {
        var msg = document.getElementById("otherMessage").value;
        peer.send(msg);
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + "\n";
    })

    peer.on('stream',function(stream){
        var video=document.createElement('video')
        document.body.appendChild(video)
        const mediaStream = new MediaStream(stream);
        video.srcObject = mediaStream;
        video.play();
    })

}, function (err) {
    console.log(err);
})
