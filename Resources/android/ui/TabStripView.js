var _ = require('/lib/underscore'),
	ui = require('/ui/components'),
	theme = require('/ui/theme');

function tabWidth() {
	return Ti.Platform.displayCaps.platformWidth / 3;
}

function TabButton(id, text, icon, index, selected) {
	var self = new ui.Component(Ti.UI.createView({
		layout: 'vertical',
		width: tabWidth(),
		opacity: 0.8,
		backgroundColor: (selected) ? '#eaeaea' : 'transparent'
	}));
	self.id = id;
	self.index = index;
	self.selected = selected;
	
	icon = selected ? icon.replace('.png', '_active.png') : icon;
	//Ti.API.info(icon);

	var image = new ui.Component(new ui.ImageView(icon,{
		top: '5dip',
		height: '30dip'
	}));
	self.add(image);
	
	self.add(new ui.Label(text,{
		text: text,
		color:'#033269',
		font: {
			fontSize:'10dip',
			fontStyle: 'italic',
			fontWeight: 'bold'
		}
	}));
	
	self.toggle = function(idx) {
		
		var background = "";
		var icon_image = "";
		var current_icon = image.get('image');

		if( self.index ===  idx ){
			background = "#eaeaea";
			icon_image = current_icon.replace('_active', '');
			icon_image = icon_image.replace('.png', '_active.png');
		} else {
			background = 'transparent';
			icon_image = current_icon.replace('_active', '');
		}
		self.set('backgroundColor', background);
		image.set('image', icon_image);
		//Ti.API.info(self.index + " " + idx + " " + icon_image);
	};

	self.toggleIcon = function(){
		var current_icon = image.get('image');
		if( current_icon.match('_active') ){
			var new_icon = current_icon.replace('_active', '');
		} else {
			var new_icon = current_icon.replace('.png', '_active.png');
		}
		image.set('image', new_icon);
	};
	
	return self;
}

function TabStripView(args) {
	var self = new ui.Component(Ti.UI.createView(_.extend({
		height:'50dip',
		layout:'horizontal',
		//backgroundColor:'#121212',
		backgroundImage: '/images/menu-background.jpg'
	}, args.viewArgs||{})));
	
	var tabs = [],
		first = true,
		index = 0,
		selectedIndex = 0;
	
	for (var key in args.tabs) {
		var data = args.tabs[key];
		var tab = new TabButton(key, data.title, data.icon, index, first);		
		self.add(tab);
		tabs.push(tab);
		first = false;
		
		(function(i,t) {
			t.addEventListener('click', function() {
				self.fireEvent('selected', {
					index:i
				});
			});
		})(index, tab);
		
		index++;
	}
	
	self.selectIndex = function(idx) {
		_.each(tabs, function(tab) {
			tab.toggle(idx);
		});
	};
	
	return self;
}

module.exports = TabStripView;