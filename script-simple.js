// AlwaysJoy 教育平台 - 簡化版本

// 全局變數
let currentStudent = null;
let currentScores = {};
let practiceData = {};

// 學生資料
const students = {
    'C2 Yuni': { group: 'B組', level: 'C2', password: 'Yuni', isAdmin: false },
    'C2 Emily': { group: 'B組', level: 'C2', password: 'Emily', isAdmin: false },
    'A8 Vito': { group: 'B組', level: 'A8', password: 'Vito', isAdmin: false },
    'A4 Eudora': { group: 'C組', level: 'A4', password: 'Eudora', isAdmin: false },
    'A5 Zoe': { group: 'C組', level: 'A5', password: 'Zoe', isAdmin: false },
    'N6 Bruce': { group: 'D組', level: 'N6', password: 'Bruce', isAdmin: false },
    'N7 Laura': { group: 'D組', level: 'N7', password: 'Laura', isAdmin: false },
    'K9 Lilian': { group: 'E組', level: 'K9', password: 'Lilian', isAdmin: false },
    'K9 Jill': { group: 'E組', level: 'K9', password: 'Jill', isAdmin: false },
    'I2 Candy': { group: 'F組', level: 'I2', password: 'Candy', isAdmin: false },
    'N3 Avery': { group: 'F組', level: 'N3', password: 'Avery', isAdmin: false },
    '教務組 Annie': { group: '教務組', level: 'Admin', password: 'Annie', isAdmin: false },
    '教務組 Celina': { group: '教務組', level: 'Admin', password: 'Celina', isAdmin: false },
    '教務組 Nina': { group: '教務組', level: 'Admin', password: 'Nina', isAdmin: false },
    'Ben': { group: '管理員', level: 'Admin', password: 'BenBenBen', isAdmin: true }
};

// 組別對應的學生
const groupStudents = {
    'B組': ['C2 Yuni', 'C2 Emily', 'A8 Vito'],
    'C組': ['A4 Eudora', 'A5 Zoe'],
    'D組': ['N6 Bruce', 'N7 Laura'],
    'E組': ['K9 Lilian', 'K9 Jill'],
    'F組': ['I2 Candy', 'N3 Avery'],
    '教務組': ['教務組 Annie', '教務組 Celina', '教務組 Nina'],
    '管理員': ['Ben']
};

// 簡化的主網站登入功能
function loginToSystem() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginPageError');

    console.log('登入嘗試:', username, password);

    // 檢查 Joyloveyou 登入
    if (username === 'Joyloveyou' && password === 'Joyloveyou') {
        console.log('Joyloveyou 登入成功');
        setLoggedIn(true);
        showMainContent();
        showSuccessMessage('登入成功！歡迎使用 AlwaysJoy 教育平台');
        
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        return;
    }

    // 檢查管理員登入
    if (username === 'admin' && password === 'admin123') {
        console.log('管理員登入成功');
        setLoggedIn(true);
        showMainContent();
        showSuccessMessage('登入成功！歡迎管理員使用 AlwaysJoy 教育平台');
        
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        return;
    }

    // 登入失敗
    console.log('登入失敗');
    errorDiv.style.display = 'flex';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 帳號或密碼錯誤，請重新輸入';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginPassword').focus();

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// 基本功能函數
function setLoggedIn(status) {
    if (status) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTime', new Date().toISOString());
    } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
    }
}

function showMainContent() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function showLoginPage() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

function showSuccessMessage(message) {
    alert(message);
}

function logoutFromSystem() {
    if (confirm('確定要登出系統嗎？')) {
        setLoggedIn(false);
        showLoginPage();
        showSuccessMessage('已成功登出系統');
    }
}

// 檢查登入狀態
function checkLoginStatus() {
    if (isLoggedIn()) {
        showMainContent();
    } else {
        showLoginPage();
    }
}

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 啟動倒數計時器
function startCountdown() {
    const targetDate = new Date('2025-12-07T00:00:00');

    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('AlwaysJoy 教育平台已載入完成！');
    checkLoginStatus();
    startCountdown();
});
