const text = document.querySelector(".use-keyboard-input")
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
        "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        "done","lang"," ", "voice"]
      } else{ 
        return [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","{", "}",
        "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "done","lang"," ", "voice"]
    }
   }else { if(this.properties.shift){
     return [
        "!", "@", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
         "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ",
      "capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
      "done","lang"," ", "voice"]
   }else {
     return [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ",
      "capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
      "done","lang"," ", "voice"]
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
    
  //   document.addEventListener('keydown', handleEvent = (e)=>{
  //     console.log(e);
  //   const keyObj = keyLayout.find((key) => key === e.key.toLowerCase());
  //   const buttons = this.elements.keys.forEach((key)=>key.textContent == e.key.toLowerCase());
  //   //console.log(buttons)
  //   // let keyButton = red(buttons, keyObj);
  //   // const  keyButton =(buttons, keyObj)=>{
  //   //   buttons.forEach((key)=>{if(key.textContent == keyObj)
  //   //     {return key};
  //   //   });
  //   // };
  //   // function red(obj, keyObj){
  //   //   obj.forEach((key)=>{if(key.textContent == keyObj)
  //   //     {console.log(key)};
  //   //   });
  //     // for ( keys in obj){
  //     //   console.log(keys)
  //     //   if(key.textContent === keyObj){
  //     //   console.log(key);
  //     //   return key}
  //     // }

    
  //     // this.elements.keys.forEach((key) => {if(key.textContent === keyObj){
  //     //console.log(keyButton);
  //     // return key}
  //   // })
  // //});
  //  //console.log(keyButton);

  //     if(!keyObj) return;
  //     switch (keyObj){
  //       case "backspace":
  //           this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
  //           this._triggerEvent("oninput");
  //         break;

  //       case "capslock":
  //         //console.log(this.keyButton);
  //         // let classCaps = this.properties.capsLock ? 'keyboard__key--active' : ' ';
  //         keyButton.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
  //         if(!this.properties.capsLock) {
  //           keyButton.classList.remove("keyboard__key--active");
  //         } else {
  //           keyButton.classList.add("keyboard__key--active");
  //         }
  //         keyButton.innerHTML = createIconHTML("keyboard_capslock");


  //         keyElement.addEventListener("click", () => {
  //           this._toggleCapsLock();
  //           keyElement.classList.toggle("keyboard__key--active");
  //         });

  //         break;
  //         default:
  //           if (!this.properties.upper) {
  //             this._print(keyObj.toUpperCase());
  //             this._triggerEvent("oninput");
  //           } else {
  //             this._print(keyObj.toLowerCase());
  //             this._triggerEvent("oninput");
  //           }

  //         break;
  //     }
       
  //   });

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = this.properties.ru ? ["backspace","]", "}","ъ", "enter","/",".",","].indexOf(key) !== -1 : ["backspace","]", "}","ъ", "enter", "?","/",].indexOf(key) !== -1 ;

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

        case "capslock":
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

        case " ":
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
            keyElement.innerHTML = `<p>En</p>`;
          } else{ keyElement.innerHTML = `<p>Ru</p>`;}
        
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

          case "voice":
            keyElement.addEventListener("click", () => {
            this._voice();
          });
          break;
        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this._print(key);
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

  _print(key){
    this.properties.value += this.properties.upper ? key.toUpperCase() : key.toLowerCase();
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
        key.textContent = this.properties.upper ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _voice(){

// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//   const recognition = new SpeechRecognition();
//   recognition.interimResults = true;
//   recognition.lang = 'en-US';
  

//   recognition.addEventListener('result', e => {
//     const transcript = Array.from(e.results)
//       .map(result => result[0])
//       .map(result => result.transcript)
//       .join('');

//       // const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
//       // p.textContent = transcript;
      
//       if (e.results[0].isFinal) {
//         console.log(e);
//         // p = document.createElement('p');
//         // text.appendChild(p);
//       }
//   });

//   recognition.addEventListener('end', recognition.start);

//   recognition.start();


    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
      if (e.results[0].isFinal) {
        this.properties.value +=transcript+" ";
        this._triggerEvent("oninput");
      }
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();

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

  
  // window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // const recognition = new SpeechRecognition();
  // recognition.interimResults = true;
  // recognition.lang = 'en-US';
  

  // recognition.addEventListener('result', e => {
  //   const transcript = Array.from(e.results)
  //     .map(result => result[0])
  //     .map(result => result.transcript)
  //     .join('');
      
  //     console.log(81);
  //     if (e.results[0].isFinal) {
  //       this.properties.value +=transcript+" ";
  //       this._triggerEvent("oninput");
  //     }
  // });

  // recognition.addEventListener('end', recognition.start);

  // recognition.start();


window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});