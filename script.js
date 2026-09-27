document.addEventListener('DOMContentLoaded', function () {


  const botaoMenu = document.getElementById('botaoMenu');
  const menuMobile = document.getElementById('menuMobile');

  if (botaoMenu && menuMobile) {

    botaoMenu.addEventListener('click', function () {

      menuMobile.classList.toggle('hidden');

      const menuEstaAberto = !menuMobile.classList.contains('hidden');

      if (menuEstaAberto) {
        botaoMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        botaoMenu.setAttribute('aria-expanded', 'true');
      } else {
        botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
        botaoMenu.setAttribute('aria-expanded', 'false');
      }
    });

    const linksDoMenu = document.querySelectorAll('#menuMobile a');

    for (let i = 0; i < linksDoMenu.length; i++) {
      linksDoMenu[i].addEventListener('click', function () {
        menuMobile.classList.add('hidden');
        botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
        botaoMenu.setAttribute('aria-expanded', 'false');
      });
    }
  }



  const cabecalho = document.getElementById('cabecalho');

  function atualizarCabecalho() {

    if (!cabecalho) {
      return;
    }

    if (window.scrollY > 40) {
      cabecalho.classList.add('bg-fundo/85', 'backdrop-blur-md', 'border-borda', 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]');
    } else {
      cabecalho.classList.remove('bg-fundo/85', 'backdrop-blur-md', 'border-borda', 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]');
    }
  }

  if (cabecalho) {
    atualizarCabecalho();
    window.addEventListener('scroll', atualizarCabecalho);
  }



  const trilhoCarrossel = document.getElementById('trilhoCarrossel');
  const setaAnterior = document.getElementById('setaAnterior');
  const setaProxima = document.getElementById('setaProxima');
  const dotsCarrossel = document.getElementById('dotsCarrossel');
  const statusAudioDemo = document.getElementById('statusAudioDemo');
  const cartoesPlayer = document.querySelectorAll('.cartao-player');

  let slideAtual = 0;
  const totalSlides = cartoesPlayer.length;

  function irParaSlide(indice) {

    if (indice < 0) {
      indice = totalSlides - 1;
    }

    if (indice > totalSlides - 1) {
      indice = 0;
    }

    slideAtual = indice;

    trilhoCarrossel.style.transform = 'translateX(-' + (slideAtual * 100) + '%)';

    const dots = dotsCarrossel.children;

    for (let i = 0; i < dots.length; i++) {
      if (i === slideAtual) {
        dots[i].classList.add('bg-secundaria');
        dots[i].classList.remove('bg-borda');
      } else {
        dots[i].classList.remove('bg-secundaria');
        dots[i].classList.add('bg-borda');
      }
    }
  }

  if (trilhoCarrossel && totalSlides > 0) {

    if (setaProxima) {
      setaProxima.addEventListener('click', function () {
        irParaSlide(slideAtual + 1);
      });
    }

    if (setaAnterior) {
      setaAnterior.addEventListener('click', function () {
        irParaSlide(slideAtual - 1);
      });
    }

    if (dotsCarrossel) {
      const dots = dotsCarrossel.children;

      for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function () {
          irParaSlide(i);
        });
      }
    }

    for (let i = 0; i < cartoesPlayer.length; i++) {

      const cartao = cartoesPlayer[i];
      const audio = cartao.querySelector('.audio-demo');
      const botaoTocar = cartao.querySelector('.botao-tocar');

      cartao.classList.add('player-pausado');

      audio.addEventListener('play', function () {

        for (let j = 0; j < cartoesPlayer.length; j++) {
          if (cartoesPlayer[j] !== cartao) {
            const outroAudio = cartoesPlayer[j].querySelector('.audio-demo');
            outroAudio.pause();
          }
        }

        cartao.classList.remove('player-pausado');
        botaoTocar.innerHTML = '<i class="fa-solid fa-pause"></i>';
        statusAudioDemo.textContent = 'Tocando prévia...';
      });

      audio.addEventListener('pause', function () {
        cartao.classList.add('player-pausado');
        botaoTocar.innerHTML = '<i class="fa-solid fa-play"></i>';
        statusAudioDemo.textContent = '';
      });

      audio.addEventListener('ended', function () {
        cartao.classList.add('player-pausado');
        botaoTocar.innerHTML = '<i class="fa-solid fa-play"></i>';
        statusAudioDemo.textContent = '';
      });

      audio.addEventListener('error', function () {
        statusAudioDemo.textContent = 'Não foi possível carregar a prévia agora.';
      });

      botaoTocar.addEventListener('click', function () {

        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      });
    }

    irParaSlide(0);
  }



  const formularioContato = document.getElementById('formularioContato');
  const mensagemFormulario = document.getElementById('mensagemFormulario');

  const URL_ENDPOINT_NEWSLETTER = 'https://mail.google.com/mail/u/0/#inbox';

  if (formularioContato && mensagemFormulario) {

    formularioContato.addEventListener('submit', function (evento) {

      evento.preventDefault();

      const campoNome = document.getElementById('nome');
      const campoEmail = document.getElementById('email');
      const primeiroNome = campoNome.value.split(' ')[0];

      const endpointConfigurado = URL_ENDPOINT_NEWSLETTER.indexOf('SEU_ID_AQUI') === -1;

      if (!endpointConfigurado) {

        console.warn('Configure a URL_ENDPOINT_NEWSLETTER em script.js para coletar e-mails de verdade.');

        mensagemFormulario.textContent = 'Prontinho, ' + primeiroNome + '! Você vai receber nossas novidades em ' + campoEmail.value + '.';
        formularioContato.reset();
        return;
      }

      fetch(URL_ENDPOINT_NEWSLETTER, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(formularioContato)
      })
        .then(function () {
          mensagemFormulario.textContent = 'Prontinho, ' + primeiroNome + '! Você vai receber nossas novidades em ' + campoEmail.value + '.';
          formularioContato.reset();
        })
        .catch(function () {
          mensagemFormulario.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
        });
    });
  }

});