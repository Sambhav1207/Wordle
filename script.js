const wordList = [
    "about", "above", "actor", "acute", "admit", "adopt", "adult", "after", "again", "agent",
    "agree", "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "alone", "along",
    "alter", "among", "anger", "angle", "angry", "apart", "apple", "apply", "argue", "arise",
    "array", "aside", "asset", "audio", "audit", "avoid", "award", "aware", "badge", "basic",
    "basis", "beach", "began", "begin", "being", "below", "bench", "bible", "birth", "black",
    "blame", "blind", "block", "blood", "board", "boost", "bound", "brain", "brand", "bread",
    "break", "breed", "brief", "bring", "broad", "brown", "build", "buyer", "cable", "calm",
    "camel", "canal", "candy", "carry", "catch", "cause", "chain", "chair", "chart", "chase",
    "cheap", "check", "chest", "chief", "child", "chose", "civil", "claim", "class", "clean",
    "clear", "climb", "clock", "close", "coach", "coast", "could", "count", "court", "cover",
    "craft", "crash", "cream", "creep", "cross", "crowd", "crown", "curve", "cycle", "daily",
    "dance", "death", "debut", "delay", "depth", "dirty", "disco", "doubt", "dozen", "draft",
    "drama", "dream", "dress", "drift", "drink", "drive", "earth", "eight", "elite", "empty",
    "enemy", "enjoy", "enter", "entry", "equal", "error", "essay", "event", "every", "exact",
    "exist", "extra", "faith", "fault", "favor", "fence", "field", "fight", "final", "first",
    "flame", "flash", "fleet", "floor", "focus", "force", "forth", "found", "frame", "fresh",
    "front", "fruit", "fully", "funny", "gamer", "gauge", "ghost", "giant", "given", "globe",
    "going", "grace", "grade", "grand", "grant", "grass", "great", "green", "group", "guard",
    "guest", "guide", "habit", "happy", "harsh", "heart", "heavy", "hence", "hobby", "honor",
    "hotel", "house", "human", "humor", "ideal", "image", "index", "inner", "input", "issue",
    "joint", "judge", "juice", "knife", "knock", "label", "labor", "large", "laser", "later",
    "laugh", "layer", "learn", "lease", "least", "leave", "legal", "level", "light", "limit",
    "liver", "local", "logic", "loyal", "lucky", "lunch", "magic", "major", "maker", "march",
    "match", "media", "metal", "meter", "might", "minor", "model", "money", "month", "moral",
    "motor", "mount", "mouse", "music", "naked", "nerve", "never", "newer", "night", "noise",
    "north", "novel", "nurse", "occur", "ocean", "offer", "often", "order", "other", "ought",
    "paint", "panel", "paper", "party", "peace", "phase", "phone", "photo", "piece", "pilot",
    "pitch", "place", "plain", "plane", "plant", "plate", "point", "polar", "pound", "power",
    "press", "price", "pride", "prime", "print", "prior", "prize", "proof", "proud", "prove",
    "queen", "quick", "quiet", "quite", "radio", "raise", "range", "rapid", "ratio", "reach",
    "ready", "refer", "right", "rival", "river", "robin", "robot", "rough", "round", "route",
    "royal", "ruler", "rural", "scale", "scene", "scope", "score", "sense", "serve", "seven",
    "shade", "shaft", "shake", "shall", "shape", "share", "sharp", "sheer", "shelf", "shell",
    "shift", "shine", "shirt", "shock", "shoot", "short", "shown", "sight", "since", "skill",
    "slice", "slide", "small", "smart", "smile", "smoke", "solid", "solve", "sound", "south",
    "space", "spare", "speak", "speed", "spend", "spine", "split", "spoke", "sport", "stack",
    "staff", "stage", "stake", "stand", "start", "state", "steam", "steel", "stick", "still",
    "stock", "stone", "store", "storm", "story", "strip", "study", "stuff", "style", "sugar",
    "suite", "super", "sweet", "swing", "sword", "table", "taken", "taste", "teach", "tease",
    "thank", "theme", "there", "these", "thing", "think", "third", "those", "three", "throw",
    "tight", "title", "today", "topic", "total", "touch", "tough", "tower", "trace", "track",
    "trade", "trail", "train", "treat", "trend", "trial", "tribe", "trick", "trust", "truth",
    "twice", "uncle", "under", "unite", "upper", "upset", "urban", "usage", "usual", "vague",
    "valid", "value", "video", "vital", "voice", "waste", "watch", "water", "wheel", "where",
    "which", "while", "white", "whole", "whose", "woman", "world", "worry", "worse", "worst",
    "worth", "would", "write", "wrong", "yield", "young", "youth"
  ];
  
const hiddenWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
let currentRow = 0;
let currentGuess = '';
const maxAttempts = 6;

const grid = document.getElementById('grid');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const message = document.getElementById('message');

// Create the grid dynamically
function createGrid() {
    for (let i = 0; i < maxAttempts * 5; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item';
        grid.appendChild(div);
    }
}

// Handle the guess submission
submitButton.addEventListener('click', handleGuess);

function handleGuess() {
    if (currentGuess.length !== 5) {
        message.textContent = 'Guess must be 5 letters.';
        return;
    }

    if (!wordList.includes(currentGuess)) {
        message.textContent = 'Not a valid word.';
        return;
    }

    const row = Array.from(grid.children).slice(currentRow * 5, currentRow * 5 + 5);
    checkGuess(row, currentGuess);
    currentRow++;

    if (currentGuess === hiddenWord) {
        message.textContent = 'Congratulations! You guessed the word!';
        guessInput.disabled = true;
        submitButton.disabled = true;
        return;
    }

    if (currentRow === maxAttempts) {
        message.textContent = `Game Over! The word was: ${hiddenWord.toUpperCase()}`;
        guessInput.disabled = true;
        submitButton.disabled = true;
    }

    currentGuess = '';
    guessInput.value = '';
}

function checkGuess(row, guess) {
    for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const box = row[i];
        box.textContent = letter;

        if (letter === hiddenWord[i]) {
            box.classList.add('correct');
        } else if (hiddenWord.includes(letter)) {
            box.classList.add('present');
        } else {
            box.classList.add('absent');
        }
    }
}

// Capture input and update current guess
guessInput.addEventListener('input', (e) => {
    currentGuess = e.target.value.toLowerCase();
    if (currentGuess.length > 5) {
        currentGuess = currentGuess.slice(0, 5);
        guessInput.value = currentGuess;
    }
});

// Initialize the game
createGrid();
