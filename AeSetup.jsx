// Create a new project
var proj = app.project;

// Create a window for the GUI
var w = new Window("dialog", "Scene and Camera Setup");
w.orientation = "row";

// Add a dropdown to choose the resolution
var resDropdown = w.add("dropdownlist", undefined, ["4K", "UHD", "Other"]);

// Add input fields for width and height
var widthInput = w.add("edittext", undefined, "1920");
var heightInput = w.add("edittext", undefined, "1080");

// Add a dropdown to choose the frame rate
var frameRateDropdown = w.add("dropdownlist", undefined, [24, 25, 30, 60]);

// Function to update the width and height based on the selected resolution
resDropdown.onChange = function() {
  switch (resDropdown.selection.text) {
    case "4K":
      widthInput.text = "3840";
      heightInput.text = "2160";
      break;
    case "UHD":
      widthInput.text = "1920";
      heightInput.text = "1080";
      break;
    case "Other":
      widthInput.text = "";
      heightInput.text = "";
      break;
  }
};

// Add a button to create the scene and camera
var createButton = w.add("button", undefined, "Create");
createButton.onClick = function() {
  // Set the frame rate to the selected value
  proj.item.frameRate = frameRateDropdown.selection.text;

  // Get the width and height from the input fields
  var width = parseInt(widthInput.text);
  var height = parseInt(heightInput.text);

  // Create a new composition
  var comp = proj.items.addComp("Scene", width, height, 1, 10, frameRateDropdown.selection.text);

  // Create a new camera
  var cameraLayer = comp.layers.addCamera("Camera", [comp.width/2, comp.height/2]);
  cameraLayer.cameraSettings.zoom = 75;

  // Set up the composition and camera as the active items
  comp.openInViewer();
  cameraLayer.parent = comp;

  // Close the window
  w.close();
};

// Show the window
w.show();