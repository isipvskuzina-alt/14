# Краткий ответ на задания

---

## 1️⃣ ПСЕВДОКЛАССЫ

### 📌 **:hover** — при наведении мыши

```css
.button:hover {
    background: #5a4bd1;
    transform: scale(1.05);
}

.card:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

a:hover {
    color: red;
    text-decoration: underline;
}
```

**Когда использовать:** Кнопки, ссылки, карточки, элементы меню.

---

### 📌 **:focus** — когда элемент в фокусе

```css
input:focus {
    outline: none;
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
}

button:focus {
    outline: 2px solid #6c5ce7;
    outline-offset: 2px;
}

a:focus {
    background: #f0f0f0;
}
```

**Когда использовать:** Поля ввода, кнопки, ссылки — улучшение доступности.

---

### 📌 **:nth-child()** — выбор по порядковому номеру

```css
/* Чётные элементы */
li:nth-child(even) {
    background: #f8f9fa;
}

/* Нечётные элементы */
li:nth-child(odd) {
    background: white;
}

/* Каждый третий элемент */
li:nth-child(3n) {
    border-left: 3px solid #6c5ce7;
}

/* Первый элемент */
li:first-child {
    font-weight: bold;
}

/* Последний элемент */
li:last-child {
    border-bottom: none;
}

/* Второй элемент */
li:nth-child(2) {
    color: #6c5ce7;
}
```

**Синтаксис:** `nth-child(an+b)`

| Формула | Какие элементы |
|---------|----------------|
| `even` | 2, 4, 6, 8... |
| `odd` | 1, 3, 5, 7... |
| `2n` | 2, 4, 6, 8... |
| `2n+1` | 1, 3, 5, 7... |
| `3n` | 3, 6, 9, 12... |
| `3n+1` | 1, 4, 7, 10... |
| `n+2` | 2, 3, 4, 5... |
| `-n+3` | 3, 2, 1 |

**Когда использовать:** Стилизация списков, таблиц, сеток, зебровые строки.

---

### 📌 **:not()** — исключение

```css
/* Все кнопки, кроме .disabled */
button:not(.disabled) {
    cursor: pointer;
}

/* Все элементы списка, кроме последнего */
li:not(:last-child) {
    border-bottom: 1px solid #eee;
}

/* Все input, кроме submit */
input:not([type="submit"]) {
    width: 100%;
}

/* Все параграфы, кроме .no-style */
p:not(.no-style) {
    font-size: 16px;
}
```

**Когда использовать:** Исключение элементов с определённым классом или атрибутом.

---

### 📌 **Комбинации псевдоклассов**

```css
/* Первый элемент, если он не .hidden */
li:first-child:not(.hidden) {
    background: #e8f5e9;
}

/* Чётные элементы при наведении */
li:nth-child(even):hover {
    background: #f0f0f0;
}

/* Поле ввода в фокусе и валидное */
input:focus:valid {
    border-color: #27ae60;
}

/* Карточка при наведении, но не .disabled */
.card:not(.disabled):hover {
    transform: scale(1.05);
}
```

---

### 📌 **Сравнительная таблица**

| Псевдокласс | Когда применяется | Пример |
|-------------|-------------------|--------|
| `:hover` | При наведении мыши | `button:hover` |
| `:focus` | В фокусе | `input:focus` |
| `:active` | При нажатии | `button:active` |
| `:first-child` | Первый дочерний | `li:first-child` |
| `:last-child` | Последний дочерний | `li:last-child` |
| `:nth-child()` | По порядку | `li:nth-child(odd)` |
| `:not()` | Исключение | `div:not(.hidden)` |
| `:checked` | Выбранный чекбокс | `input:checked` |
| `:disabled` | Отключённый | `input:disabled` |

---

## 2️⃣ ЧТО ТАКОЕ JSX?

### 📌 **Что такое JSX?**

**JSX** (JavaScript XML) — это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код внутри JavaScript.

