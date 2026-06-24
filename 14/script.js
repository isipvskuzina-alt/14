// ========================================
// 1. ДАННЫЕ
// ========================================

let blockedSites = [];

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const sitesContainer = document.getElementById('sitesContainer');
const siteUrl = document.getElementById('siteUrl');
const blockTime = document.getElementById('blockTime');
const addBtn = document.getElementById('addBtn');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadSites() {
    try {
        const saved = localStorage.getItem('blockedSites');
        if (saved) {
            blockedSites = JSON.parse(saved);
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

function saveSites() {
    try {
        localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ========================================
// 4. ОБНОВЛЕНИЕ ТАЙМЕРОВ
// ========================================

function updateTimers() {
    let hasChanges = false;
    const now = Date.now();

    blockedSites.forEach(site => {
        if (site.blockedUntil && now > site.blockedUntil) {
            site.blockedUntil = null;
            site.isBlocked = false;
            hasChanges = true;
        }
    });

    if (hasChanges) {
        saveSites();
    }
    renderSites();
}

// ========================================
// 5. РЕНДЕРИНГ
// ========================================

function renderSites() {
    if (blockedSites.length === 0) {
        sitesContainer.innerHTML = `
            <div class="empty">
            
                <p>Нет заблокированных сайтов</p>
                <p style="font-size:13px;color:#dfe6e9;">Добавьте сайт для блокировки</p>
            </div>
        `;
        return;
    }

    let html = '';
    const now = Date.now();

    blockedSites.forEach((site, index) => {
        const isBlocked = site.isBlocked && site.blockedUntil > now;
        let timeLeft = '';
        
        if (isBlocked) {
            const minutesLeft = Math.ceil((site.blockedUntil - now) / 60000);
            timeLeft = `⏱ ${minutesLeft} мин.`;
        } else {
            timeLeft = ' Не заблокирован';
        }

        const statusClass = isBlocked ? 'active' : 'inactive';
        const statusText = isBlocked ? ' Заблокирован' : '🟢 Активен';

        html += `
            <div class="site-item">
                <div class="site-info">
                    <div class="site-url">🌐 ${escapeHtml(site.url)}</div>
                    <div class="site-time">
                        <span class="time-left">${timeLeft}</span>
                        <span style="color:#b2bec3;margin:0 5px;">|</span>
                        Блокировка: ${site.blockTime} мин.
                    </div>
                </div>
                <span class="site-status ${statusClass}">${statusText}</span>
                <button class="delete-btn" onclick="deleteSite(${index})">✕</button>
            </div>
        `;
    });

    sitesContainer.innerHTML = html;
}

// ========================================
// 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// 7. ДОБАВЛЕНИЕ САЙТА
// ========================================

function addSite() {
    let url = siteUrl.value.trim().toLowerCase();
    const time = parseInt(blockTime.value);

    // Валидация
    if (!url) {
        alert('Введите адрес сайта!');
        siteUrl.focus();
        return;
    }

    // Удаляем http://, https://, www.
    url = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    
    // Удаляем всё после первого слеша
    const slashIndex = url.indexOf('/');
    if (slashIndex > -1) {
        url = url.substring(0, slashIndex);
    }

    if (!url) {
        alert('Введите корректный адрес сайта!');
        siteUrl.focus();
        return;
    }

    if (!time || time < 1) {
        alert('Введите корректное время блокировки!');
        blockTime.focus();
        return;
    }

    // Проверка на дубликат
    if (blockedSites.some(s => s.url === url)) {
        alert('Этот сайт уже добавлен!');
        siteUrl.focus();
        return;
    }

    // Создаём запись
    const site = {
        id: Date.now().toString(),
        url: url,
        blockTime: time,
        blockedUntil: Date.now() + time * 60000,
        isBlocked: true,
        createdAt: new Date().toISOString()
    };

    blockedSites.push(site);
    saveSites();
    renderSites();
    siteUrl.value = '';
    siteUrl.focus();

    console.log(` Добавлен сайт: ${url} (блокировка ${time} мин.)`);
}

// ========================================
// 8. УДАЛЕНИЕ САЙТА
// ========================================

function deleteSite(index) {
    if (!confirm('Удалить сайт из списка?')) return;
    
    const url = blockedSites[index].url;
    blockedSites.splice(index, 1);
    saveSites();
    renderSites();
    
    console.log(` Удалён сайт: ${url}`);
}

// ========================================
// 9. ФОНТ ДЛЯ БЛОКИРОВКИ
// ========================================

function startBackgroundTimer() {
    setInterval(updateTimers, 30000); // Обновляем каждые 30 секунд
}

// ========================================
// 10. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log(' Запуск блокировщика сайтов');

    // Загружаем данные
    loadSites();

    // Обновляем таймеры
    updateTimers();

    // Запускаем фоновое обновление
    startBackgroundTimer();

    console.log(` Загружено сайтов: ${blockedSites.length}`);

    // Обработчики
    addBtn.addEventListener('click', addSite);

    // Добавление по Enter
    siteUrl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            blockTime.focus();
        }
    });

    blockTime.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSite();
        }
    });

    console.log(' Блокировщик готов!');
}

// ========================================
// 11. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);

// ========================================
// 12. ПРИМЕРЫ ПСЕВДОКЛАССОВ (для справки)
// ========================================

console.log('=== ПСЕВДОКЛАССЫ ===');

// :hover - при наведении
console.log(':hover - при наведении мыши');

// :focus - в фокусе
console.log(':focus - когда элемент в фокусе');

// :nth-child() - по порядку
console.log(':nth-child(odd) - нечётные');
console.log(':nth-child(even) - чётные');
console.log(':nth-child(3n) - каждый третий');

// :not() - исключение
console.log(':not(.class) - исключая класс');

console.log(' Псевдоклассы применены в стилях!');