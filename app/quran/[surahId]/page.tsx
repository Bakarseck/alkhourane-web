import { SurahReader } from "@/components/surah-reader"

interface Verse {
  number: number
  arabic: string
  translation: string
  audio: string
}

const surahData: { [key: number]: { number: number; name: string; arabicName: string; versesCount: number; bismillah: string; verses: Verse[] } } = {
  1: {
    number: 1,
    name: "Al-Fatiha",
    arabicName: "الفَاتِحَة",
    versesCount: 7,
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    verses: [
      {
        number: 1,
        arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
        translation: "Louange à Allah, Seigneur de l'univers",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001001.mp3",
      },
      {
        number: 2,
        arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        translation: "Le Tout Miséricordieux, le Très Miséricordieux",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001002.mp3",
      },
      {
        number: 3,
        arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
        translation: "Maître du Jour de la rétribution",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001003.mp3",
      },
      {
        number: 4,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001004.mp3",
      },
      {
        number: 5,
        arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
        translation: "Guide-nous dans le droit chemin",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001005.mp3",
      },
      {
        number: 6,
        arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        translation: "Le chemin de ceux que Tu as comblés de faveurs",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001006.mp3",
      },
      {
        number: 7,
        arabic: "غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
        translation: "Non pas de ceux qui ont encouru Ta colère, ni des égarés",
        audio: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001007.mp3",
      },
    ],
  },
}

export default function SurahPage({ params }: { params: { surahId: string } }) {
  const surah = surahData[Number(params.surahId)]

  if (!surah) {
    return <div>Sourate non trouvée</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{surah.arabicName}</h1>
        <p className="text-xl text-gray-600">
          {surah.name} - {surah.versesCount} versets
        </p>
      </div>

      <SurahReader surah={surah} />
    </div>
  )
}

