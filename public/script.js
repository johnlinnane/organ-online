const chromaticNotes = ['C', 'C#', 'D','D#', 'E', 'F', 'F#', 'G','G#', 'A', 'A#', 'B'];

const majorTriad = [0, 6, 9];
const minorTriad = [0, 5, 9];
const dimTriad = [0, 5, 8];


const majorScaleDegrees = [0, 2, 4, 5, 7, 9, 11];
const minorScaleDegrees = [0, 2, 3, 5, 7, 8, 10];



let allKeysAndChords = {}
// for example C

// get the notes of the scale

// go through all the chromatic notes
chromaticNotes.forEach((note, i) => {
    let thisMajorScale = [];
    // majorScaleDegrees.forEach((degree) => {
    //     thisMajorScale.push(chromaticNotes[degree % chromaticNotes.length]);
    // })

    for (let j = i; j < majorScaleDegrees.length + i; j++) {
        
        thisMajorScale.push(chromaticNotes[j % chromaticNotes.length]);
    }

    
    console.log('thisMajorScale: ',thisMajorScale);
    
    allKeysAndChords[note] = thisMajorScale

    allKeysAndChords[`${note}m`] = {}
    


})


console.log('allKeysAndChords: ',allKeysAndChords);


const keys = [];
chromaticNotes.forEach((note) => {
    keys.push(note);
    keys.push(`${note}m`);
})


keys.forEach( (key, i) => {
    var optElement = document.createElement('option');
    optElement.innerText = key;
    optElement.value = key;
    document.getElementById('dropdown').appendChild(optElement);
})

const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'];
const cont = document.getElementById('note-container');


chords.forEach( (chord, i) => {
    var divElement = document.createElement('div');
    divElement.innerText = chord;
    // divElement.style.borderRadius = "10px";

    divElement.addEventListener('click', function(){
        console.log(chord);
        playChord(chord);
    });
    cont.appendChild(divElement);

    

})


const chordsNotes = {
    'C': ["C4", "E4", "G4"],
    'Dm': ["D4", "F4", "A4"],
    'Em': ["B4", "E4", "G4"],
    'F': ["C4", "F4", "A4"],
    'G': ["B4", "D4", "G4"],
    'Am': ["C4", "E4", "A4"],
    'Bdim': ["B4", "D4", "F4"]
}


function playChord(chord) {
    const synth = new Tone.PolySynth().toDestination();
    // set the attributes across all the voices using 'set'
    // synth.set({ detune: -1200 });
    synth.fadeOut = 1; // value is in seconds

    // play a chord
    synth.triggerAttackRelease(chordsNotes[chord], 2);




}

function changeKey(key) {
    console.log('key changed to ' + key)
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'];
    const cont = document.getElementById('note-container');
    
    cont.innerHTML = '';
    chords.forEach( (chord, i) => {
        var divElement = document.createElement('div');
        divElement.innerText = chord;
        // divElement.style.borderRadius = "10px";

        divElement.addEventListener('click', function(){
            console.log(chord);
            playChord(chord);
        });
        

        cont.appendChild(divElement);

        

    })
}