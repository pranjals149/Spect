<h1 align='center'>Spect</h1>

<p align="center"> <img src = "https://image.freepik.com/free-vector/friends-video-calling-concept_23-2148497738.jpg" height='400px' width = "400px" /></p>

This app is a Web Video Conferencing app. It lets you connect to your loved ones, employees, or anyone you want. It uses Peer-to-Peer connectivity and generates a unique meeting ID for every meeting. Further, it also contains a functionality of muting, unmuting and displaying, hiding our own video.

**Hope you like it**  &#128515;

### Steps for installation

1. Clone the repository -- ```git clone https://github.com/pranjals149/Spect.git```
2. ```cd Spect```
3. ```npm install```
4. ```node server.js```

#### Your Server will be up and running. Now open ```http://localhost:3030/```

### Dependencies used
1. [UUID](https://github.com/uuidjs/uuid)
2. [Socket.io](https://socket.io/)
3. [peer.js](https://peerjs.com/)
4. [Express.js](https://expressjs.com/)
5. [WebRTC](https://webrtc.org/)

### Working of the application
It used **WebRTC** for real time communication capabilities(for video and audio communication). Further, **PeerJS** wraps the WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API. It gives a unique ID, and creates a Person-to-Person media stream connection to a remotely accessing person.
For unique room IDs, it make use of **UUID**. For connection and disconnection of a person from the room, it uses **Socket.io**.  Socket enables realtime communication between web clients and servers.

 
