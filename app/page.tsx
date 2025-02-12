import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/12.jpg" alt="Kaaba" fill className="object-cover opacity-10" priority />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue sur notre site islamique</h1>
        <p className="text-xl text-gray-600">Découvrez le Saint Coran et les 99 noms d'Allah</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          href="/quran"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Image
            src="/logo_en.png"
            alt="Quran"
            width={100}
            height={100}
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Le Saint Coran</h2>
          <p className="text-gray-600 text-center">Lisez et explorez le Saint Coran</p>
        </Link>

        <Link
          href="/names"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Image
            src="/name_god_en.png"
            alt="99 Names"
            width={100}
            height={100}
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Les 99 Noms d'Allah</h2>
          <p className="text-gray-600 text-center">Découvrez les 99 noms d'Allah</p>
        </Link>
        <Link
          href="/prayer-times"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Image
            src="/prayer_en.png"
            alt="99 Names"
            width={100}
            height={100}
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Les Horaires de prières</h2>
          <p className="text-gray-600 text-center">Découvrez les horaires de prières</p>
        </Link>
      </div>
    </div>
  )
}

