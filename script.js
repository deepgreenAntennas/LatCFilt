const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
let shadowsEnabled = true;
let pulseTime = 0;

// Generate alien power lines
function generateLines() {
    lines = [];
    for (let i = 0; i < 12; i++) { // X12 reference
        lines.push({
            x1: Math.random() * canvas.width,
            y1: Math.random() * canvas.height,
            x2: Math.random() * canvas.width,
            y2: Math.random() * canvas.height,
            neonColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            thickness: Math.random() * 3 + 1
        });
    }
}

// Draw neon lines with shadows
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    pulseTime += 0.05;
    const pulse = Math.sin(pulseTime) * 0.5 + 0.5;
    
    lines.forEach(line => {
        if (shadowsEnabled) {
            // Shadow effect
            ctx.shadowColor = '#000';
            ctx.shadowBlur = 20 * pulse;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
        }
        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = line.neonColor;
        ctx.lineWidth = line.thickness * (1 + pulse * 0.5);
        ctx.globalAlpha = 0.8 + pulse * 0.2;
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0; // Reset shadow
    });
    
    requestAnimationFrame(draw);
}

// Event listeners
toggleBtn.addEventListener('click', () => {
    shadowsEnabled = !shadowsEnabled;
    toggleBtn.textContent = shadowsEnabled ? 'Toggle Shadows' : 'Shadows Off';
});

resetBtn.addEventListener('click', () => {
    pulseTime = 0;
    generateLines();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateLines();
});

// Interactive: Mouse follows a "probe" line
canvas.addEventListener('mousemove', (e) => {
    if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        lastLine.x2 = e.clientX;
        lastLine.y2 = e.clientY;
    }
});

// Init
generateLines();
draw();