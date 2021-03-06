var page = tabris.create("Page", {
  title: "Storing data on the device",
  topLevel: true
});

var keyTextView = tabris.create("TextView", {
  layoutData: {left: 10, top: 20},
  text: "Key:"
}).appendTo(page);

var keyField = tabris.create("TextInput", {
  layoutData: {left: [keyTextView, 20], baseline: keyTextView, right: 10},
  text: "foo"
}).appendTo(page);

var valueTextView = tabris.create("TextView", {
  layoutData: {left: 10, top: [keyField, 20]},
  text: "Value:"
}).appendTo(page);

var valueField = tabris.create("TextInput", {
  layoutData: {left: [valueTextView, 20], baseline: valueTextView, right: 10},
  text: localStorage.getItem("foo") || "bar"
}).appendTo(page);

var setButton = tabris.create("Button", {
  layoutData: {left: 10, top: [valueTextView, 20]},
  text: "Set"
}).on("selection", function() {
  if (!keyField.get("text")) {
    console.error("They key cannot be empty.");
  } else if (!valueField.get("text")) {
    console.error("They value cannot be empty.");
  } else {
    localStorage.setItem(keyField.get("text"), valueField.get("text"));
    valueField.set("text", "");
  }
}).appendTo(page);

var getButton = tabris.create("Button", {
  layoutData: {left: [setButton, 10], baseline: setButton},
  text: "Get"
}).on("selection", function() {
  if (!keyField.get("text")) {
    console.error("They key cannot be empty.");
  } else {
    valueField.set("text", "");
    valueField.set("text", localStorage.getItem(keyField.get("text")));
  }
}).appendTo(page);

var removeButton = tabris.create("Button", {
  layoutData: {left: [getButton, 10], baseline: setButton},
  text: "Remove"
}).on("selection", function() {
  localStorage.removeItem(keyField.get("text"));
  valueField.set("text", "");
}).appendTo(page);

tabris.create("Button", {
  layoutData: {left: [removeButton, 10], baseline: setButton},
  text: "Clear"
}).on("selection", function() {
  localStorage.clear();
  valueField.set("text", "");
}).appendTo(page);

page.open();
