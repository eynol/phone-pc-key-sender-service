export default function roteate(type) {
  let screen = window.screen;
  if (!screen.orientation) {
    return;
  }
  let orientationValue = '';
  switch (type) {
    case 0: {
      orientationValue = 'portrait-primary'; break;
    }
    case 1: {
      orientationValue = 'landscape-primary'; break;
    }
    case 2: {
      orientationValue = 'portrait-secondary'; break;
    }
    case 3: {
      orientationValue = 'landscape-secondary'; break;
    }
    default: {
      orientationValue = 'portrait-primary';
    }
  }
  screen.orientation.lock(orientationValue);
}