export type HexacoQuestion = {
  id: number;
  text: string;
  reverse: boolean;
  domain: string;
  facet: string;
};

export const HEXACO_QUESTIONS: HexacoQuestion[] = [
  // Honesty-Humility (H)
  { id: 6, text: "Nu aş folosi linguşeala pentru a obţine o promovare la muncă, chiar dacă aş crede că pot să reuşesc în acest fel.", reverse: false, domain: "Honesty-Humility", facet: "Sincerity" },
  { id: 30, text: "Dacă vreau ceva de la cineva, o să râd chiar şi la cele mai proaste glume ale acelei persoane.", reverse: true, domain: "Honesty-Humility", facet: "Sincerity" },
  { id: 54, text: "Nu aş pretinde că îmi place cineva, doar pentru a obţine o favoare de la acea persoană.", reverse: false, domain: "Honesty-Humility", facet: "Sincerity" },
  { id: 12, text: "Dacă aş şti că nu aş fi prins(ă) niciodată, aş fi dispus(ă) să fur un milion de dolari.", reverse: true, domain: "Honesty-Humility", facet: "Fairness" },
  { id: 36, text: "Nu aş accepta niciodată mită, nici dacă ar fi vorba despre o sumă foarte mare de bani.", reverse: false, domain: "Honesty-Humility", facet: "Fairness" },
  { id: 60, text: "Aş fi tentat(ă) să folosesc bancnote false, dacă aş şti că nu m-ar prinde nimeni.", reverse: true, domain: "Honesty-Humility", facet: "Fairness" },
  { id: 18, text: "Nu este foarte important pentru mine să am bani mulţi.", reverse: false, domain: "Honesty-Humility", facet: "Greed Avoidance" },
  { id: 42, text: "Mi-ar face multă plăcere să deţin bunuri scumpe, luxoase.", reverse: true, domain: "Honesty-Humility", facet: "Greed Avoidance" },
  { id: 24, text: "Cred că mi se cuvine mai mult respect decât unei persoane obişnuite.", reverse: true, domain: "Honesty-Humility", facet: "Modesty" },
  { id: 48, text: "Vreau ca oamenii să ştie faptul că sunt o persoană importantă, cu o poziţie deosebită.", reverse: true, domain: "Honesty-Humility", facet: "Modesty" },

  // Emotionality (E)
  { id: 5, text: "Mi-ar fi frică dacă ar trebui să călătoresc în condiţii meteorologice nefavorabile.", reverse: false, domain: "Emotionality", facet: "Fearfulness" },
  { id: 29, text: "Mă tem foarte mult de pericolele care mă pot afecta din punct de vedere fizic.", reverse: false, domain: "Emotionality", facet: "Fearfulness" },
  { id: 53, text: "Nici chiar într-o situaţie limită nu aş intra în panică.", reverse: true, domain: "Emotionality", facet: "Fearfulness" },
  { id: 11, text: "Câteodată nu mă pot opri din a-mi face griji chiar şi pentru lucruri mărunte.", reverse: false, domain: "Emotionality", facet: "Anxiety" },
  { id: 35, text: "Îmi fac mai puţine griji decât majoritatea celorlalţi oameni.", reverse: true, domain: "Emotionality", facet: "Anxiety" },
  { id: 17, text: "Atunci când trec printr-o experienţă dureroasă, am nevoie de cineva care să mă facă să mă simt mai bine.", reverse: false, domain: "Emotionality", facet: "Dependence" },
  { id: 41, text: "Pot gestiona situaţiile dificile fără a avea nevoie de sprijin emoţional din partea altcuiva.", reverse: true, domain: "Emotionality", facet: "Dependence" },
  { id: 23, text: "Îmi vine să plâng de fiecare dată când văd alte persoane plângând.", reverse: false, domain: "Emotionality", facet: "Sentimentality" },
  { id: 47, text: "Resimt emoţii puternice atunci când o persoană apropiată pleacă pentru o perioadă mai lungă de timp.", reverse: false, domain: "Emotionality", facet: "Sentimentality" },
  { id: 59, text: "Rămân lipsit(ă) de emoţie chiar şi în situaţiile în care cei mai mulţi oameni devin foarte sentimentali.", reverse: true, domain: "Emotionality", facet: "Sentimentality" },

  // Extraversion (X)
  { id: 4, text: "Sunt destul de mulţumit de propria persoană, în general.", reverse: false, domain: "Extraversion", facet: "Social Self-Esteem" },
  { id: 28, text: "Simt că sunt o persoană nepopulară.", reverse: true, domain: "Extraversion", facet: "Social Self-Esteem" },
  { id: 52, text: "Câteodată simt că nu sunt bun(ă) de nimic.", reverse: true, domain: "Extraversion", facet: "Social Self-Esteem" },
  { id: 10, text: "Rareori îmi exprim opiniile în cadrul întâlnirilor de grup.", reverse: true, domain: "Extraversion", facet: "Social Boldness" },
  { id: 34, text: "De obicei, în situaţiile sociale, eu sunt cel(cea) care are iniţiativa.", reverse: false, domain: "Extraversion", facet: "Social Boldness" },
  { id: 58, text: "Atunci când mă aflu într-un grup de persoane, eu sunt cel(cea) care vorbeşte în numele grupului.", reverse: false, domain: "Extraversion", facet: "Social Boldness" },
  { id: 16, text: "Îmi plac mai mult activităţile care implică interacţiuni sociale decât cele care implică muncă individuală.", reverse: false, domain: "Extraversion", facet: "Sociability" },
  { id: 40, text: "Primul lucru pe care îl fac atunci când mă aflu într-un loc nou este să-mi fac prieteni.", reverse: false, domain: "Extraversion", facet: "Sociability" },
  { id: 22, text: "În majoritatea zilelor, sunt vesel(ă) şi optimist(ă).", reverse: false, domain: "Extraversion", facet: "Liveliness" },
  { id: 46, text: "Cele mai multe persoane sunt mai active şi mai dinamice decât mine.", reverse: true, domain: "Extraversion", facet: "Liveliness" },

  // Agreeableness (A)
  { id: 3, text: "Rareori port pică altor persoane, chiar dacă acestea au greşit faţă de mine.", reverse: false, domain: "Agreeableness", facet: "Forgiveness" },
  { id: 27, text: "Atitudinea pe care o am faţă de oamenii care s-au purtat urât cu mine este \"uită şi iartă\".", reverse: false, domain: "Agreeableness", facet: "Forgiveness" },
  { id: 9, text: "Mi se spune uneori că sunt prea critic(ă) faţă de ceilalţi.", reverse: true, domain: "Agreeableness", facet: "Gentleness" },
  { id: 33, text: "Tind să fiu indulgent(ă) atunci când îi judec pe alţii.", reverse: false, domain: "Agreeableness", facet: "Gentleness" },
  { id: 51, text: "Chiar atunci când oamenii fac multe greşeli, spun rareori ceva negativ.", reverse: false, domain: "Agreeableness", facet: "Gentleness" },
  { id: 15, text: "Oamenii îmi spun uneori că sunt prea încăpăţânat(ă).", reverse: true, domain: "Agreeableness", facet: "Flexibility" },
  { id: 39, text: "De obicei sunt destul de flexibil(ă) în opiniile mele, atunci când ceilalţi nu sunt de acord cu mine.", reverse: false, domain: "Agreeableness", facet: "Flexibility" },
  { id: 57, text: "Atunci când oamenii îmi spun că greşesc, prima reacţie pe care o am este să mă contrazic cu ei.", reverse: true, domain: "Agreeableness", facet: "Flexibility" },
  { id: 21, text: "Oamenii mă percep ca fiind o persoană care îşi pierde cumpătul foarte repede.", reverse: true, domain: "Agreeableness", facet: "Patience" },
  { id: 45, text: "Cei mai mulţi oameni tind să se înfurie mai repede decât mine.", reverse: false, domain: "Agreeableness", facet: "Patience" },

  // Conscientiousness (C)
  { id: 2, text: "Îmi planific şi îmi organizez activităţile pentru a evita agitaţia de ultim moment.", reverse: false, domain: "Conscientiousness", facet: "Organization" },
  { id: 26, text: "Atunci când lucrez, am uneori dificultăţi din cauză că sunt dezordonat(ă).", reverse: true, domain: "Conscientiousness", facet: "Organization" },
  { id: 8, text: "Deseori mă silesc să trag tare atunci când încerc să ating un obiectiv.", reverse: false, domain: "Conscientiousness", facet: "Diligence" },
  { id: 32, text: "Lucrez doar atât cât este nevoie pentru a-mi face treaba.", reverse: true, domain: "Conscientiousness", facet: "Diligence" },
  { id: 14, text: "Atunci când lucrez la ceva, nu prea acord atenţie detaliilor mici.", reverse: true, domain: "Conscientiousness", facet: "Perfectionism" },
  { id: 38, text: "Încerc întotdeauna să fiu precis(ă) în munca mea, chiar dacă astfel munca mea durează mai mult.", reverse: false, domain: "Conscientiousness", facet: "Perfectionism" },
  { id: 50, text: "Oamenii spun deseori despre mine că sunt o persoană perfecţionistă.", reverse: false, domain: "Conscientiousness", facet: "Perfectionism" },
  { id: 20, text: "Iau decizii mai degrabă pe baza a ceea ce simt în acel moment şi nu pe baza unei cugetări atente.", reverse: true, domain: "Conscientiousness", facet: "Prudence" },
  { id: 44, text: "Fac multe greşeli din cauză că nu mă gândesc înainte de a acţiona.", reverse: true, domain: "Conscientiousness", facet: "Prudence" },
  { id: 56, text: "Prefer să fac tot ceea ce îmi vine în minte, iar nu să urmez întocmai un anumit plan.", reverse: true, domain: "Conscientiousness", facet: "Prudence" },

  // Openness to Experience (O)
  { id: 1, text: "M-aş plictisi destul de mult într-o vizită la o galerie de artă.", reverse: true, domain: "Openness to Experience", facet: "Aesthetic Appreciation" },
  { id: 25, text: "Dacă aş avea posibilitatea, mi-ar plăcea să vizionez un concert de muzică clasică.", reverse: false, domain: "Openness to Experience", facet: "Aesthetic Appreciation" },
  { id: 7, text: "Sunt interesat să învăţ despre istoria şi politica altor ţări.", reverse: false, domain: "Openness to Experience", facet: "Inquisitiveness" },
  { id: 31, text: "Nu mi-a plăcut niciodată să răsfoiesc o enciclopedie.", reverse: true, domain: "Openness to Experience", facet: "Inquisitiveness" },
  { id: 13, text: "Mi-ar plăcea să creez o operă de artă, cum ar fi un roman, un cântec sau o pictură.", reverse: false, domain: "Openness to Experience", facet: "Creativity" },
  { id: 37, text: "Oamenii mi-au spus deseori că am o imaginaţie bogată.", reverse: false, domain: "Openness to Experience", facet: "Creativity" },
  { id: 49, text: "Nu mă consider o persoană de tip artistic sau creativ.", reverse: true, domain: "Openness to Experience", facet: "Creativity" },
  { id: 19, text: "Cred că este o pierdere de timp să băgăm în seamă ideile inovatoare.", reverse: true, domain: "Openness to Experience", facet: "Unconventionality" },
  { id: 43, text: "Îmi plac persoanele care au puncte de vedere neconvenţionale.", reverse: false, domain: "Openness to Experience", facet: "Unconventionality" },
  { id: 55, text: "Mi se pare plictisitor să discut filosofie.", reverse: true, domain: "Openness to Experience", facet: "Unconventionality" },
].sort((a, b) => a.id - b.id);

