<div dir="rtl">

# שיעור 5: הרצת בדיקות ב-GitHub Actions

## מטרת השיעור

בשיעור זה נלמד כיצד להוסיף שלב של **הרצת בדיקות (Tests)** ל-Workflow שלנו. נכיר את הכלים המרכזיים שבהם GitHub Actions משתמש: **Git** (דרך `actions/checkout`) ו-**Node.js** (דרך `actions/setup-node`), ונבין מדוע כל אחד מהם הכרחי.

---

## שלב 1: מה הבעיה?

ב-[שיעור 4](lesson-4-github-action-hello-world.md) הרצנו פקודת `echo` פשוטה. אבל כדי להריץ את הבדיקות של הפרויקט שלנו, אנחנו צריכים:

1. **לגשת לקוד** – ה-Runner מתחיל כסביבה ריקה לחלוטין ואין לו את קוד הפרויקט
2. **להתקין Node.js** – ה-Runner צריך את סביבת Node.js כדי להריץ את הבדיקות
3. **להתקין תלויות** – צריך להתקין את חבילות ה-npm שהפרויקט תלוי בהן
4. **להריץ את הבדיקות** – להפעיל את פקודת `npm test`

---

## שלב 2: יצירת קובץ ה-Workflow

צרו קובץ חדש בשם `run-tests.yml` בתיקיית `.github/workflows/`:

```yaml
name: Run Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

---

## שלב 3: הסבר מפורט של הכלים

### 🔧 כלי Git – `actions/checkout@v4`

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

#### מה זה עושה?

ה-Action הזה **מוריד את קוד הפרויקט** (מבצע `git clone` ו-`git checkout`) לתוך מכונת ה-Runner.

#### למה צריך את זה?

ה-Runner של GitHub הוא **מכונה ריקה** שמוקמת מחדש בכל ריצה. הוא אינו יודע דבר על הפרויקט שלכם. ה-Action הזה מביא את הקוד מה-Repository כדי שיהיה זמין לשאר הצעדים.

#### מה קורה מאחורי הקלעים?

1. GitHub Action מתחבר לשרתי GitHub
2. מוריד את הקוד של ה-commit הנוכחי
3. מציב אותו בתיקיית העבודה של ה-Runner
4. כעת כל הקבצים של הפרויקט זמינים

#### הדגמה: מה יקרה בלעדיו?

אם תנסו להריץ `npm install` **בלי** שלב ה-checkout, תקבלו שגיאה כי קובץ `package.json` לא קיים:

```
npm error enoent ENOENT: no such file or directory, open 'package.json'
```

#### אפשרויות מתקדמות:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0        # הורדת כל ההיסטוריה (ברירת המחדל: commit אחרון בלבד)
    ref: my-branch        # checkout לענף ספציפי
    submodules: true      # הורדת submodules גם כן
```

---

