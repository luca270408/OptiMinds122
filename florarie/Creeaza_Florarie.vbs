' ============================================================
'  Creeaza_Florarie.vbs  -  construieste baza de date Florarie.accdb
'  Necesita Windows + Microsoft Access 2007 (sau mai nou).
'  Dublu-click pe acest fisier; baza se creeaza in acelasi folder.
'  Folderul "poze" (cu imaginile) trebuie sa ramana langa script.
' ============================================================
Option Explicit

Const NUME = "Nume Prenume"      ' <-- scrie aici numele tau (cerintele 6 si 10)

Dim fso, folder, dbPath, pozePath
Set fso = CreateObject("Scripting.FileSystemObject")
folder = fso.GetParentFolderName(WScript.ScriptFullName)
dbPath = folder & "\Florarie.accdb"
pozePath = folder & "\poze\"

If fso.FileExists(dbPath) Then fso.DeleteFile dbPath, True

Dim app, db, td, fld, rs, rs2, rel, qd, i
Set app = CreateObject("Access.Application")
app.Visible = False
On Error Resume Next
app.DoCmd.SetWarnings False
On Error GoTo 0

' ---------- Cerinta 1: baza de date + tabele ----------
app.NewCurrentDatabase dbPath          ' .accdb = format Access 2007
Set db = app.CurrentDb

db.Execute "CREATE TABLE Plante (IDPlanta COUNTER PRIMARY KEY, NumePlanta TEXT(50), " & _
           "DataCumparare DATETIME, Inflorire YESNO, Pret CURRENCY)"
db.Execute "CREATE TABLE Cumparatori (IDCumparator COUNTER PRIMARY KEY, IDPlanta LONG, " & _
           "NumeFirma TEXT(50), Localitate TEXT(50))"

' ---------- Cerinta 2: regula de validare pentru Pret ----------
Set td = db.TableDefs("Plante")
td.Fields("Pret").ValidationRule = ">=0"
td.Fields("Pret").ValidationText = "Pretul nu poate fi mai mic decat 0."

' ---------- Cerinta 3: camp Fotografie (Atasament = tip 101) ----------
Set fld = td.CreateField("Fotografie", 101)
td.Fields.Append fld
db.TableDefs.Refresh

' ---------- Cerinta 7: relatia Plante (1) - Cumparatori (infinit) pe IDPlanta ----------
Set rel = db.CreateRelation("PlanteCumparatori", "Plante", "Cumparatori", 0)
Set fld = rel.CreateField("IDPlanta")
fld.ForeignName = "IDPlanta"
rel.Fields.Append fld
db.Relations.Append rel

' ---------- Cerinta 4: 5 inregistrari in Plante + fotografii ----------
db.Execute "INSERT INTO Plante (NumePlanta, DataCumparare, Inflorire, Pret) VALUES ('Trandafiri', #2/10/2025#, True, 15.5)"
db.Execute "INSERT INTO Plante (NumePlanta, DataCumparare, Inflorire, Pret) VALUES ('Ghiocei', #2/18/2025#, True, 3)"
db.Execute "INSERT INTO Plante (NumePlanta, DataCumparare, Inflorire, Pret) VALUES ('Zambile', #3/5/2025#, True, 8)"
db.Execute "INSERT INTO Plante (NumePlanta, DataCumparare, Inflorire, Pret) VALUES ('Ficus', #1/20/2025#, False, 45)"
db.Execute "INSERT INTO Plante (NumePlanta, DataCumparare, Inflorire, Pret) VALUES ('Lalele', #2/25/2025#, True, 12)"

Dim poze
poze = Array("trandafir.png", "ghiocel.png", "zambila.png", "ficus.png", "lalea.png")
Set rs = db.OpenRecordset("SELECT * FROM Plante ORDER BY IDPlanta")
i = 0
Do While Not rs.EOF
    rs.Edit
    Set rs2 = rs.Fields("Fotografie").Value
    rs2.AddNew
    rs2.Fields("FileData").LoadFromFile pozePath & poze(i)
    rs2.Update
    rs2.Close
    rs.Update
    rs.MoveNext
    i = i + 1
Loop
rs.Close

' ---------- Cerinta 5 (date): 5 inregistrari in Cumparatori ----------
db.Execute "INSERT INTO Cumparatori (IDPlanta, NumeFirma, Localitate) VALUES (1, 'Floraria Sibiu SRL', 'Sibiu')"
db.Execute "INSERT INTO Cumparatori (IDPlanta, NumeFirma, Localitate) VALUES (2, 'Verde Garden SRL', 'Brasov')"
db.Execute "INSERT INTO Cumparatori (IDPlanta, NumeFirma, Localitate) VALUES (3, 'Flora Grup SRL', 'Sibiu')"
db.Execute "INSERT INTO Cumparatori (IDPlanta, NumeFirma, Localitate) VALUES (4, 'Casa Plantelor SA', 'Cluj-Napoca')"
db.Execute "INSERT INTO Cumparatori (IDPlanta, NumeFirma, Localitate) VALUES (5, 'Floris Expert SRL', 'Sibiu')"

