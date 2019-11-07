function display(name){
	document.write('<!--top navigation and title-->');
	document.write('<header>');
	document.write('	<div class="head"> ');
	document.write('		<h1>' + name + '</h1>');

	document.write('		<nav><ul>');
	document.write('			<li><a href="Accounts.html" class="HeadButton Accounts">');
	document.write('				<img src="../Assets/IconAccount.png"/>');
	document.write('				<h2>Accounts</h2>');
	document.write('			</a></li>');

	document.write('			<li><a href="Clients.html" class="HeadButton Clients">');
	document.write('				<img src="../Assets/IconClients.png"/>');
	document.write('				<h2>Clients</h2>');
	document.write('			</a></li>');
		
	document.write('			<li><a href="#" class="HeadButton SignOut">');
	document.write('				<img src="../Assets/IconSignOut.png"/>');
	document.write('				<h2>Sign Out</h2>');
	document.write('			</a></li>');
	document.write('		</ul></nav>');
	document.write('	</div>');
	document.write('</header> ');
}