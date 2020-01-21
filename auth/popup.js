/**
 * @author Ryan Wolf
 * @file authenticate.js
 */
const {BrowserWindow, session} = require('electron').remote;
const {parse: urlParse} = require('url');

/**
 * Signs the user into google and returns the code
 * @param {Electron.BrowserWindow} parentWin The parent window that this pop up should be displayed on top of
 * @param {string} url The url to use for the google authentication
 * @returns {string} The code that can get the access tokens
 */
function popup(parentWin, googleUrl) {
    return new Promise((resolve, reject) => {
        //Create a popup window for the authentication
        let popupWindow = new BrowserWindow({
            width: 500,
            hieght: 600,
            show: true,
            parent: parentWin
        });
    
        //Function that gets the code from the redirect url
        function getCode(url) {
            //First, get the query part of the url
            const query = urlParse(url, true).query;
            //Make sure there is a query string before trying to read data from it
            if (query) {
                if (query.error) {
                    //If there was an error, throw an error
                    reject(new Error('Error parsing the redirect url: ' + query.error));
                } else if (query.code) {
                    //If we got the code, fantastic!
                    
                    //Pass on the code
                    resolve(query.code);
                    popupWindow.close();
                }
            }
        }

        //Handle the events of the popup appropriately

        //When the window gets redirected, grab the url for the code
        popupWindow.webContents.on('will-redirect', (event, url) => {
            getCode(url);
        });
        session.defaultSession.webRequest.onCompleted({urls: [process.env.REDIRECT + '/*']}, (details) => {
            getCode(details.url);
        });


        //Load the authentication url for Google and show the window
        popupWindow.loadURL(googleUrl);
        popupWindow.show();
    });
}
module.exports = popup;