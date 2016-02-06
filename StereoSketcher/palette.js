'use strict';
var opacityStep=0.05;

function sampleColor() {
	var selectedItem = null;
	var items = getLinesAndFaces();
	var item;
	for(var ii=0;ii<items.length;ii++) {
		item = items[ii];
		if(item.isSelected()) {
			if(selectedItem) {
				return;
			} else {
				selectedItem = item;
			}
		}
	}
	if(selectedItem == null) {
		return;
	}
	picker.color.fromString(selectedItem.color);
}

function setColor() {			
	var color = picker.value;
	var faces = getFaces();
	var face;
	for(var ii = 0;ii<faces.length;ii++) {
		face = faces[ii];
		if(face.isSelected()) {
			face.setColor(color);
		}
	}
	var lines = getLines();
	var line;
	for(var ii=0;ii<lines.length;ii++) {
		line = lines[ii];
		if(line.isSelected()) {
			line.setColor(color);
		}
	}
}

function setBackground() {
	svg.setAttribute("style","background: "+picker.value);
}

function sampleBackground() {
	picker.color.fromString(getBackgroundColor());
}

function getBackgroundColor() {
	var style=svg.getAttribute("style");
	return style.substr(style.indexOf("#"));
}

function hideColorPicker() {
	picker.color.hidePicker();
	picker.blur();
}

function showColorPicker() {
	picker.color.showPicker();
}

function opace() {
	changeOpacity(true);
}

function transluce() {
	changeOpacity(false);
}

function changeOpacity(increase) {
	if(mode!==3) {
		var shape;
		var opacity;
		var shapes = getLinesAndFaces();
		for(var ii=0;ii<shapes.length;ii++) {
			shape = shapes[ii];
			if(shape.isSelected()) {
				if(doesElementHaveClass(shape,"line")) {
					opacity = parseFloat(shape.getAttribute("stroke-opacity"));
				} else if (doesElementHaveClass(shape,"face")) {
					opacity = parseFloat(shape.getAttribute("fill-opacity"));
				}
				opacity = Math.round((1/opacityStep)*opacity)*opacityStep;
				if(increase) {
					if(opacity<1.0)
					{
						opacity+=opacityStep;
					}
				} else {
					if(opacity>0+opacityStep)
					{
						opacity-=opacityStep;
					}
				}
				shape.storedOpacity = opacity;
				shape.setOpacity(opacity);
			}
		}
	}
}

function restoreAllOpacity() {
	var shape;
	var shapes = getLinesAndFaces();
	for(var ii=0;ii<shapes.length;ii++) {
		shape = shapes[ii];
		shape.setOpacity(shape.storedOpacity);
	}
}

function stowAllOpacity() {
	var shape;
	var shapes = getLinesAndFaces();
	for(var ii=0;ii<shapes.length;ii++) {
		shapes[ii].setOpacity(1.0);
	}
}

function fileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
}

function fileDragHandler(e) {
	fileDragHover(e);

	var files = e.target.files || e.dataTransfer.files;

	for (var i = 0, f; f = files[i]; i++) {
		parseFile(f);
	}
}

function parseFile(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		var data = evt.target.result;
		createImages(data);
	}
	reader.readAsDataURL(file);
}

function createImages(data) {
	var dots = getDots();
	var dot;
	var selectedDots = [];
	for(var ii=0;ii<dots.length;ii++) {
		dot = dots[ii];
		if(dot.isSelected()) {
			selectedDots.push(dot);
		}
	}
	if(selectedDots.length != 4) {
		return;
	}
	
	shapeFactory.createImage(selectedDots,data);
}