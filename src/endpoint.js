export default class EndPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.w = w;
        // this.h = h;
        // this.id = id;
        this.portal = new Image();
        this.portal.src = "images/portal.png";
    }

    display(ctx) {
        ctx.drawImage(this.portal, this.x, this.y);
    }
}
