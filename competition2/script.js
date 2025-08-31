// 初始化兩組的輸入內容
let team1Text = '';
let team2Text = '';

// 初始化大小寫狀態
let team1ShiftActive = false;
let team2ShiftActive = false;

// 獲取DOM元素
const team1Display = document.getElementById('team1-display');
const team2Display = document.getElementById('team2-display');
const keyboard1 = document.getElementById('keyboard1');
const keyboard2 = document.getElementById('keyboard2');

// 計分系統
const team1Score = document.getElementById('team1-score');
const team2Score = document.getElementById('team2-score');
const team1AddBtn = document.getElementById('team1-add');
const team1MinusBtn = document.getElementById('team1-minus');
const team2AddBtn = document.getElementById('team2-add');
const team2MinusBtn = document.getElementById('team2-minus');

let team1ScoreValue = 0;
let team2ScoreValue = 0;

// 更新字母鍵顯示的函數
function updateLetterKeys(teamNumber) {
    const keyboard = teamNumber === 1 ? keyboard1 : keyboard2;
    const isShiftActive = teamNumber === 1 ? team1ShiftActive : team2ShiftActive;

    // 更新所有字母鍵的顯示
    const letterKeys = keyboard.querySelectorAll('.key[data-key]');
    letterKeys.forEach(key => {
        const keyValue = key.getAttribute('data-key');
        if (keyValue.length === 1 && /[a-z]/.test(keyValue)) {
            key.textContent = isShiftActive ? keyValue.toUpperCase() : keyValue.toLowerCase();
        }
    });

    // 更新Shift按鍵的視覺狀態
    const shiftKey = keyboard.querySelector('.key[data-key="shift"]');
    if (shiftKey) {
        if (isShiftActive) {
            shiftKey.style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
            shiftKey.style.color = 'white';
        } else {
            shiftKey.style.background = 'linear-gradient(145deg, #ff6b6b, #ee5a52)';
            shiftKey.style.color = 'white';
        }
    }
}

// 更新顯示內容的函數
function updateDisplay(teamNumber) {
    const display = teamNumber === 1 ? team1Display : team2Display;
    const text = teamNumber === 1 ? team1Text : team2Text;

    display.textContent = text;
    display.style.color = '#2c3e50';
    display.style.fontStyle = 'normal';
}

// 更新分數顯示
function updateScore() {
    team1Score.textContent = team1ScoreValue;
    team2Score.textContent = team2ScoreValue;

    // 添加分數變化動畫
    team1Score.style.transform = 'scale(1.1)';
    team2Score.style.transform = 'scale(1.1)';
    setTimeout(() => {
        team1Score.style.transform = 'scale(1)';
        team2Score.style.transform = 'scale(1)';
    }, 200);
}

// 計分功能
function addScore(teamNumber) {
    if (teamNumber === 1) {
        team1ScoreValue++;
    } else {
        team2ScoreValue++;
    }
    updateScore();
}

function minusScore(teamNumber) {
    if (teamNumber === 1) {
        team1ScoreValue = Math.max(0, team1ScoreValue - 1);
    } else {
        team2ScoreValue = Math.max(0, team2ScoreValue - 1);
    }
    updateScore();
}



// 處理按鍵點擊的函數
function handleKeyClick(key, teamNumber) {
    const text = teamNumber === 1 ? team1Text : team2Text;

    switch (key) {
        case 'backspace':
            if (text.length > 0) {
                if (teamNumber === 1) {
                    team1Text = text.slice(0, -1);
                } else {
                    team2Text = text.slice(0, -1);
                }
            }
            break;

        case 'space':
            if (teamNumber === 1) {
                team1Text += ' ';
            } else {
                team2Text += ' ';
            }
            break;

        case 'shift':
            // 切換大小寫狀態
            if (teamNumber === 1) {
                team1ShiftActive = !team1ShiftActive;
            } else {
                team2ShiftActive = !team2ShiftActive;
            }
            updateLetterKeys(teamNumber);
            return; // 不更新顯示，因為沒有輸入文字

        default:
            // 字母和數字
            let inputChar = key;
            if (/[a-z]/.test(key)) {
                // 如果是字母，根據Shift狀態決定大小寫
                const isShiftActive = teamNumber === 1 ? team1ShiftActive : team2ShiftActive;
                inputChar = isShiftActive ? key.toUpperCase() : key.toLowerCase();

                // 輸入後自動關閉Shift（可選）
                if (teamNumber === 1) {
                    team1ShiftActive = false;
                } else {
                    team2ShiftActive = false;
                }
                updateLetterKeys(teamNumber);
            }

            if (teamNumber === 1) {
                team1Text += inputChar;
            } else {
                team2Text += inputChar;
            }
            break;
    }

    updateDisplay(teamNumber);

    // 添加按鍵反饋動畫
    const event = new Event('keypress');
    document.dispatchEvent(event);
}

