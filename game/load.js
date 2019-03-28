hashCode = function (s) {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

function createId() {
  return Math.abs(
    hashCode(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10) +
      Math.random() * 10
    )
  );
}

function renderElements(stage, typeBox, coords = null) {
  let rectX = coords
    ? coords.x - 320
    : stage.getHeight() / 2 - 25 - Math.random() * 250;
  let rectY = coords
    ? coords.y - 370
    : stage.getWidth() / 2 - 50 - Math.random() * 250;
  let box;
  let boxClone;
  let id = createId();
  switch (typeBox) {
    case "rectangle":
      boxClone = new Rect(
        rectX * 1.25,
        rectY * 1.25,
        200,
        100,
        "Black",
        stage,
        0,
        true,
        true,
        id + 1
      );
      box = new Rect(rectX, rectY, 200, 100, "Red", stage, 1, true, true, id, boxClone.id);
      break;
    case "circle":
      boxClone = new Circle(
        rectX * 1.25,
        rectY * 1.25,
        70,
        0,
        Math.PI * 2,
        "Black",
        stage,
        0,
        true,
        true,
        id + 1
      );
      box = new Circle(rectX, rectY, 70, 0, Math.PI * 2, "Red", stage, 0, true, true, id, id + 1);
      break;
    case "triangle":
      box = new Triangle(rectX, rectY, 100, 300, "Red", true, stage, 1, id);
      boxClone = new Triangle(rectX * 1.25, rectY * 1.25, 100, 300, "Black", false, stage, 0, id + 1);
      break;
    case "pentagono":
      rendererBoxType = createPolygon(newTypeBox, 5, 40, stage, layer);
      break;
    case "hexagono":
      rendererBoxType = createPolygon(newTypeBox, 6, 40, stage, layer);
      break;
    case "quadrilatero":
      rendererBoxType = createPolygon(newTypeBox, 4, 40, stage, layer);
  }
  stage.addShape(boxClone);
  stage.addShape(box);
  //colider
}

let stage = new Stage(document.querySelector("canvas"));
document.querySelector(".newBox").addEventListener("click", function () {
  let typeBox = document.querySelector(".typeBox").value;
  renderElements(stage, typeBox);
});

let text = document.querySelector(".btn-text");

text.addEventListener("click", function () {
  let textValue = document.querySelector(".text-input").value;
  let fract = false;
  let id = createId();
  if (document.querySelector(".fract").checked) fract = true;
  let textClone = new Text(
    textValue,
    Math.random() * 800,
    Math.random() * 600,
    "Black",
    false,
    stage,
    "40px Calibri",
    fract,
    0,
    id + 1
  );
  let textBox = new Text(
    textValue,
    Math.random() * 800,
    Math.random() * 600,
    "Red",
    true,
    stage,
    "40px Calibri",
    fract,
    1,
    id
  );
  stage.addShape(textClone);
  stage.addShape(textBox);
});

let image = document.querySelector("#image_file");
var oReader = new FileReader();
let imageBase64;
image.addEventListener("change", function (e) {
  var oFile = document.getElementById("image_file").files[0];
  oReader.onload = function (e) {
    imageBase64 = e.target.result;
  };
  oReader.readAsDataURL(oFile);
});

let addImage = document.querySelector("#add_image");
addImage.addEventListener('click', function () {
  let id = createId();
  if (imageBase64) {
    stage.addShape(
      new ImageC(
        Math.random() * 800,
        Math.random() * 600,
        300,
        200,
        imageBase64,
        "brightness(30%)",
        stage,
        0,
        true,
        true,
        id + 1
      )
    );
    stage.addShape(
      new ImageC(
        Math.random() * 100,
        Math.random() * 600,
        300,
        200,
        imageBase64,
        "brightness(100%)",
        stage,
        1,
        true,
        true,
        id,
        id + 1
      )
    );
  };
})


