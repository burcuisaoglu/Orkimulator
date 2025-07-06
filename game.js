const draggable = document.getElementById('draggable');
const background = document.getElementById('background');
const successMessage = document.getElementById('success-message');

// Set the correct drop position (relative to the background image)
// These values may need adjustment based on your images
const correctOffset = {
    left: 0.625, // 62.5% from left (10% more right)
    top: 0.59  // 59% from top (5% lower)
};
const tolerance = 96; // pixels (20% larger)

let offsetX, offsetY, dragging = false;

function getBackgroundRect() {
    return background.getBoundingClientRect();
}

function onMouseDown(e) {
    dragging = true;
    const rect = draggable.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    draggable.style.cursor = 'grabbing';
}

function onMouseMove(e) {
    if (!dragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggable.style.left = x + 'px';
    draggable.style.top = y + 'px';
}

function onMouseUp(e) {
    if (!dragging) return;
    dragging = false;
    draggable.style.cursor = 'grab';
    checkDrop();
}

function showFireworks() {
    const fireworks = document.getElementById('fireworks');
    fireworks.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const angle = Math.random() * 2 * Math.PI;
        const distance = 120 + Math.random() * 80;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const color = `hsl(${Math.floor(Math.random()*360)}, 100%, 60%)`;
        particle.style.position = 'absolute';
        particle.style.left = '50vw';
        particle.style.top = '50vh';
        particle.style.width = '12px';
        particle.style.height = '12px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.opacity = '0.85';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = 'all 1s cubic-bezier(.62,.28,.23,.99)';
        fireworks.appendChild(particle);
        setTimeout(() => {
            particle.style.left = `calc(50vw + ${x}px)`;
            particle.style.top = `calc(50vh + ${y}px)`;
            particle.style.opacity = '0';
        }, 50);
    }
    setTimeout(() => { fireworks.innerHTML = ''; }, 1200);
}

function checkDrop() {
    const bgRect = getBackgroundRect();
    const dragRect = draggable.getBoundingClientRect();
    // Calculate the target position
    const targetX = bgRect.left + bgRect.width * correctOffset.left;
    const targetY = bgRect.top + bgRect.height * correctOffset.top;
    // Center of draggable
    const dragCenterX = dragRect.left + dragRect.width / 2;
    const dragCenterY = dragRect.top + dragRect.height / 2;
    const dist = Math.hypot(dragCenterX - targetX, dragCenterY - targetY);
    if (dist < tolerance) {
        // Snap to correct position
        draggable.style.left = (targetX - dragRect.width / 2) + 'px';
        draggable.style.top = (targetY - dragRect.height / 2) + 'px';
        successMessage.style.display = 'block';
        showFireworks();
        draggable.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
}

draggable.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

draggable.ondragstart = () => false; // Disable default drag

// Responsive: reset draggable position on window resize
window.addEventListener('resize', () => {
    draggable.style.left = '10vw';
    draggable.style.top = '10vh';
    successMessage.style.display = 'none';
});

// Show Next Part button after correct answer
const nextPartBtn = document.getElementById('next-part-btn');
successMessage.insertAdjacentElement('afterend', nextPartBtn);
function showNextPartBtn() {
    nextPartBtn.style.display = 'block';
}
// Show button after correct answer
const origCheckDrop = checkDrop;
checkDrop = function() {
    origCheckDrop.apply(this, arguments);
    if (successMessage.style.display === 'block') {
        showNextPartBtn();
    }
}
nextPartBtn.onclick = () => {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('part2-container').style.display = 'flex';
    startPart2();
};

// --- PART 2 LOGIC ---
function randomPos(size) {
    const pad = 10;
    const w = window.innerWidth - size - pad;
    const h = window.innerHeight - size - pad;
    return {
        left: Math.random() * w + pad/2,
        top: Math.random() * h + pad/2
    };
}
let dCount = 0;
function startPart2() {
    dCount = 0;
    const dImages = document.getElementById('d-images');
    dImages.innerHTML = '';
    addDImage(80); // initial size 80px
}
function addDImage(size) {
    const dImages = document.getElementById('d-images');
    const img = document.createElement('img');
    img.src = 'd.png';
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    const pos = randomPos(size);
    img.style.left = pos.left + 'px';
    img.style.top = pos.top + 'px';
    img.onclick = () => {
        dCount++;
        if (dCount < 5) {
            addDImage(Math.round(size * 1.3));
        }
        if (dCount === 5) {
            showPart2Success();
        }
    };
    dImages.appendChild(img);
}
function showPart2Success() {
    document.getElementById('part2-success').style.display = 'block';
    showFireworks2();
    setTimeout(showFireworks2, 600);
    document.getElementById('next-part2-btn').style.display = 'block';
}
function showFireworks2() {
    const fireworks = document.getElementById('fireworks2');
    fireworks.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        const angle = Math.random() * 2 * Math.PI;
        const distance = 140 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const color = `hsl(${Math.floor(Math.random()*360)}, 100%, 60%)`;
        particle.style.position = 'absolute';
        particle.style.left = '50vw';
        particle.style.top = '50vh';
        particle.style.width = '14px';
        particle.style.height = '14px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.opacity = '0.85';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = 'all 1s cubic-bezier(.62,.28,.23,.99)';
        fireworks.appendChild(particle);
        setTimeout(() => {
            particle.style.left = `calc(50vw + ${x}px)`;
            particle.style.top = `calc(50vh + ${y}px)`;
            particle.style.opacity = '0';
        }, 50);
    }
    setTimeout(() => { fireworks.innerHTML = ''; }, 1200);
}

