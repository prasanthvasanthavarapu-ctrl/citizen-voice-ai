export interface SpeechResult {
  transcript: string;
  detectedLanguage: string;
  translatedText: string;
  confidence: number;
  category: string;
}

export const SAMPLE_VOICE_DEMOS = [
  {
    languageName: 'Telugu (తెలుగు)',
    sampleSpeech: 'మా ఊరిలో తాగునీటి సరఫరా పూర్తిగా ఆగిపోయింది. బోర్లు ఎండిపోయాయి. రక్షిత తాగునీటి పైపులైన్ త్వరగా వేయించండి.',
    translation: 'Drinking water supply in our village has completely ceased. Borewells are dry. Piped drinking water pipeline is urgently required.',
    category: 'drinking_water',
    region: 'Anantapur, Andhra Pradesh',
    country: 'IN' as const,
  },
  {
    languageName: 'Hindi (हिन्दी)',
    sampleSpeech: 'हमारे प्राथमिक स्वास्थ्य केंद्र में 3 महीने से बिजली नहीं है और वैक्सीन खराब हो रही है। तुरंत सौर ऊर्जा ग्रिड लगाई जाए।',
    translation: 'Our primary health center has had no electricity for 3 months and vaccines are spoiling. Deploy solar microgrid immediately.',
    category: 'renewable_energy',
    region: 'Barmer, Rajasthan',
    country: 'IN' as const,
  },
  {
    languageName: 'Portuguese (Português)',
    sampleSpeech: 'Nossa comunidade na encosta precisa de canalização de esgoto sanitário urgente para evitar deslizamentos de terra.',
    translation: 'Our hillside community urgently needs sanitary sewage canalization to prevent landslides during rains.',
    category: 'sanitation',
    region: 'Santos Favelas, São Paulo',
    country: 'BR' as const,
  },
  {
    languageName: 'Russian (Русский)',
    sampleSpeech: 'В нашем поселке при морозе -50 градусов выходит из строя котельная. Необходим автономный теплопункт.',
    translation: 'In our settlement at -50°C frost the heating station keeps failing. Autonomous arctic boiler unit is required.',
    category: 'electricity',
    region: 'Sakha Republic (Yakutia)',
    country: 'RU' as const,
  },
  {
    languageName: 'Mandarin (中文)',
    sampleSpeech: '通往我们村的高山公路发生严重塌方，农产品运不出去，急需水泥硬化和排水涵洞工程。',
    translation: 'The high-mountain road to our village had severe landslides, agricultural goods are blocked, urgent concrete paving and culverts needed.',
    category: 'roads',
    region: 'Liupanshui, Guizhou',
    country: 'CN' as const,
  },
  {
    languageName: 'Zulu (isiZulu)',
    sampleSpeech: 'Amanzi ahlanzekile awafiki ezigodini zethu, imithombo yomile futhi izingane zethu ziyagula.',
    translation: 'Clean drinking water does not reach our rural kraals. The natural streams are dried up and children are getting sick.',
    category: 'drinking_water',
    region: 'Alfred Nzo, Eastern Cape',
    country: 'ZA' as const,
  },
];

export class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  public startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError: (err: any) => void
  ) {
    if (!this.recognition) {
      onError(new Error('SpeechRecognition not supported in this browser.'));
      return;
    }

    this.isListening = true;
    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        onResult(final, true);
      } else {
        onResult(interim, false);
      }
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('Recognition start error:', e);
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn(e);
      }
      this.isListening = false;
    }
  }

  public getSimulatedDemo(index: number = 0) {
    return SAMPLE_VOICE_DEMOS[index % SAMPLE_VOICE_DEMOS.length];
  }
}

export const speechService = new SpeechService();
