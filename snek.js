class Snek {
    constructor(x, y) {
        this.body = [
            { x, y }
        ];
        this.heading = 'up';
        this.headingChanged = false;
        this.justAte = false;
        this.robotMode = true;
        this.brain = new Brain();
    }

    get color() {
        return "#BB5522";
    }

    get head() {
        return this.body[0];
    }

    get path() {
        return this.brain.path;
    }

    setHeading(heading) {
        if (this.headingChanged) {
            this.nextHeading = heading
        } else {
            this.heading = heading;
        }
        this.headingChanged = true;
    }
    
    eat() {
        this.justAte = true;
    }

    move() {
        if (this.robotMode) {
            this.heading = this.brain.robotChoice(this);
        }
        const hX = this.head.x
        const hY = this.head.y

        if (!this.justAte) { this.body.pop() };
        this.justAte = false;

        switch(this.heading) {
            case 'up':
                this.body.unshift({x: hX, y: hY - 1});
                break;
            case 'down':
                this.body.unshift({x: hX, y: hY + 1});
                break;
            case 'left':
                this.body.unshift({x: hX - 1, y: hY});
                break;
            case 'right':
                this.body.unshift({x: hX + 1, y: hY});
                break;
        }

        if (this.nextHeading) {
            this.heading = this.nextHeading;
            this.nextHeading = null;
        }
        this.headingChanged = false;
    }

    apple(apple) {
        if (this.head.x == apple.x && this.head.y == apple.y) {
            this.justAte = true;
            return true;
        }
    }

    coordsInBody(x, y) {
        let body = [...this.body];
        body.shift();
        let crash = false;
        body.forEach(segment => {
            if (segment.x == x && segment.y == y) {
                crash = true;
            }
        });
        return crash;
    }

    crashIntoSelf() {
        return this.coordsInBody(snek.head.x, snek.head.y);
    }
}

class Brain {

    robotChoice(snek) {
        const {x, y} = snek.head;
        const choices = this.getAdjacentCoords(x, y);
        
        const safeDirections = this.getSafeDirections(x, y, choices);
        
        if (safeDirections.length < 1) {
            // JESUS TAKE THE WHEEL
            return snek.heading;
        }

        const bestChoice = safeDirections.reduce((best, next) => {
            const bestD = this.distFromApple(choices[best].x, choices[best].y, apple);
            const nextD = this.distFromApple(choices[next].x, choices[next].y, apple);
            return bestD <= nextD ? best : next;
        });

        return bestChoice;
    }

    getSafeDirections(x, y, choices) {
        return Object.keys(choices).filter(choice => {
            return choices[choice].x >= 0 
            && choices[choice].y >= 0
            && choices[choice].x < board.grid.x
            && choices[choice].y < board.grid.y
            && !snek.coordsInBody(choices[choice].x, choices[choice].y);
        });
    }

    getAdjacentCoords(x, y) {
        return {
            up: {x: x, y: y - 1},
            down: {x: x, y: y + 1},
            left: {x: x - 1, y: y},
            right: {x: x + 1, y: y},
        }
    }

    distFromApple(x, y, apple) {
        return this.distFrom(x, y, apple.x, apple.y);
    }

    distFrom(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
}