// --- PART 3 LOGIC ---
const nextPart2Btn = document.getElementById('next-part2-btn');
nextPart2Btn.onclick = () => {
    document.getElementById('part2-container').style.display = 'none';
    document.getElementById('part3-container').style.display = 'flex';
    startPart3();
};

function startPart3() {
    const eImg = document.getElementById('part3-e');
    const successMsg = document.getElementById('part3-success');
    const fireworks = document.getElementById('fireworks3');
    const nextBtn = document.getElementById('next-part3-btn');
    let touchCount = 0;
    let moveIndex = 0;
    let topPercent = 50;
    let leftPercent = 50;
    const moves = [
        {dir: -1, val: 5}, // up 5%
        {dir: 1, val: 3},  // down 3%
        {dir: -1, val: 4}, // up 4%
        {dir: 1, val: 5}   // down 5%
    ];
    function moveE() {
        const move = moves[moveIndex % moves.length];
        topPercent += move.dir * move.val;
        leftPercent += 2;
        if (topPercent < 10) topPercent = 10;
        if (topPercent > 90) topPercent = 90;
        if (leftPercent < 10) leftPercent = 10;
        if (leftPercent > 90) leftPercent = 10; // wrap around if too far right
        eImg.style.top = topPercent + '%';
        eImg.style.left = leftPercent + '%';
        moveIndex++;
    }
    eImg.style.top = '50%';
    eImg.style.left = '50%';
    eImg.style.transform = 'translate(-50%, -50%)';
    successMsg.style.display = 'none';
    nextBtn.style.display = 'none';
    fireworks.innerHTML = '';
    function handleTouch() {
        if (touchCount >= 15) return;
        moveE();
        touchCount++;
        if (touchCount === 15) {
            showPart3Success();
        }
    }
    document.getElementById('part3-container').onclick = handleTouch;
    eImg.onclick = handleTouch;
}
function showPart3Success() {
    const successMsg = document.getElementById('part3-success');
    const fireworks = document.getElementById('fireworks3');
    const nextBtn = document.getElementById('next-part3-btn');
    successMsg.style.display = 'block';
    showFireworks3();
    setTimeout(showFireworks3, 400);
    setTimeout(showFireworks3, 800);
    setTimeout(showFireworks3, 1200);
    nextBtn.style.display = 'block';
}
function showFireworks3() {
    const fireworks = document.getElementById('fireworks3');
    for (let i = 0; i < 1; i++) {
        const particleCount = 30;
        for (let j = 0; j < particleCount; j++) {
            const particle = document.createElement('div');
            const angle = Math.random() * 2 * Math.PI;
            const distance = 100 + Math.random() * 120;
            // Randomize center
            const centerX = Math.random() * 80 + 10;
            const centerY = Math.random() * 80 + 10;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const color = `hsl(${Math.floor(Math.random()*360)}, 100%, 60%)`;
            particle.style.position = 'absolute';
            particle.style.left = centerX + 'vw';
            particle.style.top = centerY + 'vh';
            particle.style.width = '12px';
            particle.style.height = '12px';
            particle.style.borderRadius = '50%';
            particle.style.background = color;
            particle.style.opacity = '0.85';
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.transition = 'all 1s cubic-bezier(.62,.28,.23,.99)';
            fireworks.appendChild(particle);
            setTimeout(() => {
                particle.style.left = `calc(${centerX}vw + ${x}px)`;
                particle.style.top = `calc(${centerY}vh + ${y}px)`;
                particle.style.opacity = '0';
            }, 50);
        }
    }
    setTimeout(() => { fireworks.innerHTML = ''; }, 1200);
}

// --- PART 4 LOGIC ---
const nextPart3Btn = document.getElementById('next-part3-btn');
nextPart3Btn.onclick = () => {
    document.getElementById('part3-container').style.display = 'none';
    document.getElementById('part4-container').style.display = 'flex';
    startPart4();
};

