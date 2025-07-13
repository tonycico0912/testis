# Git 로컬과 리모트 저장소 올리는 방법

## 1. 로컬 저장소에 커밋하는 방법

1. Git 저장소 초기화
```bash
git init
```
2. 변경된 파일 추가
```bash
git add .
```
3. 커밋 생성
```bash
git commit -m "커밋 메시지"
```

---

## 2. 원격(Remote) 저장소에 올리는 방법

1. GitHub(또는 GitLab 등)에 새 저장소를 만든다.
2. 원격 저장소 등록
```bash
git remote add origin <원격저장소주소>
```
예시:
```bash
git remote add origin https://github.com/your-username/your-repo.git
```
3. 원격 저장소로 푸시(push)
```bash
git push -u origin master
```

> 만약 main 브랜치를 사용한다면 master 대신 main을 사용하세요.

---

## 3. 자주 발생하는 에러와 해결법
- 'origin' does not appear to be a git repository
  → 원격 저장소가 등록되지 않았거나 주소가 잘못됨. 위의 2번 과정 참고.
- nothing to commit (create/copy files and use "git add" to track)
  → 커밋할 파일이 없음. 파일을 추가하거나 수정 후 add/commit 필요.

---

## 4. 참고
- 원격 저장소 주소는 GitHub에서 새 저장소를 만들면 안내됨
- 최초 push 시 인증(로그인)이 필요할 수 있음 



만약 내가 C:\users\tonyc\ClaudeCode 에서  

이런 실행을 하면 그 디렉토리가 커밋되는 건가?

네, 맞습니다!
C:\Users\tonyc\ClaudeCode 폴더에서
아래와 같은 git 명령어(git add ., git commit -m "메시지")를 실행하면
ClaudeCode 폴더 안에 있는 모든 파일과 폴더(단, .gitignore에 의해 무시되는 파일 제외)가
로컬 git 저장소에 커밋됩니다.
즉,
현재 작업 중인 디렉토리(ClaudeCode)가 git 저장소의 기준이 되고
그 안의 파일들이 추적 및 커밋 대상이 됩니다.
추가로,
git add . : 현재 폴더(ClaudeCode)와 그 하위 폴더의 모든 변경/새 파일을 스테이징
git commit -m "메시지" : 스테이징된 파일을 커밋(저장)
이렇게 동작합니다.
궁금한 점 더 있으시면 언제든 질문해 주세요!