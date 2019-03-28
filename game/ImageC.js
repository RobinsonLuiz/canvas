class ImageC extends Shape {

  img;
  loaded = false;

  constructor(x, y, width, height, img, fill, context, zIndex, enabled, visible, id, matchId) {
    super(x, y, width, height, zIndex, enabled, visible, id, matchId);
    this.fill = fill;
    this.img = new Image();
    this.img.src = img;
    this.context = context;
  }

  contains(mouseX, mouseY) {
    let rectX = mouseX - this.height - this.x;
    let rectY = mouseY - this.width - this.y;
    if (rectX >= -160 && rectX <= 100 && rectY >= -250 && rectY <= -100) return true;
  }

  draw(ctx) {
    if (!this.loaded) {
      this.img.onload = (e) => {
        ctx.filter = this.fill;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.save();
        ctx.filter = "none";
        this.loaded = true;
      }
    } else {
      ctx.filter = this.fill;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.save();
      ctx.filter = "none";
    }
  }
}
