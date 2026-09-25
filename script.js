document.addEventListener('DOMContentLoaded', function () {

  const botaoMenu = document.getElementById('botaoMenu');
  const menuMobile = document.getElementById('menuMobile');

  if (botaoMenu && menuMobile) {

    botaoMenu.addEventListener('click', function () {

      menuMobile.classList.toggle('hidden');

      const menuEstaAberto = !menuMobile.classList.contains('hidden');

      botaoMenu.setAttribute('aria-expanded', menuEstaAberto);

      if (menuEstaAberto) {
        botaoMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      } else {
        botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });

    const linksDoMenu = document.querySelectorAll('#menuMobile a');

    linksDoMenu.forEach(function (link) {

      link.addEventListener('click', function () {
        menuMobile.classList.add('hidden');

        botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        botaoMenu.setAttribute('aria-expanded', 'false');
      });

    });
  }


  const cabecalho = document.getElementById('cabecalho');

  function atualizarCabecalho() {

    if (!cabecalho) {
      return;
    }

    if (window.scrollY > 40) {

      cabecalho.classList.add(
        'bg-fundo/85',
        'backdrop-blur-md',
        'border-borda',
        'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]'
      );

    } else {

      cabecalho.classList.remove(
        'bg-fundo/85',
        'backdrop-blur-md',
        'border-borda',
        'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]'
      );

    }
  }

  if (cabecalho) {

    atualizarCabecalho();

    window.addEventListener('scroll', atualizarCabecalho);
  }


  const playerDemo = document.getElementById('playerDemo');
  const botaoPlayDemo = document.getElementById('botaoPlayDemo');

  if (playerDemo && botaoPlayDemo) {

    playerDemo.classList.add('player-pausado');

    botaoPlayDemo.addEventListener('click', function () {

      const estaPausado =
        playerDemo.classList.contains('player-pausado');

      if (estaPausado) {

        playerDemo.classList.remove('player-pausado');

        botaoPlayDemo.innerHTML =
          '<i class="fa-solid fa-pause"></i>';

        botaoPlayDemo.setAttribute(
          'aria-label',
          'Pausar prévia'
        );

      } else {

        playerDemo.classList.add('player-pausado');

        botaoPlayDemo.innerHTML =
          '<i class="fa-solid fa-play"></i>';

        botaoPlayDemo.setAttribute(
          'aria-label',
          'Tocar prévia'
        );
      }
    });
  }

  const formularioContato =
    document.getElementById('formularioContato');

  const mensagemFormulario =
    document.getElementById('mensagemFormulario');

  if (formularioContato && mensagemFormulario) {

    formularioContato.addEventListener(
      'submit',
      function (evento) {

        evento.preventDefault();

        const campoNome =
          document.getElementById('nome');

        const campoEmail =
          document.getElementById('email');

        const primeiroNome =
          campoNome.value.split(' ')[0];

        mensagemFormulario.textContent =
          'Prontinho, ' +
          primeiroNome +
          '! Você vai receber nossas novidades em ' +
          campoEmail.value +
          '.';

        formularioContato.reset();
      }
    );
  }

});