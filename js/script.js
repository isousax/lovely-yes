const noBtn = document.getElementById('btnNo');
const yesBtn = document.getElementById('btnYes');
const finalMessage = document.getElementById('finalMessage');
const proposalText = document.getElementById('proposalText');
const gallery = document.getElementById('galleryScreen');
const music = new Audio('audio/Ed Sheeran - Photograph.mp3');
music.loop = true;

const timeBeforeTransition = 10000; // 10s

const personName = "PessoaAlvo";
proposalText.textContent = `💌 ${personName}, quer namorar comigo?`;

const messages = [
  "Te amo ❤️",
  "Você significa muito pra mim 💫",
  "Agora é oficial, hein! ❤️",
  "Não tem mais volta… e quer saber? Ainda bem 😌",
  "Te amo ❤️"
];

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
  noBtn.style.position = 'absolute';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

yesBtn.addEventListener('click', handleYesClick);

new Swiper('.swiper', {
  effect: 'fade',
  fadeEffect: { crossFade: true },
  speed: 1500,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: { el: '.swiper-pagination' },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

function handleYesClick() {
  music.play();

  finalMessage.textContent = "";
  typeText(
    "Você fez meu mundo mais bonito! 💘",
    finalMessage,
    35,
    20
  );
  finalMessage.classList.remove('hidden');

  triggerHearts();
  triggerSparkles();
  createFloatingCaption();

  document.querySelector('.buttons').style.display = 'none';

  setTimeout(() => {
    document.querySelector('.container').style.display = 'none';
    gallery.classList.remove('hidden');
    gallery.style.display = 'flex';
  }, timeBeforeTransition);
}

function triggerHearts() {
  const heartInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 20 + Math.random() * 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 5 + Math.random() * 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 500);

  setTimeout(() => clearInterval(heartInterval), timeBeforeTransition);
}

function triggerSparkles() {
  const sparkleInterval = setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDuration = 5 + Math.random() * 2 + 's';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 7000);
  }, 300);

  setTimeout(() => clearInterval(sparkleInterval), timeBeforeTransition * 2);
}

function createFloatingCaption() {
  const delayBetweenMessages = 2000;
  let currentIndex = 0;

  function showNextMessage() {
    if (currentIndex >= messages.length) return;

    const caption = document.createElement('div');
    caption.textContent = messages[currentIndex];
    caption.className = 'floating-caption';
    caption.style.left = `${Math.random() * 80 + 10}vw`;
    caption.style.top = `${Math.random() * 80 + 10}vh`;
    document.body.appendChild(caption);

    setTimeout(() => caption.remove(), 7000);
    currentIndex++;
    setTimeout(showNextMessage, delayBetweenMessages);
  }

  showNextMessage();
}

function typeText(text, element, speed = 40, randomness = 15) {
  element.textContent = "";
  let i = 0;

  function typeNext() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;

      let delay = speed + Math.random() * randomness;
      const currentChar = text[i - 1];

      if (currentChar === ',' || currentChar === '…') delay += 100;
      else if (['.', '!', '?'].includes(currentChar)) delay += 200;
      else if (/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(currentChar)) delay += 100;

      setTimeout(typeNext, delay);
    }
  }
  requestAnimationFrame(typeNext);
}