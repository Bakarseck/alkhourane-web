import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface Surah {
  number: number
  name: string
  arabicName: string
  versesCount: number
}

const surahs: Surah[] = [
  {
    number: 1,
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    versesCount: 7,
  },
  {
    number: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    versesCount: 286,
  },
  // Ajoutez les autres sourates ici
]

export default function QuranPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/12.jpg" alt="Kaaba" fill className="object-cover opacity-10" priority />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Le Saint Coran</h1>
        <p className="text-xl text-gray-600">Lisez et explorez les sourates du Saint Coran</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <Link key={surah.number} href={`/quran/${surah.number}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center">
                  <span className="text-sm text-gray-500">Sourate #{surah.number}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{surah.arabicName}</h2>
                  <p className="text-lg font-medium text-green-600 mb-1">{surah.name}</p>
                  <p className="text-gray-600">{surah.versesCount} versets</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