function startPart4() {
    const hImg = document.getElementById('part4-h');
    const gImg = document.getElementById('part4-g');
    const successMsg = document.getElementById('part4-success');
    const fireworks = document.getElementById('fireworks4');
    const nextBtn = document.getElementById('next-level-btn');
    // Estimated slide path (from top left to bottom right)
    const slidePath = [
        {left: 12, top: 18},
        {left: 22, top: 28},
        {left: 32, top: 38},
        {left: 42, top: 48},
        {left: 52, top: 58},
        {left: 62, top: 68},
        {left: 72, top: 78},
        {left: 82, top: 88}
    ];
    let slideIndex = 0;
    hImg.style.display = 'block';
    hImg.style.left = slidePath[0].left + 'vw';
    hImg.style.top = slidePath[0].top + 'vh';
    successMsg.style.display = 'none';
    nextBtn.style.display = 'none';
    fireworks.innerHTML = '';
    function slideH() {
        if (slideIndex < slidePath.length - 1) {
            slideIndex++;
            hImg.style.left = slidePath[slideIndex].left + 'vw';
            hImg.style.top = slidePath[slideIndex].top + 'vh';
        } else {
            showPart4Success();
        }
    }
    document.getElementById('part4-container').onclick = slideH;
    hImg.onclick = slideH;
}
function showPart4Success() {
    const successMsg = document.getElementById('part4-success');
    const fireworks = document.getElementById('fireworks4');
    const nextBtn = document.getElementById('next-level-btn');
    successMsg.style.display = 'block';
    showFireworks4();
    setTimeout(showFireworks4, 400);
    setTimeout(showFireworks4, 800);
    setTimeout(showFireworks4, 1200);
    nextBtn.style.display = 'block';
}
function showFireworks4() {
    const fireworks = document.getElementById('fireworks4');
    for (let i = 0; i < 1; i++) {
        const particleCount = 30;
        // 4 random centers
        for (let c = 0; c < 4; c++) {
            const centerX = Math.random() * 80 + 10;
            const centerY = Math.random() * 80 + 10;
            for (let j = 0; j < particleCount; j++) {
                const particle = document.createElement('div');
                const angle = Math.random() * 2 * Math.PI;
                const distance = 100 + Math.random() * 120;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const color = `hsl(${Math.floor(Math.random()*360)}, 100%, 60%)`;
                particle.style.position = 'absolute';
                particle.style.left = centerX + 'vw';
                particle.style.top = centerY + 'vh';
                particle.style.width = '12px';
                particle.style.height = '12px';
                particle.style.borderRadius = '50%';
                particle.style.background = color;
                particle.style.opacity = '0.85';
                particle.style.transform = 'translate(-50%, -50%)';
                particle.style.transition = 'all 1s cubic-bezier(.62,.28,.23,.99)';
                fireworks.appendChild(particle);
                setTimeout(() => {
                    particle.style.left = `calc(${centerX}vw + ${x}px)`;
                    particle.style.top = `calc(${centerY}vh + ${y}px)`;
                    particle.style.opacity = '0';
                }, 50);
            }
        }
    }
    setTimeout(() => { fireworks.innerHTML = ''; }, 1200);
}

// --- PART 5 LOGIC ---
const nextLevelBtn = document.getElementById('next-level-btn');
nextLevelBtn.onclick = () => {
    document.getElementById('part4-container').style.display = 'none';
    document.getElementById('part5-container').style.display = 'flex';
    startPart5();
};

