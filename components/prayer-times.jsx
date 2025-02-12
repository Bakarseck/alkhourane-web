"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

function timeToTimestamp(timeStr) {
  if (!timeStr) return 0;

  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 0;

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes).getTime();
  } catch (error) {
    console.error("Error converting time to timestamp:", error);
    return 0;
  }
}

function formatTimeRemaining(msLeft) {
  if (msLeft <= 0) return "0:00";
  const hours = Math.floor(msLeft / 3600000);
  const minutes = Math.floor((msLeft % 3600000) / 60000);
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

export function PrayerTimes({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  const prayerTimes = [
    { name: "Fajr", time: data.Fajr, timestamp: timeToTimestamp(data.Fajr) },
    { name: "Dhuhr", time: data.Dhuhr, timestamp: timeToTimestamp(data.Dhuhr) },
    { name: "Asr", time: data.Asr, timestamp: timeToTimestamp(data.Asr) },
    { name: "Maghrib", time: data.Maghrib, timestamp: timeToTimestamp(data.Maghrib) },
    { name: "Isha", time: data.Isha, timestamp: timeToTimestamp(data.Isha) },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      const currentTimestamp = now.getTime();
      let nextPrayerTime = null;

      for (const prayer of prayerTimes) {
        if (prayer.timestamp > currentTimestamp) {
          nextPrayerTime = prayer;
          break;
        }
      }

      if (!nextPrayerTime && prayerTimes[0]) {
        nextPrayerTime = {
          ...prayerTimes[0],
          timestamp: timeToTimestamp(prayerTimes[0].time) + 86400000,
        };
      }

      if (nextPrayerTime) {
        setNextPrayer(nextPrayerTime);
        const timeLeft = nextPrayerTime.timestamp - currentTimestamp;
        setTimeRemaining(formatTimeRemaining(timeLeft));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl transform hover:scale-[1.02] transition-all duration-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-green-100 font-medium mb-2">Prochaine prière</p>
              <h2 className="text-3xl font-bold mb-2">{nextPrayer?.name}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="w-5 h-5 text-green-100" />
                <p className="text-2xl font-semibold">{nextPrayer?.time}</p>
              </div>
              <p className="text-green-100 mt-2">Dans {timeRemaining}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-green-100 font-medium mb-1">Heure actuelle</p>
              <p className="text-3xl font-bold">
                {currentTime.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prayerTimes.map((prayer) => (
          <Card
            key={prayer.name}
            className={`transform transition-all duration-200 ${
              nextPrayer?.name === prayer.name
                ? "bg-green-50 ring-2 ring-green-500 shadow-lg scale-105"
                : "hover:shadow-md hover:scale-102"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock
                    className={`w-5 h-5 mr-2 ${nextPrayer?.name === prayer.name ? "text-green-600" : "text-gray-400"}`}
                  />
                  <h3
                    className={`font-medium ${nextPrayer?.name === prayer.name ? "text-green-900" : "text-gray-900"}`}
                  >
                    {prayer.name}
                  </h3>
                </div>
                <p className="text-lg font-semibold text-gray-900">{prayer.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
