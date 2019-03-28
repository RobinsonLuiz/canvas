class Transformer extends Shape {
    x = 0;
    y = 0;
    width = 50;
    height = 50;
    modify = false;
    id = 0;
    transformer;

    //id optional temporaly
    constructor(x, y, context, zIndex, id = 0, width = 15, height = 15) {
        super(zIndex);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
        this.context = context;
    }

    contains(mouseX, mouseY) {
        if (this.context.getContext().isPointInPath(this.transformer, mouseX, mouseY)) return true;
    }

    attachTo(shape) {
        this.context.addShape(new Transformer(shape.x, shape.y, this.context, this.id));
        this.context.addShape(new Transformer(shape.x, shape.y - this.width + (shape.width / 2), this.context, this.id));
        this.context.addShape(new Transformer(shape.x + (shape.height * 2) - this.height, shape.y - this.width + (shape.width / 2), this.context, this.id));
        this.context.addShape(new Transformer(shape.x + (shape.height * 2) - this.height, shape.y, this.context, this.id));
    }

    draw(ctx) {
        this.transformer = new Path2D();
        this.transformer.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'red';
        ctx.fillStyle = "rgba(120, 120, 120, 0)";
        ctx.fill(this.transformer);
        ctx.stroke(this.transformer);
    }
}