function startPart5() {
    const lImg = document.getElementById('part5-l');
    const successMsg = document.getElementById('part5-success');
    const nextBtn = document.getElementById('next-part5-btn');
    const header = document.getElementById('game-header-5');
    if (!document.getElementById('burning-fire-svg')) {
        const fireSvg = document.createElement('div');
        fireSvg.className = 'burning-fire';
        fireSvg.id = 'burning-fire-svg';
        fireSvg.innerHTML = `<svg viewBox="0 0 120 32" width="120" height="32">
            <g>
                <path d="M10,32 Q15,10 30,32 T50,32 T70,32 T90,32 T110,32 Q115,10 120,32" fill="orange">
                    <animate attributeName="d" dur="1.2s" repeatCount="indefinite"
                        values="M10,32 Q15,10 30,32 T50,32 T70,32 T90,32 T110,32 Q115,10 120,32;
                                M10,32 Q20,5 30,32 T50,32 T70,32 T90,32 T110,32 Q110,15 120,32;
                                M10,32 Q15,10 30,32 T50,32 T70,32 T90,32 T110,32 Q115,10 120,32"/>
                </path>
                <path d="M20,32 Q25,18 40,32 T60,32 T80,32 T100,32 Q105,18 110,32" fill="gold" opacity="0.7">
                    <animate attributeName="d" dur="1.1s" repeatCount="indefinite"
                        values="M20,32 Q25,18 40,32 T60,32 T80,32 T100,32 Q105,18 110,32;
                                M20,32 Q30,12 40,32 T60,32 T80,32 T100,32 Q100,22 110,32;
                                M20,32 Q25,18 40,32 T60,32 T80,32 T100,32 Q105,18 110,32"/>
                </path>
            </g>
        </svg>`;
        header.appendChild(fireSvg);
    }
    let dropCount = 0;
    function createK() {
        const k = document.createElement('img');
        k.src = 'k.png';
        k.className = 'drag-k-instance';
        k.style.width = '7.21vw';
        k.style.maxWidth = '82.4px';
        k.style.height = 'auto';
        k.style.left = '55vw';
        k.style.top = '70vh';
        k.style.pointerEvents = 'auto';
        k.style.opacity = '1';
        k.style.position = 'absolute';
        k.style.zIndex = '20';
        k.style.cursor = 'grab';
        document.getElementById('part5-container').appendChild(k);
        makeDraggable(k, () => {
            dropCount++;
            if (dropCount < 5) {
                createK();
            }
            if (dropCount === 5) {
                showBombEffect();
                successMsg.style.display = 'block';
                nextBtn.style.display = 'block';
            }
        });
    }
    function makeDraggable(img, onDrop) {
        let offsetX, offsetY, dragging = false;
        img.onmousedown = function(e) {
            dragging = true;
            offsetX = e.clientX - img.getBoundingClientRect().left;
            offsetY = e.clientY - img.getBoundingClientRect().top;
            img.style.cursor = 'grabbing';
        };
        window.onmousemove = function(e) {
            if (!dragging) return;
            img.style.left = (e.clientX - offsetX) + 'px';
            img.style.top = (e.clientY - offsetY) + 'px';
        };
        window.onmouseup = function(e) {
            if (!dragging) return;
            dragging = false;
            img.style.cursor = 'grab';
            // Check drop: if center of img is inside l.png
            const lRect = lImg.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            const imgCenterX = imgRect.left + imgRect.width/2;
            const imgCenterY = imgRect.top + imgRect.height/2;
            if (
                imgCenterX > lRect.left && imgCenterX < lRect.right &&
                imgCenterY > lRect.top && imgCenterY < lRect.bottom
            ) {
                img.style.pointerEvents = 'none';
                img.style.opacity = '0.7';
                onDrop();
            }
        };
        img.ondragstart = () => false;
    }
    // Remove any existing drag-k-instance images
    document.querySelectorAll('.drag-k-instance').forEach(el => el.remove());
    createK();
    successMsg.style.display = 'none';
    nextBtn.style.display = 'none';
}
function showBombEffect() {
    // Simple bomb effect: flash + shake + explosion SVG
    const container = document.getElementById('part5-container');
    const bomb = document.createElement('div');
    bomb.style.position = 'absolute';
    bomb.style.left = '50%';
    bomb.style.top = '50%';
    bomb.style.transform = 'translate(-50%, -50%)';
    bomb.style.zIndex = '5000';
    bomb.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="30" fill="#333" />
        <circle cx="60" cy="60" r="50" fill="orange" opacity="0.5">
            <animate attributeName="r" from="50" to="80" dur="0.5s" fill="freeze" />
            <animate attributeName="opacity" from="0.5" to="0" dur="0.5s" fill="freeze" />
        </circle>
        <circle cx="60" cy="60" r="70" fill="yellow" opacity="0.3">
            <animate attributeName="r" from="70" to="100" dur="0.5s" fill="freeze" />
            <animate attributeName="opacity" from="0.3" to="0" dur="0.5s" fill="freeze" />
        </circle>
    </svg>`;
    container.appendChild(bomb);
    container.style.animation = 'shake 0.5s';
    setTimeout(() => {
        bomb.remove();
        container.style.animation = '';
    }, 600);
}
// Add shake animation
const style = document.createElement('style');
style.innerHTML = `@keyframes shake { 0% { transform: translate(0, 0); } 20% { transform: translate(-10px, 0); } 40% { transform: translate(10px, 0); } 60% { transform: translate(-10px, 0); } 80% { transform: translate(10px, 0); } 100% { transform: translate(0, 0); } }`;
document.head.appendChild(style);

// --- TOC LOGIC ---
const tocBtn = document.getElementById('toc-btn');
const tocModal = document.getElementById('toc-modal');
const tocItems = document.querySelectorAll('.toc-item');
let tocOpen = false;
function hideAllParts() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('part2-container').style.display = 'none';
    document.getElementById('part3-container').style.display = 'none';
    document.getElementById('part4-container').style.display = 'none';
    document.getElementById('part5-container').style.display = 'none';
    document.getElementById('part6-container').style.display = 'none';
    document.getElementById('part7-container').style.display = 'none';
    document.getElementById('part8-container').style.display = 'none';
    document.getElementById('part9-container').style.display = 'none';
    document.getElementById('part10-container').style.display = 'none';
    document.getElementById('part11-container').style.display = 'none';
    document.getElementById('part12-container').style.display = 'none';
}
tocBtn.onclick = function() {
    tocOpen = !tocOpen;
    tocModal.style.display = tocOpen ? 'flex' : 'none';
};
tocItems.forEach(item => {
    item.onclick = function() {
        const part = this.getAttribute('data-part');
        hideAllParts();
        tocModal.style.display = 'none';
        tocOpen = false;
        if (part === '1') {
            document.getElementById('game-container').style.display = 'flex';
        } else if (part === '2') {
            document.getElementById('part2-container').style.display = 'flex';
            startPart2 && startPart2();
        } else if (part === '3') {
            document.getElementById('part3-container').style.display = 'flex';
            startPart3 && startPart3();
        } else if (part === '4') {
            document.getElementById('part4-container').style.display = 'flex';
            startPart4 && startPart4();
        } else if (part === '5') {
            document.getElementById('part5-container').style.display = 'flex';
            startPart5 && startPart5();
        }
    };
});

// --- PART 6 LOGIC ---
const nextPart5Btn = document.getElementById('next-part5-btn');
nextPart5Btn.onclick = () => {
    document.getElementById('part5-container').style.display = 'none';
    document.getElementById('part6-container').style.display = 'flex';
    startPart6();
};

function startPart6() {
    const nImg = document.getElementById('part6-n');
    const fireEffect = document.getElementById('fire-effect');
    const nextBtn = document.getElementById('next-part6-btn');
    const audio = document.getElementById('blackmetal-audio');
    let touchCount = 0;
    let fireShown = false;
    nImg.classList.remove('shake');
    fireEffect.style.display = 'none';
    nextBtn.style.display = 'none';
    // Remove any previous fire effect
    fireEffect.innerHTML = '';
    function handleTouch() {
        if (fireShown) return;
        touchCount++;
        nImg.classList.remove('shake');
        void nImg.offsetWidth; // force reflow for animation
        nImg.classList.add('shake');
        // Play audio for 3 seconds
        audio.currentTime = 0;
        audio.play();
        setTimeout(() => { audio.pause(); }, 3000);
        if (touchCount >= 5) {
            fireShown = true;
            showFireEffect();
            nextBtn.style.display = 'block';
        }
    }
    nImg.onclick = handleTouch;
    document.getElementById('part6-container').onclick = (e) => {
        if (e.target === nImg) return;
        handleTouch();
    };
    nextBtn.onclick = () => {
        document.getElementById('part6-container').style.display = 'none';
        document.getElementById('part7-container').style.display = 'flex';
        startPart7();
    };
}
function showFireEffect() {
    const fireEffect = document.getElementById('fire-effect');
    fireEffect.style.display = 'block';
    // Use multiple animated fire SVGs for realism
    let fireHTML = '';
    for (let i = 0; i < 12; i++) {
        const left = Math.random() * 100;
        const delay = Math.random();
        fireHTML += `<svg class="real-fire" style="position:absolute;bottom:0;left:${left}vw;width:12vw;height:32vh;z-index:10001;animation:fire-rise 1.2s ${delay}s infinite alternate;pointer-events:none;" viewBox="0 0 120 320"><g><path d="M60,320 Q${30+Math.random()*60},${100+Math.random()*80} 60,0 Q${90+Math.random()*30},${100+Math.random()*80} 60,320" fill="orange" opacity="0.7"><animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M60,320 Q30,120 60,0 Q90,120 60,320;M60,320 Q50,80 60,0 Q70,80 60,320"/></path><path d="M60,320 Q${40+Math.random()*40},${160+Math.random()*60} 60,40 Q${80+Math.random()*20},${160+Math.random()*60} 60,320" fill="gold" opacity="0.5"><animate attributeName="d" dur="1.1s" repeatCount="indefinite" values="M60,320 Q40,180 60,40 Q80,180 60,320;M60,320 Q60,120 60,40 Q60,120 60,320;M60,320 Q40,180 60,40 Q80,180 60,320"/></path></g></svg>`;
    }
    fireEffect.innerHTML = fireHTML;
}
// Add fire-rise animation
(function(){
    const style = document.createElement('style');
    style.innerHTML += `@keyframes fire-rise { 0% { opacity: 0.7; transform: scaleY(1); } 100% { opacity: 1; transform: scaleY(1.2) translateY(-20px); } }`;
    document.head.appendChild(style);
})();

