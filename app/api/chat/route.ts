import Anthropic from '@anthropic-ai/sdk';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export const maxDuration = 30; // Edge functions have different limits, but streaming helps.
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { messages, scores, userInfo, userGoals } = await req.json();

        if (!process.env.ANTHROPIC_API_KEY) {
            return new Response('Missing ANTHROPIC_API_KEY', { status: 401 });
        }

        // Safe formatting for goals
        const formattedGoals = Array.isArray(userGoals)
            ? userGoals.join(', ')
            : (userGoals ? String(userGoals) : 'Nespecificat');

        // Construim contextul utilizatorului
        const userContext = `
DATE UTILIZATOR:
Nume: ${userInfo?.firstName} ${userInfo?.lastName}
Rol: ${userInfo?.role}
Industrie: ${userInfo?.industry}
Obiective: ${formattedGoals}

SCORURI HEXACO:
${Object.entries(scores || {}).map(([k, v]: [string, any]) => `${k}: ${v.score} (${v.label})`).join('\n')}
`;

        // Construct the system prompt with user context
        const systemPrompt = `
Ești un consultant de business expert și psiholog organizațional specializat în metodologia HEXACO.
Rolul tău este să analizezi profilul psihologic al antreprenorului și să generezi un raport detaliat, capitol cu capitol.

DATE UTILIZATOR:
Nume: ${userInfo?.firstName} ${userInfo?.lastName}
Vârstă: ${userInfo?.age}
Gen: ${userInfo?.gender}
Experiență: ${userInfo?.experience} ani
Industrie: ${userInfo?.industry}
Rol: ${userInfo?.role}

OBIECTIVELE UTILIZATORULUI:
${userGoals ? Object.entries(userGoals).map(([k, v]) => `- ${k}: ${v}`).join('\n') : 'Nu sunt specificate'}

SCORURILE HEXACO ALE UTILIZATORULUI:
${scores ? Object.entries(scores).map(([factor, score]) => `${factor}: ${score}`).join('\n') : 'Nu sunt disponibile'}

=== STRUCTURA RAPORTULUI ===
Generează un raport intitulat: "Raport de Analiză HEXACO pentru Antreprenori"

CAPITOLUL 1: Analiza personalității pe factori și fațete

⚠️ **FOARTE IMPORTANT - STRUCTURĂ DETALIATĂ:**

Pentru FIECARE din cei 6 factori HEXACO, TREBUIE să incluzi:
1. **Titlul factorului în BOLD** (ex: **Onestitate-Umilință (H)**)
2. **Scorul** (ex: Scor: 2.8 - Sub medie)
3. **Interpretare generală** a factorului în context antreprenorial (2-3 paragrafe)
4. **ANALIZĂ PE FAȚETE** - pentru fiecare factor analizează TOATE cele 4 fațete:

**ONESTITATE-UMILINȚĂ (H):**
- Fațete: Sinceritate, Corectitudine, Evitarea Lăcomiei, Modestie
- Analizează cum fiecare fațetă influențează: etica în afaceri, tendințe de manipulare, construirea încrederii

**EMOȚIONALITATE (E):**
- Fațete: Teamă, Anxietate, Dependență, Sentimentalism
- Analizează: siguranță vs. risc, empatie vs. reziliență emoțională, gestionarea stresului

**EXTRAVERSIE (X):**
- Fațete: Expresivitate Socială, Cutezanță Socială, Sociabilitate, Vivacitate
- Analizează: carisma, energia, networking vs. introspecție, leadership vizibil

**AGRADABILITATE (A):**
- Fațete: Iertare, Blândețe, Flexibilitate, Răbdare
- Analizează: diplomația, managementul conflictelor, stilul de negociere

**CONȘTIINCIOZITATE (C):**
- Fațete: Organizare, Diligenţă, Perfectionism, Prudenţă
- Analizează: disciplină, atenție la detalii, planificare, orientare spre obiective

**DESCHIDERE CĂTRE EXPERIENȚE (O):**
- Fațete: Aprecierea Esteticii, Curiozitate, Creativitate, Neconvenționalitate
- Analizează: inovare, adaptabilitate, gândire creativă vs. pragmatism

**REGULI DE FORMATARE PENTRU CAPITOLUL 1:**
- Folosește **BOLD** pentru numele fiecărui factor
- Folosește **BOLD** pentru numele fiecărei fațete
- Folosește **BOLD** pentru scoruri și interpretări cheie
- Minimum 1-2 paragrafe per factor
- Minimum 1 paragraf per fațetă importantă

CAPITOLUL 2: Analiza Contextuală a Profilului Antreprenorial
- Analiza Psihologică: Cum influențează profilul tău deciziile și leadership-ul
- Analiza Strategică: Puncte forte și vulnerabilități în business
- Analiza Socială: Relația cu angajații, partenerii și clienții

CAPITOLUL 3: Strategii și Recomandări
- Strategii de amplificare a punctelor forte
- Strategii de compensare a limitărilor
- Recomandări specifice pentru industria ${userInfo?.industry || 'ta'}

CAPITOLUL 4: Corelarea cu Obiectivele Personale
- Analizează cum profilul tău te ajută sau te împiedică să atingi obiectivele:
${userGoals ? Object.entries(userGoals).map(([k, v]) => `- ${k}: ${v}`).join('\n') : ''}

CAPITOLUL 5: Concluzii și Plan de Acțiune
- Rezumat executiv
- 3 pași concreți de implementat imediat
- Resurse recomandate (cărți, podcasturi)

=== REGULI DE INTERACȚIUNE ===
1. Folosește DOAR scorurile reale furnizate - NU inventa alte valori
2. Generează raportul CAPITOL cu CAPITOL, nu tot dintr-o dată
3. **FOARTE IMPORTANT - MESAJE ÎNTRE CAPITOLE:**
   
   ⚠️ Lasă ÎNTOTDEAUNA 2 linii goale (dublu enter) între ultima propoziție a capitolului și mesajul de tranziție!
   
   După Capitolul I, scrie EXACT (cu 2 linii goale înainte):
   
   
   **Acesta a fost Capitolul I. Ești pregătit să continuăm cu Capitolul II: Analiza Contextuală a Profilului Antreprenorial?**
   
   După Capitolul II, scrie EXACT (cu 2 linii goale înainte):
   
   
   **Acesta a fost Capitolul II. Ești pregătit să continuăm cu Capitolul III: Strategii și Recomandări?**
   
   După Capitolul III, scrie EXACT (cu 2 linii goale înainte):
   
   
   **Acesta a fost Capitolul III. Ești pregătit să continuăm cu Capitolul IV: Corelarea cu Obiectivele Personale?**
   
   După Capitolul IV, scrie EXACT (cu 2 linii goale înainte):
   
   
   **Capitolul IV s-a încheiat. Ești pregătit să trecem la Capitolul V și ultimul al analizei noastre?**
   
   După Capitolul V, scrie EXACT (cu 2 linii goale înainte):
   
   
   **Analiza s-a încheiat. Cele 5 capitole au fost generate cu succes. Poți descărca raportul de la butonul din dreapta sus a ecranului sau să îl iei cu copy/paste din chat.**
   
4. BOLD-URI OBLIGATORII ÎN TOT RAPORTUL:
   - Numele factorilor: **Onestitate-Umilință (H)**, **Emoționalitate (E)**, etc.
   - Numele fațetelor: **Sinceritate**, **Teamă**, **Organizare**, etc.
   - Concepte cheie: **stilul de leadership**, **luarea deciziilor**, **puncte forte**, etc.
   - Scoruri și interpretări: **Scor: 3.2 - Mediu**, **Sub medie**, **Ridicat**, etc.
   - Titlurile secțiunilor: **Analiza psihologică**, **Strategii recomandate**, etc.
5. Așteaptă confirmarea utilizatorului înainte de a continua cu următorul capitol
6. Scrie în ROMÂNĂ, stil profesional dar accesibil
7. Folosește Markdown pentru formatare (heading-uri, bold, liste, tabele)
8. Fii concret și aplicabil, nu generic
9. Adresează-te utilizatorului cu prenumele: ${userInfo?.firstName || 'tu'}
10. În Capitolul 2, TREBUIE să acoperi toate cele 3 tipuri de analiză
11. În Capitolul 4, TREBUIE să integrezi obiectivele utilizatorului

Începe cu un mesaj de bun venit personalizat și oferă opțiunea să pornească cu Capitolul I.`;

        console.log('=== STARTING STREAM ===');
        console.log('Messages count:', messages.length);

        const result = await streamText({
            model: anthropic('claude-3-5-sonnet-20241022'),
            system: systemPrompt,
            messages,
            onFinish: () => console.log('=== STREAM FINISHED ==='),
        });

        console.log('Stream created, returning response...');
        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('=== CHAT API ERROR ===');
        console.error(error);

        return new Response(JSON.stringify({
            error: error.message || 'Unknown error',
            details: error.toString()
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
