(function() {
    const URL = "http://localhost:8080";
    var doConfetti = false;
    var timer = null;
    var interval = 2000;
  
    var audio = new Audio("resources/sounds/disco-groove-122074.mp3")
  
    window.addEventListener("load", init);
  
    /**
     * Adds event listeners to each button
     */
    function init() {
      audio.volume = 0.25;
      id("yes-btn").addEventListener("click", weParty);
      id("no-btn").addEventListener("mouseover", moveButton);
      id("no-btn").addEventListener("click", moveButton);
      id("reset-btn").addEventListener("click", resetPage);
    }
  
    /**
     * Move the button
     */
    function moveButton() {
      const top = getRandomNumber(window.innerHeight - this.offsetHeight);
      const left = getRandomNumber(window.innerWidth - this.offsetWidth);
  
      animateMove(id("no-button"), "left", left).play();
      animateMove(id("no-button"), "top", top).play();
    }

    /**
     * Animate the move
     */
    const animateMove = (element, prop, pixels) =>
    anime({
      targets: element,
      [prop]: `${pixels}px`,
      easing: "easeOutCirc"
    });

    /**
     * Throws a party
     */
    function weParty() {
      doConfetti = true;
      const jsConfetti = new JSConfetti();
      id("reset-container").classList.remove("hidden");
      id("celebration").classList.remove("hidden");
      id("question").classList.add("hidden");
      id("answers").classList.add("hidden");

      audio.play();

      if (timer !== null) return;

      jsConfetti.addConfetti({
        emojis: ['❤️', '✨'],
      }).then(() => jsConfetti.addConfetti())

      // Set interval for confetti
      timer = setInterval(function() {
        jsConfetti.addConfetti({
          emojis: ['❤️', '✨'],
        }).then(() => jsConfetti.addConfetti())
      }, interval);

    }

    function resetPage() {
      doConfetti = false;
      clearInterval(timer);
      timer = null;
  
      audio.pause();

      // Remove all confetti
      var confettiElements = document.getElementsByTagName("canvas");
      for (const c of confettiElements) {
          c.remove();
      }
  
      id("no-button").style.left = '';
      id("no-button").style.top = '';
      id("reset-container").classList.add("hidden");
      id("celebration").classList.add("hidden");
      id("question").classList.remove("hidden");
      id("answers").classList.remove("hidden");
    }

    /* --- Helper Functions --- */
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id.
     */
    function id(idName) {
      return document.getElementById(idName);
    }

    function getRandomNumber(num) {
      return Math.floor(Math.random() * (num + 1));
    }
  })();