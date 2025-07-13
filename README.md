# ClaudeCode 폴더 GitHub 업로드 방법 (testis 저장소)

이 문서는 ClaudeCode 폴더의 모든 파일을 GitHub 저장소([https://github.com/tonycico0912/testis.git](https://github.com/tonycico0912/testis.git))에 커밋하고 푸시하는 전체 과정을 한글로 정리한 가이드입니다.

---

## 1. PowerShell(명령 프롬프트) 실행 후 ClaudeCode 폴더로 이동
```powershell
cd C:\Users\tonyc\ClaudeCode
```

## 2. git 저장소 초기화 (이미 되어 있다면 생략)
```powershell
git init
```

## 3. 모든 변경 파일 스테이징
```powershell
git add .
```

## 4. 커밋 생성
```powershell
git commit -m "ClaudeCode 전체 파일 최초 커밋"
```

## 5. 브랜치 이름을 main으로 변경 (필요시)
```powershell
git branch -M main
```

## 6. 원격 저장소 등록
이미 등록되어 있다면 아래 에러가 발생할 수 있습니다.

```
error: remote origin already exists.
```
이럴 땐 아래 명령어로 기존 origin을 삭제 후 재등록하세요.

```powershell
git remote remove origin
git remote add origin https://github.com/tonycico0912/testis.git
```

## 7. 원격 저장소로 푸시
```powershell
git push -u origin main
```

---

### 참고 및 주의사항
- push 시 GitHub 계정 인증이 필요할 수 있습니다(처음 1회).
- 위 과정을 순서대로 실행하면 ClaudeCode 폴더 전체가 testis 저장소에 업로드됩니다.
- 이미 커밋/원격 등록이 되어 있다면 마지막 push만 해도 됩니다.
- 에러 메시지가 나오면 그 내용을 복사해서 검색하거나 질문하세요!

---

문의: tonycico0912 (GitHub) 