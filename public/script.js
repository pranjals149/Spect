const socket = io('/');

//video element to play he video 
const myVideo = document.createElement('video');
myVideo.muted = true;

//Peer connection
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
})

// Video Grid element
const videoGrid = document.getElementById('video-grid')

var myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
    .then(stream => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream);

        //Call
        peer.on('call', call => {
            //Answering a partipant's call
            call.answer(stream)

            const video = document.createElement('video');

            //Add partipant's video
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream);
            });

        });

        socket.on('user-connected', (userId) => {
            connectToNewUser(userId, stream);
        })

        let text = $('input');

        $('html').keydown((e) => {
            if (e.which == 13 && text.val().length !== 0) {
                socket.emit('message', text.val());
                text.val('');
            }
        })

        //Listen message and append it to the chat box(ul).
        socket.on('createMessage', message => {
            $('.messages').append(`<li class="message"><b>Partipant</b><br/>${message}</li>`);
            scrollToBottom();
        })
    })

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video)
}

const scrollToBottom = () => {
    let d = $('.main__chat_window');
    d.scrollTop(d.prop('scrollHeight'));
}

// Mute our Video
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-headset" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M8 1a5 5 0 0 0-5 5v4.5H2V6a6 6 0 1 1 12 0v4.5h-1V6a5 5 0 0 0-5-5z" />
            <path
                d="M11 8a1 1 0 0 1 1-1h2v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8zM5 8a1 1 0 0 0-1-1H2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8z" />
            <path fill-rule="evenodd"
                d="M13.5 8.5a.5.5 0 0 1 .5.5v3a2.5 2.5 0 0 1-2.5 2.5H8a.5.5 0 0 1 0-1h3.5A1.5 1.5 0 0 0 13 12V9a.5.5 0 0 1 .5-.5z" />
            <path d="M6.5 14a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1z" />
        </svg>

        <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-mic-mute-fill unmute" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z"/>
        </svg>
        <span>Unmute</span>
        `
    document.querySelector('.main__mute_button').innerHTML = html;
}

//Stop Video
const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setStopVideo = () => {
    const html = `
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-camera-video-fill"
            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
        </svg>
        <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-camera-video-off-fill hideVideo" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925l-10-14 .814-.58 10 14-.814.58z"/>
        </svg>
        <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
}
