import Link from 'next/link';
import { ArrowRight, Target, Brain, Zap, TrendingUp, Users, Lightbulb } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header / Logo Area */}
      <header className="absolute top-0 left-0 w-full z-50 p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 relative">
              <img src="/logo.png" alt="AI Architect Logo" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <span className="text-white font-bold text-xl tracking-wide opacity-90">AI ARCHITECT</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0C4A6E]/40 to-slate-50"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-6 py-2 backdrop-blur-md mb-8">
            <span className="text-primary-light font-bold text-sm md:text-base tracking-widest uppercase">Antreprenor Blueprint System</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Descifrează <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ADN-ul tău</span> <br />
            antreprenorial
          </h1>

          <h2 className="text-xl md:text-2xl text-slate-200 mb-10 font-light leading-relaxed">
            Nu poți scala ceea ce nu înțelegi<br />
            Descoperă arhitectura invizibilă a deciziilor tale de business
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white text-lg font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-orange-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
              Începe Testul Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            {/* Quick test link for development */}
            {process.env.NODE_ENV === 'development' && (
              <Link
                href="/test-agent"
                className="w-full sm:w-auto bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-sm font-medium py-2 px-6 rounded-full border border-yellow-500/30 transition-all flex items-center justify-center"
              >
                🧪 Test Rapid (Dev)
              </Link>
            )}
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 text-lg font-medium py-4 px-8 rounded-full transition-all backdrop-blur-sm flex items-center justify-center"
            >
              Cum funcționează?
            </Link>
          </div>
        </div>
      </section>

      {/* Ce este Antreprenor Blueprint */}
      <section className="relative z-20 -mt-12 pb-16">
        <div className="container mx-auto px-6">
          <div className="bg-white p-10 md:p-12 rounded-2xl shadow-2xl border border-slate-100 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">Ce este Antreprenor Blueprint</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                Antreprenor Blueprint este un asistent AI care îți citește profilul de personalitate (modelul HEXACO) și îl traduce în limbaj de business: stil de leadership, felul în care iei decizii, cum gestionezi riscul, relațiile cu clienții, echipa și partenerii.
              </p>
              <p>
                Nu e un &quot;test drăguț&quot; și atât, ci un <strong>instrument de diagnoză profundă</strong>: ia datele tale de personalitate și îți construiește un raport structurat, gândit special pentru antreprenori și soloprenori care vor să-și alinieze felul de a fi cu felul în care își conduc afacerea.
              </p>
              <p className="text-slate-900 font-semibold">
                Practic, îți oferă o oglindă lucidă: cine ești ca antreprenor și ce înseamnă asta, concret, pentru businessul tău.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce știe să facă */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Ce știe să facă</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto text-lg">
            Antreprenor Blueprint este specializat în trei zone mari:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Analiză psihologică aplicată în business</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• Interpretează scorurile tale HEXACO (Onestitate-Umilință, Emoționalitate, Extraversie, Agradabilitate, Conștiinciozitate, Deschidere)</li>
                <li>• Îți arată cum influențează fiecare factor: stilul de leadership, modul în care iei decizii, cum reacționezi la stres și incertitudine</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Analiză strategică antreprenorială</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• Identifică punctele tale tari și vulnerabilitățile în business</li>
                <li>• Scoate la suprafață stilul tău decizional (intuitiv, analitic, strategic)</li>
                <li>• Traduce trăsăturile tale în riscuri, oportunități și zone unde ai nevoie de &quot;scaffolding&quot;</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recomandări personalizate pentru creștere</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• Propune strategii concrete pentru a-ți folosi punctele forte</li>
                <li>• Arată ce trebuie pus &quot;în gardă&quot; (unde te sabotezi singur)</li>
                <li>• Sugerează direcții de dezvoltare (obiceiuri, tip de colaboratori, stil de organizare)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cum funcționează */}
      <section id="how-it-works" className="py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Cum funcționează?</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16 text-lg">
            Un sistem simplu, dar profund, care transformă datele psihometrice în strategie de business aplicabilă
          </p>

          <div className="space-y-12">
            {/* Pas 1 */}
            <ProcessStep
              number="01"
              title="Completezi testul de personalitate (HEXACO 60 itemi)"
              description="Faci testul de personalitate (online sau pe formularul tău) și obții scorurile pe cele 6 dimensiuni HEXACO + fațete."
            />

            {/* Pas 2 */}
            <ProcessStep
              number="02"
              title="Introduci scorurile în Antreprenor Blueprint"
              description="Asistentul îți cere fișa de scor și o folosește ca 'materie primă' pentru analiză. Fără scoruri reale, nu generează raport – nu inventează profilul tău."
            />

            {/* Pas 3 */}
            <ProcessStep
              number="03"
              title="Primești raportul tău, construit capitol cu capitol"
              description="Asistentul lucrează în pași clari:"
              chapters={[
                {
                  title: "Capitolul I – Analiza personalității pe factori și fațete",
                  desc: "Cum arată concret profilul tău pe H, E, X, A, C, O și ce înseamnă fiecare pentru tine ca antreprenor."
                },
                {
                  title: "Capitolul II – Analiza contextuală a profilului antreprenorial",
                  desc: "Cum se traduce personalitatea ta în modul în care conduci, negociezi, lucrezi, comunici."
                },
                {
                  title: "Capitolul III – Strategii și recomandări",
                  desc: "Ce să amplifici, ce să pui pe șine, ce să oprești sau să delegi."
                },
                {
                  title: "Capitolul IV – Aliniere cu obiectivele tale",
                  desc: "Răspunzi la 3 întrebări-cheie despre obiective și blocaje, iar asistentul le integrează în raport."
                },
                {
                  title: "Capitolul V – Recomandări finale și direcții de dezvoltare",
                  desc: "Direcții concrete de lucru, resurse, unghiuri de reflecție pe termen lung."
                }
              ]}
            />

            {/* Pas 4 */}
            <ProcessStep
              number="04"
              title="Lucrezi iterativ cu el"
              description="Poți reveni cu întrebări punctuale ('Cum să-mi ajustez stilul de leadership dacă sunt foarte conștiincios dar cu Agradabilitate mai scăzută?', de exemplu). Poți repeta procesul după o perioadă, dacă îți refaci testul sau îți schimbi obiectivele de business."
            />
          </div>
        </div>
      </section>

      {/* Ce beneficii ai */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">Ce beneficii ai dacă îl folosești</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitCard
              number="1"
              title="Claritate brutal de onestă despre cine ești ca antreprenor"
              description="Nu mai lucrezi cu 'impresii despre tine', ci cu un profil psihologic măsurat și tradus direct în realitatea ta de business. Vezi pe ce te poți baza și unde trebuie să pui limite sau sisteme."
            />
            <BenefitCard
              number="2"
              title="Decizii mai bune, cu mai puțin zgomot interior"
              description="Când înțelegi cum funcționezi (de ex. dacă ești mai anxios, mai impulsiv, ultra-conștiincios sau foarte creativ), începi să iei decizii aliniate cu tine, nu împotriva ta. Asta reduce mult stresul, amânarea și auto-sabotajul."
            />
            <BenefitCard
              number="3"
              title="Strategie de creștere adaptată personalității tale"
              description="În loc să copiezi rețetele altora, îți construiești o strategie de business care ține cont de cum ești tu: cum îți structurezi munca, ce tip de proiecte îți vin natural, ce fel de oameni ai nevoie lângă tine."
            />
            <BenefitCard
              number="4"
              title="Un raport pe care îl poți reciti și folosi ca busolă"
              description="Primești un raport organizat pe capitole (personalitate, context de business, strategii, corelare cu obiectivele, recomandări finale), pe care îl poți relua ori de câte ori te blochezi sau ai de luat decizii mari."
            />
            <BenefitCard
              number="5"
              title="Un cadru de discuție cu tine însuți și cu mentorii tăi"
              description="Raportul devine un limbaj comun: îl poți folosi în discuții cu coach, terapeut, partener de business sau mentor, ca să lucrați pe ceva concret, nu pe generalități."
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Gata să-ți descifrezi ADN-ul antreprenorial?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Începe testul acum și primește raportul tău personalizat în câteva minute.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center bg-accent hover:bg-accent-dark text-white text-lg font-bold py-5 px-12 rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1"
          >
            Începe Testul Gratuit
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Antreprenor Blueprint. Powered by Cognitive & Personality AI Architect</p>
        </div>
      </footer>
    </div>
  );
}

function ProcessStep({ number, title, description, chapters }: {
  number: string;
  title: string;
  description: string;
  chapters?: { title: string; desc: string }[];
}) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
        {chapters && (
          <div className="space-y-4 ml-4 border-l-2 border-slate-200 pl-6">
            {chapters.map((chapter, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-slate-900 mb-1">{chapter.title}</h4>
                <p className="text-sm text-slate-600">{chapter.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BenefitCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-primary/30 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold flex-shrink-0">
          {number}
        </div>
        <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
      </div>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
