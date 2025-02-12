"use client";

import { useEffect, useState } from "react";
import { PrayerTimes } from "@/components/prayer-times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function PrayerTimesPage() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("❌ Erreur de localisation :", error);
          setError("Impossible d'obtenir la localisation. Veuillez autoriser l'accès à votre position.");
          setLoading(false);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
          const response = await fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${location.latitude}&longitude=${location.longitude}&method=2`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("📡 Réponse API reçue - Statut:", response.status);

          if (!response.ok) {
            throw new Error(`Erreur API - Code: ${response.status}`);
          }

          const data = await response.json();
          console.log("✅ Données de l'API reçues :", data);

          if (!data || !data.data || !data.data.timings) {
            throw new Error("Les données reçues sont vides ou invalides.");
          }

          setPrayerTimes(data.data.timings);
        } catch (error) {
          console.error("❌ Erreur lors du chargement des horaires :", error);
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
      } finally {
        setLoading(false);
      }
    }

    if (location) {
      fetchPrayerTimes();
    }
  }, [location]);
  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/12.jpg" alt="Kaaba" fill className="object-cover opacity-10" priority />
      </div>
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Image
            src="/prayer_en.png"
            alt="Prayer Times"
            width={100}
            height={100}
            className="w-24 h-24"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Horaires des Prières</h1>
        <p className="text-xl text-gray-600">Les horaires de prière pour aujourd'hui</p>
      </div>
      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-600">Chargement des horaires...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Veuillez patienter...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600">Erreur</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">{error}</p>
          </CardContent>
        </Card>
      ) : prayerTimes ? (
        <PrayerTimes data={prayerTimes} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600">Impossible de charger les horaires de prière</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Aucune donnée reçue. Vérifiez l'API.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
