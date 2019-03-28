class Rect extends Shape {

  rectangle;

  //id optional temporaly
  constructor(x, y, width, height, fill, context, zIndex, enabled, visible, id, matchId) {
    super(x, y, width, height, zIndex, enabled, visible, id, matchId);
    this.fill = fill;
    this.context = context;
  }

  contains(mouseX, mouseY) {
    if (this.context.getContext().isPointInPath(this.rectangle, mouseX, mouseY)) return true;
  }

  updateColor(color) {
    this.fill = color;
  }

  draw(ctx) {
    this.rectangle = new Path2D();
    this.rectangle.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.fill;
    ctx.fill(this.rectangle);
  }
}
