// script.js

// -- State Variables --
let gameInterval;
let survivalInterval;
let timer = 20.0; // Bomb timer
let survivalTime = 0; // 0 to 180s
const SURVIVAL_GOAL = 180;
let isPaused = false;
let checkpointCount = 0;

// Player states
let playerA = { name: "Agent A", score: 0, currentQuestion: null };
let playerB = { name: "Agent B", score: 0, currentQuestion: null };

// DOM Elements
const screens = {
    intro: document.getElementById('intro-screen'),
    setup: document.getElementById('setup-screen'),
    game: document.getElementById('game-screen'),
    gameover: document.getElementById('gameover-screen'),
    victory: document.getElementById('victory-screen')
};

// UI Elements
const bombTimerEl = document.getElementById('bomb-timer');
const checkpointMsg = document.getElementById('checkpoint-message');
const progressBarFill = document.getElementById('progress-bar-fill');
const progAvatarA = document.getElementById('progress-avatar-a');
const progAvatarB = document.getElementById('progress-avatar-b');
const popSound = document.getElementById('pop-sound');

// Colors for bubbles
// Colors for bubbles (very translucent pastel neon colors to mix with CSS glassmorphism)
// Colors for bubbles (very translucent pastel neon colors to mix with CSS glassmorphism)
const colors = [
    'rgba(255, 105, 180, 0.4)', // Vivid Pink
    'rgba(186, 85, 211, 0.4)',  // Vivid Violet
    'rgba(0, 255, 255, 0.4)',   // Vivid Cyan
    'rgba(0, 191, 255, 0.4)',   // Vivid Blue
    'rgba(255, 127, 80, 0.4)',  // Coral
    'rgba(147, 112, 219, 0.4)'  // Medium Purple
];

// --- Screen Transitions ---
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// --- Setup Listeners ---
const introVideo = document.getElementById('intro-video');

document.getElementById('skip-intro-btn').addEventListener('click', () => {
    if (introVideo) introVideo.pause();
    showScreen('setup');
});

if (introVideo) {
    introVideo.addEventListener('ended', () => {
        showScreen('setup');
    });
}

// Name input dynamic update
document.getElementById('agent-a-name').addEventListener('input', updateReadyPrompt);
document.getElementById('agent-b-name').addEventListener('input', updateReadyPrompt);

function updateReadyPrompt() {
    const nameA = document.getElementById('agent-a-name').value || "Agent A";
    const nameB = document.getElementById('agent-b-name').value || "Agent B";
    document.getElementById('ready-prompt').innerText = `${nameA} and ${nameB}, are you ready?`;
}

document.getElementById('ready-btn').addEventListener('click', () => {
    playerA.name = document.getElementById('agent-a-name').value || "Agent A";
    playerB.name = document.getElementById('agent-b-name').value || "Agent B";
    
    document.getElementById('name-display-a').innerText = playerA.name;
    document.getElementById('name-display-b').innerText = playerB.name;
    
    startGame();
});

document.getElementById('restart-btn').addEventListener('click', resetGame);
document.getElementById('victory-restart-btn').addEventListener('click', resetGame);

function resetGame() {
    timer = 20.0;
    survivalTime = 0;
    checkpointCount = 0;
    isPaused = false;
    updateProgressUI();
    
    const bombVideo = document.getElementById('bomb-video');
    if (bombVideo) bombVideo.pause();
    const wonVideo = document.getElementById('won-video');
    if (wonVideo) wonVideo.pause();
    
    showScreen('setup');
}

// --- Game Logic ---
function startGame() {
    showScreen('game');
    
    // Fallback if questionBank is empty or not loaded
    if (typeof questionBank === 'undefined' || questionBank.length === 0) {
        window.questionBank = [
            { question: "Load questions.js!", correctAnswer: "OK", options: ["OK", "NO", "MAYBE", "IDK"] }
        ];
    }

    generateQuestion('A');
    generateQuestion('B');
    
    // Reset timers
    clearInterval(gameInterval);
    clearInterval(survivalInterval);
    
    bombTimerEl.innerText = timer.toFixed(1);
    
    // Main Loops
    gameInterval = setInterval(() => {
        if (!isPaused) {
            timer -= 0.1;
            if (timer <= 0) {
                timer = 0;
                endGame(false);
            }
            bombTimerEl.innerText = timer.toFixed(1);
            
            // Increase bomb volume (size) as timer approaches 0
            const bombVisual = document.querySelector('.bomb-visual');
            if (bombVisual) {
                const newSize = 5 + Math.max(0, (20 - timer) / 4);
                bombVisual.style.fontSize = `${newSize}rem`;
            }
            
            // Urgency effect
            if (timer <= 5.0) {
                bombTimerEl.style.color = 'red';
                bombTimerEl.parentElement.classList.add('shake-effect');
                highlightCorrectBubbles();
            } else {
                bombTimerEl.style.color = '#e74c3c';
                bombTimerEl.parentElement.classList.remove('shake-effect');
                removeHighlightBubbles();
            }
        }
    }, 100);

    survivalInterval = setInterval(() => {
        if (!isPaused) {
            survivalTime += 1;
            updateProgressUI();
            
            // Checkpoints every 60s
            if (survivalTime % 60 === 0 && survivalTime < SURVIVAL_GOAL) {
                triggerCheckpoint();
            }
            
            // Victory
            if (survivalTime >= SURVIVAL_GOAL) {
                endGame(true);
            }
        }
    }, 1000);
}

