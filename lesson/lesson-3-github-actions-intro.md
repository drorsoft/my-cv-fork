<div dir="rtl">

# שיעור 3: מבוא ל-GitHub Actions

## מה זה GitHub Actions?

**GitHub Actions** הוא כלי אוטומציה מובנה ב-GitHub המאפשר לבנות, לבדוק ולפרוס קוד ישירות מהמאגר (repository). הוא מאפשר ליצור תהליכי עבודה (workflows) אוטומטיים שמופעלים על ידי אירועים שונים כמו push, pull request ועוד.

## מושגי יסוד

- **Workflow (תהליך עבודה)** – תהליך אוטומטי מוגדר בקובץ YAML שנמצא בתיקייה `.github/workflows/`
- **Event (אירוע)** – הטריגר שמפעיל את ה-Workflow (לדוגמה: `push`, `pull_request`, `schedule`)
- **Job (משימה)** – קבוצת Steps שרצים על אותו Runner
- **Step (שלב)** – פעולה בודדת בתוך Job – יכולה להיות פקודת shell או Action מוכן
- **Action** – יחידת קוד לשימוש חוזר שניתן לשלב ב-Workflow
- **Runner** – שרת שמריץ את ה-Jobs (GitHub מספקת Runners מנוהלים)

## מבנה קובץ Workflow

```yaml
name: שם ה-Workflow

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: התקנת תלויות
        run: npm install
      - name: הרצת בדיקות
        run: npm test
```

## אירועים נפוצים

- **push** – כאשר מעלים קוד לענף
- **pull_request** – כאשר פותחים או מעדכנים Pull Request
- **schedule** – לפי לוח זמנים (cron)
- **workflow_dispatch** – הפעלה ידנית

## יתרונות GitHub Actions

- **מובנה ב-GitHub** – אין צורך בכלים חיצוניים
- **Actions קהילתיים** – שוק עצום של Actions מוכנים מהקהילה
- **חינמי** לפרויקטים ציבוריים
- **Matrix builds** – הרצת אותה עבודה על מספר סביבות במקביל
- **סביבות (Environments)** – ניהול פריסה לסביבות שונות עם אישורים

## דוגמה: CI/CD פשוט

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: פריסה לייצור
        run: echo "Deploying..."
```

## סיכום

GitHub Actions הוא כלי חזק ונוח לאוטומציה של תהליכי CI/CD ישירות מתוך GitHub. הודות לשילוב המובנה ולשוק ה-Actions הענף, ניתן להקים תהליכי אוטומציה מלאים במינימום מאמץ.

</div>
