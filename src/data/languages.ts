export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  slogan: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', slogan: 'World\'s Most Advanced FREE Mining Lab' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी Free Mining', flag: '🇮🇳', slogan: 'दुनिया का सबसे उन्नत मुफ़्त क्रिप्टो माइनिंग सिम्युलेटर' },
  { code: 'es', name: 'Spanish', nativeName: 'Minería Gratis', flag: '🇪🇸', slogan: 'El simulador de minería cripto GRATUITO más avanzado del mundo' },
  { code: 'ar', name: 'Arabic', nativeName: 'تعدين مجاني', flag: '🇸🇦', slogan: 'أقوى محاكي تعدين عملات مشفرة مجاني في العالم' },
  { code: 'fr', name: 'French', nativeName: 'Minage Gratuit', flag: '🇫🇷', slogan: 'Le simulateur de minage crypto GRATUIT le plus avancé au monde' },
  { code: 'de', name: 'German', nativeName: 'Kostenloses Mining', flag: '🇩🇪', slogan: 'Der weltweit fortschrittlichste KOSTENLOSE Krypto-Mining-Simulator' },
  { code: 'ru', name: 'Russian', nativeName: 'Бесплатный Майнинг', flag: '🇷🇺', slogan: 'Самый продвинутый в мире БЕСПЛАТНЫЙ симулятор майнинга' },
  { code: 'ja', name: 'Japanese', nativeName: '無料マイニング', flag: '🇯🇵', slogan: '世界最先端の無料仮想通貨マイニングシミュレーター' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Mineração Grátis', flag: '🇧🇷', slogan: 'O simulador de mineração cripto GRATUITO mais avançado do mundo' },
  { code: 'zh', name: 'Chinese', nativeName: '免费挖矿', flag: '🇨🇳', slogan: '全球最先进的免费加密货币挖矿模拟器' },
  { code: 'tr', name: 'Turkish', nativeName: 'Ücretsiz Madencilik', flag: '🇹🇷', slogan: 'Dünyanın En Gelişmiş ÜCRETSİZ Kripto Madencilik Simülatörü' },
  { code: 'ng', name: 'Naija / English', nativeName: 'Free Mining Naija', flag: '🇳🇬', slogan: 'Number 1 Free Crypto Mining Simulator in Africa' },
  { code: 'bn', name: 'Bengali', nativeName: 'ফ্রি ক্রিপ্টো মাইনিং', flag: '🇧🇩', slogan: 'বিশ্বের সবচেয়ে উন্নত ফ্রি ক্রিপ্টো মাইনিং সিমুলেটর' },
  { code: 'ur', name: 'Urdu', nativeName: 'مفت کرپٹو مائننگ', flag: '🇵🇰', slogan: 'دنیا کا سب سے جدید مفت کرپٹو مائننگ سمیلیٹر' },
  { code: 'it', name: 'Italian', nativeName: 'Mining Gratuito', flag: '🇮🇹', slogan: 'Il più avanzato simulatore di mining crypto GRATUITO' },
  { code: 'ko', name: 'Korean', nativeName: '무료 크립토 채굴', flag: '🇰🇷', slogan: '세계에서 가장 진보된 무료 암호화폐 채굴 시뮬레이터' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Đào Coin Miễn Phí', flag: '🇻🇳', slogan: 'Trình mô phỏng đào tiền điện tử MIỄN PHÍ tiên tiến nhất thế giới' },
  { code: 'id', name: 'Indonesian', nativeName: 'Mining Gratis', flag: '🇮🇩', slogan: 'Simulator penambangan kripto GRATIS tercanggih di dunia' },
  { code: 'th', name: 'Thai', nativeName: 'ขุดคริปโตฟรี', flag: '🇹🇭', slogan: 'เครื่องมือจำลองการขุดคริปโตฟรีที่ทันสมัยที่สุดในโลก' },
  { code: 'pl', name: 'Polish', nativeName: 'Darmowy Mining', flag: '🇵🇱', slogan: 'Najbardziej zaawansowany darmowy symulator kopania kryptowalut' },
  { code: 'nl', name: 'Dutch', nativeName: 'Gratis Mining', flag: '🇳🇱', slogan: 'Werelds meest geavanceerde gratis crypto mining simulator' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Безкоштовний Майнінг', flag: '🇺🇦', slogan: 'Найдосконаліший безкоштовний симулятор майнінгу криптовалют' },
  { code: 'ro', name: 'Romanian', nativeName: 'Minare Gratuită', flag: '🇷🇴', slogan: 'Cel mai avansat simulator gratuit de minerit cripto' },
  { code: 'el', name: 'Greek', nativeName: 'Δωρεάν Mining', flag: '🇬🇷', slogan: 'Ο πιο προηγμένος δωρεάν προσομοιωτής εξόρυξης κρυπτονομισμάτων' },
  { code: 'cs', name: 'Czech', nativeName: 'Těžba Zdarma', flag: '🇨🇿', slogan: 'Nejpokročilejší bezplatný simulátor těžby kryptoměn' },
  { code: 'sv', name: 'Swedish', nativeName: 'Gratis Mining', flag: '🇸🇪', slogan: 'Världens mest avancerade gratis kryptomining-simulator' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Ingyenes Bányászat', flag: '🇭🇺', slogan: 'A világ legfejlettebb ingyenes kriptobányász szimulátora' },
  { code: 'tl', name: 'Filipino', nativeName: 'Libreng Pagmimina', flag: '🇵🇭', slogan: 'Pinaka-advanced na libreng crypto mining simulator' },
  { code: 'fa', name: 'Persian', nativeName: 'استخراج رایگان', flag: '🇮🇷', slogan: 'پیشرفته‌ترین شبیه‌ساز استخراج رایگان ارز دیجیتال' },
  { code: 'sw', name: 'Swahili', nativeName: 'Uchimbaji Bure', flag: '🇰🇪', slogan: 'Kielelezo cha juu zaidi cha uchimbaji wa crypto bure duniani' },
  { code: 'he', name: 'Hebrew', nativeName: 'כרייה חינם', flag: '🇮🇱', slogan: 'סימולטור כריית קריפטו בחינם המתקדם בעולם' },
  { code: 'ms', name: 'Malay', nativeName: 'Perlombongan Percuma', flag: '🇲🇾', slogan: 'Simulator perlombongan kripto percuma tercanggih di dunia' },
  { code: 'fi', name: 'Finnish', nativeName: 'Ilmainen Louhinta', flag: '🇫🇮', slogan: 'Maailman edistynein ilmainen kryptolouhintasimulaattori' },
  { code: 'da', name: 'Danish', nativeName: 'Gratis Minedrift', flag: '🇩🇰', slogan: 'Verdens mest avancerede gratis kryptomining-simulator' },
  { code: 'no', name: 'Norwegian', nativeName: 'Gratis Utvinning', flag: '🇳🇴', slogan: 'Verdens mest avanserte gratis kryptoutvinningssimulator' },
  { code: 'ta', name: 'Tamil', nativeName: 'இலவச மைனிங்', flag: '🇮🇳', slogan: 'உலகின் மிகவும் மேம்பட்ட இலவச கிரிப்டோ மைனிங் சிமுலேட்டர்' },
  { code: 'te', name: 'Telugu', nativeName: 'ఉచిత మైనింగ్', flag: '🇮🇳', slogan: 'ప్రపంచంలో అత్యంత అధునాతన ఉచిత క్రిప్టో మైనింగ్ సిమ్యులేటర్' },
  { code: 'mr', name: 'Marathi', nativeName: 'मोफत मायनिंग', flag: '🇮🇳', slogan: 'जगातील सर्वात प्रगत मोफत क्रिप्टो मायनिंग सिम्युलेटर' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਮੁਫ਼ਤ ਮਾਈਨਿੰਗ', flag: '🇮🇳', slogan: 'ਦੁਨੀਆ ਦਾ ਸਭ ਤੋਂ ਉੱਨਤ ਮੁਫ਼ਤ ਕ੍ਰਿਪਟੋ ਮਾਈਨਿੰਗ ਸਿਮੂਲੇਟਰ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'મફત માઇનિંગ', flag: '🇮🇳', slogan: 'વિશ્વનું સૌથી અદ્યતન મફત ક્રિપ્ટો માઇનિંગ સિમ્યુલેટર' },
  { code: 'ml', name: 'Malayalam', nativeName: 'സൗജന്യ മൈനിംഗ്', flag: '🇮🇳', slogan: 'ലോകത്തിലെ ഏറ്റവും നൂതനമായ സൗജന്യ ക്രിപ്റ്റോ മൈനിംഗ് സിമുലേറ്റർ' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hakar Crypto Kyauta', flag: '🇳🇬', slogan: 'Mafi kyawun na\'urar hakar crypto ta kyauta a duniya' }
];
