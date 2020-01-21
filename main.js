const electron = require('electron')
const { app, BrowserWindow, Menu, dialog} = electron
const { ipcMain } = electron;
let win = { main: null, extra: null }; 

/****************
*****Windows*****
*****************/

//******loading*******

app.on('ready', createWindow);

//when webpage sends 'display-client' to here...
ipcMain.on('display-client-edit', (event, id) => {
  prepareExtraWin();
  runCustEdit(id); //run custEdit (display a webpage)
})

ipcMain.on('display-client-info', (event, id) => {
  prepareExtraWin();
  runCustInfo(id); //run custEdit (display a webpage)
})

/*
ipcMain.handle("getID", async (event, arg) => {
	return 420;
});*/

//*********Window Functions *****

//create first window
function createWindow () {
  // Create the browser window.
  win.main = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.main.loadFile('index.html')
  
  
  //when the window is closed...
  win.main.on('closed', () => { 
   // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
	  win.main = null
	  
	  win.extra.close();
	  win.extra = null
  })
  
  //builds the menu and sets it in the window
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
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
        
    })
}


function runCustEdit(id){
	// and load the index.html of the app.
    win.extra.loadURL(`file://${__dirname}/OtherPages/customerEdit.html?id=${id}`);
	
}

function runCustInfo(id){
	// and load the index.html of the app.
    win.extra.loadFile("OtherPages/customerInfo.html?id=" + id)
}


//********General Win Management*********

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
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


