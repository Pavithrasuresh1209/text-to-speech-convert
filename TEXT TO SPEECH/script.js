const textEL = document.getElementById('text');
const speakEL = document.getElementById('speak');
const voiceSelect = document.getElementById('voices');

let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices.map(voice =>
        <option value="${voice.name}">${voice.name} (${voice.lang})</option>
    ).join('');
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

speakEL.addEventListener('click', () => {
    window.speechSynthesis.cancel(); // stop any ongoing speech
    const text = textEL.value.trim();
    if (text === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    if (selectedVoice) utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
});