<div dir="rtl">

# שיעור 4: בניית GitHub Action ראשון – Hello World

## מטרת השיעור

בשיעור זה נלמד כיצד ליצור GitHub Action פשוט שמדפיס "Hello World" למסך. זהו הצעד הראשון להבנת איך בונים תהליכי אוטומציה ב-GitHub.

---

## שלב 1: הבנת המבנה הבסיסי

כל GitHub Action מוגדר בקובץ **YAML** שנמצא בתיקייה מיוחדת בפרויקט:

```
.github/
  workflows/
    hello-world.yml
```

- **`.github/`** – תיקייה מיוחדת שמזוהה על ידי GitHub
- **`workflows/`** – תיקייה בתוכה כל קבצי ה-Workflows
- **`hello-world.yml`** – שם הקובץ שלנו (ניתן לבחור כל שם)

---

## שלב 2: יצירת התיקיות הנדרשות

בטרמינל של הפרויקט, הריצו:

```bash
mkdir -p .github/workflows
```

הפקודה `mkdir -p` יוצרת את התיקייה כולל כל תיקיות הביניים הנדרשות.

---

## שלב 3: יצירת קובץ ה-Workflow

צרו קובץ חדש בשם `hello-world.yml` בתוך תיקיית `.github/workflows/`:

```yaml
name: Hello World

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: הדפסת Hello World
        run: echo "Hello World"
```

---

## שלב 4: הסבר מפורט של כל שורה

### `name: Hello World`

שם ה-Workflow. השם הזה יופיע בממשק של GitHub בטאב **Actions**. בחרו שם תיאורי שמסביר מה ה-Workflow עושה.

---

### `on:`

קטע זה מגדיר **מתי** ה-Workflow יופעל. זהו ה"טריגר" – האירוע שגורם לתהליך להתחיל.

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

- **`push`** – ה-Workflow יופעל בכל פעם שמעלים קוד (`git push`) לענף `main`
- **`branches: - main`** – מגביל את ה-Workflow רק לענף `main` (ולא לכל ענף אחר)
- **`workflow_dispatch`** – מאפשר להפעיל את ה-Workflow **ידנית** דרך ממשק GitHub

---

### `jobs:`

קטע זה מגדיר את **המשימות** שה-Workflow יריץ. ניתן להגדיר מספר Jobs שירוצו במקביל או בסדר מסוים.

```yaml
jobs:
  say-hello:
```

- **`say-hello`** – שם ה-Job שהגדרנו. שם זה חייב להיות ייחודי בתוך ה-Workflow.

---

### `runs-on: ubuntu-latest`

מגדיר על **איזה Runner** (שרת) ירוץ ה-Job.

- **`ubuntu-latest`** – שרת לינוקס עדכני (Ubuntu) שמנוהל על ידי GitHub
- GitHub מספקת Runners חינמיים עם Ubuntu, Windows ו-macOS
- כל ריצה מתחילה מסביבה נקייה ורעננה

---

### `steps:`

רשימת **הצעדים** שיבוצעו ב-Job, בסדר מלמעלה למטה.

```yaml
steps:
  - name: הדפסת Hello World
    run: echo "Hello World"
```

- **`name`** – שם הצעד שיוצג בממשק GitHub (לא חובה, אך מומלץ)
- **`run`** – פקודת shell שתרוץ על ה-Runner

---

### `echo "Hello World"`

זוהי פקודת shell בסיסית שמדפיסה טקסט למסוף (stdout).

- **`echo`** – פקודה להדפסת טקסט
- **`"Hello World"`** – הטקסט שיודפס

---

## שלב 5: העלאת הקוד ל-GitHub

לאחר יצירת הקובץ, שמרו אותו והעלו ל-GitHub:

```bash
git add .github/workflows/hello-world.yml
git commit -m "Add Hello World GitHub Action"
git push origin main
```

---

## שלב 6: צפייה בתוצאות

1. כנסו לדף המאגר ב-GitHub
2. לחצו על הטאב **Actions** בסרגל הניווט העליון
3. תראו את ה-Workflow **"Hello World"** ברשימה
4. לחצו עליו כדי לראות את הריצה האחרונה
5. לחצו על ה-Job **"say-hello"**
6. פתחו את הצעד **"הדפסת Hello World"**
7. תראו את הפלט:

```
Hello World
```

---

## שלב 7: הפעלה ידנית

מכיוון שהגדרנו `workflow_dispatch`, ניתן להפעיל את ה-Workflow גם ידנית:

1. לכו לטאב **Actions**
2. בחרו את ה-Workflow **"Hello World"**
3. לחצו על הכפתור **"Run workflow"**
4. בחרו את הענף ולחצו **"Run workflow"** שוב

---

## הרחבות אפשריות

לאחר שהבנתם את הבסיס, ניתן להרחיב את ה-Action:

```yaml
steps:
  - name: הדפסת הודעת ברכה
    run: echo "Hello World! הריצה הצליחה 🎉"

  - name: הדפסת מידע על הסביבה
    run: |
      echo "מערכת הפעלה: $(uname -s)"
      echo "שם המשתמש: $(whoami)"
      echo "תאריך ושעה: $(date)"
```

- ניתן לכתוב מספר פקודות תחת `run` באמצעות `|` (block scalar – בלוק טקסט ב-YAML)
- כל פקודה תרוץ בנפרד ותציג את הפלט שלה

---

## סיכום

בשיעור זה למדנו:

- ✅ כיצד ליצור את מבנה התיקיות הנכון (`.github/workflows/`)
- ✅ כיצד לכתוב קובץ Workflow בסיסי בפורמט YAML
- ✅ מה המשמעות של כל שדה: `name`, `on`, `jobs`, `runs-on`, `steps`, `run`
- ✅ כיצד להגדיר טריגרים (push ו-workflow_dispatch)
- ✅ כיצד לצפות בתוצאות ב-GitHub Actions
- ✅ כיצד להפעיל Workflow ידנית

GitHub Actions הוא כלי רב עוצמה, ו-Hello World הוא רק ההתחלה!

</div>