// --- PART 7 LOGIC ---
const nextLevel2Btn = document.getElementById('next-level2-btn');
if (nextLevel2Btn) {
    nextLevel2Btn.onclick = () => {
        document.getElementById('part7-container').style.display = 'none';
        document.getElementById('part8-container').style.display = 'flex';
        startPart8();
    };
}

function startPart7() {
    const oImg = document.getElementById('part7-o');
    const rImg = document.getElementById('part7-r');
    const pImg = document.getElementById('part7-p');
    const rainEffect = document.getElementById('rain-effect');
    const nextBtn = document.getElementById('next-level2-btn');
    let touchCount = 0;
    let rainStarted = false;
    let rainTimeout = null;
    let animating = false;
    let rTouchCount = 0;
    // Create or reuse success message
    let successMsg = document.getElementById('part7-success');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.id = 'part7-success';
        successMsg.style.position = 'absolute';
        successMsg.style.top = '50%';
        successMsg.style.left = '50%';
        successMsg.style.transform = 'translate(-50%, -50%)';
        successMsg.style.color = '#333';
        successMsg.style.background = 'rgba(255,255,255,0.9)';
        successMsg.style.padding = '20px 40px';
        successMsg.style.borderRadius = '10px';
        successMsg.style.fontSize = '2rem';
        successMsg.style.display = 'none';
        successMsg.style.zIndex = '100';
        successMsg.style.textAlign = 'center';
        document.getElementById('part7-container').appendChild(successMsg);
    }
    oImg.style.opacity = '1';
    pImg.style.opacity = '0'; // p.png hidden when o.png is visible
    rImg.classList.remove('shake');
    rainEffect.style.display = 'none';
    rainEffect.innerHTML = '';
    nextBtn.style.display = 'none';
    successMsg.style.display = 'none';
    function shakeAndHideShow() {
        let count = 0;
        animating = true;
        function toggle() {
            if (count >= 10) {
                oImg.style.opacity = '1';
                pImg.style.opacity = '0'; // p.png hidden when o.png is visible
                rImg.classList.remove('shake');
                animating = false;
                return;
            }
            if (count % 2 === 0) {
                oImg.style.opacity = '0';
                pImg.style.opacity = '1'; // p.png visible when o.png is hidden
                rImg.classList.add('shake');
            } else {
                oImg.style.opacity = '1';
                pImg.style.opacity = '0'; // p.png hidden when o.png is visible
                rImg.classList.remove('shake');
            }
            count++;
            setTimeout(toggle, 61.8); // 3% slower
        }
        toggle();
    }
    function handleTouch(e) {
        if (animating) return;
        // Only count r.png touches for success
        if (e && e.target === rImg) {
            rImg.classList.remove('shake');
            void rImg.offsetWidth;
            rImg.classList.add('shake');
            rTouchCount++;
            if (rTouchCount === 2) {
                successMsg.textContent = 'ooohh yarrradı';
                successMsg.style.display = 'block';
                nextBtn.style.display = 'block';
            }
        }
        touchCount++;
        shakeAndHideShow();
        if (touchCount === 2 && !rainStarted) {
            rainStarted = true;
            startRain();
        }
    }
    oImg.onclick = handleTouch;
    rImg.onclick = handleTouch;
    pImg.onclick = handleTouch;
    document.getElementById('part7-container').onclick = (e) => {
        if ([oImg, rImg, pImg].includes(e.target)) return;
        handleTouch(e);
    };
    function startRain() {
        setTimeout(() => {
            rainEffect.style.display = 'block';
            rainEffect.innerHTML = '';
            let drops = [];
            for (let i = 0; i < 20; i++) { // half as many
                const drop = document.createElement('img');
                drop.src = 's.png';
                drop.style.position = 'absolute';
                drop.style.left = Math.random() * 100 + 'vw';
                drop.style.top = (-10 - Math.random() * 20) + 'vh';
                drop.style.width = '11.2vw'; // 2x bigger
                drop.style.height = 'auto';
                drop.style.opacity = '0.85';
                drop.style.pointerEvents = 'none';
                drop.style.transition = 'top 0.8s linear';
                rainEffect.appendChild(drop);
                drops.push(drop);
            }
            setTimeout(() => {
                drops.forEach(drop => {
                    drop.style.top = (90 + Math.random() * 10) + 'vh';
                });
            }, 30);
            rainTimeout = setTimeout(() => {
                rainEffect.style.display = 'none';
                rainEffect.innerHTML = '';
                // nextBtn.style.display = 'block';
            }, 13464); // 120% slower
        }, 1000); // 1s delay
    }
}

