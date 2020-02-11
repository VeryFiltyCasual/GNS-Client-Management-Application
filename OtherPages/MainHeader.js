
function display(name){
	document.write('<header>');
	document.write('	<div class="head"> ');
	document.write('		<h1>' + name + '</h1>');

	document.write('		<nav><ul>');
	document.write('			<img src="https://lh6.googleusercontent.com/-ivZRaAOqvv8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reULevCoHpXMrJfzD9WtI4xEt8qVQ/photo.jpg" id="profilePic" style="border-radius: 100%"/>');
	document.write('			<li><a href="Accounts.html" class="HeadButton Accounts">');
	document.write('				<i class="fas fa-user"></i>');
	document.write('				<h2>Accounts</h2>');
	document.write('			</a></li>');

	document.write('			<li><a href="Clients.html" class="HeadButton Clients">');
	document.write('				<i class="fas fa-users"></i>');
	document.write('				<h2>Clients</h2>');
	document.write('			</a></li>');
		
	document.write('			<li><a href="#" class="HeadButton SignOut">');
	document.write('				<i class="material-icons">exit_to_app</i>');
	document.write('				<h2>Sign Out</h2>');
	document.write('			</a></li>');
	document.write('		</ul></nav>');
	document.write('	</div>');
	document.write('</header> ');
}