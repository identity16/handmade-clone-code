const hashString = (value) => {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(index);
        hash |= 0;
    }

    return Math.abs(hash).toString(36);
};

const toKebabCase = (property) => {
    return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

/**
 * @param {key: string} key - 스타일 태그의 data-emotion 속성 값, Class Name Prefix
 * @returns {css: (styles: Object) => string} - 스타일 객체를 입력 받아 Class Name을 리턴하는 css 함수
 */
export const createEmotion = ({ key = 'emotion' } = {}) => {
    const cache = new Map();

    const serializeStyles = (styles) => {
        // 스타일 객체 => CSS 문자열
        const style = Object.entries(styles)
            .map(([property, value]) => `${toKebabCase(property)}: ${typeof value === 'number' ? `${value}px` : value};`)
            .join('\n');

        // 해시 생성
        const name = hashString(style);
        
        return { name, style };
    };

    const insertStyles = ({ name, style }) => {
        // `<style>` 태그 생성 후 스타일 코드 삽입
        const styleTag = document.createElement('style');
        styleTag.textContent = `.${key}-${name} {\n${style}\n}`;
        document.head.appendChild(styleTag);
    };

    const css = (styles) => {
        // 1. Serialize Styles
        const serializedStyles = serializeStyles(styles);
        const className = `${key}-${serializedStyles.name}`;

        // 2. Check Cache
        if (cache.has(serializedStyles.name)) {
            return cache.get(serializedStyles.name);
        }

        // 3. Insert Styles
        insertStyles({name: serializedStyles.name, style: serializedStyles.style});
        cache.set(serializedStyles.name, className);

        // 4. Return Class Name
        return className;
    };

    return { css };
};