# Rezolvare fișă Access 2007 – baza de date „Florarie”

Pașii manuali (Access 2007), pentru fiecare cerință. Fotografiile sunt în folderul `poze`.

1. **Baza de date + tabele**: Office → New → Blank Database → nume `Florarie` → Create.
   - Tabelul `Plante` (Design View): IDPlanta (AutoNumber, cheie primară – clic dreapta pe rând → Primary Key), NumePlanta (Text), DataCumparare (Date/Time), Inflorire (Yes/No), Pret (Currency). Datele: trandafiri, ghiocei, zambile, ficus, lalele.
   - Tabelul `Cumparatori`: IDCumparator (AutoNumber, cheie primară), IDPlanta (Number – Long Integer), NumeFirma (Text), Localitate (Text).
2. **Validare Pret**: `Plante` în Design View → câmpul Pret → *Validation Rule*: `>=0`; *Validation Text*: „Pretul nu poate fi mai mic decat 0”.
3. **Câmp Fotografie**: Design View → rând nou → `Fotografie`, Data Type = **Attachment**.
4. **Fotografii**: Datasheet View → dublu-clic pe celula Fotografie → *Add* → alegi poza (`trandafir.png` etc.) → OK. Repetă pentru cele 5 înregistrări.
5. **Formular**: selectezi tabelul `Cumparatori` → Create → **Form**. Setări implicite. Treci în Form View și introduci 5 înregistrări (IDPlanta = 1…5, ca să existe în `Plante`). Salvezi formularul ca `Cumparatori`.
6. **Inscripție roșie**: Form în Design View → Design → **Label** (Aa) → scrii „Baza de date este creată de Nume Prenume” → Font Color = roșu.
7. **Relația**: Database Tools → **Relationships** → adaugi ambele tabele → tragi `IDPlanta` din `Plante` peste `IDPlanta` din `Cumparatori` → bifezi *Enforce Referential Integrity* → Create. (Dacă relația nu se creează, completează întâi IDPlanta cu valori existente.)
8. **Interogare**: Create → Query Design → adaugi `Plante` și `Cumparatori` → câmpuri: NumeFirma, Localitate, NumePlanta, Pret → la Localitate, rândul Criteria: `Sibiu` → salvezi ca **Plante cumparate de firme din Sibiu**.
9. **Raport**: selectezi interogarea → Create → **Report Wizard** → toate câmpurile → Next… → titlu **Firme din Sibiu**.
10. **Antet/subsol**: Report în Design View → clic dreapta pe raport → *Report Header/Footer*. În antet: Design → **Logo/Image** (pui `poze\floare.png`) + Label cu numele tău. În subsol: Text Box cu `=Date()`. Salvezi și închizi.
11. **Interogarea „Flori cumparate in luna februarie”** (dacă nu există, o creezi): Query Design pe `Plante` → câmpurile dorite, Criteria la DataCumparare: `Month([DataCumparare])=2` (într-un câmp calculat `Luna: Month([DataCumparare])` cu criteriu `2`), la Inflorire criteriul `True`, la NumePlanta *Sort* = **Ascending**.
12. **Sortare Cumparatori**: Datasheet View → clic pe săgeata coloanei NumeFirma → *Sort A to Z* → la închidere salvezi modificările.

## Scripturi automate
`Creeaza_Florarie.vbs` face toate cerințele automat: dublu-clic pe Windows cu Access instalat (editează `NUME` din script înainte). Rezultatul: `Florarie.accdb` în același folder.
