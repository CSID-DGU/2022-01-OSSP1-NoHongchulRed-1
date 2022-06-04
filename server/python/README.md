# Python Settings

## 기본 설명

파이썬 가상환경 사용 매뉴얼입니다. 모든 명령은 프로젝트 디렉토리 최상위 경로에서 실행합니다.

## 기능별 사용 방법

### 가상 환경 생성

`python -m venv .venv`

프로젝트 폴더에 .venv 파이썬 가상 환경을 생성합니다. 처음 한 번만 하면 됩니다.

### 가상 환경 활성화

`call .venv/Scripts/activate`

.venv 파이썬 가상 환경을 활성화합니다. 앞으로 추천 시스템 테스트를 위해서는 npm run dev를 하기 전에 파이썬 가상 환경을 활성화한 후 진행해주시면 됩니다.

### 파이썬 모듈 설치

`pip install -r requirements.txt`

npm 모듈 설치하는 것과 같습니다. 처음 한 번 하고 변동사항 없으면 안해도 됩니다. 변동사항은 requirements.txt에서 확인할 수 있습니다.

### 가상 환경 종료

`deactivate`

가상 환경을 종료하고 일반 cmd 환경으로 돌아갑니다.