export const DOMAINS = {
  "Honesty-Humility": "Onestitate-Umilință",
  "Emotionality": "Emoționalitate",
  "Extraversion": "Extraversiune",
  "Agreeableness": "Agreabilitate",
  "Conscientiousness": "Conștiinciozitate",
  "Openness to Experience": "Deschidere către Experiență"
};

export const FACETS = {
  // H
  "Sincerity": "Sinceritate",
  "Fairness": "Corectitudine",
  "Greed Avoidance": "Evitarea lăcomiei",
  "Modesty": "Modestie",
  // E
  "Fearfulness": "Frica",
  "Anxiety": "Anxietate",
  "Dependence": "Dependență",
  "Sentimentality": "Sentimentalitate",
  // X
  "Social Self-Esteem": "Stima de sine socială",
  "Social Boldness": "Îndrăzneală socială",
  "Sociability": "Sociabilitate",
  "Liveliness": "Vivacitate",
  // A
  "Forgiveness": "Iertare",
  "Gentleness": "Blândețe",
  "Flexibility": "Flexibilitate",
  "Patience": "Răbdare",
  // C
  "Organization": "Organizare",
  "Diligence": "Diligență",
  "Perfectionism": "Perfecționism",
  "Prudence": "Prudență",
  // O
  "Aesthetic Appreciation": "Apreciere estetică",
  "Inquisitiveness": "Curiozitate",
  "Creativity": "Creativitate",
  "Unconventionality": "Neconvenționalitate"
};
