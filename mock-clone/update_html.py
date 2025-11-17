#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re

# 讀取更新後的單字
with open('words_d_updated.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

# 讀取 HTML 文件
with open('D-vocab-review.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 生成新的單字陣列 JavaScript 代碼
words_js = "const words = [\n"
for word in words:
    # 轉義特殊字符
    english = word['english'].replace('\\', '\\\\').replace("'", "\\'").replace('"', '\\"')
    meaning = word['meaning'].replace('\\', '\\\\').replace("'", "\\'").replace('"', '\\"')
    module = word['module']
    words_js += f'            {{ english: "{english}", meaning: "{meaning}", module: "{module}" }},\n'

words_js += "        ];"

# 替換單字陣列
start_idx = html_content.find('const words = [')
if start_idx != -1:
    end_idx = html_content.find('];', start_idx) + 2
    html_content = html_content[:start_idx] + words_js + html_content[end_idx:]

# 寫入更新後的 HTML
with open('D-vocab-review.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"已更新 D-vocab-review.html，包含 {len(words)} 個單字")