// --- DYNAMIC TOC LOGIC ---
function updateTOC() {
    const tocList = document.getElementById('toc-list');
    tocList.innerHTML = '';
    const partNames = [
        'Level 1 - Part 1',
        'Level 1 - Part 2',
        'Level 1 - Part 3',
        'Level 1 - Part 4',
        'Level 2 - Part 1',
        'Level 2 - Part 2',
        'Level 3 - Part 1',
        'Level 3 - Part 2',
        'Level 3 - Part 3',
        'Level 3 - Part 4',
        'Level 4 - Part 1',
        'TEBRİKLER!! ORKAN\'I 25 YAŞINA GETİRDİN!!!'
    ];
    for (let i = 0; i < partNames.length; i++) {
        const div = document.createElement('div');
        div.className = 'toc-item';
        div.setAttribute('data-part', (i+1).toString());
        div.textContent = partNames[i];
        tocList.appendChild(div);
    }
    // Re-attach TOC click handlers
    document.querySelectorAll('.toc-item').forEach(item => {
        item.onclick = function() {
            const part = this.getAttribute('data-part');
            hideAllParts();
            document.getElementById('toc-modal').style.display = 'none';
            tocOpen = false;
            if (part === '1') {
                document.getElementById('game-container').style.display = 'flex';
            } else if (part === '2') {
                document.getElementById('part2-container').style.display = 'flex';
                startPart2 && startPart2();
            } else if (part === '3') {
                document.getElementById('part3-container').style.display = 'flex';
                startPart3 && startPart3();
            } else if (part === '4') {
                document.getElementById('part4-container').style.display = 'flex';
                startPart4 && startPart4();
            } else if (part === '5') {
                document.getElementById('part5-container').style.display = 'flex';
                startPart5 && startPart5();
            } else if (part === '6') {
                document.getElementById('part6-container').style.display = 'flex';
                startPart6 && startPart6();
            } else if (part === '7') {
                document.getElementById('part7-container').style.display = 'flex';
                startPart7 && startPart7();
            } else if (part === '8') {
                document.getElementById('part8-container').style.display = 'flex';
                startPart8 && startPart8();
            } else if (part === '9') {
                document.getElementById('part9-container').style.display = 'flex';
                startPart9 && startPart9();
            } else if (part === '10') {
                document.getElementById('part10-container').style.display = 'flex';
                startPart10 && startPart10();
            } else if (part === '11') {
                document.getElementById('part11-container').style.display = 'flex';
                startPart11 && startPart11();
            } else if (part === '12') {
                document.getElementById('part12-container').style.display = 'flex';
                startPart12 && startPart12();
            }
        };
    });
}
function startPart8() {
    const uImg = document.getElementById('part8-u');
    const successMsg = document.getElementById('part8-success');
    const vImg = document.getElementById('part8-v');
    const nextBtn = document.getElementById('next-part8-btn');
    const container = document.getElementById('part8-container');
    let touches = 0;
    let left = 30; // start at 30% left
    let top = 70; // start at 70% down
    let width = 25; // vw
    const minWidth = 4; // vw, prevent too small
    uImg.style.left = left + '%';
    uImg.style.top = top + 'vh';
    uImg.style.width = width + 'vw';
    uImg.style.maxWidth = width + 'vw';
    uImg.style.display = '';
    successMsg.style.display = 'none';
    vImg.style.display = 'none';
    nextBtn.style.display = 'none';
    function handleTouch() {
        if (touches >= 10) return;
        touches++;
        left = Math.max(0, left + 2); // move 2% right
        top = Math.max(0, top - 5); // move 5vh up
        width = Math.max(minWidth, width * 0.7); // 30% smaller
        uImg.style.left = left + '%';
        uImg.style.top = top + 'vh';
        uImg.style.width = width + 'vw';
        uImg.style.maxWidth = width + 'vw';
        if (touches === 10) {
            successMsg.textContent = "Az önce sarhoş Orkan ve Can'a ayağı ıslanmaması gereken sakat Burcu'yla birlikte tekne mi çaldırdın? Gelecekten bildiriyorum: Sarhoş Orkan tekneyi sallayacak ve gece 4'te zar zor taksi bulup acile gitmek zorunda kalacaklar.";
            successMsg.style.display = 'block';
            vImg.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
    // Make the entire container clickable, not just the image
    container.onclick = handleTouch;
    
    // Add navigation to next part
    nextBtn.onclick = () => {
        document.getElementById('part8-container').style.display = 'none';
        document.getElementById('part9-container').style.display = 'flex';
        startPart9();
    };
}

function startPart9() {
    const zImg = document.getElementById('part9-z');
    const successMsg = document.getElementById('part9-success');
    const aaImg = document.getElementById('part9-aa');
    const nextBtn = document.getElementById('next-part9-btn');
    const targetSquare = document.getElementById('target-square');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    
    let offsetX, offsetY, dragging = false;
    let currentX = 20; // percentage - start at 20% left
    let currentY = 50; // percentage
    
    // Reset positions
    zImg.style.left = '20%';
    zImg.style.top = '50%';
    zImg.style.transform = 'translate(-50%, -50%)';
    successMsg.style.display = 'none';
    aaImg.style.display = 'none';
    nextBtn.style.display = 'none';
    
    function moveZ(direction) {
        const step = 5; // pixels to move
        
        switch(direction) {
            case 'up':
                currentY = Math.max(0, currentY - step);
                break;
            case 'down':
                currentY = Math.min(100, currentY + step);
                break;
            case 'left':
                currentX = Math.max(0, currentX - step);
                break;
            case 'right':
                currentX = Math.min(100, currentX + step);
                break;
        }
        
        zImg.style.left = currentX + '%';
        zImg.style.top = currentY + '%';
        zImg.style.transform = 'translate(-50%, -50%)';
        checkPosition();
    }
    
    function onMouseDown(e) {
        dragging = true;
        const rect = zImg.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        zImg.style.cursor = 'grabbing';
    }
    
    function onMouseMove(e) {
        if (!dragging) return;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        zImg.style.left = x + 'px';
        zImg.style.top = y + 'px';
        zImg.style.transform = 'none';
        checkPosition();
    }
    
    function onMouseUp(e) {
        if (!dragging) return;
        dragging = false;
        zImg.style.cursor = 'grab';
    }
    
    function checkPosition() {
        const zRect = zImg.getBoundingClientRect();
        const squareRect = targetSquare.getBoundingClientRect();
        
        // Check if z.png touches/overlaps with the target square
        const zTop = zRect.top;
        const zBottom = zRect.bottom;
        const zLeft = zRect.left;
        const zRight = zRect.right;
        const squareTop = squareRect.top;
        const squareBottom = squareRect.bottom;
        const squareLeft = squareRect.left;
        const squareRight = squareRect.right;
        
        // Check for overlap (touching)
        if (zLeft < squareRight && zRight > squareLeft && 
            zTop < squareBottom && zBottom > squareTop) {
            successMsg.style.display = 'block';
            aaImg.style.display = 'block';
            nextBtn.style.display = 'block';
            // Remove event listeners after success
            zImg.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            upBtn.removeEventListener('click', () => moveZ('up'));
            downBtn.removeEventListener('click', () => moveZ('down'));
            leftBtn.removeEventListener('click', () => moveZ('left'));
            rightBtn.removeEventListener('click', () => moveZ('right'));
        }
    }
    
    // Add button event listeners
    upBtn.addEventListener('click', () => moveZ('up'));
    downBtn.addEventListener('click', () => moveZ('down'));
    leftBtn.addEventListener('click', () => moveZ('left'));
    rightBtn.addEventListener('click', () => moveZ('right'));
    
    // Add drag functionality
    zImg.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    zImg.ondragstart = () => false; // Disable default drag
    
    // Add navigation to next part
    nextBtn.onclick = () => {
        document.getElementById('part9-container').style.display = 'none';
        document.getElementById('part10-container').style.display = 'flex';
        startPart10();
    };
}

function startPart10() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const slots = document.querySelectorAll('.puzzle-slot');
    const successMsg = document.getElementById('part10-success');
    const nextBtn = document.getElementById('next-part10-btn');
    
    let placedPieces = 0;
    let draggedPiece = null;
    
    // Define correct positions for each piece
    const correctPositions = {
        'piece-1': 'puzzle-slot-1', // Top-left piece goes in top-left slot
        'piece-2': 'puzzle-slot-2', // Top-right piece goes in top-right slot
        'piece-3': 'puzzle-slot-3', // Bottom-left piece goes in bottom-left slot
        'piece-4': 'puzzle-slot-4'  // Bottom-right piece goes in bottom-right slot
    };
    
    // Reset puzzle
    pieces.forEach(piece => {
        piece.style.position = 'static';
        piece.classList.remove('placed');
        piece.style.opacity = '1';
        piece.style.pointerEvents = 'auto';
    });
    
    slots.forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('highlight');
        slot.classList.remove('correct');
    });
    
    successMsg.style.display = 'none';
    nextBtn.style.display = 'none';
    
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            draggedPiece = piece;
            e.dataTransfer.setData('text/plain', piece.id);
        });
    });
    
    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('highlight');
        });
        
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('highlight');
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('highlight');
            
            if (draggedPiece && !draggedPiece.classList.contains('placed')) {
                // Check if piece is in correct position
                const isCorrect = correctPositions[draggedPiece.id] === slot.id;
                
                if (isCorrect) {
                    // Place the piece in the slot
                    slot.appendChild(draggedPiece);
                    draggedPiece.style.position = 'static';
                    draggedPiece.classList.add('placed');
                    draggedPiece.style.opacity = '1';
                    draggedPiece.style.pointerEvents = 'none';
                    slot.classList.add('correct');
                    
                    placedPieces++;
                    
                    if (placedPieces === 4) {
                        // All pieces placed correctly - show success
                        setTimeout(() => {
                            successMsg.style.display = 'block';
                            nextBtn.style.display = 'block';
                        }, 500);
                    }
                } else {
                    // Wrong position - return piece to original position
                    draggedPiece.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        draggedPiece.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    });
    
    // Add navigation to next part
    nextBtn.onclick = () => {
        document.getElementById('part10-container').style.display = 'none';
        document.getElementById('part11-container').style.display = 'flex';
        startPart11();
    };
}

