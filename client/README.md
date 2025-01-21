# Momentum v1.0.1 🗓️

<div align="center"><img src="https://github.com/user-attachments/assets/5c73d4dd-8390-4779-baa3-e8b5a48b0d05" alt="Momentum이미지" width="300"/></div>
<br>
<p align="center">배포 URL : <a href="https://momentum-wine.vercel.app" target="_blank">https://momentum-wine.vercel.app/</a></p>

## 목차
1. [소개](#소개)
2. [주요 기능](#주요-기능)
3. [설치 방법](#설치-방법)
4. [사용 방법](#사용-방법)
5. [버전 정보](#버전-정보)
6. [프로젝트 회고록 및 진행 기록 보러가기](#프로젝트-회고록-및-진행-기록-보러가기)

## 소개
<div align="center">
    <img src="https://github.com/user-attachments/assets/fc097875-07fe-4374-866b-a9e6f05c7a06" alt="main 페이지" width="45%">
    <img src="https://github.com/user-attachments/assets/49b53479-8ba9-4ee8-b9b1-0e470cca3555" alt="todo 페이지" width="45%">
</div>
<div align="center">
    <img src="https://github.com/user-attachments/assets/e71af24f-3264-4f06-8117-3436215fe84f" alt="pomodoro 페이지" width="45%">
    <img src="https://github.com/user-attachments/assets/6e868d57-071d-41e0-bdf3-50efcdef77cd" alt="gpt 페이지" width="45%">
</div>
<br>
Momentum은 Momentum Chrome 확장 프로그램의 기능을 React를 사용하여 재구현한 프로젝트입니다.<br>
이 프로젝트의 목적은 사용자가 브라우저를 열 때마다 아름다운 배경 이미지, 영감을 주는 인용문, 할 일 목록, 현재 날씨 정보 등을 표시하며,
ai가 할 일 목록에 대한 평가 및 응원 메시지를 제공하여 사용자의 일상을 더욱 활기차게 만들어주며 생산성에 도움을 주는 것입니다.
<br>

## 주요 기능
1. 일정 시간을 기준으로 바뀌는 배경 이미지
2. 현재 시간 표시
3. 현재 위치 정보를 바탕으로 날씨 정보 제공
4. 명언 제공
5. TODO LIST
6. GPT

## 설치 방법
1. GitHub 저장소를 클론합니다.
```bash
git clone https://github.com/Parkseolmin/React_Momentum.git
cd React_Momentum
```

2. `npm install` 명령어를 사용하여 의존성을 설치합니다.
```bash
npm install
```

3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, API 키를 설정합니다.
```
REACT_APP_UNSPLASH_API=your_unsplash_api_key
REACT_APP_WEATHER_API=your_openweathermap_api_key
REACT_APP_GPT_KEY=your_openweathermap_api_key
```
<br>
<br>


## 사용 방법

1. 프로젝트를 로컬 환경에서 실행합니다.
    ```bash
    npm start
    ```
2. Momentum 화면이 로드되면, 사용자는 감성적인 배경 이미지를 볼 수 있습니다. 배경 이미지는 5시간을 기준으로 변경됩니다.
   
3. 인용문은 클릭시 변경됩니다.
   
4. 사용자는 현재 위치의 날씨 정보를 확인할 수 있으며, 클릭시 정보가 갱신됩니다.
   
5. Pomodoro 타이머는 settings버튼을 통해 작업시간과 휴식시간을 정할 수 있습니다.
   
6. 사용자는 할 일 목록을 추가하고 관리할 수 있습니다.
    
7. GPT API를 이용해 할 일 목록에 작성한 내용을 기반으로 평가 및 조언을 작성해줍니다.
 - 첫 번째 버튼 - 할 일 목록에 작성한 내용을 기반
 - 두 번째 버튼 - TextArea에 작성한 내용을 기반
<br>
<br>


## 버전 정보

현재 버전: v1.0.1

향후 업데이트 계획:
- v1.0.1: 성능 최적화
  - Google Chrome의 Lighthouse를 통해 최적화 진행
  - 반응성, 접근성, SEO 최적화
  - 코드 품질 향상
  - 사용자 경험 개선
- v1.0.2: TypeScript로의 전환
  - 정적 타입 검사를 통한 코드 안정성 향상
  - 개발자 경험 개선 및 버그 감소
  - 더 나은 유지보수성과 확장성 확보
<br>
<br>

## 프로젝트 회고록 및 진행 기록 보러가기

- [ver1.0.0 Blog 글 보러가기](https://snowman-seolmini.tistory.com/70)
- [ver1.0.1 Blog 글 보러가기](https://snowman-seolmini.tistory.com/101)

