const {remote, ipcRenderer} = require('electron');
const popup = require('./auth/popup');
//Store the authentication url
let authUrl;
//The url is sent from the Authenticator by the ipcMain immediately after the window loads, so it's guranteed to exist
ipcRenderer.on('url', (event, url) => {
    authUrl = url;
});

function main() {
    const signInButton = document.getElementById('signin');

    //When the user clicks the sign in button
    signInButton.onclick = async () => {
        //Get the code from the google authentication
        const code = await popup(remote.getCurrentWindow(), authUrl);
        //Send the code back to the main process
        ipcRenderer.send('google', code);
    }

    //Stylize the image when focused
    signInButton.onfocus = () => signInButton.setAttribute('src', '../assets/google_sign_in_focus.png');
}
window.onload = main;