// 為第一組鍵盤添加事件監聽器
keyboard1.addEventListener('click', (e) => {
    if (e.target.classList.contains('key')) {
        const key = e.target.getAttribute('data-key');
        handleKeyClick(key, 1);

        // 添加視覺反饋
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// 為第二組鍵盤添加事件監聽器
keyboard2.addEventListener('click', (e) => {
    if (e.target.classList.contains('key')) {
        const key = e.target.getAttribute('data-key');
        handleKeyClick(key, 2);

        // 添加視覺反饋
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});



// 鍵盤事件支持（可選功能）
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // 檢查是否在輸入框中
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    // 處理Shift鍵
    if (e.shiftKey && key === 'shift') {
        // 根據最後輸入的組別決定
        if (team1Text.length > team2Text.length) {
            handleKeyClick('shift', 1);
        } else {
            handleKeyClick('shift', 2);
        }
        return;
    }

    // 根據按下的鍵決定哪一組
    // 左半邊鍵盤 -> 第一組，右半邊鍵盤 -> 第二組
    const isLeftSide = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'].includes(key);
    const isRightSide = ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'n', 'm'].includes(key);

    if (isLeftSide) {
        handleKeyClick(key, 1);
    } else if (isRightSide) {
        handleKeyClick(key, 2);
    } else if (key === 'backspace') {
        // 退格鍵根據最後輸入的組別決定
        if (team1Text.length > team2Text.length) {
            handleKeyClick('backspace', 1);
        } else {
            handleKeyClick('backspace', 2);
        }
    } else if (key === ' ') {
        // 空格鍵根據最後輸入的組別決定
        if (team1Text.length > team2Text.length) {
            handleKeyClick('space', 1);
        } else {
            handleKeyClick('space', 2);
        }
    }

    e.preventDefault();
});

// 觸碰事件優化
function addTouchSupport() {
    const keys = document.querySelectorAll('.key');

    keys.forEach(key => {
        // 防止觸碰時的選中文字
        key.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });

        // 防止觸碰時的縮放
        key.addEventListener('touchend', (e) => {
            e.preventDefault();
        }, { passive: false });
    });
}

// 計分按鈕事件監聽器
team1AddBtn.addEventListener('click', () => {
    addScore(1);
    team1AddBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        team1AddBtn.style.transform = '';
    }, 100);
});

team1MinusBtn.addEventListener('click', () => {
    minusScore(1);
    team1MinusBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        team1MinusBtn.style.transform = '';
    }, 100);
});

team2AddBtn.addEventListener('click', () => {
    addScore(2);
    team2AddBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        team2AddBtn.style.transform = '';
    }, 100);
});

team2MinusBtn.addEventListener('click', () => {
    minusScore(2);
    team2MinusBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        team2MinusBtn.style.transform = '';
    }, 100);
});



// 初始化顯示
updateDisplay(1);
updateDisplay(2);
updateLetterKeys(1);
updateLetterKeys(2);
updateScore();

// 添加觸碰支持
addTouchSupport();

// 防止頁面縮放（在觸碰設備上）
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// 防止雙擊縮放
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// 添加鍵盤焦點管理
document.addEventListener('click', (e) => {
    // 點擊鍵盤時移除其他元素的焦點
    if (e.target.classList.contains('key') ||
        e.target.classList.contains('control-btn') ||
        e.target.closest('.keyboard') ||
        e.target.closest('.global-controls')) {
        document.activeElement.blur();
    }
});

// 防止右鍵選單
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 添加載入動畫
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加鍵盤使用提示
console.log('雙組虛擬鍵盤已載入！');
console.log('功能說明：');
console.log('- 點擊虛擬鍵盤按鈕輸入文字');
console.log('- 左半邊實體鍵盤控制第一組');
console.log('- 右半邊實體鍵盤控制第二組');
console.log('- 支持觸碰設備使用');
