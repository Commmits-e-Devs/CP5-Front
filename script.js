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


  const trilhoCarrossel = document.getElementById('trilhoCarrossel');
  const setaAnterior = document.getElementById('setaAnterior');
  const setaProxima = document.getElementById('setaProxima');
  const dotsCarrossel = document.getElementById('dotsCarrossel');
  const statusAudioDemo = document.getElementById('statusAudioDemo');
  const cartoesPlayer = document.querySelectorAll('.cartao-player');

  if (trilhoCarrossel && cartoesPlayer.length > 0) {

    let slideAtual = 0;
    const totalSlides = cartoesPlayer.length;
    const botoesDots = dotsCarrossel
      ? Array.from(dotsCarrossel.children)
      : [];

    function irParaSlide(indice) {

      slideAtual = (indice + totalSlides) % totalSlides;

      trilhoCarrossel.style.transform =
        'translateX(-' + (slideAtual * 100) + '%)';

      botoesDots.forEach(function (dot, i) {
        const estaAtivo = i === slideAtual;
        dot.classList.toggle('bg-secundaria', estaAtivo);
        dot.classList.toggle('bg-borda', !estaAtivo);
        dot.setAttribute('aria-selected', String(estaAtivo));
      });
    }

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

    botoesDots.forEach(function (dot, indice) {
      dot.addEventListener('click', function () {
        irParaSlide(indice);
      });
    });

    // Suporte a arrastar/swipe em telas de toque
    let posicaoInicioToque = null;

    trilhoCarrossel.addEventListener('touchstart', function (evento) {
      posicaoInicioToque = evento.touches[0].clientX;
    });

    trilhoCarrossel.addEventListener('touchend', function (evento) {

      if (posicaoInicioToque === null) {
        return;
      }

      const diferenca =
        evento.changedTouches[0].clientX - posicaoInicioToque;

      if (diferenca > 40) {
        irParaSlide(slideAtual - 1);
      } else if (diferenca < -40) {
        irParaSlide(slideAtual + 1);
      }

      posicaoInicioToque = null;
    });

    // Áudio de cada card do carrossel: apenas uma faixa toca por vez
    cartoesPlayer.forEach(function (cartao) {

      const audio = cartao.querySelector('.audio-demo');
      const botaoTocar = cartao.querySelector('.botao-tocar');

      if (!audio || !botaoTocar) {
        return;
      }

      cartao.classList.add('player-pausado');

      function mostrarEstadoTocando() {
        cartao.classList.remove('player-pausado');
        botaoTocar.innerHTML = '<i class="fa-solid fa-pause"></i>';
        if (statusAudioDemo) {
          statusAudioDemo.textContent = 'Tocando prévia...';
        }
      }

      function mostrarEstadoPausado() {
        cartao.classList.add('player-pausado');
        botaoTocar.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (statusAudioDemo) {
          statusAudioDemo.textContent = '';
        }
      }

      audio.addEventListener('play', function () {

        // Garante que só uma faixa do carrossel toque por vez
        cartoesPlayer.forEach(function (outroCartao) {
          if (outroCartao === cartao) {
            return;
          }
          const outroAudio = outroCartao.querySelector('.audio-demo');
          if (outroAudio && !outroAudio.paused) {
            outroAudio.pause();
          }
        });

        mostrarEstadoTocando();
      });

      audio.addEventListener('pause', mostrarEstadoPausado);
      audio.addEventListener('ended', mostrarEstadoPausado);

      audio.addEventListener('error', function () {
        if (statusAudioDemo) {
          statusAudioDemo.textContent =
            'Não foi possível carregar a prévia agora. Tente novamente mais tarde.';
        }
        mostrarEstadoPausado();
      });

      botaoTocar.addEventListener('click', function () {

        if (audio.paused) {

          const promessaPlay = audio.play();

          if (promessaPlay && typeof promessaPlay.catch === 'function') {
            promessaPlay.catch(function () {
              if (statusAudioDemo) {
                statusAudioDemo.textContent =
                  'Toque no botão novamente para iniciar a prévia.';
              }
            });
          }

        } else {
          audio.pause();
        }
      });
    });

    irParaSlide(0);
  }

  const formularioContato =
    document.getElementById('formularioContato');

  const mensagemFormulario =
    document.getElementById('mensagemFormulario');

  // ⚠️ CONFIGURAÇÃO NECESSÁRIA ANTES DE PUBLICAR:
  // Troque a URL abaixo pelo endpoint real do seu serviço de e-mail
  // marketing (ex: Formspree, Mailchimp, Brevo, um endpoint próprio, etc.).
  // Enquanto o valor abaixo estiver como está, o formulário funciona em
  // modo de demonstração local (não envia o e-mail para lugar nenhum).
  const URL_ENDPOINT_NEWSLETTER = 'https://formspree.io/f/SEU_ID_AQUI';

  if (formularioContato && mensagemFormulario) {

    const botaoEnviar = formularioContato.querySelector('button[type="submit"]');
    const textoOriginalBotao = botaoEnviar ? botaoEnviar.innerHTML : '';

    formularioContato.addEventListener(
      'submit',
      async function (evento) {

        evento.preventDefault();

        const campoNome = document.getElementById('nome');
        const campoEmail = document.getElementById('email');
        const primeiroNome = campoNome.value.split(' ')[0];

        const emEndpointConfigurado =
          URL_ENDPOINT_NEWSLETTER.indexOf('SEU_ID_AQUI') === -1;

        mensagemFormulario.classList.remove('text-red-400');
        mensagemFormulario.classList.add('text-secundaria');

        if (botaoEnviar) {
          botaoEnviar.disabled = true;
          botaoEnviar.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        }

        try {

          if (emEndpointConfigurado) {

            const resposta = await fetch(URL_ENDPOINT_NEWSLETTER, {
              method: 'POST',
              headers: { 'Accept': 'application/json' },
              body: new FormData(formularioContato)
            });

            if (!resposta.ok) {
              throw new Error('Falha no envio: ' + resposta.status);
            }

          } else {
            // Modo de demonstração: nenhum endpoint configurado ainda.
            console.warn(
              'Formulário em modo de demonstração: configure ' +
              'URL_ENDPOINT_NEWSLETTER em script.js para coletar ' +
              'e-mails de verdade.'
            );
            await new Promise(function (resolve) {
              setTimeout(resolve, 600);
            });
          }

          mensagemFormulario.textContent =
            'Prontinho, ' +
            primeiroNome +
            '! Você vai receber nossas novidades em ' +
            campoEmail.value +
            '.';

          formularioContato.reset();

        } catch (erro) {

          mensagemFormulario.classList.remove('text-secundaria');
          mensagemFormulario.classList.add('text-red-400');

          mensagemFormulario.textContent =
            'Não foi possível enviar agora. Tente novamente em instantes.';

          console.error('Erro ao enviar formulário de contato:', erro);

        } finally {

          if (botaoEnviar) {
            botaoEnviar.disabled = false;
            botaoEnviar.innerHTML = textoOriginalBotao;
          }
        }
      }
    );
  }

});