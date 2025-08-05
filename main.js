const app = document.getElementById('app');

function sendAnalyticsEvent(gaEvent, ymEvent) {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', gaEvent);
  }
  // Yandex Metrika
  if (typeof window.ym === 'function') {
    window.ym(96171108, 'reachGoal', ymEvent);
  }
}

function renderLanding() {
  // Отправляем событие просмотра экрана только один раз за сессию
  if (!sessionStorage.getItem('landingViewed')) {
    sendAnalyticsEvent('5942_page_view_kk_var2', '5942_page_view_kk_var2');
    sessionStorage.setItem('landingViewed', '1');
  }
  // Если уже была заглушка, не показываем лендинг
  if (localStorage.getItem('placeholderShown') === '1') {
    renderPlaceholder();
    return;
  }
  app.innerHTML = `
    <div class="landing">
      <img src="img/image_33.png" alt="Кредитная карта" class="credit-card-image" />
      <div class="landing__content">
        <div class="landing__title">Кредитная карта</div>
        <div class="landing__subtitle">Альфа-Банка</div>
        <div class="landing__desc">
          Наша лучшая кредитная карта 🔥
        </div>
        
        <div class="features">
          <div class="feature">
            <div class="feature__title">Бесплатный выбор даты платежа</div>
            <div class="feature__desc">выберите удобную вам дату для выставления обязательного платежа</div>
          </div>
          
          <div class="feature">
            <div class="feature__title">Бесплатное обслуживание</div>
            <div class="feature__desc">бесплатно в 1-й год, далее 990 ₽, если пользуетесь картой</div>
          </div>
          
          <div class="feature">
            <div class="feature__title">1 000 000 ₽</div>
            <div class="feature__desc">максимальный кредитный лимит</div>
          </div>
          
          <div class="feature">
            <div class="feature__title">60 дней без %</div>
            <div class="feature__desc">на любые покупки</div>
          </div>
          
          <div class="feature">
            <div class="feature__title">Кэшбэк каждый месяц</div>
            <div class="feature__desc">до 50 % за покупки у партнеров</div>
          </div>
        </div>
        
        <button class="landing__button" id="sendBtn">Оформить карту</button>
      </div>
    </div>
  `;
  document.getElementById('sendBtn').onclick = () => {
    localStorage.setItem('placeholderShown', '1');
    renderPlaceholder();
    // Очищаем историю, чтобы нельзя было вернуться назад
    history.replaceState(null, '', location.href);
  };
}

function renderPlaceholder() {
  // Отправляем событие просмотра финальной страницы только один раз за сессию
  if (!sessionStorage.getItem('endPageViewed')) {
    sendAnalyticsEvent('5942_end_page_view_kk_var2', '5942_end_page_view_kk_var2');
    sessionStorage.setItem('endPageViewed', '1');
  }
  app.innerHTML = `
    <div class="placeholder">
      <img src="img/moai.png" alt="Moai" class="placeholder__img" />
      <div class="placeholder__title">Только тссс</div>
      <div class="placeholder__desc">
        Вы поучаствовали в очень важном исследовании, которое поможет улучшить продукт. Вы – наш герой!
      </div>
    </div>
  `;
  // Очищаем историю, чтобы нельзя было вернуться назад
  history.replaceState(null, '', location.href);
}

renderLanding(); 