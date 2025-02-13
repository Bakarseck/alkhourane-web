"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Clock, Play, Pause, StopCircle, Volume2 } from "lucide-react"
import { Howl } from "howler"

const adhans = [
  { name: "Makkah Adhan", url: "/adhan/a1.mp3" },
  { name: "Madinah Adhan", url: "/adhan/a2.mp3" },
  { name: "Egypt Adhan", url: "/adhan/a3.mp3" },
  { name: "Egypt Adhan", url: "/adhan/a4.mp3" },
]

const staticPrayerTimes = {
  Fajr: "06:35",
  Dhuhr: "13:24",
  Asr: "16:44",
  Maghrib: "19:14",
  Isha: "20:13",
}

export default function PrayerTimesPage() {
  const [selectedAdhan, setSelectedAdhan] = useState(adhans[0])
  const [adhanPlayer, setAdhanPlayer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [nextPrayer, setNextPrayer] = useState({ name: "", time: "", countdown: "" })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      setCurrentTime(timeStr)

      // Calculate next prayer
      const currentTimeMinutes = now.getHours() * 60 + now.getMinutes()
      let nextPrayerName = ""
      let nextPrayerTime = ""
      let minDiff = Number.POSITIVE_INFINITY

      Object.entries(staticPrayerTimes).forEach(([prayer, time]) => {
        const [hours, minutes] = time.split(":").map(Number)
        const prayerMinutes = hours * 60 + minutes
        const diff = prayerMinutes - currentTimeMinutes

        if (diff > 0 && diff < minDiff) {
          minDiff = diff
          nextPrayerName = prayer
          nextPrayerTime = time
        }
      })

      // If no next prayer found today, it's Fajr tomorrow
      if (!nextPrayerName) {
        nextPrayerName = "Fajr"
        nextPrayerTime = staticPrayerTimes.Fajr
        minDiff =
          24 * 60 -
          currentTimeMinutes +
          (Number.parseInt(staticPrayerTimes.Fajr.split(":")[0]) * 60 +
            Number.parseInt(staticPrayerTimes.Fajr.split(":")[1]))
      }

      const hours = Math.floor(minDiff / 60)
      const minutes = minDiff % 60
      const countdown = `Dans ${hours}h ${minutes}min`

      setNextPrayer({ name: nextPrayerName, time: nextPrayerTime, countdown })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const playAdhan = () => {
    if (adhanPlayer) adhanPlayer.stop()
    const player = new Howl({
      src: [selectedAdhan.url],
      volume: 1.0,
      loop: false,
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    })
    player.play()
    setAdhanPlayer(player)
  }

  const togglePlayPause = () => {
    if (adhanPlayer) {
      if (isPlaying) {
        adhanPlayer.pause()
      } else {
        adhanPlayer.play()
      }
    } else {
      playAdhan()
    }
  }

  const stopAdhan = () => {
    if (adhanPlayer) adhanPlayer.stop()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      {/* Next Prayer Card */}
      <Card className="bg-green-500 text-white p-6 rounded-2xl">
        <div className="space-y-2">
          <p className="text-xl">Prochaine prière</p>
          <h1 className="text-4xl font-bold">{nextPrayer.name}</h1>
          <div className="flex items-center text-3xl">
            <Clock className="mr-2" />
            {nextPrayer.time}
          </div>
          <p className="text-xl">{nextPrayer.countdown}</p>
        </div>
        <div className="absolute top-6 right-6">
          <p className="text-lg">Heure actuelle</p>
          <p className="text-4xl font-bold">{currentTime}</p>
        </div>
      </Card>

      {/* Adhan Player Card */}
      <Card className="p-6">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-6 h-6 text-green-500" />
              <Select
                value={selectedAdhan.url}
                onValueChange={(value) => setSelectedAdhan(adhans.find((adhan) => adhan.url === value))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Choisir l'Adhan" />
                </SelectTrigger>
                <SelectContent>
                  {adhans.map((adhan, index) => (
                    <SelectItem key={index} value={adhan.url}>
                      {adhan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={togglePlayPause} variant="outline" size="icon" className="text-green-500">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button onClick={stopAdhan} variant="outline" size="icon" className="text-green-500">
                <StopCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(staticPrayerTimes).map(([prayer, time]) => (
          <Card key={prayer} className={`p-4 ${prayer === nextPrayer.name ? "bg-green-500 text-white" : "bg-white"}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{prayer}</span>
              </div>
              <span className="text-xl font-bold">{time}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

