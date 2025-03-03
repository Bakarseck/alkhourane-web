"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";

interface Name {
  numero: number;
  arabicText: string;
  transcription: string;
  translation: string | null;
  audioUrl: string;
}

export default function NamesPage() {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch("https://www.alkhourane.org/api/name_god/list", {
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

        // Extraction des données utiles
        const formattedNames: Name[] = data.map((item: any) => ({
          numero: item.numero,
          arabicText: item.arabicText,
          transcription: item.transcription,
          translation: item.translations.find((t: any) => t.langCode === "fr")?.translation || "Traduction indisponible",
          audioUrl: item.translations.find((t: any) => t.langCode === "fr")?.audioUrl || "",
        }));

        setNames(formattedNames);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des noms :", error);
        setError(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
      } finally {
        setLoading(false);
      }
    }

    fetchNames();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/12.jpg" alt="Kaaba" fill className="object-cover opacity-10" priority />
      </div>

      {/* Titre */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Les 99 Noms d'Allah</h1>
        <p className="text-xl text-gray-600">Découvrez et apprenez les 99 noms d'Allah</p>
      </div>

      {/* Gestion du chargement et des erreurs */}
      {loading ? (
        <p className="text-center text-gray-600">Chargement des noms...</p>
      ) : error ? (
        <p className="text-center text-red-600">Erreur : {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {names.map((name) => (
            <Card key={name.numero} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <span className="text-sm text-gray-500">#{name.numero}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{name.arabicText}</h2>
                  <p className="text-lg font-medium text-green-600 mb-1">{name.transcription}</p>
                  <p className="text-gray-600">{name.translation}</p>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
