const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    ru: false,
    upper: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },
  render(){
    this.elements.keysContainer.innerHTML='';
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },
  renderKeys() { 
      if(!this.properties.ru){ 
      if(!this.properties.shift){
        return [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        "done","lang","space"]
      } else{ 
        return [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","{", "}",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "done","lang","space"]
    }
   }else { if(this.properties.shift){
     return [
        "!", "@", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
         "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
      "done","lang","space"]
   }else {
     return [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
      "done","lang","space"]
   }
   }
  },
  _createKeys() {
    
    const fragment = document.createDocumentFragment();
    const keyLayout = Keyboard.renderKeys();
    


    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace","]", "}","ъ", "enter", "?","/"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          // let classCaps = this.properties.capsLock ? 'keyboard__key--active' : ' ';
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          if(!this.properties.capsLock) {
            keyElement.classList.remove("keyboard__key--active");
          } else {
            keyElement.classList.add("keyboard__key--active");
          }
          keyElement.innerHTML = createIconHTML("keyboard_capslock");


          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active");
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

          case "lang":
          keyElement.classList.add("keyboard__key");
          if(!this.properties.ru){
            keyElement.innerHTML = `<p>Ru</p>`;
          } else{ keyElement.innerHTML = `<p>En</p>`;}
        
          keyElement.addEventListener("click", () => {
            this._toggleLang();
            keyElement.innerHTML = this.properties.ru ? `<p>Ru</p>`: `<p>En</p>`;
          });

          break;

          case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = `<p>Shift</p>`;
          if(!this.properties.shift) {
            keyElement.classList.remove("keyboard__key--active");
          } else {
            keyElement.classList.add("keyboard__key--active");
          }
          keyElement.addEventListener("click", () => {
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.upper ? key.toUpperCase() : key.toLowerCase();
            console.log(key);
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);    
    }
  },

  _toggleCapsLock() {
    this.properties.upper = !this.properties.upper;
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.upper ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },
  _toggleLang() {
    this.properties.ru = !this.properties.ru;
    this.render();
  },

  _toggleShift(){
    this.properties.upper = !this.properties.upper;
    this.properties.shift = !this.properties.shift;
    this.render();
    for (const key of this.elements.keys) {
      
      if (key.childElementCount === 0) {
        // if(key.textContent == "1" || key.textContent == "!"){
        //   key.textContent = this.properties.shift ? "!" : "1"; 
        // };
        // if(key.textContent == "2" || key.textContent == "@"){
        //   key.textContent = this.properties.shift ? "@" : "2"; 
        // };
        // if(key.textContent == "3" || key.textContent == "#"){
        //   key.textContent = this.properties.shift ? "#" : "3"; 
        // };
        // if(key.textContent == "4" || key.textContent == "$"){
        //   key.textContent = this.properties.shift ? "$" : "4"; 
        // };
        // if(key.textContent == "5" || key.textContent == "%"){
        //   key.textContent = this.properties.shift ? "%" : "5"; 
        // };
        // if(key.textContent == "6" || key.textContent == "^"){
        //   key.textContent = this.properties.shift ? "^" : "6"; 
        // };
        // if(key.textContent == "7" || key.textContent == "&"){
        //   key.textContent = this.properties.shift ? "&" : "7"; 
        // };
        // if(key.textContent == "8" || key.textContent == "*"){
        //   key.textContent = this.properties.shift ? "*" : "8"; 
        // };
        // if(key.textContent == "9" || key.textContent == "("){
        //   key.textContent = this.properties.shift ? "(" : "9"; 
        // };
        // if(key.textContent == "0" || key.textContent == ")"){
        //   key.textContent = this.properties.shift ? ")" : "0"; 
        // };
        key.textContent = this.properties.upper ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});