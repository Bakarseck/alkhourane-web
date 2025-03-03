"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Button } from "../components/ui/button"
import { Slider } from "../components/ui/slider"
import { Volume2, VolumeX, Play, Pause, SkipBack, Music2 } from "lucide-react"
import { Howl } from "howler";

const adhans = [
  { name: "Makkah Adhan", url: "/adhan/a1.mp3" },
  { name: "Madinah Adhan", url: "/adhan/a2.mp3" },
  { name: "Egypt Adhan", url: "/adhan/a3.mp3" },
  { name: "Egypt Adhan", url: "/adhan/a4.mp3" },
]


export const AdhanPlayer = forwardRef((props, ref) => {
  const [selectedAdhan, setSelectedAdhan] = useState(adhans[0])
  const [adhanPlayer, setAdhanPlayer] = useState<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (adhanPlayer) {
      adhanPlayer.stop()
    }
    const player = new Howl({
      src: [selectedAdhan.url],
      volume: volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => {
        setIsPlaying(false)
        setCurrentTime(0)
      },
      onload: () => {
        setDuration(player.duration())
      },
    })
    setAdhanPlayer(player)
  }, [selectedAdhan])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && adhanPlayer) {
      interval = setInterval(() => {
        setCurrentTime(adhanPlayer.seek())
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, adhanPlayer])

  useImperativeHandle(ref, () => ({
    playAdhan: () => {
      if (adhanPlayer) {
        adhanPlayer.stop();
      }

      const player = new Howl({
        src: [selectedAdhan.url],
        volume: volume,
        html5: true,
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
      });

      setAdhanPlayer(player);
      player.play();
    },
  }));

  const togglePlayPause = () => {
    if (adhanPlayer) {
      if (isPlaying) {
        adhanPlayer.pause()
      } else {
        adhanPlayer.play()
      }
    }
  }

  const restartAdhan = () => {
    if (adhanPlayer) {
      adhanPlayer.seek(0)
      adhanPlayer.play()
    }
  }

  const toggleMute = () => {
    if (adhanPlayer) {
      if (isMuted) {
        adhanPlayer.volume(volume)
      } else {
        adhanPlayer.volume(0)
      }
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (adhanPlayer) {
      adhanPlayer.volume(newVolume)
    }
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Music2 className="w-5 h-5 text-primary" />
          <span>Adhan Player</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Select
            value={selectedAdhan.url}
            onValueChange={(value) => setSelectedAdhan(adhans.find((adhan) => adhan.url === value) || adhans[0])}
          >
            <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={(value) => {
                if (adhanPlayer) {
                  adhanPlayer.seek(value[0])
                  setCurrentTime(value[0])
                }
              }}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-[120px]">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="text-primary">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={restartAdhan} className="text-primary">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button variant="default" size="icon" onClick={togglePlayPause} className="h-12 w-12 rounded-full">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
});

