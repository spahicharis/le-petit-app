import type { Translation } from './en';

const bs: Translation = {
  // ── tabs ──────────────────────────────────────────────────────────────────
  tabs: {
    home: 'Početna',
    notifications: 'Obavještenja',
    search: 'Pretraga',
    favourites: 'Omiljene',
    more: 'Više',
  },

  // ── welcome ───────────────────────────────────────────────────────────────
  welcome: {
    tagline: 'Čarobne priče za\nmale sanjare ✨',
    feature1: 'Stotine klasičnih bajki',
    feature2: 'Uspavljujuće priče za laku noć',
    feature3: 'Dostupna audio naracija',
    continueWithoutLogin: 'Nastavi bez prijave',
    signIn: 'Prijavi se',
    signInHint: 'Prijavite se da sačuvate omiljene i pristupite cijeloj biblioteci.',
  },

  // ── login ─────────────────────────────────────────────────────────────────
  login: {
    title: 'Prijavi se',
    subtitle: 'Sačuvajte omiljene i otključajte cijelu biblioteku priča.',
    withApple: 'Nastavi s Appleom',
    withGoogle: 'Nastavi s Googleom',
    comingSoon: 'uskoro',
    placeholder:
      'Prava autentifikacija bit će dostupna u budućem ažuriranju. Za sada su tokovi prijave privremeni.',
    back: '← Nazad',
  },

  // ── home ──────────────────────────────────────────────────────────────────
  home: {
    greeting: 'Zdravo, {{name}}! 👋',
    guestGreeting: 'Dobrodošli! 👋',
    explore: 'Istraži',
    signOut: 'Odjavi se',
    talesTitle: 'Priče',
    talesDesc: 'Istraži biblioteku klasičnih priča i životinjskih avantura.',
    parentsTitle: 'Za roditelje',
    parentsDesc: 'Odgovori na česta pitanja o aplikaciji i njenom sadržaju.',
    logopedTitle: 'Moj logoped',
    logopedDesc: 'Personalizovane govorne i jezičke vježbe — uskoro.',
  },

  // ── tales ─────────────────────────────────────────────────────────────────
  tales: {
    chooseCategory: 'Odaberi kategoriju',
    startReading: 'Odaberi kolekciju priča ispod i počni čitati!',
    noStories: 'Nema priča u ovoj kategoriji.',
  },

  // ── story detail ──────────────────────────────────────────────────────────
  story: {
    aboutThisStory: 'O ovoj priči',
    theStory: 'Priča',
    moral: '✨ Pouka priče',
    questionsForKids: 'Pitanja za djecu 💬',
    author: 'Autor',
    narrator: 'Narator',
    favourite: 'Omiljeno',
    share: 'Podijeli',
    download: 'Preuzmi',
    notFound: 'Priča nije pronađena.',
    videoAvailable: 'Video dostupan',
    downloadSoon: 'Preuzimanje offline sadržaja bit će dostupno u budućem ažuriranju.',
    shareMessage: 'Pogledajte "{{title}}" na LePetit.app!',
  },

  // ── audio player ──────────────────────────────────────────────────────────
  audio: {
    listenToStory: '🎧 Slušaj priču',
    narratedBy: 'Priča: {{name}}',
    tapToListen: 'Dodirnite ▶ za slušanje',
    noAudio: 'Nema audio snimke za ovu priču.',
    audioError: 'Učitavanje audio snimke nije uspjelo. Provjerite vašu vezu.',
    tapToOpen: 'Dodirnite za otvaranje',
  },

  // ── notifications ─────────────────────────────────────────────────────────
  notifications: {
    title: 'Obavještenja',
    empty: '🔔 Nema obavještenja.',
    hint: 'Obavijestit ćemo vas kada se dodaju nove priče ili kada se ažuriraju vaše omiljene.',
  },

  // ── search ────────────────────────────────────────────────────────────────
  search: {
    title: 'Pretraga',
    inputPlaceholder: 'Pretraži priče…',
    prompt: 'Unesite naslov priče ili ključnu riječ za pretragu.',
    noResults: 'Nema priča za "{{query}}".',
  },

  // ── favourites ────────────────────────────────────────────────────────────
  favourites: {
    title: 'Omiljene',
    empty: 'Nema omiljenih.',
    hint: 'Dodirnite ikonu srca na bilo kojoj priči da je sačuvate ovdje.',
  },

  // ── parents / faq ─────────────────────────────────────────────────────────
  parents: {
    subtitle: 'Odgovori na česta pitanja o LePetit.app i kako funkcioniše.',
    faq: [
      {
        id: 'faq-1',
        question: 'Šta je LePetit.app?',
        answer:
          'LePetit.app je aplikacija za pripovijedanje namijenjena djeci. Sadrži klasične bajke, priče za laku noć i edukativni sadržaj u sigurnom, bezreklamnom okruženju.',
      },
      {
        id: 'faq-2',
        question: 'Za koji uzrast je aplikacija namijenjena?',
        answer:
          'Naše priče su prilagođene djeci između 2 i 10 godina. Mlađa djeca uživaju u funkciji čitanja naglas, dok stariji čitatelji mogu samostalno istraživati priče.',
      },
      {
        id: 'faq-3',
        question: 'Jesu li priče pogodne za pred-spavanje?',
        answer:
          'Da! Naša kategorija Priče za laku noć sadrži smirujuće i opuštajuće priče koje pomažu djeci da se opuste i pripreme za spavanje.',
      },
      {
        id: 'faq-4',
        question: 'Može li moje dijete koristiti aplikaciju samo?',
        answer:
          'Svakako. Aplikacija je dizajnirana tako da djeca lako mogu navigirati sami. Sav sadržaj je primjeren uzrastu, a sučelje je jednostavno i intuitivno.',
      },
      {
        id: 'faq-5',
        question: 'Je li potrebna pretplata?',
        answer:
          'Možete pregledavati i čitati odabrane besplatne priče bez prijave. Pretplatom otključavate cijelu biblioteku, audio naraciju i premium funkcije.',
      },
      {
        id: 'faq-6',
        question: 'Kako mogu otkazati pretplatu?',
        answer:
          'Pretplatom možete upravljati ili je otkazati u bilo koje vrijeme putem postavki vašeg App Store ili Google Play računa.',
      },
    ],
  },

  // ── my logoped ────────────────────────────────────────────────────────────
  myLogoped: {
    title: 'Moj logoped',
    comingSoon: 'Uskoro',
    body: 'Personalizovane govorne i jezičke vježbe, praćenje napretka i smjernice logopeda bit će dostupni u budućem ažuriranju.',
  },

  // ── more ──────────────────────────────────────────────────────────────────
  more: {
    title: 'Više',
    guest: 'Gost',
    guestSubtitle: 'Niste prijavljeni',
    signedInAs: 'Prijavljeni kao',
    sectionAccount: 'Račun',
    sectionPremium: 'Premium',
    sectionSupport: 'Podrška',
    sectionInfo: 'Info',
    signIn: 'Prijavi se',
    signInSubtitle: 'Sačuvajte omiljene i otključajte sve priče',
    signOut: 'Odjavi se',
    subscription: 'Pretplata',
    subscriptionBadgeFree: 'Besplatno',
    subscriptionBadgePremium: 'Premium',
    subscriptionSoon: 'Upravljanje pretplatom uskoro.',
    updateContent: 'Ažuriraj sadržaj',
    updateContentDone: 'Sadržaj je ažuriran! ✓',
    feedback: 'Pošalji povratne informacije',
    reportBug: 'Prijavi grešku',
    about: 'O LePetit.app',
    aboutMessage: 'LePetit.app — Verzija {{version}}\n\nČarobna aplikacija za pripovijedanje za male sanjare. 📖✨',
    version: 'Verzija {{version}}',
    privacyPolicy: 'Politika privatnosti',
    privacySoon: 'Politika privatnosti bit će dostupna uskoro.',
  },
};

export default bs;

