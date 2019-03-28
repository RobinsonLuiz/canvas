var delta = 0;
class Triangle extends Shape {

    triangle;

    //id optional temporaly
    constructor(x, y, width, height, fill, context, zIndex, id, matchId) {
        super(x, y, width, height);
        this.fill = fill;
        this.modify = modify;
        this.id = id;
        this.context = context;
    }

    contains(mouseX, mouseY) {
        if (this.context.getContext().isPointInPath(this.triangle, mouseX, mouseY)) {
            return true;
        }
    }

    updateColor(color) {
        this.fill = color;
    }

    draw(ctx) {
        this.triangle = new Path2D();
        ctx.beginPath();
        this.triangle.moveTo(200 + this.x, 100 + this.y);
        this.triangle.lineTo(this.x, this.y + 100);
        this.triangle.lineTo(this.x + 100, this.y - 100);
        ctx.closePath();

        // the outline
        this.triangle.lineWidth = 10;
        this.triangle.strokeStyle = "#666666";
        ctx.fillStyle = this.fill;
        ctx.fill(this.triangle);
    }
}