### 🟢 כלי Node.js – `actions/setup-node@v4`

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'
```

#### מה זה עושה?

ה-Action הזה **מתקין ומגדיר את סביבת Node.js** על ה-Runner.

#### למה צריך את זה?

למרות ש-Runners של GitHub מגיעים עם Node.js מותקן כברירת מחדל, שימוש ב-`actions/setup-node` מאפשר:

1. **קביעת גרסה מדויקת** – לוודא שהפרויקט רץ על הגרסה שבדקתם
2. **שמירת cache** – חיסכון בזמן על ידי שמירת תיקיית `node_modules` בין ריצות
3. **עקביות** – כל ריצה משתמשת באותה גרסת Node.js

#### הפרמטר `node-version: 20`

קובע שנרצה להשתמש ב-**Node.js גרסה 20** (LTS). ניתן לציין:
- `20` – גרסה ראשית (major)
- `20.11.1` – גרסה מדויקת
- `lts/*` – גרסת LTS האחרונה

#### הפרמטר `cache: 'npm'`

מפעיל **שמירת cache** עבור תלויות npm. זה עובד כך:

1. GitHub שומר את תיקיית `~/.npm` בין ריצות
2. בריצה הבאה, אם `package-lock.json` לא השתנה – מוריד מה-cache במקום מהאינטרנט
3. **חוסך דקות** בכל ריצה!

#### השוואה: עם ובלי cache

| מצב | זמן התקנת תלויות (בערך) |
|-----|------------------------|
| בלי cache | ~60 שניות |
| עם cache | ~5 שניות |

---

## שלב 4: שלבי ה-`run` – פקודות Shell

### `npm install`

```yaml
- name: Install dependencies
  run: npm install
```

מתקין את כל התלויות המוגדרות ב-`package.json`. ניתן גם להשתמש ב-`npm ci` שהוא מהיר יותר ומתאים יותר לסביבות CI:

```yaml
- name: Install dependencies
  run: npm ci
```

ההבדל בין `npm install` ל-`npm ci`:
- `npm install` – יכול לעדכן `package-lock.json`
- `npm ci` – תמיד משתמש ב-`package-lock.json` ולא משנה אותו (מהיר יותר, מתאים ל-CI)

### `npm test`

```yaml
- name: Run tests
  run: npm test
```

מריץ את סקריפט ה-`test` המוגדר ב-`package.json`:

```json
{
  "scripts": {
    "test": "vitest --run"
  }
}
```

במקרה שלנו, זה מריץ את **Vitest** – כלי בדיקות מהיר ומודרני.

---

## שלב 5: הוספת טריגר ל-Pull Request

שימו לב שהוספנו טריגר נוסף:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

- **`push`** – הבדיקות רצות בכל `push` ל-`main`
- **`pull_request`** – הבדיקות רצות גם כשפותחים Pull Request!

זה חשוב מאוד: כך ניתן לדעת **לפני** שמאחדים (merge) קוד, האם הבדיקות עוברות.

---

## שלב 6: העלאת הקוד ל-GitHub

```bash
git add .github/workflows/run-tests.yml
git commit -m "Add workflow to run tests"
git push origin main
```

---

## שלב 7: צפייה בתוצאות

לאחר ה-push, כנסו לטאב **Actions** ב-GitHub. תראו את ה-Workflow **"Run Tests"** רץ. לחצו עליו וראו:

```
✅ Checkout repository
✅ Set up Node.js
✅ Install dependencies
✅ Run tests
```

אם הבדיקות עברו בהצלחה, כל הצעדים יסומנו בירוק ✅.

אם בדיקה נכשלת, תראו ❌ ואת הפלט המלא של השגיאה, לדוגמה:

```
FAIL tests/smoke.test.ts
  × adds 1 + 2 to equal 3

AssertionError: expected 2 to be 3
```

---

## שלב 8: הוספת Status Badge (אופציונלי)

ניתן להוסיף תג (badge) ל-`README.md` שמציג את סטטוס הבדיקות:

```markdown
![Run Tests](https://github.com/octocat/hello-world/actions/workflows/run-tests.yml/badge.svg)
```

החליפו `octocat/hello-world` בשם המשתמש ושם המאגר שלכם.

הוא יציג:
- ![passing](https://img.shields.io/badge/tests-passing-brightgreen) כאשר הבדיקות עוברות
- ![failing](https://img.shields.io/badge/tests-failing-red) כאשר יש כשל

---

## סיכום

בשיעור זה למדנו:

- ✅ מדוע צריך את `actions/checkout` – להורדת קוד הפרויקט ל-Runner הריק
- ✅ מדוע צריך את `actions/setup-node` – להתקנת Node.js בגרסה הנכונה עם cache
- ✅ ההבדל בין `npm install` ל-`npm ci` בהקשר של CI
- ✅ כיצד להוסיף טריגר ל-Pull Request לבדיקת קוד לפני merge
- ✅ כיצד לצפות בתוצאות הבדיקות ב-GitHub Actions

### זרימת הנתונים בתוך ה-Workflow:

```
GitHub Repository
      ↓ (actions/checkout)
  Runner מקבל את הקוד
      ↓ (actions/setup-node)
  Node.js מותקן + cache טעון
      ↓ (npm install / npm ci)
  תלויות מותקנות
      ↓ (npm test)
  בדיקות רצות → ✅ / ❌
```

</div>