function startPart11() {
    const bgImg = document.getElementById('part11-bg');
    const dccImg = document.getElementById('part11-dcc');
    const hahaImg = document.getElementById('part11-haha');
    const dcImg = document.getElementById('part11-dc');
    const successMsg = document.getElementById('part11-success');
    const nextBtn = document.getElementById('next-part11-btn');
    const textElement = document.getElementById('part11-text');
    const container = document.getElementById('part11-container');
    
    let currentState = 'dcc'; // dcc -> haha -> dcc -> dc -> success
    
    // Reset state
    function resetState() {
        dccImg.style.display = 'block';
        dccImg.classList.remove('shake');
        hahaImg.style.display = 'none';
        dcImg.style.display = 'none';
        successMsg.style.display = 'none';
        nextBtn.style.display = 'none';
        textElement.textContent = "Orkan'ın sırası:";
        currentState = 'dcc';
    }
    
    resetState();
    
    // Add click event to dcc.png
    dccImg.onclick = () => {
        if (currentState === 'dcc') {
            // Shake the dcc.png
            dccImg.classList.add('shake');
            
            // Hide dcc.png after 1 second
            setTimeout(() => {
                dccImg.style.display = 'none';
                
                // Show haha.png
                hahaImg.style.display = 'block';
                currentState = 'haha';
            }, 1000);
        } else if (currentState === 'dcc2') {
            // Second time clicking dcc.png
            dccImg.classList.add('shake');
            
            setTimeout(() => {
                dccImg.style.display = 'none';
                
                // Show dc.png
                dcImg.style.display = 'block';
                currentState = 'dc';
                
                // Show success message and next button
                setTimeout(() => {
                    successMsg.style.display = 'block';
                    nextBtn.style.display = 'block';
                }, 500);
            }, 1000);
        }
    };
    
    // Add click event to container (screen touch)
    container.onclick = (e) => {
        if (currentState === 'haha' && e.target !== dccImg && e.target !== hahaImg) {
            // Change text to "Burcu'nun sırası:"
            textElement.textContent = "Burcu'nun sırası:";
            
            // Hide haha.png and show dcc.png again
            hahaImg.style.display = 'none';
            dccImg.style.display = 'block';
            dccImg.classList.remove('shake');
            currentState = 'dcc2';
        }
    };
    
    // Add navigation to next part
    nextBtn.onclick = () => {
        document.getElementById('part11-container').style.display = 'none';
        document.getElementById('part12-container').style.display = 'flex';
        startPart12();
    };
}

