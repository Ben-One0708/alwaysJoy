#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re
import time
import urllib.parse
import urllib.request
from html import unescape

def translate_word(word):
    """使用 Google Translate 或其他服務查詢單字"""
    try:
        # 使用 Google Translate 的公開 API（非官方，可能有限制）
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q={urllib.parse.quote(word)}"
        
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and len(data) > 0 and len(data[0]) > 0:
                translation = data[0][0][0]
                return translation
    except Exception as e:
        print(f"查詢 {word} 時出錯: {e}", file=sys.stderr)
    
    return None

def get_meaning_from_dict(word):
    """從字典查詢單字意思"""
    # 嘗試多個來源
    meanings = []
    
    # 方法1: Google Translate
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q={urllib.parse.quote(word)}"
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and len(data) > 0 and len(data[0]) > 0:
                translation = data[0][0][0]
                meanings.append(translation)
    except:
        pass
    
    return meanings[0] if meanings else None

if __name__ == '__main__':
    import sys
    import os
    
    # 讀取單字列表
    with open('words_d_temp.json', 'r', encoding='utf-8') as f:
        words = json.load(f)
    
    # 檢查是否有進度文件
    progress_file = 'update_progress.json'
    start_idx = 0
    if os.path.exists(progress_file):
        with open(progress_file, 'r', encoding='utf-8') as f:
            progress = json.load(f)
            start_idx = progress.get('last_index', 0)
            print(f"從第 {start_idx + 1} 個單字繼續...", file=sys.stderr)
    
    print(f"開始更新 {len(words)} 個單字的中文翻譯...", file=sys.stderr)
    
    updated_count = 0
    failed_words = []
    
    try:
        for i in range(start_idx, len(words)):
            word = words[i]
            english = word['english']
            current_meaning = word['meaning']
            module = word['module']
            
            # 檢查當前意思是否為亂碼（不包含中文字符或太短）
            has_chinese = bool(re.search(r'[\u4e00-\u9fff]', current_meaning))
            
            if not has_chinese or len(current_meaning.strip()) < 2:
                # 需要查詢新翻譯
                if (i + 1) % 10 == 0:
                    print(f"[{i+1}/{len(words)}] 查詢: {english}", file=sys.stderr)
                
                new_meaning = get_meaning_from_dict(english)
                
                if new_meaning:
                    word['meaning'] = new_meaning
                    updated_count += 1
                    if (i + 1) % 10 == 0:
                        print(f"  ✓ {english} -> {new_meaning}", file=sys.stderr)
                else:
                    failed_words.append(english)
                    if (i + 1) % 10 == 0:
                        print(f"  ✗ {english} 查詢失敗", file=sys.stderr)
                
                # 避免請求過快
                time.sleep(0.05)
            
            # 每50個單字保存一次進度
            if (i + 1) % 50 == 0:
                with open(progress_file, 'w', encoding='utf-8') as f:
                    json.dump({'last_index': i + 1}, f)
                with open('words_d_updated.json', 'w', encoding='utf-8') as f:
                    json.dump(words, f, ensure_ascii=False, indent=2)
                print(f"已保存進度: {i+1}/{len(words)}", file=sys.stderr)
    
    except KeyboardInterrupt:
        print("\n中斷，已保存進度", file=sys.stderr)
    
    # 最終保存
    with open('words_d_updated.json', 'w', encoding='utf-8') as f:
        json.dump(words, f, ensure_ascii=False, indent=2)
    
    # 清理進度文件
    if os.path.exists(progress_file):
        os.remove(progress_file)
    
    print(f"\n完成！", file=sys.stderr)
    print(f"更新了 {updated_count} 個單字", file=sys.stderr)
    if failed_words:
        print(f"失敗的單字 ({len(failed_words)} 個): {', '.join(failed_words[:10])}", file=sys.stderr)

