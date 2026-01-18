# Налаштування домену в Resend

Щоб Resend міг надсилати листи від імені вашої пошти (наприклад, `info@yourdomain.com`), вам не обов'язково мати фізичну поштову скриньку. Вам достатньо лише володіти доменом.

## Крок за кроком для Resend:

1. **Зайдіть у Resend Dashboard**
   - Відкрийте https://resend.com/
   - Перейдіть у розділ **Domains**

2. **Додайте свій домен**
   - Натисніть кнопку **Add Domain**
   - Введіть ваш домен (наприклад: `yourdomain.com`)

3. **Скопіюйте DKIM записи**
   - Resend надасть вам **3 записи DKIM** (DomainKeys Identified Mail)
   - Ці записи потрібно додати в ваш DNS

4. **Додайте записи в DNS**
   - Зайдіть туди, де ви купували домен (або на Cloudflare, якщо використовуєте Cloudflare DNS)
   - Додайте 3 TXT записи, які надав Resend
   - Зазвичай це записи типу:
     ```
     Name: _resend.domainkey
     Type: TXT
     Value: [скопійоване значення від Resend]
     ```

5. **Перевірте домен в Resend**
   - Після додавання записів в DNS, натисніть кнопку **Verify** в Resend Dashboard
   - Перевірка може зайняти до кількох хвилин (чекайте поки DNS оновиться)

6. **Налаштуйте змінну середовища**
   - Додайте в `.env` файл:
     ```
     RESEND_FROM_EMAIL="Tesla VIP Trip <info@yourdomain.com>"
     ```
   - Замініть `info@yourdomain.com` на вашу адресу
   - Формат: `"Ім'я <email@domain.com>"` або просто `"email@domain.com"`

7. **Оновіть змінні середовища в Vercel**
   - Перейдіть у Vercel Dashboard > Settings > Environment Variables
   - Додайте `RESEND_FROM_EMAIL` з вашим email адресом
   - Зробіть redeploy проекту

## Важливо:

- **Не потрібно створювати поштову скриньку** - Resend використовує DKIM для автентифікації
- Листи будуть надходити отримувачам **навіть якщо ви не створили саму поштову скриньку** для входу
- Після верифікації домену ви можете використовувати будь-яку адресу на цьому домені (наприклад: `info@`, `noreply@`, `booking@`, тощо)

## Приклад конфігурації:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL="Tesla VIP Trip <info@yourdomain.com>"
```

## Документація Resend:

- Офіційна документація: https://resend.com/docs/dashboard/domains/introduction
- DKIM налаштування: https://resend.com/docs/dashboard/domains/verify-domain