function startPart12() {
    const leftFireworks = document.getElementById('left-fireworks');
    const rightFireworks = document.getElementById('right-fireworks');
    const leftConfetti = document.getElementById('left-confetti');
    const rightConfetti = document.getElementById('right-confetti');
    const video = document.getElementById('surf-video');
    
    // Start video
    video.play().catch(e => console.log('Video autoplay prevented:', e));
    
    // Create fireworks
    function createFireworks(container, side) {
        setInterval(() => {
            const firework = document.createElement('div');
            const x = side === 'left' ? Math.random() * 40 : 60 + Math.random() * 40;
            const y = 80 + Math.random() * 20;
            
            firework.style.position = 'absolute';
            firework.style.left = x + 'vw';
            firework.style.top = y + 'vh';
            firework.style.width = '4px';
            firework.style.height = '4px';
            firework.style.background = `hsl(${Math.floor(Math.random()*360)}, 100%, 60%)`;
            firework.style.borderRadius = '50%';
            firework.style.zIndex = '21';
            
            container.appendChild(firework);
            
            // Animate firework explosion
            setTimeout(() => {
                firework.style.transition = 'all 0.8s ease-out';
                firework.style.transform = 'scale(20)';
                firework.style.opacity = '0';
                
                // Create explosion particles
                for (let i = 0; i < 12; i++) {
                    const particle = document.createElement('div');
                    const angle = (i / 12) * 2 * Math.PI;
                    const distance = 50 + Math.random() * 30;
                    const particleX = x + Math.cos(angle) * distance / 10;
                    const particleY = y - Math.sin(angle) * distance / 10;
                    
                    particle.style.position = 'absolute';
                    particle.style.left = x + 'vw';
                    particle.style.top = y + 'vh';
                    particle.style.width = '3px';
                    particle.style.height = '3px';
                    particle.style.background = `hsl(${Math.floor(Math.random()*360)}, 100%, 60%)`;
                    particle.style.borderRadius = '50%';
                    particle.style.zIndex = '22';
                    
                    container.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.style.transition = 'all 1s ease-out';
                        particle.style.left = particleX + 'vw';
                        particle.style.top = particleY + 'vh';
                        particle.style.opacity = '0';
                        
                        setTimeout(() => particle.remove(), 1000);
                    }, 50);
                }
                
                setTimeout(() => {
                    firework.remove();
                }, 800);
            }, 100);
        }, 800);
    }
    
    // Create confetti
    function createConfetti(container) {
        setInterval(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 50 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, 100);
    }
    
    // Start effects
    createFireworks(leftFireworks, 'left');
    createFireworks(rightFireworks, 'right');
    createConfetti(leftConfetti);
    createConfetti(rightConfetti);
}
updateTOC(); 