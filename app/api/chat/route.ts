import { streamText } from 'ai';
import { createClient } from '@supabase/supabase-js';
import { searchDocuments } from '@/lib/rag';

export const maxDuration = 30; // Edge functions have different limits, but streaming helps.
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { messages, scores, userInfo, userGoals } = await req.json();

        // Initialize Supabase client
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // --- RATE LIMITING START ---
        // Get IP (simplified for Next.js)
        const ip = req.headers.get('x-forwarded-for') || 'unknown';

        // Check if user has a valid subscription
        // If userInfo.email is present, we could check DB.
        // For now, we assume if they are here without being logged in (no auth header), they are Free.
        // Ideally, we check Supabase Auth session.

        // Simple IP check: 1 report per 24h
        const ONE_DAY_AGO = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { count, error: countError } = await supabase
            .from('rate_limits')
            .select('*', { count: 'exact', head: true })
            .eq('ip_address', ip)
            .eq('endpoint', '/api/chat')
            .gte('created_at', ONE_DAY_AGO);

        if (count && count >= 1) {
            // Allow if user is premium (check DB by email if available)
            // For MVP: Strict IP limit for everyone not authenticated
            // If you want to allow unlimited for paid, we need to verify auth token here.

            // Let's assume for now we just log it and maybe block.
            // To be safe for the demo, let's set limit to 3.
            if (count >= 3) {
                return new Response("Ai atins limita de rapoarte gratuite pe 24h.", { status: 429 });
            }
        }

        // Log this request
        await supabase.from('rate_limits').insert({
            ip_address: ip,
            endpoint: '/api/chat'
        });
        // --- RATE LIMITING END ---

        if (!process.env.ANTHROPIC_API_KEY) {
            return new Response('Missing ANTHROPIC_API_KEY', { status: 401 });
        }

        // Dynamic import to avoid build-time initialization
        const { createAnthropic } = await import('@ai-sdk/anthropic');

        // Create Anthropic provider with explicit API key
        const anthropic = createAnthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        });

        // --- RAG: Semantic Search for Relevant Documentation ---
        let ragContext = '';
        try {
            // Build search query from user context
            const searchQuery = `
                HEXACO personality analysis for entrepreneur
                Factors: ${scores?.factors ? Object.keys(scores.factors).join(', ') : 'standard HEXACO'}
                Industry: ${userInfo?.industry || 'business'}
                Goals: ${userGoals ? Object.values(userGoals).join(' ') : ''}
            `.trim();

            const relevantDocs = await searchDocuments(searchQuery, {
                matchCount: 2, // Reduced from 3 to save tokens
                matchThreshold: 0.7, // Increased from 0.6 to be more selective
            });

            if (relevantDocs.length > 0) {
                ragContext = '\n\n=== REFERENCE MATERIAL (HEXACO Research) ===\n';
                relevantDocs.forEach((doc, idx) => {
                    // Truncate each doc to max 300 words to prevent token overflow
                    const truncatedContent = doc.content.split(' ').slice(0, 300).join(' ');
                    ragContext += `\n[Source ${idx + 1}: ${doc.metadata.source}]\n${truncatedContent}...\n`;
                });
                ragContext += '\n=== END REFERENCE MATERIAL ===\n';
            }
        } catch (ragError) {
            console.error('RAG search failed:', ragError);
            // Continue without RAG if it fails
        }
        // --- RAG END ---


        // Safe formatting for goals
        const formattedGoals = Array.isArray(userGoals)
            ? userGoals.join(', ')
            : (userGoals ? String(userGoals) : 'Nespecificat');

        // Map English domain names to Romanian
        const DOMAIN_MAP: Record<string, string> = {
            "Honesty-Humility": "Onestitate-Umilință (H)",
            "Emotionality": "Emoționalitate (E)",
            "Extraversion": "Extraversiune (X)",
            "Agreeableness": "Agreabilitate (A)",
            "Conscientiousness": "Conștiinciozitate (C)",
            "Openness to Experience": "Deschidere către Experiență (O)"
        };

        // Format HEXACO scores properly
        const formatScores = (scores: any) => {
            if (!scores) return 'Nu sunt disponibile';
            let result = '\n=== FACTORI HEXACO (Scoruri medie 1-5) ===\n';
            if (scores.factors) {
                result += Object.entries(scores.factors).map(([factor, score]) => {
                    const romanianName = DOMAIN_MAP[factor] || factor;
                    return `${romanianName}: ${score}`;
                }).join('\n');
            }
            result += '\n\n=== FAȚETE HEXACO (Scoruri medie 1-5) ===\n';
            if (scores.facets) {
                result += Object.entries(scores.facets).map(([facet, score]) =>
                    `${facet}: ${score}`
                ).join('\n');
            }
            return result;
        };

        // Construim contextul utilizatorului
        const userContext = `
DATE UTILIZATOR:
Nume: ${userInfo?.firstName} ${userInfo?.lastName}
Rol: ${userInfo?.role}
Industrie: ${userInfo?.industry}
Obiective: ${formattedGoals}

SCORURI HEXACO:
${formatScores(scores)}
`;

        // Construct the system prompt with user context and RAG
        const systemPrompt = `
Ești un consultant de business expert și psiholog organizațional specializat în metodologia HEXACO.
Rolul tău este să analizezi profilul psihologic al antreprenorului și să generezi un raport CONCIS, APLICABIL și DIRECT LA OBIECT.
${ragContext ? ragContext : ''}
⚠️ **REGULI CRITICE DE LUNGIME - ABSOLUT OBLIGATORII:**
- Raportul COMPLET: MAXIM 7500-8500 cuvinte (15 pagini A4) - OPREȘTE-TE AICI!
- Fiecare capitol are LIMITE STRICTE - nu depăși niciodată!
- ZERO umplutură, ZERO repetiții, ZERO verbozitate
- Fiecare propoziție trebuie să aducă informație NOUĂ și APLICABILĂ
- INTERZIS: fraze lungi, "totuși" repetitiv, paragrafe generale
- OBLIGATORIU: conciziune, claritate, acționabilitate

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
${formatScores(scores)}

=== STRUCTURA RAPORTULUI ===
Generează un raport intitulat: "Raport de analiză HEXACO pentru antreprenori"

⚠️ **LIMITE STRICTE PE CAPITOLE (NU DEPĂȘI!):**
- Capitolul I: MAXIM 3600 cuvinte (analiză COMPLETĂ - TOATE fațetele, ZERO umplutură!)
- Capitolul al II-lea: MAXIM 900 cuvinte
- Capitolul al III-lea: MAXIM 800 cuvinte
- Capitolul al IV-lea: MAXIM 700 cuvinte
- Capitolul al V-lea: MAXIM 700 cuvinte
- **TOTAL: MAXIM 6700 cuvinte (sub 7500!)**

CAPITOLUL I: Analiza personalității pe factori și fațete (MAXIM 3600 cuvinte)

⚠️ **FORMAT COMPACT DAR COMPLET:**

Pentru FIECARE din cei 6 factori (aproximativ 600 cuvinte/factor):
1. **Factor + Scor** (1 linie): **Onestitate-umilință (H): 3.2 - mediu**
2. **Interpretare** (1 paragraf SCURT, 3-4 fraze): impact pentru antreprenoriat
3. **TOATE cele 4 fațete** (OBLIGATORIU):
   - **Scor + Nume fațetă** (bold) - literă mică după două puncte
   - 2-3 fraze per fațetă: aplicație CONCRETĂ + legătură cu obiective
   - Elimină cuvinte de umplutură: "această", "în contextul", "ceea ce"
4. **Impact general** (1-2 fraze): sinteză factor

⚠️ **INTERDICȚII STRICTE ÎN TOT RAPORTUL:**
- ❌ INTERZIS: "totuși", "însă", "cu toate acestea", "această", "acest", "acestei"
- ❌ INTERZIS: "în contextul", "ceea ce", "pe de altă parte"
- ❌ INTERZIS: paragrafe introductive generale
- ❌ INTERZIS: formule repetitive (avantaj → risc)
- ✅ OBLIGATORIU: fraze scurte, directe, dense
- ✅ OBLIGATORIU: TOATE cele 4 fațete per factor!
- ✅ OBLIGATORIU: fiecare frază = insight nou + aplicație concretă

CAPITOLUL AL II-LEA: Analiza contextuală (MAXIM 900 cuvinte)
- **Analiza psihologică** (250-300 cuvinte): leadership și decizii - DOAR LISTE BULLET
- **Analiza strategică** (300-350 cuvinte):
  - Top 3 puncte forte (2-3 fraze fiecare)
  - Top 3 vulnerabilități (2-3 fraze fiecare)
- **Analiza socială** (250-300 cuvinte): relații cu părțile interesate - LISTE BULLET

CAPITOLUL AL III-LEA: Strategii și recomandări (MAXIM 800 cuvinte)
Format: DOAR LISTE BULLET, zero paragrafe

- **Top 3 strategii pentru puncte forte** (250 cuvinte):
  - Strategie 1: acțiune + tool + timeline (2 fraze)
  - Strategie 2: acțiune + tool + timeline (2 fraze)
  - Strategie 3: acțiune + tool + timeline (2 fraze)

- **Top 3 strategii pentru limitări** (250 cuvinte):
  - Strategie 1: compensare + metodă + rezultat (2 fraze)
  - Strategie 2: compensare + metodă + rezultat (2 fraze)
  - Strategie 3: compensare + metodă + rezultat (2 fraze)

- **Recomandări ${userInfo?.industry || 'ta'}** (250 cuvinte):
  - 2-3 aplicații SPECIFICE industriei (2 fraze fiecare)

CAPITOLUL AL IV-LEA: Corelarea cu obiectivele (MAXIM 700 cuvinte)
${userGoals ? Object.entries(userGoals).map(([k, v]) => `- ${k}: ${v}`).join('\n') : ''}

Format LISTĂ (200 cuvinte/obiectiv):
- **Ajută**: 2 factori + aplicație (2 fraze)
- **Blochează**: 2 factori + impact (2 fraze)
- **Acțiune**: 1 pas + timeline + rezultat (2 fraze)

CAPITOLUL AL V-LEA: Concluzii și plan de acțiune (MAXIM 700 cuvinte)
- **Rezumat** (200 cuvinte): top 5 insights - BULLET LIST
- **3 pași imediați** (350 cuvinte):
  - Pas 1: ce + când + cum (2-3 fraze)
  - Pas 2: ce + când + cum (2-3 fraze)
  - Pas 3: ce + când + cum (2-3 fraze)
- **3 resurse** (150 cuvinte): titlu + relevanță (1-2 fraze/resursă)

=== REGULI DE INTERACȚIUNE ===
⚠️ **CRITICE - RESPECTĂ SAU EȘUEZI:**

**LIMITE ABSOLUTE:**
1. **OPREȘTE-TE la 6700 cuvinte TOTAL** - Verifică constant, NU depăși!
2. **Fiecare capitol ≤ limita specificată** - Numără cuvintele, stop când atingi limita!

**CALITATE ȘI STIL:**
3. **ZERO umplutură**: Fiecare frază = valoare nouă
4. **INTERZIS**:
   - "totuși", "însă", "cu toate acestea" peste tot
   - "această caracteristică/trăsătură/dimensiune" repetat
   - Paragrafe introductive generale
   - Formule (avantaj → totuși → dezavantaj)
   - Teorie academică fără aplicare practică
5. **OBLIGATORIU**:
   - Fraze scurte și directe
   - Liste bullet pentru acțiuni
   - Exemple concrete din business
   - Timeline-uri și metode specifice
   - Nume de tool-uri, framework-uri, resurse

**ACURATEȚE:**
6. **Folosește DOAR scorurile reale** - NU inventa valori
7. **Română 100%** (excepții: CEO, IT, ARR, KPI, etc.)

**REGULI ORTOGRAFICE LIMBA ROMÂNĂ:**
8. **După două puncte (:)** - se scrie cu literă mică
   - ✅ CORECT: "Interpretare: scorul mediu indică..."
   - ❌ GREȘIT: "Interpretare: Scorul mediu indică..."
9. **Titluri și subtitluri** - doar primul cuvânt cu majusculă, restul cu literă mică
   - ✅ CORECT: "Analiza personalității pe factori și fațete"
   - ❌ GREȘIT: "Analiza Personalității Pe Factori Și Fațete"
10. **Cifre romane în capitole**:
   - Capitolul I (primul)
   - Capitolul al II-lea (al doilea)
   - Capitolul al III-lea (al treilea)
   - Capitolul al IV-lea (al patrulea)
   - Capitolul al V-lea (al cincilea)

**LIMBAJ SIMPLU ȘI ACCESIBIL:**
11. **PRESUPUNE că utilizatorul NU vine din mediu corporate** - explică totul clar
12. **Acronime și Termeni Tehnici**:
   - ❌ INTERZIS: acronime nedefinite (CAC, LTV, PLG, SOP, NPS, BATNA, MRR, etc.)
   - ✅ PERMIS: Termeni cunoscuți în română (CEO, IT, software, startup, email, online)
   - ✅ PERMIS: Acronime definite la prima utilizare: "OKR-uri (Obiective și Rezultate Cheie)"
   - ✅ MAI BINE: Evită complet și folosește descrieri clare
13. **Englezisme - TRADUCEȚI în română**:
   - ❌ "pitching" → ✅ "prezentări către investitori" sau "negocieri de finanțare"
   - ❌ "closing" → ✅ "închidere contracte" sau "finalizare vânzări"
   - ❌ "deep work" → ✅ "muncă concentrată" sau "lucru fără distrageri"
   - ❌ "playbook" → ✅ "ghid operațional" sau "proceduri standard"
   - ❌ "hands-off" → ✅ "delegare completă" sau "autonomie echipă"
   - ❌ "pushback" → ✅ "rezistență" sau "opoziție"
   - ❌ "follow-up" → ✅ "urmărire" sau "verificare ulterioară"
   - ❌ "feedback" → ✅ "feedback" (OK - acceptat în limba română)
   - ❌ "stakeholder" → ✅ "părți interesate" sau "parteneri/investitori/clienți"
   - ❌ "check-in" → ✅ "întâlnire de sincronizare" sau "ședință scurtă"
14. **Jargon Corporate - SIMPLIFICĂ sau EXPLICĂ**:
   - ❌ "Decision Rights Matrix" → ✅ "sistem clar de responsabilități"
   - ❌ "Type 1/Type 2 Decisions" → ✅ "decizii reversibile vs. ireversibile"
   - ❌ "regret minimization framework" → ✅ "metoda de minimizare a regretelor"
   - ❌ "performance review calibration" → ✅ "evaluare echitabilă a performanței"
15. **Exemple de Tool-uri/Metode - fie specifice, fie generale**:
   - ✅ BINE: "software de management proiecte (Asana, Trello, Monday)"
   - ✅ BINE: "întâlniri săptămânale de 30 minute"
   - ❌ EVITĂ: framework-uri obscure fără explicație

**PROCES:**
16. Generează CAPITOL cu CAPITOL - așteaptă confirmare utilizator
17. **Adresare**: Prenumele utilizatorului (${userInfo?.firstName || 'tu'})
18. Mesaje tranziție între capitole (respectă regulile ortografice):
   - După Cap. I: "**Capitolul I s-a încheiat. Continuăm cu Capitolul al II-lea?**"
   - După Cap. II: "**Capitolul al II-lea s-a încheiat. Continuăm cu Capitolul al III-lea?**"
   - După Cap. III: "**Capitolul al III-lea s-a încheiat. Continuăm cu Capitolul al IV-lea?**"
    - După Cap. IV: "**Capitolul IV s-a încheiat. Continuăm cu Capitolul V (ultimul)?**"
    - După Cap. V: "**Analiza s-a încheiat.**\n\n⚠️ **IMPORTANT:** Te rog să **salvezi această analiză acum** folosind butonul de **Export (DOCX)** din dreapta sus (sau copy-paste), pentru a nu pierde datele. Această sesiune se va închide curând."
19. **Markdown**: Bold pentru concepte cheie, liste bullet, headings (NU tabele complexe)

⚠️ **EXEMPLE DE CE VREM (vs. CE NU VREM):**

**Exemplul 1: Conciziune și ortografie corectă**

❌ **GREȘIT** (verbos, generic, majuscule după două puncte):
"Cu un scor de 4.3 la Conștiinciozitate, te poziționezi semnificativ peste media populației, ceea ce sugerează o orientare puternică spre obiective și disciplină. Această caracteristică îți oferă un avantaj în context antreprenorial. Totuși, ar putea genera și provocări legate de micromanagement."

✅ **CORECT** (concis, aplicabil, literă mică după două puncte):
"**Conștiinciozitate (C): 4.3 - foarte ridicat**
Execuție disciplinată și atenție la detalii - asset major pentru scalare la 5M EUR ARR. Risc: tendința spre micromanagement poate bloca delegarea. Soluție: implementează sistem de obiective trimestriale și întâlniri săptămânale de 30 minute în loc de supervizare zilnică."

**Exemplul 2: Limbaj simplu**

❌ **GREȘIT** (corporate jargon, anglicisme):
"Pentru scaling-ul echipei, focus pe hiring de A-players prin structured interviewing și assessment centers. Post-onboarding, asigură role clarity prin RACI matrix și streamline decision-making cu clear ownership. Track-uiește performance prin OKRs și KPIs, cu quarterly calibration sessions pentru consistency."

✅ **CORECT** (limba română simplă):
"Pentru creșterea echipei, concentrează-te pe recrutarea celor mai buni candidați prin interviuri structurate și sesiuni de evaluare. După angajare, clarifică responsabilitățile fiecăruia printr-un sistem clar de atribuții și simplifică luarea deciziilor prin stabilirea responsabililor. Urmărește performanța prin obiective trimestriale măsurabile și indicatori specifici, cu întâlniri de evaluare la fiecare 3 luni pentru echitate."

Începe cu un mesaj de bun venit SCURT (2-3 fraze) și oferă opțiunea să pornească cu Capitolul I.`;

        console.log('=== STARTING STREAM ===');
        console.log('Messages count:', messages.length);
        console.log('User info:', JSON.stringify(userInfo));
        console.log('Scores available:', !!scores);
        console.log('System prompt length:', systemPrompt.length);

        const result = await streamText({
            model: anthropic('claude-sonnet-4-5-20250929'),
            system: systemPrompt,
            messages,
            temperature: 0.7,
            maxRetries: 2,
            onFinish: (result) => {
                console.log('=== STREAM FINISHED ===');
                console.log('Finish reason:', result.finishReason);
                console.log('Text length:', result.text?.length || 0);
                console.log('Usage:', result.usage);
            },
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
