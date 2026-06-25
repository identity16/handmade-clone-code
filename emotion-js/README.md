# Emotion

[Github - `emotion-js/emotion`](https://github.com/emotion-js/emotion)


> Emotion is a library designed for writing css with JavaScript

Emotion은 JS로 CSS를 작성하는 것을 돕는 런타임 CSS-in-JS 라이브러리이다.

## Minimal Spec

스타일을 입력 받아 Class Name을 리턴하는 `@emotion/css`의 `css` 함수(일단 Object 입력만 고려)

```jsx
const classNameEmotion = css({
    color: 'hotpink',
    fontSize: 14
})

render(
  <div
    className={className}
  >
    Hover to change color.
  </div>
)
```

## Emotion `css` 동작

1. serializeStyles : 객체 -> CSS 문자열 변환 + 해시 생성
2. insertStyles : 캐시 등록 + `<style>` 태그 삽입
3. Class Name 생성 후 리턴