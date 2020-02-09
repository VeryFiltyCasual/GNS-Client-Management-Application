
const electron = require('electron');
const Authenticator = require('./auth/authenticator');
const WebSocket = require('ws');
//Register .env variables
require('dotenv').config();
let userAuth = new Authenticator(process.env.CLIENT_ID, process.env.CLIENT_SEC, process.env.REDIRECT);
const { app, BrowserWindow, Menu, dialog} = electron;
const { ipcMain } = electron;
let win = { main: null, extra: null }; 

let client_ExtraPage = 0;
/****************
*****Windows*****
*****************/

//******loading*******

app.on('ready', async () => {
  let data;
  let prompt = await userAuth.needsTokens();
  //Check if the user needs to sign in
  if (prompt) {
    data = await promptSignIn();
  } else {
    const tokens = userAuth.getAccessTokens();
    //Get the user's profile information
    const user = await userAuth.getUser();
    data = {user, tokens};
    // Create the browser window.
    win.main = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }
  createClientViewer(data);
});

//when webpage sends 'display-client' to here...
ipcMain.on('display-client-edit', (event, id) => {
  prepareExtraWin();
  runCustEdit(id); //run custEdit (display a webpage)
  client_ExtraPage = id;
})

ipcMain.on('display-client-info', (event, id) => {
  prepareExtraWin();
  runCustInfo(); //run custEdit (display a webpage)
  client_ExtraPage = id;
})

ipcMain.on('user', async () => {
  win.main.webContents.send("getUser", await userAuth.getUser());
});

ipcMain.on('getID', (event, arg) => {
  event.returnValue = client_ExtraPage;
})

//*********Window Functions *****

//create first window
function promptSignIn() {
  return new Promise((resolve, reject) => {
    // Create the browser window.
    win.main = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });

    // and load the index.html of the app.
    win.main.loadFile('index.html');
    
    //Send the authentication url
    const url = userAuth.getAuthURL();
    win.main.webContents.on('did-finish-load', () => {
      win.main.webContents.send('url', url);
    });

    
    //when the window is closed...
    win.main.on('closed', () => { 
      win.main = null
      win.extra = null
    });
    
    //builds the menu and sets it in the window
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    try {
      ipcMain.on('google', async (event, code) => {
          //After getting the code, get the access tokens
          const tokens = await userAuth.retAccessTokens(code);
          //Get the user's profile information
          const user = await userAuth.getUser();
          resolve({user, tokens});
      });
    } catch (error) {
        reject(error);
    }
  });
}

//prepares extra, smaller window
function prepareExtraWin(){
  // Create the browser window.
  win.extra = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })
	
    win.extra.on("closed", function () {
		
		//dialog.showMessageBox(null, dialogOptions_ExitEdit, (response, checkboxChecked) => {
		//	if (response == 1)
				win.extra = null;
			
		//});
        win.main.webContents.send("ExtraWinClosed");
    })
}


function runCustEdit(id){
	// and load the index.html of the app.
  win.extra.loadURL(`file://${__dirname}/OtherPages/customerEdit.html`);
	
}

function runCustInfo(id){
	// and load the index.html of the app.
  win.extra.loadFile(`file://${__dirname}/OtherPages/customerView.html`);
}


//Creates the client view
function createClientViewer({user, tokens}) {
  win.main.loadURL(`file://${__dirname}/OtherPages/Clients.html`);

  // Create a new websocket client
  const client = new WebSocket('ws://localhost:3000', {
      headers: {
          token: tokens
      }
  });

  // Handle when the client connects
  client.on('open', () => {
      console.log('The WebSocket Client has connected');
  });
  // Handle connection errors
  client.on('error', (err) => {
      console.log('Connection error: ' + err.message);
  });
  client.on('close', (code, description) => {
      console.log(`The connection has been closed with code: ${code} and description: ${description}`);
  });

  client.on('message', async rawMessage => {
      //If there is a list of clients, display them!
      /*
        Message has 3 data fields
        status = 'ok'/'error'
        event = Code # in the table
        data = Important message
      */
      const message = JSON.parse(rawMessage);
      switch(message.event) {
          //Data is array of clients, as JSON, with each field of client info is the bold name in the spreadsheet
          case 0:
              //Clients event
              const {data: clients} = message;
              let newHTML = '';
              clients.forEach(client => {
                  newHTML += client.first_name + ' ';
              });
        
              win.main.webContents.executeJavaScript(`
                  document.getElementById('clients').innerHTML = '${newHTML}';
              `);
              break;
          //Data is array of clients, as JSON, with each field of client info is the bold name in the spreadsheet
          case 1:
            break;
          //Data is array of clients, as JSON, with each field of client info is the bold name in the spreadsheet
          case 2:
            break;
          /* Data is an object with an id and array of objects with 'name' and 'value' fields.
              ex.
              {
                id: 0,
                changed: [
                    {
                      key: 'first_name',
                      value: 'Ryan'
                    },
                    {
                      key: 'kitchen_sink_num',
                      value: 5,
                    }
                ]
              }
          */
          case 3:
            break;
          /*
            Data is a new array of comments
            ex. [
              {
                id: 0,
                client_id: 1,
                author_id: 4,
                message: 'This customer was very nice to me!',
                date: 'YYYY-MM-DD-32190321315710'
              }
              {
                id: 1,
                client_id: 1,
                author_id: 5,
                message: 'Cool bro!',
                date: 'YYYY-MM-DD-32190321319710'
              }
            ]
          */
          case 4:
            break;
          //Data is a new array of comments
          case 5:
            break;
          default:
              console.log('Unrecognized message');
              break;
      }
  });

  ipcMain.on('calendar', () => {
      userAuth.createEvent();
  });
}

//********General Win Management*********

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    promptSignIn();
  }
})


/******************
******Options*****
*******************/

//*********Menu**********

//create menu template (used in line 28)
const mainMenuTemplate = [
	{
		label: "File",
		
		//submenu is an array, each item is around {}
		submenu:[
			{
				label: 'wanna see more?',
				click(){extraWindow()}
			},
			
			{
				label: "Dev",
				click() { 
					win.main.webContents.openDevTools(),
					win.extra.webContents.openDevTools()
				}
				
			},
			
			{
				label: 'Quit',
				//command keys
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){app.quit()}
			}
			
        ]
	}
]

//if on mac, add extra blank item to the menu (to fix issue where "file" says "electron")
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({})
}


//*********Dialog box*********
const dialogOptions_ExitEdit = {
    type: 'question',
    buttons: ['Cancel', 'Close'],
    defaultId: 0,
    title: 'Question',
    message: 'Do you want to close the page?',
    detail: 'Changes will not be made unless you hit submit.',
   
   /*checkboxLabel: 'Remember my answer',
    checkboxChecked: false,*/
};