```jsx
// JSX
const element = <h1>Привет, мир!</h1>;

// Трансформируется в JavaScript
const element = React.createElement('h1', null, 'Привет, мир!');
```

**Создан:** Facebook для React (2013)

---

### 📌 **JSX vs HTML — основные отличия**

| Характеристика | **HTML** | **JSX** |
|----------------|----------|---------|
| **Язык** | Разметка | JavaScript |
| **Атрибут class** | `class` | `className` |
| **Атрибут for** | `for` | `htmlFor` |
| **Стили** | Строка `"color: red"` | Объект `{{ color: 'red' }}` |
| **События** | `onclick` | `onClick` |
| **Комментарии** | `<!-- -->` | `{/* */}` |
| **JavaScript** | ❌ Нельзя вставлять | ✅ Можно через `{}` |
| **Самозакрывающиеся** | `<img>` | `<img />` |
| **Атрибуты** | Все строчные | camelCase (`data-id` → `data-id`) |

---

### 📌 **Пример сравнения**

**HTML:**
```html
<div class="container">
    <h1>Привет!</h1>
    <p style="color: red;">Текст</p>
    <button onclick="alert('Hi')">Нажми</button>
    <img src="image.jpg" alt="Изображение">
</div>
```

**JSX:**
```jsx
<div className="container">
    <h1>Привет!</h1>
    <p style={{ color: 'red' }}>Текст</p>
    <button onClick={() => alert('Hi')}>Нажми</button>
    <img src="image.jpg" alt="Изображение" />
</div>
```

---

### 📌 **JavaScript внутри JSX**

```jsx
// Переменная
const name = 'Иван';
const element = <h1>Привет, {name}!</h1>;

// Выражения
const element = <h1>Сумма: {2 + 2}</h1>;

// Условный рендеринг
const element = (
    <div>
        {isLoggedIn ? <h1>Добро пожаловать!</h1> : <h1>Войдите</h1>}
    </div>
);

// Списки
const items = ['Яблоко', 'Банан'];
const list = (
    <ul>
        {items.map(item => <li key={item}>{item}</li>)}
    </ul>
);
```

---

### 📌 **Атрибуты в JSX**

```jsx
// class → className
<div className="container"></div>

// for → htmlFor
<label htmlFor="email">Email</label>

// Стили — объект (camelCase)
<div style={{ color: 'red', fontSize: '16px' }}></div>

// События — camelCase
<button onClick={handleClick}>Клик</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit} />

// data-атрибуты
<div data-id="123" data-user="ivan"></div>

// Булевые атрибуты
<input disabled={true} />
<button disabled={false}>Активна</button>
```

---

### 📌 **Почему JSX?**

| Преимущество | Описание |
|--------------|----------|
| **Декларативный** | Описываем интерфейс, а не как его построить |
| **Компонентный** | Переиспользование кода |
| **JavaScript** | Полная мощность языка |
| **Интуитивный** | Похож на HTML |
| **Типизация** | Помогает отлавливать ошибки |

---

### 📌 **Где используется JSX**

- ✅ React / React Native
- ✅ Vue (с опциональной поддержкой)
- ✅ Preact
- ✅ Solid.js

---

### 📌 **Пример компонента с JSX**

```jsx
function UserCard({ name, age, isAdmin }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Возраст: {age}</p>
            {isAdmin && <span className="badge">👑 Админ</span>}
            <button onClick={() => console.log('Привет!')}>
                Сказать привет
            </button>
        </div>
    );
}
```

---

## 🎯 Шпаргалка

### Псевдоклассы

| Псевдокласс | Применение |
|-------------|------------|
| `:hover` | Наведение мыши |
| `:focus` | Фокус на элементе |
| `:nth-child()` | По порядку в родителе |
| `:not()` | Исключение элементов |

### JSX vs HTML

| **HTML** | **JSX** |
|----------|---------|
| `class` | `className` |
| `onclick` | `onClick` |
| `style="color: red"` | `style={{ color: 'red' }}` |
| `<!-- коммент -->` | `{/* коммент */}` |
| Нет переменных | `{переменная}` |