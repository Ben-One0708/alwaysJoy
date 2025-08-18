// 批量修正vocabulary quiz頁面的百分比計算
const fs = require('fs');
const path = require('path');

const files = [
    'vocabulary_quiz_part3.html',
    'vocabulary_quiz_full.html'
];

files.forEach(filename => {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');

        // 修正所有百分比計算
        content = content.replace(
            /percentage: Math\.round\(\(score \/ totalQuestions\) \* 100\)/g,
            'percentage: 0, // 讓API客戶端重新計算'
        );

        fs.writeFileSync(filename, content, 'utf8');
        console.log(`✅ 已修正 ${filename}`);
    } else {
        console.log(`❌ 找不到文件 ${filename}`);
    }
});

console.log('🎉 所有vocabulary quiz頁面的百分比計算已修正！');
