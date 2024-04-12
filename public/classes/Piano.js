class Piano {
    constructor(octave=4) {
      this.context = new AudioContext();
      this.oscillators = {};
      this.isMouseDown = false;
      this.octave=octave
      this.pianoKeys = document.querySelectorAll('.piano-key');
      this.setupEventListeners();
      
    }
  
   playNote(data) {
    
      switch (data.on) {
        case 144:
          noteOn(frequency(data.pitch), data.velocity,this.oscillators,this.context);
          break;
        case 128:
          noteOff(frequency(data.pitch), this.oscillators,this.context);
          break;
      }
    
      function noteOn(frequency, velocity,oscillators,context) {
        const vol = (velocity / 127).toFixed(2);
   
        const osc = (oscillators[frequency] = context.createOscillator());
        osc.type = "sawtooth";
        osc.frequency.value = frequency;
        osc.setVolume = vol;
        osc.connect(context.destination);
        osc.start(context.currentTime);
      }
    
      function noteOff(frequency,oscillators,context) {
        if (oscillators[frequency]) {
          oscillators[frequency].stop(context.currentTime);
          oscillators[frequency].disconnect();
          delete oscillators[frequency]; 
        }
      }
    }
  
    setupEventListeners() {
      document.addEventListener('mousedown', () => {
        this.isMouseDown = true;
      });
  
      document.addEventListener('mouseup', () => {
        this.isMouseDown = false;
      });
  
      this.pianoKeys.forEach(key => {
        key.addEventListener('mousedown', () => {
          this.isMouseDown = true
          key.classList.add('active')
          const note = key.id; 
          const pitch = convertNoteToMIDI(note,this.octave); 
          this.playNote({ on: 144, pitch, velocity: 127 });
        });
  
        key.addEventListener('mouseup', () => {
          this.isMouseDown = false
          const note = key.id; 
          const pitch = convertNoteToMIDI(note,this.octave); 
          this.playNote({ on: 128, pitch, velocity: 127 });
          key.classList.remove('active'); 
          key.classList.remove('hover-active');
        });
  
        key.addEventListener('mouseleave', () => {
          key.classList.remove('active');
          key.classList.remove('hover-active');
          const note = key.id; 
          const pitch = convertNoteToMIDI(note,this.octave); 
          this.playNote({ on: 128, pitch, velocity: 127 });
        });
  
        key.addEventListener('mouseenter', () => {
          if (this.isMouseDown) {
            key.classList.add('hover-active'); 
            const note = key.id;
            const pitch = convertNoteToMIDI(note,this.octave);
            this.playNote({ on: 144, pitch, velocity: 127 });
          }
        });

        key.addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.isMouseDown = true;
          key.classList.add('active');
          const note = key.id; 
          const pitch = convertNoteToMIDI(note,this.octave); 
          this.playNote({ on: 144, pitch, velocity: 127 });
        });
      
        key.addEventListener('touchend', () => {
          this.isMouseDown = false;
          const note = key.id; 
          const pitch = convertNoteToMIDI(note,this.octave); 
          this.playNote({ on: 128, pitch, velocity: 127 });
          key.classList.remove('active'); 
          key.classList.remove('hover-active');
        });
      
  
        key.addEventListener('contextmenu', e => {
          e.preventDefault();
        });
  
       
      });
    }
  }
  