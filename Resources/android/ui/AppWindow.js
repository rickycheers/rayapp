function AppWindow() {
	//load dependencies
	var _             = require('/lib/underscore'),
		theme         = require('/ui/theme'),
		ui            = require('/ui/components'),
		//Model         = require('/lib/model'),
		TabStripView  = require('/ui/TabStripView'),
		ActionBarView = require('/ui/ActionBarView'),
		PartidoView   = require('/ui/ContentView'),
		Facebook      = require('/ui/FacebookView');

	//create base proxy object
	var self = new ui.Window({
		navBarHidden:true,
		exitOnClose:true,
		backgroundImage:'/images/back.jpg'
	});
	self.orientationModes = [Ti.UI.PORTRAIT];

	var activityIndicator = Ti.UI.createActivityIndicator({
      message: 'Cargando...',
      top:10,
      left:10,
      height:'auto',
      width:'auto'
    });
	self.add(activityIndicator);
	
	//home action bar
	var actionBar = new ActionBarView({
		//title: 'Historias Rayadas',
		//buttons: {
		//	info: {
		//		id: 'info',
		//		icon:'/images/14-gear@2x.png',
		//		width:40
		//	}
		//}
	});
	self.add(actionBar.viewProxy);
	
	//main tab control
	var tabs = new TabStripView({
		viewArgs: {
			top: '51dip'
			//bottom:0
		},
		tabs: {
			partido: {
				title:'El Partido',
				icon:'/images/icon_partido.png',
			},
			dato: {
				title:'El Dato',
				icon:'/images/icon_dato.png'
			},
			trivia: {
				title:'La Trivia',
				icon:'/images/icon_trivia.png'
			}
		}
	});
	self.add(tabs.viewProxy);
	
	var scroller = Ti.UI.createScrollableView({
		top:'100dip',
		left:0,
		right:0,
		bottom:0,
		showPagingControl:false
	});
	//self.add(scroller);
	
	scroller.addEventListener('scroll', function(e) {
		tabs.selectIndex(e.currentPage);
	});
	
	
	tabs.addEventListener('selected', function(e) {
		scroller.scrollToView(e.index);
	});
	
	actionBar.addEventListener('buttonPress', function(e) {
		//var Window = (e.id === 'info') ? require('/ui/InfoWindow') : require('/ui/SettingsWindow');
		var Window = require('/ui/InfoWindow');
		var w = new Window();
		w.open();
	});

	reload_button = new ui.Button({
		title: 'Recargar datos',
		width: '100dip',
		height: '60dip',
		font: { fontSize: '7pt' },
		visible: false
	});
	reload_button.addEventListener('click', loadDataAndCreateContentViews);
	self.add(reload_button);

	self.addEventListener('open', loadDataAndCreateContentViews);

	function loadDataAndCreateContentViews(){
		activityIndicator.show();
		if( Titanium.Network.online ){
			var url = "http://historias.kiwam.co/?app=1&for_day=26&for_month=7";
			var xhr = Ti.Network.createHTTPClient({
			    onload: function(e) {
			        json = JSON.parse(this.responseText);

			        //create app content views
			        var partido = new PartidoView(json[0]),
			        	dato    = new PartidoView(json[1]),
			        	trivia  = new PartidoView(json[2])
			        ;
			        scroller.views = [partido, dato, trivia];
			        self.add(scroller);
					activityIndicator.hide();
					reload_button.hide();
			    },
			    onerror: function(e) {
			        Ti.API.debug(e.error);
			        activityIndicator.hide();
			        alert('Error al obtener datos.');
			        reload_button.show();
			    },
			    timeout:5000
			});

			xhr.open("GET", url);
			xhr.send();
		} else {
			activityIndicator.hide();
			alert('No hay red de datos disponible.');
			reload_button.show();
		}
	}

	self.add(new Facebook(self));

	return self;
}

module.exports = AppWindow;