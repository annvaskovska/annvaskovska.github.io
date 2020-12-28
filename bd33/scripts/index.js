(function(){
  const count = document.getElementById('count');
  const congrats = document.getElementById('congrats');

  function renderConfetti() {
    const confettiSettings = { target: 'confetti' };
    const confetti = new window.ConfettiGenerator(confettiSettings);
    confetti.render();
  }

  function clearAll() {
    count.remove();
    congrats.remove();
    renderConfetti();
  }

  function showCounter() {
    count.style.display = 'block';
    congrats.style.display = 'none';
  }

  function showCongrats() {
    count.style.display = 'none';
    congrats.style.display = 'flex';
    congrats.append(buildIframe());
  }

  const url = new URLSearchParams(window.location.search);
  const key = url.get('key');
  if (!key || key !== 'kotik') {
    clearAll();
    return;
  }

  function buildIframe() {
    const link = `https%3A%2F%2Fwww.youtube.com%2Fembed%2F7y_rGkpOaUs`;
    const iframe = document.createElement('iframe');
    iframe.style.width = '1206px';
    iframe.style.height = '678px';
    iframe.setAttribute('src', decodeURIComponent(link));
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');
    return iframe;
  }

  renderConfetti();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let countDown = new Date('Jan 03, 2021 00:00:00').getTime();

  const x = setInterval(function() {
    let now = new Date().getTime(),
        distance = countDown - now;

    document.getElementById('day').innerText = Math.floor(distance / day);
    document.getElementById('hour').innerText = Math.floor(
        (distance % day) / hour
    );
    document.getElementById('minute').innerText = Math.floor(
        (distance % hour) / minute
    );
    document.getElementById('second').innerText = Math.floor(
        (distance % minute) / second
    );

    if (distance < 0) {
      clearInterval(x);
      showCongrats()
    } else {
      showCounter()
    }

  }, second);
})();
