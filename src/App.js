import React from 'react';

import './App.css';

declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.9/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {
const [UserName, setUserName] = React.useState('')
const [meetungNumber, setmeetungNumber] = React.useState()
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'http://localhost:5000'
  var apiKey = 'tJayN6E_RZWtE9ZlYKD0ig'
  var meetingNumber = '123456789'
  var role = 1
  var leaveUrl = 'http://localhost:3000'
  var userName = UserName
  var userEmail = ''
  var passWord = ''
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
  var registrantToken = ''

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: '86700496423',
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: '86700496423',
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: '772795',
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
         <input placeholder="user name"  onChange={(e)=>setUserName(e.target.value)}/>
       {(userName)&& <button onClick={getSignature}>Join Meeting</button>}
      </main>
    </div>
  );
}

export default App;
