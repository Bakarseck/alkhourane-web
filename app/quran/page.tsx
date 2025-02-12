"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface Surah {
  id: number;
  numero: number;
  countVerset: number;
  transcription: string;
  arabicText: string;
  translation?: string; // Nom traduit en français ou autre langue
  audioUrl?: string; // Lien de l'audio en français ou autre langue
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const response = await fetch("https://www.alkhourane.org/api/sourate/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur API - Code: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Données API reçues :", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("Données invalides reçues de l'API.");
        }

        // Formatage des données pour inclure la traduction française si disponible
        const formattedSurahs = data.map((item: any) => {
          // Récupérer la traduction en français si disponible, sinon utiliser l'anglais
          const frenchTranslation = item.translations.find((t: any) => t.langCode === "fr");
          const englishTranslation = item.translations.find((t: any) => t.langCode === "en");

          return {
            id: item.id,
            numero: item.numero,
            countVerset: item.countVerset,
            transcription: item.transcription,
            arabicText: item.arabicText,
            translation: frenchTranslation?.translation || englishTranslation?.translation || "Sans titre",
            audioUrl: frenchTranslation?.audioUrl || englishTranslation?.audioUrl || null,
          };
        });

        setSurahs(formattedSurahs);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des sourates :", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSurahs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/12.jpg" alt="Kaaba" fill className="object-cover opacity-10" priority />
      </div>

      {/* Titre */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Le Saint Coran</h1>
        <p className="text-xl text-gray-600">Lisez et explorez les sourates du Saint Coran</p>
      </div>

      {/* Gestion du chargement et des erreurs */}
      {loading ? (
        <p className="text-center text-gray-600">Chargement des sourates...</p>
      ) : error ? (
        <p className="text-center text-red-600">Erreur : {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <Link key={surah.numero} href={`/quran/${surah.numero}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">Sourate {surah.numero}</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{surah.arabicText}</h2>
                    <p className="text-lg font-medium text-green-600 mb-1">{surah.transcription}</p>
                    <p className="text-gray-600">{surah.translation}</p>
                    <p className="text-gray-500">{surah.countVerset} versets</p>

                    {/* Audio si disponible */}
                    {surah.audioUrl && (
                      <audio controls className="mt-4 mx-auto">
                        <source src={surah.audioUrl} type="audio/mp3" />
                        Votre navigateur ne supporte pas l'audio.
                      </audio>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