' ---------- Cerinta 8: interogarea "Plante cumparate de firme din Sibiu" ----------
Set qd = db.CreateQueryDef("Plante cumparate de firme din Sibiu", _
    "SELECT Cumparatori.NumeFirma, Cumparatori.Localitate, Plante.NumePlanta, Plante.Pret " & _
    "FROM Plante INNER JOIN Cumparatori ON Plante.IDPlanta = Cumparatori.IDPlanta " & _
    "WHERE Cumparatori.Localitate = 'Sibiu';")
qd.Close

' ---------- Cerinta 11: interogarea "Flori cumparate in luna februarie" ----------
' (varianta initiala: toate plantele cumparate in februarie)
Set qd = db.CreateQueryDef("Flori cumparate in luna februarie", _
    "SELECT Plante.NumePlanta, Plante.DataCumparare, Plante.Inflorire, Plante.Pret " & _
    "FROM Plante WHERE Month(Plante.DataCumparare) = 2;")
' ... modificata conform cerintei 11: doar plantele inflorite, ordonate crescator dupa nume
qd.SQL = "SELECT Plante.NumePlanta, Plante.DataCumparare, Plante.Inflorire, Plante.Pret " & _
         "FROM Plante WHERE Month(Plante.DataCumparare) = 2 AND Plante.Inflorire = True " & _
         "ORDER BY Plante.NumePlanta ASC;"
qd.Close

' ---------- Cerinta 12: sortare Cumparatori crescator dupa NumeFirma ----------
Set td = db.TableDefs("Cumparatori")
td.Properties.Append td.CreateProperty("OrderBy", 10, "Cumparatori.NumeFirma")
td.Properties.Append td.CreateProperty("OrderByOn", 1, True)
db.TableDefs.Refresh

' ---------- Cerinta 5 + 6: formularul Cumparatori + inscriere rosie ----------
Dim frm, frmTmp, ctl, fields, t
fields = Array("IDCumparator", "IDPlanta", "NumeFirma", "Localitate")
Set frm = app.CreateForm()
frmTmp = frm.Name
frm.RecordSource = "Cumparatori"
For i = 0 To 3
    Set ctl = app.CreateControl(frmTmp, 109, 0, "", fields(i), 2600, 400 + i * 600, 3600, 330)
Next
Set ctl = app.CreateControl(frmTmp, 100, 0, "", "", 400, 400 + 4 * 600 + 200, 7000, 400)
ctl.Caption = "Baza de date este creat" & ChrW(259) & " de " & NUME
ctl.ForeColor = 255              ' rosu = RGB(255,0,0)
ctl.FontBold = True
ctl.FontSize = 12
ctl.Name = "InscriereRosie"
app.DoCmd.Save 2, frmTmp
app.DoCmd.Close 2, frmTmp, 1
app.DoCmd.Rename "Cumparatori", 2, frmTmp

' ---------- Cerintele 9 + 10: raportul "Firme din Sibiu" ----------
Dim rpt, rptTmp, lbl, hdrOk
Dim colF, colW, colL
colF = Array("NumeFirma", "Localitate", "NumePlanta", "Pret")
colW = Array(3000, 2200, 2500, 1400)
Set rpt = app.CreateReport()
rptTmp = rpt.Name
rpt.RecordSource = "Plante cumparate de firme din Sibiu"

' antet / subsol de raport (RunCommand acCmdReportHdrFtr = 31)
hdrOk = True
On Error Resume Next
Err.Clear
t = rpt.Section(1).Height
If Err.Number <> 0 Then hdrOk = False
Err.Clear
On Error GoTo 0
If Not hdrOk Then app.RunCommand 31

Dim x
x = 0
For i = 0 To 3
    Set ctl = app.CreateControl(rptTmp, 109, 0, "", colF(i), x, 60, colW(i), 300)
    ' sterge eticheta atasata (o refacem in antetul paginii)
    On Error Resume Next
    app.DeleteControl rptTmp, ctl.Controls(0).Name
    On Error GoTo 0
    Set lbl = app.CreateControl(rptTmp, 100, 3, "", "", x, 60, colW(i), 300)
    lbl.Caption = colF(i)
    lbl.FontBold = True
    x = x + colW(i)
Next
rpt.Section(0).Height = 420
rpt.Section(3).Height = 450

' antetul raportului: imagine cu o floare + numele
Set ctl = app.CreateControl(rptTmp, 103, 1, "", "", 0, 60, 1500, 1500)
ctl.Picture = pozePath & "floare.png"
ctl.SizeMode = 3
Set ctl = app.CreateControl(rptTmp, 100, 1, "", "", 1800, 500, 5000, 500)
ctl.Caption = NUME
ctl.FontSize = 16
ctl.FontBold = True
rpt.Section(1).Height = 1650

' subsolul raportului: data curenta
Set ctl = app.CreateControl(rptTmp, 109, 2, "", "=Date()", 0, 60, 2500, 330)
ctl.Format = "Short Date"
On Error Resume Next
app.DeleteControl rptTmp, ctl.Controls(0).Name
On Error GoTo 0
rpt.Section(2).Height = 500

app.DoCmd.Save 3, rptTmp
app.DoCmd.Close 3, rptTmp, 1
app.DoCmd.Rename "Firme din Sibiu", 3, rptTmp

app.CloseCurrentDatabase
app.Quit
MsgBox "Baza de date a fost creata:" & vbCrLf & dbPath, 64, "Florarie"
