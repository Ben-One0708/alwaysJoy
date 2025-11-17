#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re
import time
import urllib.parse
import urllib.request
import sys

def get_meaning_from_dict(word):
    """從字典查詢單字意思"""
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q={urllib.parse.quote(word)}"
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and len(data) > 0 and len(data[0]) > 0:
                translation = data[0][0][0]
                return translation
    except Exception as e:
        pass
    return None

# 讀取 C 組單字作為參考
c_words_dict = {}
try:
    with open('C-vocab-review.html', 'r', encoding='utf-8') as f:
        content = f.read()
        # 提取 C 組單字
        matches = re.findall(r'\{ english: "([^"]+)", meaning: "([^"]+)", module: "([^"]+)" \}', content)
        for eng, mean, mod in matches:
            c_words_dict[eng.lower()] = mean
    print(f"從 C 組載入了 {len(c_words_dict)} 個單字作為參考", file=sys.stderr)
except:
    print("無法讀取 C 組單字", file=sys.stderr)

# 讀取 D 組單字
with open('words_d_temp.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

print(f"開始更新 {len(words)} 個單字的中文翻譯...", file=sys.stderr)

updated_count = 0
reused_count = 0
failed_words = []

for i, word in enumerate(words):
    english = word['english']
    current_meaning = word['meaning']
    
    # 檢查當前意思是否為亂碼
    has_chinese = bool(re.search(r'[\u4e00-\u9fff]', current_meaning))
    
    if not has_chinese or len(current_meaning.strip()) < 2:
        new_meaning = None
        
        # 先檢查 C 組是否有相同單字
        if english.lower() in c_words_dict:
            new_meaning = c_words_dict[english.lower()]
            reused_count += 1
            if (i + 1) % 50 == 0:
                print(f"[{i+1}/{len(words)}] 重用 C 組: {english} -> {new_meaning}", file=sys.stderr)
        else:
            # 查詢線上字典
            if (i + 1) % 20 == 0:
                print(f"[{i+1}/{len(words)}] 查詢: {english}", file=sys.stderr)
            new_meaning = get_meaning_from_dict(english)
            if new_meaning and (i + 1) % 20 == 0:
                print(f"  ✓ {english} -> {new_meaning}", file=sys.stderr)
            time.sleep(0.05)
        
        if new_meaning:
            word['meaning'] = new_meaning
            updated_count += 1
        else:
            failed_words.append(english)
            if (i + 1) % 20 == 0:
                print(f"  ✗ {english} 查詢失敗", file=sys.stderr)
    
    # 每100個單字保存一次
    if (i + 1) % 100 == 0:
        with open('words_d_updated.json', 'w', encoding='utf-8') as f:
            json.dump(words, f, ensure_ascii=False, indent=2)
        print(f"已保存進度: {i+1}/{len(words)} (更新: {updated_count}, 重用: {reused_count})", file=sys.stderr)

# 最終保存
with open('words_d_updated.json', 'w', encoding='utf-8') as f:
    json.dump(words, f, ensure_ascii=False, indent=2)

print(f"\n完成！", file=sys.stderr)
print(f"更新了 {updated_count} 個單字 (其中 {reused_count} 個從 C 組重用)", file=sys.stderr)
if failed_words:
    print(f"失敗的單字 ({len(failed_words)} 個): {', '.join(failed_words[:20])}", file=sys.stderr)

