#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import PyPDF2
import re
import json
import sys

def extract_text_from_pdf(pdf_path):
    """從PDF提取文字"""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"讀取PDF時發生錯誤: {e}", file=sys.stderr)
        return None
    return text

def parse_words_from_text(text):
    """從文字中解析單字"""
    words = []
    lines = text.split('\n')
    
    i = 0
    current_english = None
    
    while i < len(lines):
        line = lines[i].strip()
        
        # 跳過空行
        if not line:
            i += 1
            continue
            
        # 跳過標題、頁碼等
        if (line.startswith('第') or line.startswith('頁') or 
            'Magic Joy' in line or 'Word Bank' in line or
            (line.isdigit() and len(line) < 3)):
            i += 1
            continue
        
        # 檢查是否為單個大寫字母（A-Z章節標題）
        if len(line) == 1 and line.isupper():
            i += 1
            continue
        
        # 匹配模組格式: M 1-6 或 M1-6 或 M7-13
        module_match = re.search(r'M\s*(\d+)\s*-\s*(\d+)', line)
        
        if module_match:
            # 這一行包含模組信息
            module = f"M{module_match.group(1)}-{module_match.group(2)}"
            
            # 提取模組之前的部分
            before_module = line[:module_match.start()].strip()
            
            # 如果之前有累積的英文單字，使用它
            if current_english:
                meaning = before_module
                english = current_english
                current_english = None
            else:
                # 嘗試找到英文和中文的分界點
                english_end = 0
                for j, char in enumerate(before_module):
                    if ord(char) > 127:
                        if char in ' \t':
                            continue
                        english_end = j
                        break
                    english_end = j + 1
                
                if english_end > 0:
                    english = before_module[:english_end].strip()
                    meaning = before_module[english_end:].strip()
                else:
                    # 如果找不到分界，嘗試用空格分割
                    parts = before_module.split(None, 1)
                    if len(parts) >= 2:
                        english = parts[0]
                        meaning = parts[1]
                    elif len(parts) == 1:
                        if i > 0 and lines[i-1].strip():
                            prev_line = lines[i-1].strip()
                            if re.match(r'^[a-zA-Z\s\-\'\.\?\!]+$', prev_line):
                                english = prev_line + ' ' + parts[0]
                                meaning = before_module
                            else:
                                english = parts[0]
                                meaning = prev_line
                        else:
                            i += 1
                            continue
                    else:
                        i += 1
                        continue
            
            # 驗證英文部分
            if english and re.match(r'^[a-zA-Z\s\-\'\.\?\!]+$', english):
                english = english.strip()
                meaning = meaning.strip() if meaning else ""
                
                # 跳過只有單個字母的條目（除非是 'a' 或 'i'）
                if len(english) == 1 and english.lower() not in ['a', 'i']:
                    i += 1
                    continue
                
                if english and meaning:
                    words.append({
                        'english': english,
                        'meaning': meaning,
                        'module': module
                    })
        else:
            # 這一行可能只是英文單字，檢查下一行是否有模組
            if re.match(r'^[a-zA-Z\s\-\'\.\?\!]+$', line) and len(line.split()) <= 5:
                if i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    if re.search(r'M\s*(\d+)\s*-\s*(\d+)', next_line):
                        current_english = line
        
        i += 1
    
    return words

if __name__ == '__main__':
    pdf_path = 'Magic Joy 1~16 字表A-Z (20250305).pdf'
    print(f"正在讀取PDF: {pdf_path}", file=sys.stderr)
    
    text = extract_text_from_pdf(pdf_path)
    if text is None:
        sys.exit(1)
    
    print(f"提取的文字長度: {len(text)} 字元", file=sys.stderr)
    
    words = parse_words_from_text(text)
    
    print(f"\n找到 {len(words)} 個單字", file=sys.stderr)
    
    # 輸出為JSON格式
    print(json.dumps(words, ensure_ascii=False, indent=2))

