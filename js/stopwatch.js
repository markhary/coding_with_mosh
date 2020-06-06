/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
function StopWatch() {
  let startTime = 0;
  let endTime = 0;
  let running = 0;
  let duration = 0;

  this.start = function start() {
    if (running) throw new Error('StopWatch has already started.');

    running = true;

    startTime = new Date();
  };

  this.stop = function stop() {
    if (!running) throw new Error('StopWatch is not started.');

    running = false;

    endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = function reset() {
    startTime = new Date();
    endTime = null;
    running = false;
    duration = 0;
  };

  Object.defineProperty(this, 'duration', {
    get: function get() {
      let elapsed = 0;
      if (running) {
        const now = new Date();
        elapsed = now.getTime() - startTime.getTime();
      }
      return duration + elapsed / 1000;
    },
  });
}

const sw = new StopWatch();
console.log(`
  sw.start()
  sw.stop()
  sw.reset()
  sw.duration
`);
