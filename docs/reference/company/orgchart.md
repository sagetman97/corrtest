# Polly Org Chart

## Metadata

| Field | Value |
| --- | --- |
| Source | `docs/reference/company/orgchart.pdf` |
| Last rebuilt | 2026-04-13 |
| Method | All 10 pages rendered + EasyOCR; hierarchy from org-chart tree order and manager/direct-report counts |
| Confidence | **High** for name/title pairs; **Medium** for a few cross-branch edges where the PDF scroll does not show the parent card |

## How to read this diagram

- **One node per person**: `Name` on the first line, job title on the second (Mermaid best practice: use `<br/>`, avoid bare commas in titles where possible).
- **Node IDs** are internal (`snake_case`); they are not shown in the rendered chart.
- **Subgraphs** group major organizations; edges define reporting lines.
- **People & Talent** reports to **Olivia Bumb, VP of People** (confirmed outside the PDF OCR export).
- **Account management / CSM subtree under Dennis Moore** is aligned to the live org chart screenshot (Dennis → Ethan → Wendy, plus Regan Kelly).

## Full org chart (every person + title)

> **Rendering tip:** If your viewer struggles with large diagrams, use Mermaid Live Editor or export SVG; Cursor preview may need zoom.

```mermaid
flowchart TB
  subgraph EXEC["Executive"]
    adam["Adam Carmel<br/>Chief Executive Officer"]
  end

  subgraph TRANS["Transformation & Customer Delivery"]
    jac["Jacquelyn Studdert<br/>EVP, Transformation"]
    marcus["Marcus Lam<br/>Senior Director, Investor Operations"]
    nic["Nic Hewett<br/>Senior Investor Operations Specialist"]
    grace["Grace Marques-Schmehl<br/>Investor Specialist"]
    brea["Breauna Carino<br/>Investor Specialist"]
    ken["Kendrick Ballom<br/>Investor Specialist"]
    erik["Erik Englerth<br/>Senior Investor Operations Specialist"]
    jess_d["Jessica Didole<br/>Associate Investor Specialist"]
    jess_c["Jessica Courtney<br/>Investor Specialist"]
    gus["Gustavo Guimaraes<br/>Associate Investor Specialist"]
    rafael["Rafael Alves de Jesus<br/>Associate Investor Specialist"]
    caio["Caio Gomes<br/>Associate Investor Specialist"]
    otavio["Otavio Ganan<br/>Associate Investor Specialist"]
    edu["Eduardo Freire<br/>Associate Investor Specialist"]
    ingrid["Ingrid Demarchi Fernandes<br/>Associate Investor Specialist"]
    gab["Gabriel Gomes<br/>Associate Investor Specialist"]
    luan["Luan Teixeira<br/>Associate Investor Specialist"]
    isa["Isabelle Tennant<br/>Technical Support Engineer Lead"]
    sean_w["Sean Welsh<br/>Investor Operations Contractor"]
    ben_awuah["Ben Awuah Jr<br/>Senior Project Manager"]
    paul_arys["Paul Arys<br/>Head of Professional Services"]
    mark_h["Mark Harper<br/>Technical Training Lead"]
    ben_g["Benjamin Gamble<br/>Technical Writer"]
    dante["Dante O'Donnell<br/>Staff Project Manager"]
    amanda_p["Amanda Pace<br/>Principal Implementation Consultant"]
    sofia["Sofia Reuber<br/>Staff Implementation Consultant, PPE"]
    maracely["Haracely Dominguez<br/>Senior Implementation Consultant, PPE"]
    ben_w["Ben Wentz<br/>Staff Implementation Consultant"]
    suzanne["Suzanne Duniphin<br/>Senior Implementation Consultant, PPE"]
    maddie["Madison Sievers<br/>Senior Implementation Consultant"]
    brandon["Brandon Case<br/>Principal Technical Consultant, PPE"]
    ziy["Ziyaad Motala<br/>Senior Customer Support Engineer"]
    emily_w["Emily Weston<br/>Senior Technical Support Engineer"]
    robby["Robby Thornton<br/>Senior Technical Support Engineer"]
    kiley["Kiley Hyde<br/>Associate Customer Support Engineer"]
    eileen["Eileen Beh<br/>Customer Support Engineer"]
    mike_p["Mike Primicias<br/>Senior Technical Support Engineer"]
    oj["OJ Smith<br/>Technical Support Engineer"]
    kat_m["Katherine Manzano<br/>Associate Customer Support Engineer"]
    owen["Owen Wilcox<br/>Senior Technical Support Engineer"]
  end

  subgraph TECH["Technology"]
    luke["Luke Braud<br/>Chief Technology Officer"]
    walter["Walter Ullon<br/>Staff Data Scientist"]
    britt["Britt Torrance<br/>Staff AI Engineer"]
    tom_d["Thomas Duffy<br/>Senior Data Engineer"]
    patrick["Patrick Hetherton<br/>VP, Infrastructure and Security"]
    zach["Zach Armstrong<br/>Staff Infrastructure Engineer"]
    derek["Derek Lam<br/>Staff Infrastructure Engineer"]
    jesse["Jesse Jablonski<br/>Senior Build and Release Engineer"]
    travis["Travis Stein<br/>IT Security Engineer"]
    davies["Davies Ilo<br/>Senior Infrastructure Engineer"]
    matt["Matt Rasmus<br/>Staff Software Engineer, Team Lead"]
    andrew_g["Andrew Graham<br/>Staff Software Engineer"]
    hugh["Hugh Cockburn<br/>Staff Software Engineer"]
    stephen_b["Stephen Beechen<br/>Staff Scalability Engineer"]
    adam_b["Adam Bolfik<br/>Senior Staff Software Engineer"]
    uzoma["Uzoma Emuchay<br/>Senior Software Engineer"]
    jackson["Jackson Dean<br/>Staff AI Engineer"]
    michael_s["Michael Standfuss<br/>Principal Software Engineer"]
    nathan["Nathan Duncan<br/>Staff Software Engineer, Team Lead"]
    andrey["Andrey Chernykh<br/>Staff Software Engineer"]
    alex["Alex Syro<br/>Senior Software Engineer"]
    karol["Karol Horosin<br/>Staff Software Engineer"]
    sam_f["Sam Farrow<br/>Senior Software Engineer"]
    krzys_f["Krzysztof Figaj<br/>Staff Software Engineer"]
    graham["Graham Huck<br/>Staff Software Engineer, Team Lead"]
    dana["Dana Ream<br/>Staff Software Engineer"]
    adam_k["Adam Kalinski<br/>Staff Software Engineer"]
    natallia_s["Natallia Sablina<br/>Senior Software Engineer"]
    shay["Shay Nissel<br/>Senior Staff Software Engineer"]
    aleks["Aleksandr Ignatov<br/>Staff Software Engineer"]
    mark_d["Mark Dellacca<br/>Principal Software Engineer"]
    simon["Simon Tekeste<br/>Software Engineer"]
    chris_r["Christopher Randin<br/>Senior Software Engineer"]
    maria["Maria Bazhlekova<br/>Senior Software Engineer"]
    salvador["Salvador Villegas Reza<br/>Senior Software Engineer"]
    krzys_gm["Krzysiek Godlewski<br/>Engineering Manager"]
    kirill["Kirill Vackevich<br/>Senior Software Engineer"]
    dumitru["Dumitru Iatenco<br/>Senior Software Engineer"]
    pawel["Pawel Drapiewski<br/>Senior Software Engineer"]
    denis["Denis Voytehovich<br/>Senior Software Engineer"]
    chris_c["Chris Corliss<br/>Staff Software Engineer, Team Lead"]
    josh_g["Joshua Goodlett<br/>Senior Software Engineer"]
    lukasz["Lukasz Balcerzak<br/>Staff Software Engineer"]
    sharukh["Sharukh Hasan<br/>Staff Software Engineer"]
    rich_b2["Richard Barnes<br/>Senior Software Engineer"]
    becky["Becky Champlin<br/>Director, Program Management"]
    manpreet["Manpreet Singh<br/>Director of Quality"]
    sabrina["Sabrina Bailey<br/>Staff SDET"]
    eli["Eli Shokeye<br/>Senior QA Engineer"]
    andrew_r["Andrew Rice<br/>Senior QA Engineer"]
    subarna["Subarna Karki<br/>Senior SDET"]
    dan_sp["Dan Saint-Pierre<br/>Senior SDET"]
    fallon["Fallon Ho<br/>Senior QA Engineer"]
    natallia_m["Natallia Mialeshka<br/>Senior QA Engineer"]
    ivan["Ivan Katsenia<br/>Senior SDET"]
    brittany["Brittany Major<br/>Senior SDET"]
  end

  subgraph FIN["Finance & Legal"]
    parag["Parag Rajpal<br/>Chief Financial Officer"]
    gary["Gary Senese<br/>Netsuite Consultant"]
    paul_y["Paul Yi<br/>Controller"]
    ranz["Ranz Alegre<br/>Staff Accountant"]
    erika["Erika Louisse San Antonio<br/>Accountant"]
    syed["Syed Jafri<br/>Accounting Lead"]
    paul_c["Paul Coury<br/>Head of Legal"]
  end

  subgraph PPL["People & Talent"]
    olivia["Olivia Bumb<br/>VP, People"]
    kyle_r["Kyle Richards<br/>Full Cycle Recruiter"]
    cheryl_p["Cheryl Perea<br/>Full Cycle Recruiter"]
    toni["Toni Schilling<br/>Full Cycle Recruiter"]
    jenly["Jenly Lin<br/>Senior People & Talent Generalist"]
    ryan_h["Ryan Harris<br/>Staff Recruiter"]
  end

  subgraph PROD["Product & Design"]
    jonathan["Jonathan Foy<br/>VP, Product Management"]
    seb["Sebastian Getman<br/>AI Solutions Manager"]
    tate["Tate-Stefan Tozer<br/>Senior Manager, Design"]
    manjari["Manjari Maheshwari<br/>Senior Product Designer"]
    ariella["Ariella Mamlin<br/>Staff Product Designer"]
    stephanie["Stephanie Li<br/>Staff Product Designer"]
    alicia["Alicia Ballard<br/>Senior Product Designer"]
    parisa["Parisa Vahdatinia<br/>Product Manager, Data & Analytics"]
    nicholas["Nicholas Wheadon<br/>Senior Product Manager"]
    cheryl_m["Cheryl Messner<br/>Group Product Manager"]
    melanie["Melanie Simmer<br/>Senior Product Manager"]
    michael_o["Michael Ouellette<br/>Senior Staff Product Manager"]
    jason["Jason Price<br/>Senior Product Manager"]
    rich_b["Rich Boesch<br/>API Integrations and Documentation Lead"]
  end

  subgraph MKT["Marketing"]
    samantha["Samantha MacKendrick<br/>VP of Marketing"]
    vivian["Vivian Chau<br/>Senior Product Marketing Manager"]
  end

  subgraph REV["Revenue"]
    john["John Levering<br/>Head of Revenue"]
    zach_b["Zachary Basile<br/>Strategic Account Director"]
    turner["Turner Jones<br/>Enterprise Account Executive"]
    sam_sav["Samantha Savinsky<br/>Enterprise Account Executive"]
    josh["Josh Cohen<br/>Enterprise Account Executive"]
    dennis["Dennis Moore<br/>Head of Account Management"]
    kathy["Kathy Porche<br/>Strategic Account Manager"]
    lance["Lance Hamilton<br/>Strategic Customer Success Manager"]
    sara["Sara McCaffrey<br/>Strategic Customer Success Manager"]
    ethan["Ethan Weber<br/>Strategic Customer Success Manager"]
    david_k["David Klotz<br/>Senior Customer Success Manager"]
    regan["Regan Kelly<br/>Senior Customer Success Manager"]
    wendy["Wendy Frost<br/>Senior Customer Success Manager"]
    james_s["James Schibli<br/>Head of Partner Development"]
    jacob["Jacob Carrillo<br/>Investor Discovery Account Executive"]
    kyle_o["Kyle Oswald<br/>Sales Development Representative"]
    chase["Chase Wallace<br/>Revenue Operations Lead"]
    sam_rock["Sam Rockwell<br/>Lead Solutions Engineer"]
  end

  adam --> jac
  adam --> luke
  adam --> parag
  adam --> jonathan
  adam --> samantha
  adam --> john
  adam --> olivia

  jac --> marcus
  marcus --> nic
  marcus --> grace
  marcus --> brea
  marcus --> ken
  marcus --> erik
  marcus --> jess_d
  marcus --> jess_c
  marcus --> gus
  marcus --> rafael
  marcus --> caio
  marcus --> otavio
  marcus --> edu
  marcus --> ingrid
  marcus --> gab
  marcus --> luan

  jac --> isa
  jac --> sean_w
  jac --> ben_awuah
  jac --> paul_arys

  paul_arys --> mark_h
  mark_h --> ben_g
  paul_arys --> dante
  paul_arys --> amanda_p
  paul_arys --> sofia
  paul_arys --> maracely
  paul_arys --> ben_w
  paul_arys --> suzanne
  paul_arys --> maddie
  paul_arys --> brandon
  paul_arys --> ziy
  paul_arys --> emily_w
  paul_arys --> robby
  paul_arys --> kiley
  paul_arys --> eileen
  paul_arys --> mike_p
  paul_arys --> oj
  paul_arys --> kat_m
  paul_arys --> owen

  luke --> walter
  luke --> britt
  luke --> tom_d
  luke --> patrick
  patrick --> zach
  patrick --> derek
  patrick --> jesse
  patrick --> travis
  patrick --> davies

  luke --> matt
  matt --> andrew_g
  matt --> hugh
  matt --> stephen_b
  matt --> adam_b

  luke --> uzoma
  luke --> jackson
  luke --> michael_s

  luke --> nathan
  nathan --> andrey
  nathan --> alex
  nathan --> karol
  nathan --> sam_f
  nathan --> krzys_f

  luke --> graham
  graham --> dana
  graham --> adam_k
  graham --> natallia_s
  graham --> shay
  graham --> aleks

  luke --> mark_d

  luke --> simon
  luke --> chris_r
  luke --> maria
  luke --> salvador

  luke --> krzys_gm
  krzys_gm --> kirill
  krzys_gm --> dumitru
  krzys_gm --> pawel
  krzys_gm --> denis

  luke --> chris_c
  chris_c --> josh_g
  chris_c --> lukasz
  chris_c --> sharukh
  chris_c --> rich_b2

  luke --> becky
  luke --> manpreet
  manpreet --> sabrina
  manpreet --> eli
  manpreet --> andrew_r
  manpreet --> subarna
  manpreet --> dan_sp
  manpreet --> fallon
  manpreet --> natallia_m
  manpreet --> ivan
  manpreet --> brittany

  parag --> gary
  parag --> paul_y
  paul_y --> ranz
  paul_y --> erika
  paul_y --> syed
  parag --> paul_c

  olivia --> kyle_r
  olivia --> cheryl_p
  olivia --> toni
  olivia --> jenly
  olivia --> ryan_h

  jonathan --> seb
  jonathan --> tate
  tate --> manjari
  tate --> ariella
  tate --> stephanie
  tate --> alicia
  jonathan --> parisa
  jonathan --> nicholas
  jonathan --> cheryl_m
  cheryl_m --> melanie
  jonathan --> michael_o
  jonathan --> jason
  jason --> rich_b

  samantha --> vivian

  john --> zach_b
  zach_b --> turner
  zach_b --> sam_sav
  zach_b --> josh
  john --> dennis
  dennis --> kathy
  dennis --> lance
  lance --> sara
  dennis --> ethan
  ethan --> david_k
  ethan --> regan
  ethan --> wendy
  john --> james_s
  james_s --> jacob
  john --> kyle_o
  john --> chase
  john --> sam_rock
```

## Title normalizations (from OCR)

| Raw OCR | Canonical title in diagram |
| --- | --- |
| `Staff Al Engineer` | Staff AI Engineer |
| `EVP; Transformation` | EVP, Transformation |
| `Senior Director; Investor Operations` | Senior Director, Investor Operations |
| `Principal Implementation Consultant; Deliv.` | Principal Implementation Consultant |
| `Eukasz Balcerzak` | Lukasz Balcerzak |
| `Al Solutions Manager` | AI Solutions Manager |
| Split `Jonathan` / `Foy` on two lines | Jonathan Foy |

## Known ambiguities

1. **Karol Horosin**: OCR shows a nickname prefix; full name kept as **Karol Horosin** with title Staff Software Engineer.

## Person count

- **146** named individuals in the diagram: **144** from the PDF OCR export, plus **Olivia Bumb** and **Regan Kelly** (titles and reporting lines confirmed from org screenshots / user verification, not present or incomplete in OCR).