function updateProgressUI() {
    const percentage = (survivalTime / SURVIVAL_GOAL) * 100;
    progressBarFill.style.width = `${percentage}%`;
    progAvatarA.style.left = `${percentage}%`;
    progAvatarB.style.left = `${percentage}%`;
}

function triggerCheckpoint() {
    isPaused = true;
    checkpointMsg.classList.remove('hidden');
    checkpointCount++;
    
    setTimeout(() => {
        checkpointMsg.classList.add('hidden');
        isPaused = false;
    }, 5000); // Pause for 5 seconds
}

function endGame(win) {
    clearInterval(gameInterval);
    clearInterval(survivalInterval);
    if (win) {
        showScreen('victory');
        const wonVideo = document.getElementById('won-video');
        if (wonVideo) {
            wonVideo.currentTime = 0;
            wonVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }
    } else {
        document.getElementById('survival-time-text').innerText = `You survived for ${survivalTime} seconds!`;
        showScreen('gameover');
        const bombVideo = document.getElementById('bomb-video');
        if (bombVideo) {
            bombVideo.currentTime = 0;
            bombVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }
}

// --- Question Generation & Bubbles ---
function generateQuestion(playerStr) {
    // Pick random question
    const qIndex = Math.floor(Math.random() * questionBank.length);
    const q = questionBank[qIndex];
    
    const container = document.getElementById(`bubbles-${playerStr.toLowerCase()}`);
    const qText = document.getElementById(`question-${playerStr.toLowerCase()}`);
    
    qText.innerText = q.question;
    container.innerHTML = ''; // Clear old bubbles
    
    if (playerStr === 'A') playerA.currentQuestion = q;
    else playerB.currentQuestion = q;

    // Create bubbles
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach((opt, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.innerText = opt;
        bubble.dataset.isCorrect = (opt === q.correctAnswer);
        bubble.dataset.player = playerStr;
        
        // Random color
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Add floating animation dynamically (very slight sway and border-radius morphing for fragility)
        const animDuration = 4 + Math.random() * 3;
        const translateY = 3 + Math.random() * 4;
        const translateX = -3 + Math.random() * 6;
        const rot = -2 + Math.random() * 4;
        bubble.style.animation = `floatBubble${index} ${animDuration}s ease-in-out infinite alternate`;
        
        // Inject keyframes
        const styleSheet = document.styleSheets[0];
        const keyframes = `@keyframes floatBubble${index} {
            0% { transform: translate(0, 0) rotate(0deg); border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
            33% { transform: translate(${translateX}px, -${translateY}px) rotate(${rot}deg); border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; }
            66% { transform: translate(-${translateX}px, ${translateY/2}px) rotate(-${rot}deg); border-radius: 45% 55% 45% 55% / 55% 45% 50% 50%; }
            100% { transform: translate(0, 0) rotate(0deg); border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
        }`;
        try { styleSheet.insertRule(keyframes, styleSheet.cssRules.length); } catch(e){}

        // Touch/Click Event
        // Support multi-touch by using pointerdown instead of click
        bubble.addEventListener('pointerdown', handleBubbleClick);
        
        container.appendChild(bubble);
    });
}

function handleBubbleClick(e) {
    if (isPaused) return; // Don't allow clicks during checkpoint
    
    const bubble = e.target;
    const isCorrect = bubble.dataset.isCorrect === 'true';
    const playerStr = bubble.dataset.player;
    const playerArea = document.getElementById(`player-${playerStr.toLowerCase()}-area`);
    
    // Play sound
    popSound.currentTime = 0;
    popSound.play().catch(e => {}); // Ignore error if not interacted

    // Pop visual
    bubble.style.transform = 'scale(1.5)';
    bubble.style.opacity = '0';
    
    setTimeout(() => {
        if (isCorrect) {
            handleCorrect(playerStr, playerArea);
        } else {
            handleWrong(playerStr, playerArea);
        }
    }, 150);
}

function handleCorrect(playerStr, area) {
    timer += 3; // Add 3 seconds
    
    // Show +3s animation
    const plusText = document.getElementById(`plus3-${playerStr.toLowerCase()}`);
    plusText.classList.remove('show-plus');
    void plusText.offsetWidth; // trigger reflow
    plusText.classList.add('show-plus');
    
    // Generate next question
    generateQuestion(playerStr);
}

function handleWrong(playerStr, area) {
    // Shake and Freeze
    area.classList.add('shake-effect', 'freeze-active');
    
    // Freeze for 2 seconds
    setTimeout(() => {
        area.classList.remove('shake-effect', 'freeze-active');
    }, 2000);
}

// Help feature when time is low
function highlightCorrectBubbles() {
    document.querySelectorAll('.bubble').forEach(b => {
        if (b.dataset.isCorrect === 'true') {
            b.classList.add('correct-help');
        }
    });
}

function removeHighlightBubbles() {
    document.querySelectorAll('.bubble').forEach(b => {
        b.classList.remove('correct-help');
    });
}
