var faceboook = function( content_json, app_window ){
	var self = this,
	ui       = require('/ui/components');

	Titanium.Facebook.appid = "103480546474105";
	Titanium.Facebook.permissions = ['publish_stream', 'publish_actions'];

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
			showCommentStuff(content_json, app_window);
		}
	});

	Titanium.Facebook.addEventListener('login', function(e, content_json){
		if(e.success){
			showCommentStuff(content_json, app_window);
		}
		if(e.error){
			alert(e.error);
		}
	});

	return button;
}

module.exports = faceboook;

function showCommentStuff(content_json, app_window){
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		ActionBarView = require('/ui/ActionBarView');
	
	//Ti.API.info( JSON.stringify(app_window.json_content) );

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

	send_button.addEventListener('click', function(e){
		/*
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
			message: 'Acabo de hacer un comentario en una publicaión de Historias Rayadas',
			caption: "Historias Rayadas",
			picture: "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-ash3/12864_197536819108_7310873_n.jpg",
			description: description,
		};
		*/

		data = {
			message: textarea.getValue()
		}

		activityIndicator.show();

		if( app_window && app_window.json_content[0] && app_window.json_content[0].fb_post_id ){
			Titanium.Facebook.requestWithGraphPath(app_window.json_content[0].fb_post_id+'/comments', data, 'POST', function(e){
				var auth_error = false;
				if(e.success){
					dialog.title = '¡Listo!';
					dialog.message = 'Tu comentario ha sido publicado.';
				} else {
					//Ti.API.info(JSON.stringify(e));
					if( e.error.match(/access token/i) ){
						dialog.title = '¡Auch!';
						dialog.message = "Parece que hay un problema con Facebook.\n\nPor favor inicia sesión nuevamente presionando el botón de comentar.";
						auth_error = true;
					} else {
						dialog.title = '¡Auch!';
						dialog.message = 'Tu comentario no pudo ser publicado en este momento.';
					}
				}
				timeout = auth_error ? 4000 : 2000;
				activityIndicator.hide();
				dialog.show();
				setTimeout(function(){
					dialog.hide();
					if( !auth_error ){
						self.close();
					} else {
						Titanium.Facebook.logout();
						app_window.fireEvent('reLoginFacebook');
						self.close();
					}
					
				}, timeout);
			});
		} else {
			dialog.title = '¡Lo sentimos!';
			dialog.message = 'El día de hoy no publicamos contenido en Facebook para que puedas hacer tu comentario.';
			dialog.show();
			setTimeout(function(){ dialog.hide(); self.close(); }, 3500);
		}
	});
	
	actionBar.addEventListener('buttonPress', function() {
		self.close();
	});
	
	self.open();
}