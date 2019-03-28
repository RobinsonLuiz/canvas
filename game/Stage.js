class Stage {
  stylePaddingLeft;
  stylePaddingTop;
  styleBorderLeft;
  styleBorderTop;
  canvas;
  shapes;
  toJSON;
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");
    this.html = document.body.parentNode;
    this.htmlTop = this.html.offsetTop;
    this.htmlLeft = this.html.offsetLeft;
    this.shapes = [];
    this.dragging = false;
    this.selection = null;
    this.shapesLiveModeOff = [];
    this.dragoffx = 0;
    this.dragoffy = 0;
    this.interval = 0;
    this.loadContext();
    this.startEvents();
    this.toJSON = { Stage: [] };
    this.position;
    this.del = false;
    this.liveMode = false;
  }

  setLiveMode(flag) {
    this.liveMode = flag;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getContext() {
    return this.ctx;
  }

  getCanvas() {
    return this.canvas;
  }

  loadContext() {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      this.stylePaddingLeft =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)["paddingLeft"],
          10
        ) || 0;
      this.stylePaddingTop =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)["paddingTop"],
          10
        ) || 0;
      this.styleBorderLeft =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)[
          "borderLeftWidth"
          ],
          10
        ) || 0;
      this.styleBorderTop =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)["borderTopWidth"],
          10
        ) || 0;
    }
  }

  selectStart() {
    this.canvas.addEventListener("selectstart", e => {
      e.preventDefault();
      return false;
    });
  }

  dblClick() {
    this.canvas.addEventListener("dblclick", e => {
      let mouse = this.getMouse(e);
      let mx = mouse.x;
      let my = mouse.y;
      let shapes = this.shapes;
      for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].contains(mx, my)) {
          let color = document.createElement("input");
          if (shapes[i].class() != "ImageC") {
            color.type = "color";
            $(color).trigger("click");
            color.addEventListener("change", () => {
              shapes[i].updateColor(color.value);
              this.draw(shapes[i]);
              color.remove();
            });
          }
        }
      }
    });
  }

  mouseDown() {
    this.canvas.addEventListener("mousedown", e => {
      let mouse = this.getMouse(e);
      let mx = mouse.x;
      let my = mouse.y;
      this.position = { mx: mx, my: my };
      let shapes = this.shapes;
      for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].contains(mx, my)) {
          document.body.style.cursor = "pointer";
          let mySel = shapes[i];
          this.dragoffx = mx - mySel.x;
          this.dragoffy = my - mySel.y;
          this.xAnt = mySel.x;
          this.yAnt = mySel.y;
          this.dragging = true;
          this.selection = mySel;
          this.valid = false;
          return;
        }
      }
      if (this.selection) {
        this.selection = null;
        this.valid = false;
      }
    });
  }

  addShape(shape) {
    this.toJSON["Stage"].push(shape);
    this.shapes.push(shape);
    this.valid = false;
    this.draw();
  }

  json() {
    return this.toJSON;
  }

  removeShape() {
    document.addEventListener("keydown", e => {
      let shapes = this.shapes;
      for (let i = 0; i < shapes.length; i++) {
        if (
          shapes[i].contains(this.position.mx, this.position.my) &&
          e.keyCode == 46
        ) {
          this.shapes = this.shapes.filter(item => {
            return item.id != shapes[i].id && item.id != shapes[i].id + 1;
          });
          this.toJSON["Stage"] = this.shapes;
          this.draw();
          return;
        }
      }
    });
  }

  create(json) {
    json["Stage"].forEach(stage => {
      this.addShape(stage);
    });
    this.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }


  draw(shape = false) {
    if (shape)
      return this.shapes.find(e => e.id == shape.id).draw(this.ctx);
    if (!this.valid) {
      let ctx = this.ctx;
      let shapes = this.shapes.sort((a, b) => {
        return a.zIndex - b.zIndex;
      });
      this.clear();
      for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].visible) shapes[i].draw(ctx);
      }
    }
  }

  mouseMove() {
    this.canvas.addEventListener("mousemove", e => {
      if (this.dragging) {
        let mouse = this.getMouse(e);
        this.selection.x = mouse.x - this.dragoffx;
        this.selection.y = mouse.y - this.dragoffy;
        this.valid = false;
        this.draw();
      }
    });
  }

  mouseUp() {
    this.canvas.addEventListener("mouseup", e => {
      this.dragging = false;
      let clone;
      document.body.style.cursor = "default";
      if (this.selection && this.liveMode) {
        if (this.selection.class() == "Text")
          clone = this.shapes.find(
            e => e.text == this.selection.text && e.fill != this.selection.fill
          );
        else
          clone = this.shapes.find(
            e =>
              e.class() == this.selection.class() &&
              e.id == this.selection.matchId
          );
        if (clone) {
          if (
            clone.x - this.selection.x <= 5 &&
            clone.x - this.selection.x >= -15 &&
            (clone.y - this.selection.y <= 5 || clone.y - this.selection.y >= 5)
          ) {
            let filters = this.shapes.filter(e => e != clone);
            this.selection.x = clone.x;
            this.selection.y = clone.y;
            this.shapes = filters;
            this.executeSound("./game/sounds/success.mp3"); //todo
            this.selection.modify = false;
            this.toJSON["Stage"] = this.shapes;
            this.draw();
          } else {
            this.executeSound("./game/sounds/error.mp3")
              .then(() => {
              })
              .catch((error) => {
                console.log("Error executing sound -> " + error);
              })
            this.selection.x = this.xAnt;
            this.selection.y = this.yAnt;
            this.draw();
          }
        }
      }
    });
  }

  executeSound(src) {
    return new Promise((resolve, reject) => {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      this.sound.play();
      this.sound.onended = function () {
        return resolve("OK");
      };
    })
  }

  setShapes(shapes) {
    this.clear();
    this.shapes = shapes;
    this.toJSON["Stage"] = shapes;
    this.draw();
  }

  getMouse(e) {
    let element = this.canvas,
      offsetX = 0,
      offsetY = 0,
      mx,
      my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;
    return { x: mx, y: my };
  }

  startEvents() {
    this.selectStart();
    this.dblClick();
    this.mouseDown();
    this.mouseUp();
    this.mouseMove();
    this.removeShape();
  }
}
