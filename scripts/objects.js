class Editor {

    constructor(textArea) {
        this.textArea = textArea;
        this.enableTab();
    }

    getTextArea() {
        return this.textArea;
    }

    getText() {
        return this.textArea.value;
    }

    clear() {
        this.textArea.value = "";
    }

    enableTab() {
        this.textArea.onkeydown = function (e) {
            if (e.keyCode === 9) {
                this.value += '\t';
                return false;
            }
        }
    }

}

class Terminal {

    constructor(textArea) {
        this.textArea = textArea;
    }

    print(str) {
        this.textArea.value += "\nterminal$ " + str;
        this.textArea.scrollTop = this.textArea.scrollHeight;
    }

    clear() {
        this.textArea.value = "terminal$";
    }
}


const SQUARE = 0,
    CIRCLE = 1,
    TRIANGLE = 2;
class Canvas {

    constructor(parent) {
        this.parent = parent;
        this.width = this.parent.offsetWidth;
        this.height = this.parent.offsetHeight;
        this.canvas = createCanvas(this.width, this.height);
        this.canvas.parent(parent.id);
        this.figures = [];
    }

    static get SQUARE() {
        return SQUARE;
    }

    static get CIRCLE() {
        return CIRCLE;
    }

    static get TRIANGLE() {
        return TRIANGLE;
    }

    resize() {
        this.updateFigs();
        this.updateSize();
        resizeCanvas(this.width, this.height);
    }

    updateFigs() {
        let xMod = this.parent.offsetWidth / this.width;
        let yMod = this.parent.offsetHeight / this.height;
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].update(xMod, yMod, xMod);
        }
    }

    updateSize() {
        this.width = this.parent.offsetWidth;
        this.height = this.parent.offsetHeight;
    }

    addFigure(figType) {
        let size = this.width / 10;
        let cX = this.width / 2;
        let cY = this.height / 2;
        let figure;
        switch (figType) {
            case Canvas.SQUARE:
                figure = new Square(cX, cY, size);
                break;
            case Canvas.CIRCLE:
                figure = new Circle(cX, cY, size);
                break;
            case Canvas.TRIANGLE:
                figure = new Triangle(cX, cY, size);
                break;
        }
        this.figures.push(figure);
    }

    draw() {
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].draw();
        }

    }

    boundFigures() {
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].bound(0, this.width, 0, this.height);
        }
    }

    clear() {
        this.figures = [];
    }

    mousePressed() {
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].mousePressed();
        }
    }

    mouseReleased() {
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].mouseReleased();
        }
    }

}

class Figure {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size
        this.color = this.getRandColor();
        this.dragging = false;
        this.rollover = false;
        this.offsetX;
        this.offSetY;
        //this.divideme=1
    }

    draw() {
        stroke(this.color);
        fill(this.color);
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    getRandColor() {
        let rand = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        let colors = ['#EE0000', '#6601FF', '#0266FF', '#00EF02', '#FEFF04', '#FE9900'];
        return colors[rand];
    }

    update(xMod, yMod, sMod) {
        this.x = this.x * xMod;
        this.y = this.y * yMod;
        this.size = this.size * sMod;
    }

    mousePressed() {
        this.dragging = this.mouseOver();
        if (this.dragging) {
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    mouseOver() {}

    mouseReleased() {
        this.dragging = false;
    }

    bound(lowLimitX, upLimitX, lowLimitY, upLimitY) {
        if (this.dragging) {
            let figSizeOffset = this.size / 2;
            if (mouseX < lowLimitX + figSizeOffset) {
                this.x = lowLimitX + figSizeOffset;
            } else if (mouseX > upLimitX - figSizeOffset) {
                this.x = upLimitX - figSizeOffset;
            }

            if (mouseY < lowLimitY + figSizeOffset) {
                this.y = lowLimitY + figSizeOffset;
            } else if (mouseY > upLimitY - figSizeOffset) {
                this.y = upLimitY - figSizeOffset;
            }
        }
    }

}

class Square extends Figure {

    constructor(x, y, size) {
        super(x, y, size);
        this.offsetPosX;
        this.offsetPosY;
        this.setOffsetPos();
    }

    draw() {
        super.draw();
        this.setOffsetPos();
        square(this.offsetPosX, this.offsetPosY, this.size);
    }

    setOffsetPos() {
        this.offsetPosX = this.x - (this.size / 2);
        this.offsetPosY = this.y - (this.size / 2);
    }

    update(xMod, yMod, sMod) {
        super.update(xMod, yMod, sMod);
        this.setOffsetPos();
    }

    mouseOver() {
        return ((mouseX > this.offsetPosX) && (mouseX < this.offsetPosX + this.size) && (mouseY > this.offsetPosY) && (mouseY < this.offsetPosY + this.size));
    }
}

class Circle extends Figure {

    constructor(x, y, size) {
        super(x, y, size);
    }

    draw() {
        super.draw();
        circle(this.x, this.y, this.size);
    }

    mouseOver() {
        let radius = this.size / 2;
        return (this.distance(mouseX, mouseY) < radius);
    }

    distance(pX, pY) {
        let a, b, c;
        b = this.x - pX;
        b = b * b;
        c = this.y - pY;
        c = c * c;
        a = Math.sqrt(b + c);
        return a;
    }

}

class Triangle extends Figure {

    constructor(x, y, size) {
        super(x, y, size);
        this.setVertices();
    }

    setVertices() {
        this.x1 = (this.x) - ((this.size) / 2);
        this.y1 = (this.y) + ((this.size) / 2);
        this.x2 = (this.x) + ((this.size) / 2);
        this.y2 = this.y1;
        this.x3 = this.x;
        this.y3 = (this.y) - ((this.size) / 2);
    }

    draw() {
        super.draw();
        this.setVertices();
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    }

    update(xMod, yMod, sMod) {
        super.update(xMod, yMod, sMod);
        this.setVertices();
    }

    mouseOver() {
        let area = this.area(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        let a = this.area(mouseX, mouseY, this.x2, this.y2, this.x3, this.y3);
        let b = this.area(this.x1, this.y1, mouseX, mouseY, this.x3, this.y3);
        let c = this.area(this.x1, this.y1, this.x2, this.y2, mouseX, mouseY);
        let sumOfAreas = a + b + c;
        let diffAreas = area - sumOfAreas;
        let tolerance = 0.001;
        return ((diffAreas > -tolerance) && (diffAreas < tolerance));
    }

    area(x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    }

}