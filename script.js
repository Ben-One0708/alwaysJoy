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

// 學生登入功能
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    console.log('學生登入嘗試:', username, password);

    // 檢查 Joyloveyou 登入
    if (username === 'Joyloveyou' && password === 'Joyloveyou') {
        console.log('學生 Joyloveyou 登入成功');
        setLoggedIn(true);
        closeModal('loginModal');
        showSuccessMessage('登入成功！');
        return;
    }

    // 檢查其他學生登入
    const student = students[username];
    if (student && student.password === password) {
        console.log('學生登入成功:', username);
        currentStudent = username;
        setLoggedIn(true);
        closeModal('loginModal');
        showSuccessMessage(`歡迎 ${username}！`);
        return;
    }

    // 登入失敗
    console.log('學生登入失敗');
    errorDiv.style.display = 'flex';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 帳號或密碼錯誤，請重新輸入';
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
}

// 學生登入驗證
function loginStudent() {
    const studentName = document.getElementById('studentName').value;
    const password = document.getElementById('studentPassword').value;
    const errorDiv = document.getElementById('studentLoginError');

    if (!studentName || !password) {
        errorDiv.style.display = 'flex';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 請選擇姓名並輸入密碼';
        return;
    }

    const student = students[studentName];
    if (student && student.password === password) {
        currentStudent = studentName;
        showSuccessMessage(`歡迎 ${studentName}！`);
        // 這裡可以添加更多學生功能
    } else {
        errorDiv.style.display = 'flex';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 密碼錯誤，請重新輸入';
        document.getElementById('studentPassword').value = '';
        document.getElementById('studentPassword').focus();
    }
}

// 更新學生列表
function updateStudentList() {
    const group = document.getElementById('studentGroup').value;
    const studentSelect = document.getElementById('studentName');

    studentSelect.innerHTML = '<option value="">請選擇姓名</option>';

    if (group && groupStudents[group]) {
        groupStudents[group].forEach(student => {
            const option = document.createElement('option');
            option.value = student;
            option.textContent = student;
            studentSelect.appendChild(option);
        });
    }
}

// 模態框功能
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// PDF 查看功能
function openPDF(date, type) {
    const modal = document.getElementById('pdfModal');
    const content = document.getElementById('pdfContent');

    content.innerHTML = `<h3>${date} 課程資料</h3><p>這裡將顯示 ${date} 的課程 PDF 內容。</p>`;
    modal.style.display = 'block';
}

// 練習功能
function openPracticeModal(areaType) {
    currentStudent = areaType;
    const modal = document.getElementById('practiceModal');
    const title = document.getElementById('practiceTitle');

    const areaNames = {
        'magazine': '雜誌單字練習',
        'level': '各級別單字練習'
    };

    title.textContent = areaNames[areaType] || '練習內容';
    modal.style.display = 'block';
}

// 分頁切換功能
function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // 更新分頁狀態
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 更新內容顯示
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 點擊模態框外部關閉
function setupModalClose() {
    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
}

// 雜誌練習功能
function completeMagazinePractice() {
    showSuccessMessage('練習完成！');
    closeModal('magazineModal');
}

// 成績登記功能
function submitScoreRegistration() {
    const studentName = document.getElementById('studentNameDisplay').textContent;
    const studentGroup = document.getElementById('studentGroupDisplay').textContent;
    const practiceDate = document.getElementById('practiceDate').value;
    const magazineScore = document.getElementById('magazineScore').value;
    const spellingScore = document.getElementById('spellingScore').value;
    const practiceNotes = document.getElementById('practiceNotes').value;

    if (!practiceDate) {
        alert('請選擇練習日期');
        return;
    }

    if (!magazineScore && !spellingScore) {
        alert('請至少輸入一項成績');
        return;
    }

    // 儲存到本地儲存
    const scoreData = {
        studentName: studentName,
        studentGroup: studentGroup,
        practiceDate: practiceDate,
        magazineScore: magazineScore || 0,
        spellingScore: spellingScore || 0,
        practiceNotes: practiceNotes,
        timestamp: new Date().toISOString()
    };

    // 獲取現有記錄
    let existingScores = JSON.parse(localStorage.getItem('practiceScores') || '[]');
    existingScores.push(scoreData);
    localStorage.setItem('practiceScores', JSON.stringify(existingScores));

    // 如果有 Supabase 連接，也儲存到資料庫
    if (window.apiService) {
        try {
            if (magazineScore) {
                window.apiService.saveScore({
                    studentName: studentName,
                    quizType: 'personal_magazine_practice',
                    score: parseInt(magazineScore),
                    totalQuestions: 100,
                    percentage: 0,
                    date: practiceDate,
                    details: { notes: practiceNotes }
                });
            }
            if (spellingScore) {
                window.apiService.saveScore({
                    studentName: studentName,
                    quizType: 'personal_spelling_practice',
                    score: parseInt(spellingScore),
                    totalQuestions: 100,
                    percentage: 0,
                    date: practiceDate,
                    details: { notes: practiceNotes }
                });
            }
        } catch (error) {
            console.error('儲存到資料庫失敗:', error);
        }
    }

    showSuccessMessage('成績儲存成功！');
    closeModal('scoreRegistrationModal');
    loadScoreHistory();
}

// 載入成績歷史
function loadScoreHistory() {
    const historyContainer = document.getElementById('scoreHistory');
    const existingScores = JSON.parse(localStorage.getItem('practiceScores') || '[]');

    if (existingScores.length === 0) {
        historyContainer.innerHTML = '<p class="no-records">尚無成績記錄</p>';
        return;
    }

    const historyHTML = existingScores
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .map(score => `
            <div class="score-record">
                <div class="record-header">
                    <span class="record-date">${score.practiceDate}</span>
                    <span class="record-student">${score.studentName} (${score.studentGroup})</span>
                </div>
                <div class="record-scores">
                    ${score.magazineScore > 0 ? `<span class="score-item">雜誌練習：${score.magazineScore}分</span>` : ''}
                    ${score.spellingScore > 0 ? `<span class="score-item">拼字練習：${score.spellingScore}分</span>` : ''}
                </div>
                ${score.practiceNotes ? `<div class="record-notes">備註：${score.practiceNotes}</div>` : ''}
            </div>
        `)
        .join('');

    historyContainer.innerHTML = historyHTML;
}

// 打開成績登記模態框
function openScoreRegistration() {
    const studentName = currentStudent || '未登入學生';
    const studentGroup = students[currentStudent] ? students[currentStudent].group : '未知組別';

    document.getElementById('studentNameDisplay').textContent = studentName;
    document.getElementById('studentGroupDisplay').textContent = studentGroup;
    document.getElementById('practiceDate').value = new Date().toISOString().split('T')[0];

    openModal('scoreRegistrationModal');
    loadScoreHistory();
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function () {
    console.log('AlwaysJoy 教育平台已載入完成！');
    checkLoginStatus();
    startCountdown();
    setupTabs();
    setupModalClose();
});
