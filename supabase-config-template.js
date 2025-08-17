// Supabase 配置模板
// 請將此文件重命名為 supabase-config.js 並填入您的實際配置

const SUPABASE_CONFIG = {
    // 請從您的Supabase項目設置中複製這些值
    // 前往: Settings > API
    PROJECT_URL: 'https://your-project-ref.supabase.co',  // 替換為您的Project URL
    ANON_KEY: 'your-anon-key-here',                       // 替換為您的anon public key

    // 可選配置
    REGION: 'ap-southeast-1',                             // 您的項目區域
    PROJECT_NAME: 'alwaysjoy-education'                   // 您的項目名稱
};

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

// 使用說明：
// 1. 將此文件重命名為 supabase-config.js
// 2. 填入您的實際Supabase項目資訊
// 3. 在HTML中引入此文件
// 4. 更新 api-supabase-client.js 使用此配置
