"use client";

import { SurahReader } from "../../../components/surah-reader";
import { getSurah, Surah } from "../../../utils/fetchSurah";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SurahPage({ params }: { params: { surahId: string } }) {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSurah() {
      console.log("🔄 Chargement de la sourate ID :", params.surahId);
      const surahData = await getSurah(Number(params.surahId));
      console.log("📌 Résultat récupéré :", surahData);
      setSurah(surahData);
      setLoading(false);
    }

    fetchSurah();
  }, [params.surahId]);

  if (loading) {
    return <div className="text-center text-gray-600">Chargement en cours...</div>;
  }

  if (!surah) {
    return <div className="text-center text-red-500">⚠️ Sourate non trouvée</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/bg4.png" alt="Kaaba" fill className="object-cover opacity-50" priority />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{surah.arabicName}</h1>
        <p className="text-xl text-gray-600">
          {surah.name} - {surah.versesCount} versets
        </p>
      </div>
      <SurahReader surah={surah} />
    </div>
  );
}

