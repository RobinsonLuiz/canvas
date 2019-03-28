class Shape {

  x;
  y;
  width;
  height;
  zIndex;
  id; //id do shape
  matchId; //id do correspondente
  enabled; //clicavel
  visible; //mostrado ou não


  /* Métodos
    draw()
    contain(point)

    new class ()



  */

  constructor(x, y, width, height, zIndex, enabled, visible, id, matchId = null) {
    this.zIndex = zIndex;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.matchId = matchId;
    this.enabled = enabled;
    this.visible = visible;
  }

  contains(mouseX, mouseY) { }

  draw() { }

  class() {
    return this.__proto__.constructor.name;
  }
}
