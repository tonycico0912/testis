# WSL 설치 및 확인 기록

## 1. WSL 설치 확인

```powershell
wsl --list --verbose
```

### 결과
```
  NAME      STATE           VERSION
* Ubuntu    Stopped         2
```
- Ubuntu 배포판이 WSL 2 버전으로 설치되어 있음

## 2. Git 저장소 초기화 및 커밋 시도

```powershell
git init
git add .
git commit -m "wsl 설치"
```

### 결과
```
Initialized empty Git repository in C:/Users/tonyc/ClaudeCode/.git/
nothing to commit (create/copy files and use "git add" to track)
```
- 추적할 파일이 없어 커밋이 되지 않음

## 참고
- WSL이 정상적으로 설치되어 있으며, Ubuntu가 WSL 2로 설정되어 있음
- Git 커밋을 하려면 추적할 파일이 필요함 