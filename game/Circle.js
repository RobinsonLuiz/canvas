class Circle extends Shape {

  circle;

  constructor(x, y, width, height, radius, fill, context, zIndex, enabled, visible, id, matchId) {
    super(x, y, width, height, zIndex, enabled, visible, id, matchId);
    this.radius = radius;
    this.fill = fill;
    this.context = context;
  }


  contains(mouseX, mouseY) {
    if (this.context.getContext().isPointInPath(this.circle, mouseX, mouseY)) return true;
  }

  updateColor(color) {
    this.fill = color;
  }

  draw(ctx) {
    this.circle = new Path2D();
    this.circle.arc(this.x, this.y, this.width, this.height, Math.PI * 2);
    ctx.fillStyle = this.fill;
    ctx.closePath();
    ctx.fill(this.circle);
  }
}
