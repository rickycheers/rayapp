// Global variables

var globals = {
	osname         : Ti.Platform.osname,
	version        : Ti.Platform.version,
	height         : Ti.Platform.displayCaps.platformHeight,
	width          : Ti.Platform.displayCaps.platformWidth,
	slide_animation: Ti.UI.createAnimation({ width: this.width, height: this.height, duration: 300 }),
};

module.exports = globals;