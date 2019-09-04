const electron = require('electron')
const { app, BrowserWindow, Menu} = electron
let win
let secondWin

app.on('ready', createWindow)

//create first window
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })



  // and load the index.html of the app.
  win.loadFile('index.html')
  
  //when the window is closed...
  win.on('closed', () => { 
   // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
	  win = null
  })
  
  //builds the menu and sets it in the window
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
}

function addWindow(){
  // Create the browser window.
  secondwin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
    secondwin.loadFile('index.html')

    addWindow.on("closed", function () {
        addWindow = null
    })
}

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


/*top menu stuff*/

//create menu template (used in line 28)
const mainMenuTemplate = [
	{
		label: "File",
		
		//submenu is an array, each item is around {}
		submenu:[
			{
				label: 'wanna see more?',
				click(){addWindow()}
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