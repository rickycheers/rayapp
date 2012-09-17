var faceboook = function(){
	var self = this,
	ui       = require('/ui/components');

	Titanium.Facebook.appid = "103480546474105";
	Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

	//facebook_button.hide();

	var button = new ui.Button({
		backgroundImage: '/images/facebook-button.png',
		width: '190dip',
		height: '40dip',
		bottom: '25dip',
		zIndex: 1
	});

	button.addEventListener('click', function(){
		if( !Titanium.Facebook.loggedIn ){
			Titanium.Facebook.authorize();
		} else {
			showCommentStuff();
		}
	});

	Titanium.Facebook.addEventListener('login', function(e){
		if(e.success){
			showCommentStuff();
		}
		if(e.error){
			alert(e.error);
		}
	});

	return button;
}

module.exports = faceboook;

function showCommentStuff(){
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		ActionBarView = require('/ui/ActionBarView');

	var self = new ui.Window({
		navBarHidden:true,
		backgroundImage:theme.windowBackground,
		layout: 'vertical',
		windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE
	});
	
	var actionBar = new ActionBarView({
		title: 'Comenta con Facebook',
		buttons: {
			cancel: {
				title:'Cancelar',
				width:80
			}
		}
	});
	self.add(actionBar.viewProxy);

	var label = new ui.Label('Escribe aquí tu comentario.', {
		top: '10dip',
		color: '#fff',
		font: { fontSize: '7pt', fontWeight: 'bold' }
	});
	var textarea = Titanium.UI.createTextArea({
		top: '10dip',
		width: '300dip',
		height:'140dip'
	});
	var send_button = new ui.Button({
		//title: 'Publicar',
		backgroundImage: '/images/facebook-publish.png',
		width: '177dip',
		height: '36dip',
		//width: '100dip',
		//height: '60dip',
		top: '10dip',
		font: { fontSize: '7pt' },
	});
	self.add(label);
	self.add(textarea);
	self.add(send_button);

	var activityIndicator = Ti.UI.createActivityIndicator({
      message: 'Publicando...',
      top:10,
      left:10,
      height:'auto',
      width:'auto'
    });
	self.add(activityIndicator);

	var dialog = Titanium.UI.createAlertDialog();
	self.add(dialog);

	send_button.addEventListener('click', function(){
		var description =
			"¿Qué tanto sabes de la historia de Rayados? Con esta aplicación conocerás mejor que nadie y de una manera entretenida la historia del Monterrey." + 
			"\nLos mejores partidos de toda la historia del equipo Rayados. " +
			"\nDatos históricos de los jugadores de Rayados que no encontrarás en ninguna otra parte." +
			"\nLas trivias más divertidas y más sorprendentes del Monterrey." +
			"\nCada día del año recordaremos un partido y un dato histórico además de una trivia relacionada." +
			"\nDescarga nuestra aplicación. Es GRATUITA. Únete y pon a prueba tus conocimientos de tu equipo favorito. Además podrás ganar REGALOS!";
		var data = {
			link: "https://www.facebook.com/historiasrayadas",
			name: "Inolvidables jugadores y las grandes hazañas del Monterrey reunidas en esta aplicación",
			message: textarea.getValue(),
			caption: "Historias Rayadas",
			picture: "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-ash3/12864_197536819108_7310873_n.jpg",
			description: description,
		};

		activityIndicator.show();

		Titanium.Facebook.requestWithGraphPath('me/feed', data, 'POST', function(e){
			if(e.success){
				dialog.title = '¡Listo!';
				dialog.message = 'Tu comentario ha sido publicado.';
			} else {
				dialog.title = '¡Auch!';
				dialog.message = 'Tu comentario no pudo ser publicado en este momento.';
			}
			activityIndicator.hide();
			dialog.show();
			setTimeout(function(){ dialog.hide(); self.close(); }, 2000);
		});
	});
	
	actionBar.addEventListener('buttonPress', function() {
		self.close();
	});
	
	self.open();
}














