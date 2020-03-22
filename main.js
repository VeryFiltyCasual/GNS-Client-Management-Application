
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
app.on('ready', start);
async function start() {
  //The user information and access tokens are stored in the 'data' object
  let data;
  let prompt = await userAuth.needsTokens();
  //Check if the user needs to sign in
  if (prompt) {
    //If they need to sign in, use the special sign in window
    data = await promptSignIn();
  } else {
    //If they don't need to sign in, get the tokens from a file on the computer
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
      },
      icon: "Assets/GNSiconSmall.png",
      autoHideMenuBar: false
    });
    //Menu.setApplicationMenu(null);
  }
  //Create a client viewer with the information about the user
  createClientViewer(data);
}

/***************
******IPC*******
****************/
//when webpage sends 'display-client' to here...
//runs clientEdit.html page
ipcMain.on('display-client-edit', (event, id) => {
  prepareExtraWin();
  runCustEdit(id); //run custEdit (display a webpage)
  client_ExtraPage = id;
})

//recieves 'user' message, sends 'getUser' message
//This is used for retrieving the user's profile picture
ipcMain.on('user', async () => {
  win.main.webContents.send("getUser", await userAuth.getUser());
});
//This is used to get the id of the client whose edit page is displayed
ipcMain.on('getID', (event, arg) => {
  event.returnValue = client_ExtraPage;
});
//This is used to display a form that the user uses to add a new client
ipcMain.on("display-newclient", (event) =>{
	prepareExtraWin();
	runNewCust();
});
//This is used to handle when the user wants to update/add an event on the company's google calendar
ipcMain.on("updateCalendar", async (event, client, field, oldDate, newDate) => {
  //First, delete the previous date for the event if it exists
  await userAuth.removeEvent(new Date(oldDate), client.id);
  //Add the event at the new date
  await userAuth.createEvent(client, field, new Date(newDate));
});



/***************************
******Window Functions *****
***************************/

//create first window
function promptSignIn() {
  return new Promise((resolve, reject) => {
    // Create the browser window.
    win.main = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      },
      icon: "Assets/GNSiconSmall.png",
      autoHideMenuBar: false
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

    //Get rid of the menu
    Menu.setApplicationMenu(null);
    
    try {
      //Log in the user
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
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
	  parent: win.main,
	  modal: false
  });
  win.extra.on("closed", function () {
	  win.extra = null;	
    win.main.webContents.send("ExtraWinClosed");
  });
}


function runCustEdit(){
	//load the form html of the app.
  win.extra.loadURL(`file://${__dirname}/OtherPages/customerEdit.html`);
	
}

function runNewCust(){
	win.extra.loadURL(`file://${__dirname}/OtherPages/addClient.html`);
}


