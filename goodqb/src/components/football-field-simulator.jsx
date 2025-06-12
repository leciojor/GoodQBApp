"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Save } from "lucide-react"
import FootballField from "./football-field"
import PlayerControls from "./player-controls"
import { defaultPlays } from "../lib/football-types"

export default function FootballFieldSimulator() {
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [plays, setPlays] = useState(defaultPlays)
  const [currentPlay, setCurrentPlay] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(1)
  const animationRef = useRef(null)
  const lastTimeRef = useRef(0)

  // Initialize players
  useEffect(() => {
    // Create 22 players - 11 for each team
    const initialPlayers = []

    // Offense team (11 players)
    for (let i = 0; i < 11; i++) {
      initialPlayers.push({
        id: `offense-${i}`,
        team: "offense",
        number: i + 1,
        position: getDefaultPosition("offense", i),
        targetPosition: getDefaultPosition("offense", i),
        label: getPositionLabel("offense", i),
        speed: 5,
        angle: 0,
        acceleration: 1,
        color: "#e11d48", // Red for offense
        isMoving: false,
      })
    }

    // Defense team (11 players)
    for (let i = 0; i < 11; i++) {
      initialPlayers.push({
        id: `defense-${i}`,
        team: "defense",
        number: i + 1,
        position: getDefaultPosition("defense", i),
        targetPosition: getDefaultPosition("defense", i),
        label: getPositionLabel("defense", i),
        speed: 5,
        angle: 180,
        acceleration: 1,
        color: "#2563eb", // Blue for defense
        isMoving: false,
      })
    }

    setPlayers(initialPlayers)
  }, [])

  // Animation loop for player movement
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const deltaTime = (time - lastTimeRef.current) * playSpeed * 0.001 // Convert to seconds and apply speed
      lastTimeRef.current = time

      setPlayers((prevPlayers) => {
        return prevPlayers.map((player) => {
          if (!player.isMoving) return player

          const dx = player.targetPosition.x - player.position.x
          const dy = player.targetPosition.y - player.position.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // If player is close enough to target, stop moving
          if (distance < 0.5) {
            return {
              ...player,
              position: { ...player.targetPosition },
              isMoving: false,
            }
          }

          // Calculate direction and new position
          const directionX = dx / distance
          const directionY = dy / distance
          const moveDistance = player.speed * player.acceleration * deltaTime

          // Calculate new position
          const newX = player.position.x + directionX * moveDistance
          const newY = player.position.y + directionY * moveDistance

          // Calculate angle (in degrees) based on movement direction
          const angle = Math.atan2(directionY, directionX) * (180 / Math.PI)

          return {
            ...player,
            position: { x: newX, y: newY },
            angle: angle,
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, playSpeed])

  // Apply a play
  const applyPlay = (play) => {
    setCurrentPlay(play)
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        const playPosition = play.positions.find((pos) => pos.id === player.id)
        if (playPosition) {
          return {
            ...player,
            targetPosition: { ...playPosition.position },
            isMoving: true,
          }
        }
        return player
      })
    })
  }

  // Reset players to default positions
  const resetPlayers = () => {
    setIsPlaying(false)
    setCurrentPlay(null)
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        const defaultPos = getDefaultPosition(player.team, Number.parseInt(player.id.split("-")[1]))
        return {
          ...player,
          position: { ...defaultPos },
          targetPosition: { ...defaultPos },
          isMoving: false,
          angle: player.team === "offense" ? 0 : 180,
        }
      })
    })
  }

  // Save current positions as a new play
  const saveCurrentPlayAsNew = (playName) => {
    const newPlay = {
      id: `play-${plays.length + 1}`,
      name: playName,
      positions: players.map((player) => ({
        id: player.id,
        position: { ...player.position },
      })),
    }

    setPlays([...plays, newPlay])
  }

  // Update player properties
  const updatePlayer = (updatedPlayer) => {
    setPlayers((prevPlayers) => prevPlayers.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p)))

    if (selectedPlayer?.id === updatedPlayer.id) {
      setSelectedPlayer(updatedPlayer)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card className="mb-4">
          <CardContent className="p-4">
            <FootballField players={players} onPlayerSelect={setSelectedPlayer} selectedPlayer={selectedPlayer} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Play Controls</CardTitle>
            <CardDescription>Control the animation and apply plays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>

              <Button onClick={resetPlayers} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <Label htmlFor="speed" className="text-sm">
                  Speed:
                </Label>
                <Slider
                  id="speed"
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[playSpeed]}
                  onValueChange={(value) => setPlaySpeed(value[0])}
                  className="w-32"
                />
                <span className="text-sm w-8">{playSpeed.toFixed(1)}x</span>
              </div>
            </div>

            <Tabs defaultValue="predefined">
              <TabsList className="mb-2">
                <TabsTrigger value="predefined">Predefined Plays</TabsTrigger>
                <TabsTrigger value="save">Save Play</TabsTrigger>
              </TabsList>

              <TabsContent value="predefined">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {plays.map((play) => (
                    <Button
                      key={play.id}
                      variant={currentPlay?.id === play.id ? "default" : "outline"}
                      onClick={() => applyPlay(play)}
                      className="h-auto py-2"
                    >
                      {play.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="save">
                <div className="flex gap-2">
                  <Input id="playName" placeholder="Play name" className="flex-1" />
                  <Button
                    onClick={() => {
                      const input = document.getElementById("playName")
                      if (input.value) {
                        saveCurrentPlayAsNew(input.value)
                        input.value = ""
                      }
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Player Controls</CardTitle>
            <CardDescription>
              {selectedPlayer
                ? `Editing ${selectedPlayer.team} #${selectedPlayer.number} (${selectedPlayer.label})`
                : "Select a player to edit their properties"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPlayer ? (
              <PlayerControls player={selectedPlayer} onUpdate={updatePlayer} />
            ) : (
              <p className="text-muted-foreground">Click on a player to edit their properties</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper functions for default positions
function getDefaultPosition(team, index) {
  const yPos = 50 // Center of field

  if (team === "offense") {
    // Line of scrimmage at 40 yard line
    if (index === 0)
      return { x: 40, y: yPos } // QB
    else if (index < 6) {
      // Offensive line
      return { x: 40, y: yPos - 10 + index * 4 }
    } else if (index === 6)
      return { x: 35, y: yPos - 15 } // WR left
    else if (index === 7)
      return { x: 35, y: yPos + 15 } // WR right
    else if (index === 8)
      return { x: 37, y: yPos } // RB
    else if (index === 9)
      return { x: 38, y: yPos - 5 } // TE left
    else return { x: 38, y: yPos + 5 } // TE right
  } else {
    // Defense
    if (index < 4) {
      // Defensive line
      return { x: 42, y: yPos - 6 + index * 4 }
    } else if (index < 7) {
      // Linebackers
      return { x: 45, y: yPos - 6 + (index - 4) * 6 }
    } else if (index === 7)
      return { x: 50, y: yPos } // Safety
    else if (index === 8)
      return { x: 48, y: yPos - 12 } // CB left
    else if (index === 9)
      return { x: 48, y: yPos + 12 } // CB right
    else if (index === 10)
      return { x: 52, y: yPos - 8 } // Safety deep left
    else return { x: 52, y: yPos + 8 } // Safety deep right
  }
}

function getPositionLabel(team, index) {
  if (team === "offense") {
    const positions = ["QB", "LT", "LG", "C", "RG", "RT", "WR", "WR", "RB", "TE", "TE"]
    return positions[index]
  } else {
    const positions = ["DE", "DT", "DT", "DE", "LB", "MLB", "LB", "S", "CB", "CB", "FS"]
    return positions[index]
  }
}
