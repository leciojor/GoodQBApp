"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, RotateCw, RotateCcw } from "lucide-react"

export default function PlayerControls({ player, onUpdate }) {
  const [localPlayer, setLocalPlayer] = useState(player)

  // Update local state when selected player changes
  useEffect(() => {
    setLocalPlayer(player)
  }, [player])

  // Handle input changes
  const handleChange = (field, value) => {
    const updatedPlayer = { ...localPlayer, [field]: value }
    setLocalPlayer(updatedPlayer)
    onUpdate(updatedPlayer)
  }

  // Handle position changes
  const handlePositionChange = (axis, value) => {
    const updatedPosition = { ...localPlayer.position, [axis]: value }
    const updatedPlayer = {
      ...localPlayer,
      position: updatedPosition,
      targetPosition: updatedPosition,
    }
    setLocalPlayer(updatedPlayer)
    onUpdate(updatedPlayer)
  }

  // Handle target position changes
  const handleTargetChange = (axis, value) => {
    const updatedTarget = { ...localPlayer.targetPosition, [axis]: value }
    const updatedPlayer = {
      ...localPlayer,
      targetPosition: updatedTarget,
      isMoving: true,
    }
    setLocalPlayer(updatedPlayer)
    onUpdate(updatedPlayer)
  }

  // Move player in a specific direction
  const moveInDirection = (direction, distance = 5) => {
    const currentX = localPlayer.position.x
    const currentY = localPlayer.position.y
    let targetX = currentX
    let targetY = currentY

    switch (direction) {
      case "up":
        targetY = currentY - distance
        break
      case "down":
        targetY = currentY + distance
        break
      case "left":
        targetX = currentX - distance
        break
      case "right":
        targetX = currentX + distance
        break
    }

    const updatedPlayer = {
      ...localPlayer,
      targetPosition: { x: targetX, y: targetY },
      isMoving: true,
    }

    setLocalPlayer(updatedPlayer)
    onUpdate(updatedPlayer)
  }

  // Rotate player
  const rotatePlayer = (degrees) => {
    const newAngle = (localPlayer.angle + degrees) % 360
    const updatedPlayer = {
      ...localPlayer,
      angle: newAngle,
    }

    setLocalPlayer(updatedPlayer)
    onUpdate(updatedPlayer)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="basic">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="playerNumber">Number</Label>
                <Input
                  id="playerNumber"
                  type="number"
                  value={localPlayer.number}
                  onChange={(e) => handleChange("number", Number.parseInt(e.target.value))}
                  min={1}
                  max={99}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="playerLabel">Position Label</Label>
                <Input
                  id="playerLabel"
                  value={localPlayer.label}
                  onChange={(e) => handleChange("label", e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerColor">Player Color</Label>
              <div className="flex gap-2">
                <Input
                  id="playerColor"
                  type="color"
                  value={localPlayer.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={localPlayer.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="position">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current X: {localPlayer.position.x.toFixed(1)}</Label>
                    <Slider
                      min={0}
                      max={120}
                      step={0.5}
                      value={[localPlayer.position.x]}
                      onValueChange={(value) => handlePositionChange("x", value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Current Y: {localPlayer.position.y.toFixed(1)}</Label>
                    <Slider
                      min={0}
                      max={53.3}
                      step={0.5}
                      value={[localPlayer.position.y]}
                      onValueChange={(value) => handlePositionChange("y", value[0])}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target X: {localPlayer.targetPosition.x.toFixed(1)}</Label>
                    <Slider
                      min={0}
                      max={120}
                      step={0.5}
                      value={[localPlayer.targetPosition.x]}
                      onValueChange={(value) => handleTargetChange("x", value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Target Y: {localPlayer.targetPosition.y.toFixed(1)}</Label>
                    <Slider
                      min={0}
                      max={53.3}
                      step={0.5}
                      value={[localPlayer.targetPosition.y]}
                      onValueChange={(value) => handleTargetChange("y", value[0])}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => handleChange("isMoving", true)}>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Move to Target
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <Button variant="outline" onClick={() => moveInDirection("up")}>
                ↑
              </Button>
              <div></div>

              <Button variant="outline" onClick={() => moveInDirection("left")}>
                ←
              </Button>
              <Button variant="outline" onClick={() => moveInDirection("down")}>
                ↓
              </Button>
              <Button variant="outline" onClick={() => moveInDirection("right")}>
                →
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="movement">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Speed: {localPlayer.speed.toFixed(1)}</Label>
              <Slider
                min={1}
                max={20}
                step={0.5}
                value={[localPlayer.speed]}
                onValueChange={(value) => handleChange("speed", value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Acceleration: {localPlayer.acceleration.toFixed(1)}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[localPlayer.acceleration]}
                onValueChange={(value) => handleChange("acceleration", value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Direction Angle: {localPlayer.angle.toFixed(0)}°</Label>
              <Slider
                min={0}
                max={359}
                step={5}
                value={[localPlayer.angle]}
                onValueChange={(value) => handleChange("angle", value[0])}
              />

              <div className="flex justify-between mt-2">
                <Button variant="outline" size="sm" onClick={() => rotatePlayer(-45)}>
                  <RotateCcw className="h-4 w-4 mr-1" /> 45°
                </Button>

                <Button variant="outline" size="sm" onClick={() => rotatePlayer(45)}>
                  <RotateCw className="h-4 w-4 mr-1" /> 45°
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
