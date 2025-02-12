import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Name {
  number: number
  arabic: string
  latin: string
  french: string
}

const names: Name[] = [
  {
    number: 1,
    arabic: "الرَّحْمَنُ",
    latin: "Ar-Rahman",
    french: "Le Tout Miséricordieux",
  },
  {
    number: 2,
    arabic: "الرَّحِيمُ",
    latin: "Ar-Rahim",
    french: "Le Très Miséricordieux",
  },
  // Ajoutez les autres noms ici
]

export default function NamesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/12.jpg" alt="Kaaba" fill className="object-cover opacity-10" priority />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Les 99 Noms d'Allah</h1>
        <p className="text-xl text-gray-600">Découvrez et apprenez les 99 noms d'Allah</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {names.map((name) => (
          <Card key={name.number} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center">
                <span className="text-sm text-gray-500">#{name.number}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{name.arabic}</h2>
                <p className="text-lg font-medium text-green-600 mb-1">{name.latin}</p>
                <p className="text-gray-600">{name.french}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