/******************
*****WebSockets****
******************/
//Creates the client view
function createClientViewer({user, tokens}) {
  win.main.loadURL(`file://${__dirname}/OtherPages/Clients.html`);

  ipcMain.on('signout', async evt => {
    //Delete the tokens
    await userAuth.deleteToken();
    //Quit the application
    app.quit();
  });

  // Create a new websocket client
  const client = new WebSocket('wss://localhost:3000', {
    headers: {
      token: tokens.id_token
    },
    //Just while using a self signed certificate
    rejectUnauthorized: false
  });

  // Handle when the client connects
  client.on('open', () => {
      console.log('The WebSocket Client has connected');
      const message = {
        status: 'ok',
        event: 0,
        data: {}
      }
      client.send(JSON.stringify(message));
  });
  // Handle connection errors
  client.on('error', (err) => {
      console.log('Connection error: ' + err.message);
  });
  client.on('close', (code, description) => {
      console.log(`The connection has been closed with code: ${code} and description: ${description}`);
  });

  //Handle server sending a message
  client.on('message', async rawMessage => {
    const message = JSON.parse(rawMessage);
    
    switch(message.event) {
      //CLIENT_STAGE1 event
      case 0:
        sendOnceLoaded("updatedClients", {cliarr: message.data, stage: 1});
        win.main.webContents.send("updatedClients", {cliarr: message.data, stage: 1});
        break;
        
      //CLIENT_STAGE2 event
      case 1:
        win.main.webContents.send("updatedClients", {cliarr: message.data, stage: 2});
        break;
        
      //CLIENT_ARCHIVED event
      case 2:
        win.main.webContents.send("updatedClients", {cliarr: message.data, stage: 3});
        break;
      
      //UPDATE
      case 3:
        win.main.webContents.send("updateOneClient", message.data);
        break;
      
      //ADD_COMMENT
      case 4:
        win.main.webContents.send("addComment", message.data);
        break;
      
      //DELETE_COMMENT
      case 5:
        win.main.webContents.send("delComment", message.data);
        break;
      //USERS
      case 6:
        win.main.webContents.send("users", message.data);
        break;
      //ADD_CLIENT
      case 7:
        win.main.webContents.send("newClient", message.data);
        break;
      //CLIENT_NEXTSTAGE
      case 8:
        win.main.webContents.send("changedStage", message.data);
        break;
      //ADD_USER
      case 9:
        win.main.webContents.send("addUser", message.data);
        break;
      //REMOVE_USER
      case 10:
        win.main.webContents.send("removeUser", message.data);
        break;
      //Not a defined message code
      default:
        console.log('Unrecognized message');
        break;
    }
    /**
     * Sends a message once the win.main content has loaded
     * @param {string} event The event name
     * @param {any} message the parameters to send
     */
    function sendOnceLoaded(event, message) {
      win.main.webContents.on('did-finish-load', () => {
        win.main.webContents.send(event, message);
      });
    } //end sendOnceLoaded
  }); //end client.on
  
  /*
    ipc messsages that require the websocket connection
  */
  //Get Stage 1
	ipcMain.on("RequestStage1", (event, arg) => {
		send(blankEvent(0));
  });
  //Get Stage 2
	ipcMain.on("RequestStage2", (event, arg) => {		
		send(blankEvent(1));
  });
  //Get Archive
	ipcMain.on("RequestStage3", (event, arg) => {
		send(blankEvent(2));
  });
  //Update
	ipcMain.on("UpdateClient", (event, arg) =>{
		let jsonMessage = {
			status: "ok",
			event: 3,
			data: arg
		};
		send(jsonMessage);
  });
  //User adds a comment
  ipcMain.on('addComment', (e, {message, client_id}) => {
    //Create a formatted message
    const wsMessage = {
      status: 'ok',
      event: 4,
      data: {
        client_id,
        message,
        author_name: user.name,
        author_picture: user.picture
      }
    };
    send(wsMessage);
  });
  //User deletes a comment
  ipcMain.on('deleteComment',(event, id) => {
    const wsMessage = {
      status: 'ok',
      event: 5,
      data: {
        id
      }
    };
    send(wsMessage);
  });
  //Send a list of users and their online status
  ipcMain.on('users', event => {
    const wsMessage = {
      status: 'ok',
      event: 6,
      data: {}
    };
    send(wsMessage);
  });
  //Add a client manually
	ipcMain.on("AddClient", (event, arg) =>{
		let jsonMessage = {
			status: "ok",
			event: 7,
			data: arg
		};
		send(jsonMessage);
		win.extra.close();
  });
  //Move client to a new stage
	ipcMain.on("NewStage", (event, arg) => {
		let jsonMessage = {
			status: "ok",
			event: 8,
			data: arg
		};
		send(jsonMessage);
  });
  //Add a user to the authorized list
	ipcMain.on("addUser", (event, arg)=>{
		let jsonMessage = {
			status: "ok",
			event: 9,
			data: arg
		};
		send(jsonMessage);
  });
  ipcMain.on('removeUser', (event, id) => {
    let message = {
      status: 'ok',
      event: 10,
      data: id
    };
    console.log(message);
    send(message);
  });
  /**
   * Creates a blank message for a certain event code. Useful for simple request messages
   * @param {number} event The event code
   */
  function blankEvent(event) {
    return {status: 'ok', event, data:{}};
  }
  /**
   * Sends a json message to the websocket server
   * @param {object} message The message object
   */
  function send(message) {
    client.send(JSON.stringify(message));
  }
}


/**********************************
******General Win Management*******
**********************************/

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