export interface LocaleCopy {
  pageTitle: string;
  metaDescription: string;
  networkBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  ctaStartMining: string;
  ctaNoWallet: string;
  ctaZeroInvestment: string;
  ctaZeroLoad: string;
  statsMiners: string;
  statsMined: string;
  statsPool: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;
  feat4Title: string;
  feat4Desc: string;
  faqTitle: string;
  faqSubtitle: string;
}

export const LOCALE_COPY: Record<string, LocaleCopy> = {
  en: {
    pageTitle: 'Hashforge Lab – Free Crypto Mining Simulator | BTC ETH SOL',
    metaDescription:
      "World's #1 free crypto mining simulator. Mine Bitcoin, Ethereum & Solana with zero hardware load and 0 electricity bills. 42 languages, 100% safe.",
    networkBadge: 'NETWORK ACTIVE · 180+ COUNTRIES CONNECTED',
    heroTitlePrefix: "World's Most Advanced",
    heroTitleHighlight: 'FREE Mining Lab',
    heroDescription:
      'Free Bitcoin Mining Simulator · Free Ethereum Mining · Free Solana Mining · No hardware. No electricity bill. 100% safe educational simulation. Mine BTC, ETH, SOL & 12+ coins worldwide.',
    ctaStartMining: 'START FREE MINING NOW',
    ctaNoWallet: 'No wallet needed',
    ctaZeroInvestment: '100% Zero Investment',
    ctaZeroLoad: '0% Hardware Load',
    statsMiners: 'Miners Online Worldwide',
    statsMined: 'Simulated Mined Free',
    statsPool: 'hashforgelab.co.uk UK',
    feat1Title: '100% IN-BROWSER',
    feat1Desc: 'Simulation runs smoothly without burning CPU or consuming device battery.',
    feat2Title: '12+ TOP COINS',
    feat2Desc: 'Simulate Bitcoin (SHA-256), Ethereum, Solana, Doge, Kaspa, Ton & LTC.',
    feat3Title: '42 LANGUAGES',
    feat3Desc: 'Localized for over 180 countries across Europe, Asia, Americas & Africa.',
    feat4Title: 'ZERO RISK',
    feat4Desc: 'Purely educational simulator. Safe for students, beginners & enthusiasts.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Direct, verified answers indexed for Google Search, AI Overviews, Perplexity & ChatGPT.'
  },
  zh: {
    pageTitle: 'Hashforge Lab – 免费加密货币挖矿模拟器 | 比特币 以太坊 Solana',
    metaDescription:
      '全球领先的免费浏览器加密货币挖矿模拟器。零硬件损耗、零电费成本，安全模拟比特币 (BTC)、以太坊 (ETH)、Solana (SOL) 及12+主流币种工作量证明。',
    networkBadge: '全球节点在线 · 已连接 180+ 个国家与地区',
    heroTitlePrefix: '全球领先的',
    heroTitleHighlight: '免费加密挖矿实验室',
    heroDescription:
      '免费比特币挖矿模拟器 · 免费以太坊与 Solana 浏览器模拟 · 无需购买矿机、零电费账单、100%安全教学仿真。实时体验 SHA-256 哈希计算与全网难度调节。',
    ctaStartMining: '立即免费开始模拟挖矿',
    ctaNoWallet: '无需连接钱包',
    ctaZeroInvestment: '100% 零资金投入',
    ctaZeroLoad: '0% 硬件CPU负载',
    statsMiners: '全球在线模拟矿工',
    statsMined: '累计免费模拟产出',
    statsPool: '英国伦敦全球矿池节点',
    feat1Title: '100% 纯浏览器运行',
    feat1Desc: '轻量级算法在浏览器安全运行，不占用物理CPU/GPU，不消耗手机电池。',
    feat2Title: '支持 12+ 主流加密币',
    feat2Desc: '全面模拟比特币 (SHA-256)、以太坊、Solana、狗狗币、Kaspa、TON 与莱特币。',
    feat3Title: '支持 42 种全球语言',
    feat3Desc: '为亚洲、欧洲、美洲、中东及非洲 180 多个国家提供原生多语言教学界面。',
    feat4Title: '零风险教学仿真',
    feat4Desc: '纯粹的区块链工作量证明教学工具，适合学生、初学者及技术爱好者安全学习。',
    faqTitle: '常见问题解答 (FAQ)',
    faqSubtitle: '关于零硬件负载浏览器挖矿安全、SHA-256 算法及实时预测信号的权威解答。'
  },
  pt: {
    pageTitle: 'Hashforge Lab – Simulador Gratuito de Mineração Cripto | BTC ETH SOL',
    metaDescription:
      'O simulador educativo gratuito nº 1 de mineração cripto no navegador. Simule Bitcoin, Ethereum e Solana com zero desgaste de hardware e 0 conta de luz.',
    networkBadge: 'REDE ATIVA · 180+ PAÍSES CONECTADOS',
    heroTitlePrefix: 'O Laboratório Mais Avançado de',
    heroTitleHighlight: 'Mineração GRÁTIS',
    heroDescription:
      'Simulador Gratuito de Mineração de Bitcoin · Simulação de Ethereum e Solana · Sem placas de vídeo, sem gasto de energia elétrica. Aprenda Proof-of-Work com 100% de segurança.',
    ctaStartMining: 'COMEÇAR MINERAÇÃO GRÁTIS',
    ctaNoWallet: 'Sem carteira necessária',
    ctaZeroInvestment: '100% Zero Investimento',
    ctaZeroLoad: '0% Carga de Hardware',
    statsMiners: 'Mineradores Online no Mundo',
    statsMined: 'Total Simulado Grátis',
    statsPool: 'Pool Global Londres UK',
    feat1Title: '100% NO NAVEGADOR',
    feat1Desc: 'A simulação roda sem aquecer o processador e sem drenar a bateria do celular.',
    feat2Title: '12+ MOEDAS DIGITAIS',
    feat2Desc: 'Simule Bitcoin (SHA-256), Ethereum, Solana, Dogecoin, Kaspa, Toncoin e Litecoin.',
    feat3Title: '42 IDIOMAS GLOBAIS',
    feat3Desc: 'Traduzido para Brasil, Portugal e mais de 180 países ao redor do mundo.',
    feat4Title: 'RISCO ZERO',
    feat4Desc: 'Simulador puramente educativo, seguro para estudantes, iniciantes e pesquisadores.',
    faqTitle: 'Perguntas Frequentes (FAQ)',
    faqSubtitle: 'Respostas diretas e verificadas sobre segurança, algoritmos Proof-of-Work e sinais de mercado.'
  },
  fr: {
    pageTitle: 'Hashforge Lab – Simulateur de Minage Crypto Gratuit | BTC ETH SOL',
    metaDescription:
      'Simulateur éducatif gratuit de minage crypto dans le navigateur. Simulez Bitcoin, Ethereum et Solana sans matériel coûteux ni facture d’électricité.',
    networkBadge: 'RÉSEAU ACTIF · 180+ PAYS CONNECTÉS',
    heroTitlePrefix: 'Le Laboratoire le Plus Avancé de',
    heroTitleHighlight: 'Minage Crypto GRATUIT',
    heroDescription:
      'Simulateur Gratuit de Minage Bitcoin · Simulation Ethereum & Solana · Aucun matériel requis, zéro consommation électrique. Simulation éducative 100% sécurisée de la Preuve de Travail.',
    ctaStartMining: 'DÉMARRER LE MINAGE GRATUIT',
    ctaNoWallet: 'Aucun portefeuille requis',
    ctaZeroInvestment: '100% Zéro Investissement',
    ctaZeroLoad: '0% Charge Matérielle',
    statsMiners: 'Mineurs en Ligne dans le Monde',
    statsMined: 'Montant Simulé Gratuit',
    statsPool: 'Pool Mondial Londres UK',
    feat1Title: '100% DANS LE NAVIGATEUR',
    feat1Desc: 'Fonctionne sans solliciter votre processeur ni décharger la batterie de votre appareil.',
    feat2Title: '12+ CRYPTOMONNAIES',
    feat2Desc: 'Simulez Bitcoin (SHA-256), Ethereum, Solana, Dogecoin, Kaspa, Toncoin et Litecoin.',
    feat3Title: '42 LANGUES MONDIALES',
    feat3Desc: 'Interface localisée pour la France, le Canada, l’Afrique francophone et 180+ pays.',
    feat4Title: 'ZÉRO RISQUE',
    feat4Desc: 'Simulateur purement éducatif, idéal pour les étudiants et passionnés de blockchain.',
    faqTitle: 'Foire Aux Questions (FAQ)',
    faqSubtitle: 'Réponses vérifiées sur la sécurité matérielle, les calculs SHA-256 et les indicateurs RSI/EMA.'
  },
  es: {
    pageTitle: 'Hashforge Lab – Simulador de Minería Cripto Gratis | BTC ETH SOL',
    metaDescription:
      'Simulador educativo gratuito #1 de minería cripto en tu navegador. Simula Bitcoin, Ethereum y Solana sin gastar electricidad ni dañar tu hardware.',
    networkBadge: 'RED ACTIVA · 180+ PAÍSES CONECTADOS',
    heroTitlePrefix: 'El Laboratorio Más Avanzado de',
    heroTitleHighlight: 'Minería Cripto GRATIS',
    heroDescription:
      'Simulador Gratis de Minería Bitcoin · Minería Virtual de Ethereum y Solana · Sin tarjetas gráficas ni facturas de luz. Simulación educativa 100% segura en 42 idiomas.',
    ctaStartMining: 'INICIAR MINERÍA GRATIS AHORA',
    ctaNoWallet: 'Sin billetera requerida',
    ctaZeroInvestment: '100% Cero Inversión',
    ctaZeroLoad: '0% Carga de Hardware',
    statsMiners: 'Mineros Conectados',
    statsMined: 'Total Simulado Gratis',
    statsPool: 'Nodo Global Londres UK',
    feat1Title: '100% EN NAVEGADOR',
    feat1Desc: 'Funciona fluidamente sin sobrecalentar tu CPU ni consumir la batería del móvil.',
    feat2Title: '12+ CRIPTOMONEDAS',
    feat2Desc: 'Simula Bitcoin (SHA-256), Ethereum, Solana, Dogecoin, Kaspa, Toncoin y Litecoin.',
    feat3Title: '42 IDIOMAS GLOBALES',
    feat3Desc: 'Localizado para España, Latinoamérica y más de 180 países de todo el mundo.',
    feat4Title: 'CERO RIESGO',
    feat4Desc: 'Simulador educativo puro, seguro para estudiantes, principiantes y analistas.',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    faqSubtitle: 'Respuestas claras y verificadas sobre seguridad en navegador, algoritmos PoW y señales.'
  },
  hi: {
    pageTitle: 'Hashforge Lab – मुफ़्त क्रिप्टो माइनिंग सिम्युलेटर | BTC ETH SOL',
    metaDescription:
      'दुनिया का #1 मुफ़्त ब्राउज़र क्रिप्टो माइनिंग सिम्युलेटर। बिना किसी हार्डवेयर या बिजली खर्च के Bitcoin, Ethereum और Solana की सुरक्षित माइनिंग सीखें।',
    networkBadge: 'नेटवर्क सक्रिय · 180+ देश जुड़े हुए हैं',
    heroTitlePrefix: 'दुनिया का सबसे उन्नत',
    heroTitleHighlight: 'मुफ़्त माइनिंग लैब',
    heroDescription:
      'मुफ़्त बिटकॉइन माइनिंग सिम्युलेटर · मुफ़्त एथेरियम और सोलाना माइनिंग · कोई महंगा हार्डवेयर नहीं, कोई बिजली बिल नहीं। 100% सुरक्षित शैक्षणिक सिमुलेशन।',
    ctaStartMining: 'अभी मुफ़्त माइनिंग शुरू करें',
    ctaNoWallet: 'वॉलेट की आवश्यकता नहीं',
    ctaZeroInvestment: '100% शून्य निवेश',
    ctaZeroLoad: '0% हार्डवेयर लोड',
    statsMiners: 'दुनिया भर में ऑनलाइन माइनर्स',
    statsMined: 'मुफ़्त सिमुलेटेड माइनिंग',
    statsPool: 'hashforgelab.co.uk लंदन पूल',
    feat1Title: '100% ब्राउज़र में',
    feat1Desc: 'आपके फ़ोन या लैपटॉप के CPU को गर्म किए बिना या बैटरी खर्च किए बिना चलता है।',
    feat2Title: '12+ प्रमुख क्रिप्टो कॉइन्स',
    feat2Desc: 'Bitcoin (SHA-256), Ethereum, Solana, Doge, Kaspa, Ton और LTC का सिमुलेशन।',
    feat3Title: '42 वैश्विक भाषाएँ',
    feat3Desc: 'भारत सहित दुनिया के 180+ देशों के लिए स्थानीयकृत भाषा समर्थन।',
    feat4Title: 'शून्य जोखिम',
    feat4Desc: 'छात्रों, शुरुआती लोगों और ब्लॉकचेन शिक्षार्थियों के लिए पूरी तरह सुरक्षित शैक्षणिक टूल।',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    faqSubtitle: 'शून्य हार्डवेयर लोड सुरक्षा, Proof-of-Work और 1-मिनट क्रिप्टो संकेतों के प्रमाणित उत्तर।'
  },
  ar: {
    pageTitle: 'Hashforge Lab – محاكي تعدين العملات الرقمية مجاناً | بيتكوين إيثريوم سولانا',
    metaDescription:
      'أقوى محاكي تعليمي مجاني لتعدين العملات المشفرة عبر المتصفح. جرب تعدين البيتكوين والإيثريوم وسولانا بدون أجهزة تعدين وبدون فاتورة كهرباء.',
    networkBadge: 'الشبكة نشطة · اتصال من أكثر من 180 دولة',
    heroTitlePrefix: 'المختبر الأكثر تطوراً في العالم',
    heroTitleHighlight: 'لتعدين العملات مجاناً',
    heroDescription:
      'محاكي تعدين بيتكوين مجاني · تعدين إيثريوم وسولانا بدون أجهزة · صفر استهلاك للكهرباء · محاكاة تعليمية آمنة 100% لتقنيات البلوكشين وإثبات العمل.',
    ctaStartMining: 'ابدأ التعدين المجاني الآن',
    ctaNoWallet: 'لا يتطلب محفظة رقمية',
    ctaZeroInvestment: 'استثمار مالي صفر 100%',
    ctaZeroLoad: 'حمل على المعالج 0%',
    statsMiners: 'المعدنون المتصلون عالمياً',
    statsMined: 'إجمالي المحاكاة المجانية',
    statsPool: 'خادم لندن العالمي UK',
    feat1Title: '100% داخل المتصفح',
    feat1Desc: 'يعمل بسلاسة دون إجهاد المعالج أو استنزاف بطارية الهاتف.',
    feat2Title: 'أكثر من 12 عملة رقمية',
    feat2Desc: 'محاكاة بيتكوين (SHA-256) وإيثريوم وسولانا ودوجكوين وكاسبا وتون ولايتكوين.',
    feat3Title: '42 لغة عالمية',
    feat3Desc: 'متاح بالعربية و42 لغة لأكثر من 180 دولة حول العالم.',
    feat4Title: 'مخاطرة صفرية',
    feat4Desc: 'أداة تعليمية بحتة آمنة للطلاب والمبتدئين والمهتمين بالعملات المشفرة.',
    faqTitle: 'الأسئلة الشائعة (FAQ)',
    faqSubtitle: 'إجابات موثوقة حول أمان المحاكاة، خوارزميات التشفير، ومؤشرات السوق اللحظية.'
  },
  de: {
    pageTitle: 'Hashforge Lab – Kostenloser Krypto-Mining-Simulator | BTC ETH SOL',
    metaDescription:
      'Der führende kostenlose Browser-Simulator für Krypto-Mining. Simuliere Bitcoin, Ethereum & Solana mit 0 Watt Hardware-Last und ohne Stromkosten.',
    networkBadge: 'NETZWERK AKTIV · 180+ LÄNDER VERBUNDEN',
    heroTitlePrefix: 'Das weltweit modernste',
    heroTitleHighlight: 'KOSTENLOSE Mining-Labor',
    heroDescription:
      'Kostenloser Bitcoin-Mining-Simulator · Ethereum- & Solana-Simulation im Browser · Keine teure Hardware, keine Stromrechnung. 100% sichere Proof-of-Work-Lernumgebung.',
    ctaStartMining: 'JETZT KOSTENLOS STARTEN',
    ctaNoWallet: 'Keine Wallet nötig',
    ctaZeroInvestment: '100% ohne Investition',
    ctaZeroLoad: '0% Hardware-Last',
    statsMiners: 'Miner weltweit online',
    statsMined: 'Kostenlos simuliert',
    statsPool: 'Globaler Pool London UK',
    feat1Title: '100% IM BROWSER',
    feat1Desc: 'Läuft flüssig ohne CPU-Auslastung und ohne Akkuverbrauch.',
    feat2Title: '12+ TOP-COINS',
    feat2Desc: 'Simuliere Bitcoin (SHA-256), Ethereum, Solana, Dogecoin, Kaspa, TON & Litecoin.',
    feat3Title: '42 SPRACHEN',
    feat3Desc: 'Lokalisiert für Deutschland, Österreich, die Schweiz und 180+ Länder.',
    feat4Title: 'NULL RISIKO',
    feat4Desc: 'Reiner Bildungs-Simulator für Studierende, Einsteiger und Technik-Interessierte.',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    faqSubtitle: 'Verifizierte Antworten zu Browser-Sicherheit, SHA-256-Algorithmen und Energiekosten.'
  },
  ru: {
    pageTitle: 'Hashforge Lab – Бесплатный симулятор майнинга криптовалют | BTC ETH SOL',
    metaDescription:
      'Ведущий бесплатный браузерный симулятор майнинга. Изучайте майнинг Bitcoin, Ethereum и Solana без нагрузки на видеокарту и без счетов за электричество.',
    networkBadge: 'СЕТЬ АКТИВНА · ПОДКЛЮЧЕНО 180+ СТРАН',
    heroTitlePrefix: 'Самая передовая в мире',
    heroTitleHighlight: 'БЕСПЛАТНАЯ майнинг-лаборатория',
    heroDescription:
      'Бесплатный симулятор майнинга Биткоина, Эфириума и Соланы прямо в браузере. Без видеокарт и расходов на электроэнергию. 100% безопасное обучение Proof-of-Work.',
    ctaStartMining: 'НАЧАТЬ БЕСПЛАТНЫЙ МАЙНИНГ',
    ctaNoWallet: 'Кошелек не требуется',
    ctaZeroInvestment: '100% без вложений',
    ctaZeroLoad: '0% нагрузки на ПК',
    statsMiners: 'Майнеров онлайн в мире',
    statsMined: 'Симулировано бесплатно',
    statsPool: 'Глобальный пул Лондон UK',
    feat1Title: '100% В БРАУЗЕРЕ',
    feat1Desc: 'Работает плавно, не нагревает процессор и не сажает батарею.',
    feat2Title: '12+ ПОПУЛЯРНЫХ МОНЕТ',
    feat2Desc: 'Симуляция Bitcoin (SHA-256), Ethereum, Solana, Dogecoin, Kaspa, TON и Litecoin.',
    feat3Title: '42 ЯЗЫКА МИРА',
    feat3Desc: 'Полная поддержка пользователей из более чем 180 стран мира.',
    feat4Title: 'НУЛЕВОЙ РИСК',
    feat4Desc: 'Образовательный симулятор для студентов, новичков и исследователей блокчейна.',
    faqTitle: 'Часто задаваемые вопросы (FAQ)',
    faqSubtitle: 'Проверенные ответы о безопасности симуляции, алгоритмах SHA-256 и сигналах рынка.'
  },
  ja: {
    pageTitle: 'Hashforge Lab – 無料暗号資産マイニングシミュレーター | BTC ETH SOL',
    metaDescription:
      '世界最先端の無料ブラウザ暗号資産マイニングシミュレーター。ハードウェア負荷ゼロ・電気代ゼロで、ビットコイン、イーサリアム、ソラナの仕組みを安全に体験。',
    networkBadge: 'ネットワーク稼働中 · 180以上の国と地域が接続',
    heroTitlePrefix: '世界最先端の',
    heroTitleHighlight: '無料マイニングラボ',
    heroDescription:
      '無料ビットコインマイニングシミュレーター · イーサリアム＆ソラナ仮想採掘 · 専用マシン不要・電気代0円。100%安全な教育用プルーフ・オブ・ワーク体験ツール。',
    ctaStartMining: '今すぐ無料マイニングを開始',
    ctaNoWallet: 'ウォレット接続不要',
    ctaZeroInvestment: '初期投資 0円',
    ctaZeroLoad: 'CPU/GPU負荷 0%',
    statsMiners: '世界中のオンライン利用者',
    statsMined: '無料シミュレーション累計',
    statsPool: 'ロンドン グローバルプール',
    feat1Title: '100% ブラウザ完結',
    feat1Desc: 'PCやスマホのCPUを酷使せず、バッテリー消費なしで軽快に動作します。',
    feat2Title: '12種類以上の主要通貨',
    feat2Desc: 'Bitcoin (SHA-256)、Ethereum、Solana、Dogecoin、Kaspa、TON、LTCに対応。',
    feat3Title: '42言語に完全対応',
    feat3Desc: '日本語をはじめ世界180カ国以上のユーザー向けにローカライズ済み。',
    feat4Title: 'リスクゼロの教育設計',
    feat4Desc: 'ブロックチェーンの仕組みを学ぶ学生や初心者のための安全な学習環境。',
    faqTitle: 'よくある質問 (FAQ)',
    faqSubtitle: 'ハードウェアの安全性、SHA-256難易度調整、1分足シグナルに関する公式回答。'
  },
  tr: {
    pageTitle: 'Hashforge Lab – Ücretsiz Kripto Madencilik Simülatörü | BTC ETH SOL',
    metaDescription:
      'Donanım yükü ve elektrik faturası olmadan tarayıcıda ücretsiz Bitcoin, Ethereum ve Solana madenciliğini simüle edin. 42 dilde %100 güvenli eğitim platformu.',
    networkBadge: 'AĞ AKTİF · 180+ ÜLKE BAĞLI',
    heroTitlePrefix: 'Dünyanın En Gelişmiş',
    heroTitleHighlight: 'ÜCRETSİZ Madencilik Labı',
    heroDescription:
      'Ücretsiz Bitcoin Madencilik Simülatörü · Ethereum ve Solana Simülasyonu · Ekran kartı gerektirmez, sıfır elektrik maliyeti. %100 güvenli Proof-of-Work eğitim aracı.',
    ctaStartMining: 'HEMEN ÜCRETSİZ BAŞLAT',
    ctaNoWallet: 'Cüzdan gerekmez',
    ctaZeroInvestment: '%100 Yatırımsız',
    ctaZeroLoad: '%0 Donanım Yükü',
    statsMiners: 'Dünya Çapında Çevrimiçi',
    statsMined: 'Ücretsiz Simüle Edilen',
    statsPool: 'Londra Küresel Havuz',
    feat1Title: '%100 TARAYICIDA',
    feat1Desc: 'İşlemcinizi ısıtmadan ve cihaz pilini tüketmeden sorunsuz çalışır.',
    feat2Title: '12+ POPÜLER COİN',
    feat2Desc: 'Bitcoin (SHA-256), Ethereum, Solana, Dogecoin, Kaspa, TON ve Litecoin.',
    feat3Title: '42 DİL DESTEĞİ',
    feat3Desc: 'Türkiye dahil 180’den fazla ülke için yerel dil desteği.',
    feat4Title: 'SIFIR RİSK',
    feat4Desc: 'Öğrenciler ve blokzincir meraklıları için tamamen güvenli eğitim simülatörü.',
    faqTitle: 'Sıkça Sorulan Sorular (SSS)',
    faqSubtitle: 'Donanım güvenliği, SHA-256 madencilik matematiği ve 1 dakikalık sinyaller hakkında bilgiler.'
  }
};

export function getLocaleCopy(langCode: string, nativeName: string, slogan: string): LocaleCopy {
  const direct = LOCALE_COPY[langCode.toLowerCase()];
  if (direct) return direct;

  // Tailored native fallback for the remaining supported languages so every ?lang= URL has unique native title, H1, and description
  const base = LOCALE_COPY.en;
  return {
    ...base,
    pageTitle: `${nativeName} – Hashforge Lab | Free Crypto Mining Simulator`,
    metaDescription: `${slogan} (${nativeName}). Simulate Bitcoin, Ethereum & Solana in your browser with 0 hardware wear and 0 electricity bills.`,
    heroTitlePrefix: nativeName,
    heroTitleHighlight: slogan
  };
}
