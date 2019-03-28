class Text extends Shape {
  text;
  region;

  constructor(text, x, y, fill, context, tam, fract, zIndex, id, matchId) {
    super(x, y, width, height, zIndex, id, matchId);
    this.fill = fill;
    this.text = text;
    this.tam = tam;
    this.fract = fract;
    this.context = context;
    this.effect = false;
  }

  contains(mouseX, mouseY) {
    this.context.getContext().beginPath();
    this.context.getContext().rect(this.region.x, this.region.y, this.region.w, this.region.h);
    if (this.context.getContext().isPointInPath(mouseX, mouseY)) return true;
  }

  updateColor(color) {
    this.fill = color;
  }


  draw(ctx) {
    let range = 0;
    if (this.fract) {
      for (let i = 0; i < this.text.length; i++) {
        let modif = false;
        if (this.fill != 'Black') modif = true;
        let text = new Text(this.text[i], this.x + range, this.y, this.fill, modif, this.context, this.tam, false, this.id + i);
        this.fract = false;
        range += 30;
        this.effect = true;
        this.context.shapes.push(text);
      }
    } else {
      if (!this.effect) {
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.font = this.tam;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
      }
    }
    this.tw = ctx.measureText(this.text).width;
    this.region = { x: this.x - this.tw * 0.07, y: this.y - 30, w: this.tw, h: 32 }; // approx. text region
  }
}