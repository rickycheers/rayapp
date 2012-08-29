var faceboook = function(){
	var self = this,
	ui       = require('/ui/components');

	Titanium.Facebook.appid = "264917850197668";
	Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

	//var facebook_button = Titanium.Facebook.createLoginButton({
	//		style: 'wide',
	//		bottom: 30,
	//		zIndex: 1000
	//	});

	//facebook_button.hide();

	var button = new ui.Button({
		title: 'Comenta con Facebook',
		bottom: 60,
		zIndex: 1000
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

	var label = new ui.Label('Escribe aquí tu comentario.');
	var textarea = new Titanium.UI.createTextArea({width: 300, height:300});
	var send_button = new ui.Button({title:'Ok'});
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
		var data = {
			link: "https://developer.mozilla.org/en/JavaScript",
			name: "Best online Javascript reference",
			message: textarea.getValue(),
			caption: "MDN Javascript Reference",
			picture: "https://developer.mozilla.org/media/img/mdn-logo.png",
			description: "This section of the site is dedicated to JavaScript-the-language, the parts that are not specific to web pages or other host environments...",
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














