window.addEventListener('load', function () {
  let timer1 = new Timer('.timer1', 10);
  let timer2 = new WordsTimer('.timer2', 87000);

  document.querySelector('.getSale').addEventListener('click', function () {
    this.disabled = true;
    this.innerHTML = 'Скидка ваша!';
    timer2.stop();
  });
});

class Timer {
  constructor(selector, time) {
    this.box = document.querySelector(selector);
    this.daysSpan = this.box.querySelector('.days');
    this.hoursSpan = this.box.querySelector('.hours');
    this.minutesSpan = this.box.querySelector('.minutes');
    this.secondsSpan = this.box.querySelector('.seconds');
    this.time = time;
    this.interval = null;
    this.render();
    this.start();
  }

  start() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  tick() {
    this.time--;
    this.render();

    if (this.time < 1) {
      this.stop();
    }
  }

  render() {
    this.box.innerHTML = this.time;
  }
}

class NiceTimer extends Timer {
  splitTime() {
    let days = parseInt(this.time / 86400);
    let ds = this.time % 86400;
    let hours = parseInt(ds / 3600);
    let hs = this.time % 3600;
    let minutes = parseInt(hs / 60);
    let seconds = hs % 60;
    return { days, hours, minutes, seconds };
  }

  render() {
    let t = this.splitTime();
    this.box.innerHTML = `${t.h}:${t.m}:${t.s}`;
  }
}

class WordsTimer extends NiceTimer {
  wordVariants(num, variant1, variant234, variantOther) {
    let timeMod100 = num % 100; // последние две цифры числа
    let timeMod10 = num % 10; // последняя цифра числа
    let word = '';

    if (timeMod100 >= 11 && timeMod100 <= 14) {
      word = variantOther;
    } else if (timeMod10 == 1) {
      word = variant1;
    } else if (timeMod10 >= 2 && timeMod10 <= 4) {
      word = variant234;
    } else {
      word = variantOther;
    }

    return word;
  }

  render() {
    let { days, hours, minutes, seconds } = this.splitTime();
    let dw = this.wordVariants(days, 'день', 'дня', 'дней');
    let hw = this.wordVariants(hours, 'час', 'часа', 'часов');
    let mw = this.wordVariants(minutes, 'минута', 'минуты', 'минут');
    let sw = this.wordVariants(seconds, 'секунда', 'секунды', 'секунд');
    this.daysSpan.innerHTML = days == 0 ? '' : `${days} ${dw}`;
    this.hoursSpan.innerHTML = hours == 0 ? '' : `${hours} ${hw}`;
    this.minutesSpan.innerHTML = minutes == 0 ? '' : `${minutes} ${mw}`;
    this.secondsSpan.innerHTML = seconds == 0 ? '' : `${seconds} ${sw}`;
  }
}
