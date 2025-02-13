"use client";
import { useEffect, useState } from "react";
import { PrayerTimes } from "@/components/prayer-times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Howl } from "howler";

const adhans = [
  { name: "Makkah Adhan", url: "/adhan/a1.mp3" },
  { name: "Madinah Adhan", url: "/adhan/a2.mp3" },
  { name: "Egypt Adhan", url: "/adhan/a3.mp3" },
  { name: "Egypt Adhan", url: "/adhan/a4.mp3" },
];

export default function PrayerTimesPage() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedAdhan, setSelectedAdhan] = useState(adhans[0]);
  const [adhanPlayer, setAdhanPlayer] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);


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
        if (!location) return;

        const response = await fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${location.latitude}&longitude=${location.longitude}&method=2`);

        console.log("📡 Réponse API reçue - Statut:", response.status);

        if (!response.ok) {
          throw new Error(`Erreur API - Code: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Données de l'API reçues :", data);

        if (!data || !data.data || !data.data.timings) {
          throw new Error("Les données reçues sont vides ou invalides.");
        }

        setPrayerTimes({
          Fajr: data.data.timings.Fajr,
          Dhuhr: data.data.timings.Dhuhr,
          Asr: data.data.timings.Asr,
          Maghrib: data.data.timings.Maghrib,
          Isha: data.data.timings.Isha,
        });
      } catch (error) {
        console.error("❌ Erreur lors du chargement des horaires :", error);
        setError(error.message || "Une erreur inconnue est survenue");
      } finally {
        setLoading(false);
      }
    }

    fetchPrayerTimes();
  }, [location]);

  useEffect(() => {
    if (prayerTimes) {
      const checkPrayerTimes = setInterval(() => {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;
        if (Object.values(prayerTimes).includes(currentTime)) {
          playAdhan();
        }
      }, 60000);
      return () => clearInterval(checkPrayerTimes);
    }
  }, [prayerTimes]);

  const playAdhan = () => {
    setHasInteracted(true); // Indique que l'utilisateur a cliqué une première fois
    if (adhanPlayer) adhanPlayer.stop();
    const player = new Howl({
      src: [selectedAdhan.url],
      volume: 1.0,
      loop: false,
      html5: true,
    });
    player.play();
    setAdhanPlayer(player);
  };


  const pauseAdhan = () => {
    if (adhanPlayer) adhanPlayer.pause();
  };

  const stopAdhan = () => {
    if (adhanPlayer) adhanPlayer.stop();
  };

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
      <div className="text-center mb-4">
        <label className="block mb-2 font-medium">Choisir l'Adhan :</label>
        <select onChange={(e) => setSelectedAdhan(adhans[e.target.selectedIndex])} className="px-4 py-2 border rounded-md">
          {adhans.map((adhan, index) => (
            <option key={index} value={adhan.url}>{adhan.name}</option>
          ))}
        </select>
        {!hasInteracted && (
          <div className="text-center mt-4">
            <button onClick={playAdhan} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              🔊 Écouter l'Adhan
            </button>
          </div>
        )}
        {adhanPlayer && (
          <div className="mt-4 flex flex-col items-center">
            <div className="flex space-x-4 mt-2">
              {!adhanPlayer.playing() && (
                <button onClick={() => adhanPlayer.play()} className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Jouer
                </button>
              )}
              {adhanPlayer.playing() && (
                <>
                  <button onClick={() => adhanPlayer.pause()} className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                    Pause
                  </button>
                  <button onClick={() => adhanPlayer.stop()} className="px-4 py-2 bg-red-500 text-white rounded-md">
                    Arrêter
                  </button>
                </>
              )}
            </div>
          </div>
        )}

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
      ) : null}
    </div>
  );
}
