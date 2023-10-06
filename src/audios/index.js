export default class Audios {
    static Start = null
    static Bet = null
    static Check = null
    static Deal = null
    static Result = null

    static get AllAudios() { return [this.Start, this.Bet, this.Check, this.Deal, this.Result] }

    static init() {
        this.Start = this.initSound('/start.wav')
        this.Bet = this.initSound('/bet.wav')
        this.Check = this.initSound('/check.wav')
        this.Deal = this.initSound('/deal.ogg')
        this.Result = this.initSound('/result.wav')
    }

    static initSound(url) {
        let yodelBuffer = void 0;
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const context = new AudioContext(); // Make it crossbrowser
            const gainNode = context.createGain();
            gainNode.gain.value = 0.2;
            gainNode.connect(context.destination);

            window.fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    context.decodeAudioData(arrayBuffer,
                        audioBuffer => {
                            yodelBuffer = audioBuffer;
                        },
                        error => console.error(error)
                    )
                })

            document.addEventListener('click', unlock);

            function unlock(e) {
                if (e) {
                    document.removeEventListener('click', unlock)
                }
                // create empty buffer and play it
                const buffer = context.createBuffer(1, 1, 22050);
                const source = context.createBufferSource();
                source.buffer = buffer;
                source.connect(context.destination);

                // play the file. noteOn is the older version of start()
                source.start ? source.start(0) : source.noteOn(0);
            }

            // Try to unlock, so the unmute is hidden when not necessary (in most browsers).
            unlock();

            return {
                play(vol) {
                    if (vol <= 0) return

                    gainNode.gain.value = vol / 100
                    const source = context.createBufferSource();
                    source.buffer = yodelBuffer;
                    source.connect(gainNode);
                    source.start();
                }
            };
        }
    }
}

// import('./start.wav').then(sound => Audios.Start = new Audio(sound.default))
// import('./bet.wav').then(sound => Audios.Bet = new Audio(sound.default))
// import('./check.wav').then(sound => Audios.Check = new Audio(sound.default))
// import('./deal.ogg').then(sound => Audios.Deal = new Audio(sound.default))
// import('./result.wav').then(sound => Audios.Result = new Audio(sound.default))