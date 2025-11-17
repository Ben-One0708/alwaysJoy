#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re

# 讀取 E-vocab-review.html 作為模板
with open('E-vocab-review.html', 'r', encoding='utf-8') as f:
    template = f.read()

# 讀取更新後的 F 組單字
with open('words_f_updated.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

# 生成單字陣列 JavaScript 代碼
words_js = "const words = [\n"
for word in words:
    # 轉義特殊字符
    english = word['english'].replace('\\', '\\\\').replace("'", "\\'").replace('"', '\\"')
    meaning = word['meaning'].replace('\\', '\\\\').replace("'", "\\'").replace('"', '\\"')
    module = word['module']
    words_js += f'            {{ english: "{english}", meaning: "{meaning}", module: "{module}" }},\n'

words_js += "        ];"

# 替換模板中的內容
# 1. 替換標題
template = template.replace('E組必讀單字複習', 'F組必讀單字複習')
template = template.replace('1~13冊必背應用字彙', '1~16冊必背應用字彙')

# 2. 替換單字陣列
start_idx = template.find('const words = [')
if start_idx != -1:
    end_idx = template.find('];', start_idx) + 2
    template = template[:start_idx] + words_js + template[end_idx:]

# 3. 替換 localStorage key
template = template.replace("const STORAGE_KEY = 'E_vocab_learned';", "const STORAGE_KEY = 'F_vocab_learned';")

# 寫入新文件
with open('F-vocab-review.html', 'w', encoding='utf-8') as f:
    f.write(template)

print(f"已生成 F-vocab-review.html，包含 {len(words)} 個單字")

