$(document).ready(function(){
    $('#dropdown').trigger('change');
});


let selectedKey = 'C';

const chromaticNotes = ['C', 'C#', 'D','D#', 'E', 'F', 'F#', 'G','G#', 'A', 'A#', 'B'];

const majorScaleDegrees = [0, 2, 4, 5, 7, 9, 11];
const minorScaleDegrees = [0, 2, 3, 5, 7, 8, 10];

let allKeysAndChords = {}

chromaticNotes.forEach((note, i) => {
    // MAJOR
    let thisMajorScale = [];
    majorScaleDegrees.forEach((degree) => {
        thisMajorScale.push(chromaticNotes[(degree + i) % chromaticNotes.length]);
    })

    allKeysAndChords[note] = {}
    thisMajorScale.forEach( (rootNote, i) => {
        let triad = [thisMajorScale[0 + i], thisMajorScale[(2 + i) % thisMajorScale.length], thisMajorScale[(4 + i) % thisMajorScale.length]];
        if (i == 7) {
            // dim
            allKeysAndChords[note][`${rootNote}dim`] = triad;
        } else if (i == 0 | i == 3 | i == 4) {
            // major
            allKeysAndChords[note][rootNote] = triad;
        } else {
            allKeysAndChords[note][`${rootNote}m`] = triad;
        }
    })
    
    // MINOR
    let thisMinorScale = [];
    minorScaleDegrees.forEach((degree) => {
        thisMinorScale.push(chromaticNotes[(degree + i) % chromaticNotes.length]);
    })
    allKeysAndChords[`${note}m`] = {}
    thisMinorScale.forEach( (rootNote, i) => {
        let triad = [thisMinorScale[0 + i], thisMinorScale[(2 + i) % thisMinorScale.length], thisMinorScale[(4 + i) % thisMinorScale.length]];
        if (i == 2) {
            allKeysAndChords[`${note}m`][`${rootNote}dim`] = triad;
        } else if (i == 2 | i == 5 | i == 6) {
            allKeysAndChords[`${note}m`][rootNote] = triad;
        } else {
            allKeysAndChords[`${note}m`][`${rootNote}m`] = triad;
        }

    })
})

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

const chords = allKeysAndChords[selectedKey];
const cont = document.getElementById('note-container');

function playChord(triad) {
    triad = triad.map(i => `${i}4`);
    const synth = new Tone.PolySynth().toDestination();
    synth.set({ detune: -1200 });
    synth.triggerAttackRelease(triad, 2);
}

$('#dropdown').change(function(){ 
    let newKey = $(this).val();
    selectedKey = newKey;
    const cont = document.getElementById('note-container');
    cont.innerHTML = '';
    for (const [chordName, triad] of Object.entries(allKeysAndChords[newKey])) {
        var divElement = document.createElement('div');
        divElement.innerText = chordName;
        divElement.style.borderRadius = "10px";
        divElement.addEventListener('click', function(){
            playChord(triad);
        });
        cont.appendChild(divElement);
    }
});