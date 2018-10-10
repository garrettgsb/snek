function setupEventListeners() {
    document.addEventListener('keydown', event => {
        switch(event.keyCode) {
          case 37:
            snek.setHeading('left');
            break;
          case 38:
            snek.setHeading('up');
            break;
          case 39:
            snek.setHeading('right');
            break;
          case 40:
            snek.setHeading('down');
            break;
          case 80:
            pause = pause ? false : true;
            break;
          case 82:
            snek.robotMode = snek.robotMode ? false : true;
          default:
            console.log("Unknown key: ", event.keyCode);
        }
      });
}

function processPendingInput() {
    // Read inputs
    // Dispatch events
    return true;
};