// Supabase 配置
const SUPABASE_CONFIG = {
    PROJECT_URL: 'https://cxdsefblkadblxzhddga.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZHNlZmJsa2FkYmx4emhkZGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNTU1ODgsImV4cCI6MjA3MDkzMTU4OH0.Q_xlceGEBytHRc5zD2dgIlu-5Y8RIE9cJUD9Uvqo0z4',
    REGION: 'ap-southeast-1',
    PROJECT_NAME: 'alwaysjoy-education'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
