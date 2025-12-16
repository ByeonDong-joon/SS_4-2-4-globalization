const allData = [
    { id: 1, adv: "다른 나라 과일·물건을 쉽게 살 수 있어요.", prob: "운송이 많아져 탄소가 늘 수 있어요.", sol: "가까운 것도 함께 사고, 필요한 만큼만 사요." },
    { id: 2, adv: "값싼 물건을 살 기회가 늘어요.", prob: "지나친 소비로 쓰레기가 늘어요.", sol: "“필요-원함”을 구분해 꼭 필요한 것만 사요." },
    { id: 3, adv: "해외 음식·문화 체험이 쉬워요.", prob: "다른 문화를 놀리거나 오해할 수 있어요.", sol: "서로의 문화를 존중하는 말을 써요." },
    { id: 4, adv: "외국 친구와 쉽게 소통할 수 있어요.", prob: "온라인에서 예의 없는 말이 생길 수 있어요.", sol: "인터넷 예절(존중, 배려)을 지켜요." },
    { id: 5, adv: "세계 뉴스·정보를 빨리 알 수 있어요.", prob: "가짜뉴스에 속을 수 있어요.", sol: "출처 확인, 여러 곳 비교하기를 해요." },
    { id: 6, adv: "외국 영화·음악을 즐길 수 있어요.", prob: "우리 전통 놀이·문화가 약해질 수 있어요.", sol: "전통 놀이/명절 활동을 꾸준히 해요." },
    { id: 7, adv: "우리나라 문화(한류)를 세계에 알릴 수 있어요.", prob: "나라를 한 가지 모습으로만 오해할 수 있어요.", sol: "다양한 한국 문화를 소개해요(역사·예절·지역)." },
    { id: 8, adv: "해외 여행·교류가 늘어요.", prob: "감염병이 빨리 퍼질 수 있어요.", sol: "손 씻기, 기침 예절, 아프면 쉬기." },
    { id: 9, adv: "여러 나라가 힘을 모아 도움을 줄 수 있어요.", prob: "도움을 받는 나라가 힘들어질 수도 있어요.", sol: "필요한 것을 묻고, 공평하게 돕는 방법을 찾아요." },
    { id: 10, adv: "다양한 직업·일자리가 생길 수 있어요.", prob: "일자리가 줄어 걱정하는 사람도 있어요.", sol: "새로운 기술을 배우고 서로 돕는 정책을 생각해요." },
    { id: 11, adv: "물건이 빠르게 오고 편리해요.", prob: "과대포장 쓰레기가 늘 수 있어요.", sol: "포장 줄이기, 재활용 분리배출을 잘해요." },
    { id: 12, adv: "세계 여러 나라 제품을 비교할 수 있어요.", prob: "불공정한 거래로 약한 나라가 손해 볼 수 있어요.", sol: "공정무역 제품을 선택하고 공평함을 배워요." },
    { id: 13, adv: "계절과 상관없이 물건을 구할 수 있어요.", prob: "지역 상점이 어려워질 수 있어요.", sol: "동네 가게도 이용하고 함께 살려요." },
    { id: 14, adv: "외국어를 배우면 기회가 늘어요.", prob: "외국어만 중요하다고 느낄 수 있어요.", sol: "우리말도 소중히 쓰고, 둘 다 존중해요." },
    { id: 15, adv: "다양한 옷·유행을 즐길 수 있어요.", prob: "유행 따라 버리는 옷이 늘 수 있어요.", sol: "오래 입기, 나눔/기부, 중고 활용하기." },
    { id: 16, adv: "기술이 공유돼 생활이 편해져요.", prob: "개인정보가 새어 나갈 수 있어요.", sol: "비밀번호 강하게, 개인정보는 함부로 올리지 않기." },
    { id: 17, adv: "세계 스포츠·행사로 함께 즐겨요.", prob: "나라끼리 싸우거나 차별이 생길 수 있어요.", sol: "“경기는 경기!” 서로 존중하며 응원해요." },
    { id: 18, adv: "다른 나라에서 일·공부할 기회가 있어요.", prob: "이주한 사람을 편견으로 볼 수 있어요.", sol: "다문화 친구를 배려하고 차별 표현을 쓰지 않아요." },
    { id: 19, adv: "세계 협력으로 환경을 지킬 수 있어요.", prob: "나라별 이해가 달라 협력이 어려워요.", sol: "약속(규칙)을 정하고 함께 실천해요(절전·절수)." },
    { id: 20, adv: "다양한 먹거리를 즐길 수 있어요.", prob: "음식 낭비가 늘 수 있어요.", sol: "적당히 담기, 남기지 않기, 남은 음식 활용하기." }
];


let stage = 0;
const stageSizes = [6, 7, 7]; // 6 sets, 7 sets, 7 sets
let currentBatch = [];
let dragSrcEl = null;

