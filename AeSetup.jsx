var resolutionPresets = {
  "4k": [3840, 2160],
  "Full HD": [1920, 1080],
  "HD": [1280, 720],
  "SD": [720, 480]
};

var resolutionDropdown = this.parent.findChild("resolutionDropdown");
var widthInput = this.parent.findChild("widthInput");
var heightInput = this.parent.findChild("heightInput");
var createButton = this.parent.findChild("createButton");

resolutionDropdown.onChange = function() {
  var selectedResolution = this.selection.text;
  var [width, height] = resolutionPresets[selectedResolution];

  widthInput.text = width;
  heightInput.text = height;
};

createButton.onClick = function() {
  var width = Number(widthInput.text);
  var height = Number(heightInput.text);
  var isWidthValid = !isNaN(width) && width > 0;
  var isHeightValid = !isNaN(height) && height > 0;

  if (!isWidthValid || !isHeightValid) {
    alert("Please choose or type in a valid width and height before creating the composition.");
    return;
  }

  app.beginUndoGroup("Create Composition");
  var comp = app.project.items.addComp("My Composition", width, height, 1, 10, 25);
  app.endUndoGroup();

  createButton.text = "Done";
};