const rowsContainer = document.getElementById('rows-container');
const stageInfo = document.getElementById('stage-info');
const completionModal = document.getElementById('completion-modal');
const finalModal = document.getElementById('final-modal');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

function initGame() {
    stage = 0;
    loadStage();
}

function loadStage() {
    // Calculate start index based on previous stages
    let startIdx = 0;
    for (let i = 0; i < stage; i++) {
        startIdx += stageSizes[i];
    }
    const endIdx = startIdx + stageSizes[stage];

    const rawBatch = allData.slice(startIdx, endIdx);

    // Flatten rows into columns but keeping track of IDs
    let colAdv = rawBatch.map(d => ({ text: d.adv, id: d.id, type: 'advantage' }));
    let colProb = rawBatch.map(d => ({ text: d.prob, id: d.id, type: 'problem' }));
    let colSol = rawBatch.map(d => ({ text: d.sol, id: d.id, type: 'solution' }));

    // Shuffle each column independently
    shuffleArray(colAdv);
    shuffleArray(colProb);
    shuffleArray(colSol);

    renderBoard(colAdv, colProb, colSol);
    updateStatus();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderBoard(advs, probs, sols) {
    rowsContainer.innerHTML = '';
    const currentCount = stageSizes[stage];

    for (let i = 0; i < currentCount; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('game-row');
        rowDiv.dataset.rowIndex = i;

        // Create the 3 cards
        // Note: advs, probs, sols are already the length of currentCount
        const cards = [advs[i], probs[i], sols[i]];

        cards.forEach(cardData => {
            const cardEl = createCard(cardData);
            rowDiv.appendChild(cardEl);
        });

        rowsContainer.appendChild(rowDiv);
    }

    // Check initial matches
    checkMatches();
}

function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = true;
    card.dataset.id = data.id;
    card.dataset.type = data.type;
    card.innerText = data.text;

    addDragEvents(card);

    return card;
}

function addDragEvents(card) {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragenter', handleDragEnter);
    card.addEventListener('dragover', handleDragOver);
    card.addEventListener('dragleave', handleDragLeave);
    card.addEventListener('drop', handleDrop);
    card.addEventListener('dragend', handleDragEnd);
}

// Drag & Drop Handlers
function handleDragStart(e) {
    if (this.parentNode.classList.contains('correct')) {
        e.preventDefault();
        return;
    }
    this.classList.add('dragging');
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    // Only highlight if it's a valid drop target (same column type)
    if (this !== dragSrcEl && this.dataset.type === dragSrcEl.dataset.type && !this.parentNode.classList.contains('correct')) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    const destCard = this;

    // Validation: Can only swap with cards of the same type (column)
    // And cannot swap if the row is already solved (though pointer-events:none handles that usually)
    if (dragSrcEl !== destCard && dragSrcEl.dataset.type === destCard.dataset.type) {
        // Swap Content
        const srcContent = dragSrcEl.innerText;
        const srcId = dragSrcEl.dataset.id;

        const destContent = destCard.innerText;
        const destId = destCard.dataset.id;

        dragSrcEl.innerText = destContent;
        dragSrcEl.dataset.id = destId;

        destCard.innerText = srcContent;
        destCard.dataset.id = srcId;

        // After swap, check the board state
        checkMatches();
    }

    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('drag-over');
    });
}

function checkMatches() {
    const rows = document.querySelectorAll('.game-row');
    let allCorrect = true;

    // First pass: Check if ALL rows are correct
    for (const row of rows) {
        const cards = row.children;
        const c1 = cards[0];
        const c2 = cards[1];
        const c3 = cards[2];

        // Ensure we have 3 cards (sanity check)
        if (cards.length < 3) {
            allCorrect = false;
            break;
        }

        // Check if IDs match
        if (c1.dataset.id !== c2.dataset.id || c2.dataset.id !== c3.dataset.id) {
            allCorrect = false;
            break;
        }
    }

    if (allCorrect) {
        // Apply visual feedback and lock ONLY if everything is correct
        rows.forEach(row => {
            row.classList.add('correct');
            Array.from(row.children).forEach(card => card.draggable = false);
        });

        setTimeout(() => {
            if (stage < 2) {
                completionModal.classList.remove('hidden');
            } else {
                finalModal.classList.remove('hidden');
            }
        }, 500);
    }
}

function updateStatus() {
    stageInfo.innerText = `${stage + 1}단계 (총 3단계, ${stageSizes[stage]}문제)`;
}

nextBtn.addEventListener('click', () => {
    completionModal.classList.add('hidden');
    stage++;
    loadStage();
});

restartBtn.addEventListener('click', () => {
    finalModal.classList.add('hidden');
    stage = 0;
    loadStage();
});

// Initialize
initGame();
