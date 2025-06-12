"use client"

import { useRef, useEffect, useState } from "react"

export default function FootballField({ players, onPlayerSelect, selectedPlayer }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedPlayer, setDraggedPlayer] = useState(null)

  // Set up canvas dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        // Football field has 100 yards (plus 10 yards for each end zone)
        // Standard width is about 53.3 yards
        const height = width * (53.3 / 120)
        setDimensions({ width, height })
        setScale(width / 120) // 120 yards total length including end zones
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Draw the football field and players
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || scale === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw field background
    ctx.fillStyle = "#4ade80" // Green field
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw yard lines
    ctx.strokeStyle = "white"
    ctx.lineWidth = 1

    // Draw end zones
    ctx.fillStyle = "#166534" // Darker green for end zones
    ctx.fillRect(0, 0, scale * 10, canvas.height) // Left end zone
    ctx.fillRect(canvas.width - scale * 10, 0, scale * 10, canvas.height) // Right end zone

    // Draw yard lines
    for (let yard = 0; yard <= 120; yard += 5) {
      const x = yard * scale
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()

      // Add yard numbers
      if (yard > 10 && yard < 110 && yard % 10 === 0) {
        ctx.fillStyle = "white"
        ctx.font = `${scale * 2}px Arial`
        ctx.textAlign = "center"

        // Draw yard number on both sides of the field
        const yardNumber = yard < 60 ? yard - 10 : 110 - yard
        ctx.fillText(yardNumber.toString(), x, canvas.height * 0.25)
        ctx.fillText(yardNumber.toString(), x, canvas.height * 0.75)
      }
    }

    // Draw hash marks
    const hashMarkWidth = scale * 1
    for (let yard = 10; yard <= 110; yard += 1) {
      const x = yard * scale

      // Top hash marks
      ctx.beginPath()
      ctx.moveTo(x - hashMarkWidth / 2, canvas.height * 0.33)
      ctx.lineTo(x + hashMarkWidth / 2, canvas.height * 0.33)
      ctx.stroke()

      // Bottom hash marks
      ctx.beginPath()
      ctx.moveTo(x - hashMarkWidth / 2, canvas.height * 0.67)
      ctx.lineTo(x + hashMarkWidth / 2, canvas.height * 0.67)
      ctx.stroke()
    }

    // Draw players
    players.forEach((player) => {
      const x = player.position.x * scale
      const y = player.position.y * scale
      const radius = scale * 1.2

      // Draw player circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = player.color
      ctx.fill()

      // Draw player number
      ctx.fillStyle = "white"
      ctx.font = `bold ${radius}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(player.number.toString(), x, y)

      // Draw direction indicator (arrow)
      const angleRad = player.angle * (Math.PI / 180)
      const arrowLength = radius * 1.5
      const arrowX = x + Math.cos(angleRad) * arrowLength
      const arrowY = y + Math.sin(angleRad) * arrowLength

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(arrowX, arrowY)
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw player label above
      ctx.font = `${radius * 0.8}px Arial`
      ctx.fillStyle = "black"
      ctx.textAlign = "center"
      ctx.fillText(player.label, x, y - radius * 1.8)

      // Highlight selected player
      if (selectedPlayer && player.id === selectedPlayer.id) {
        ctx.beginPath()
        ctx.arc(x, y, radius * 1.3, 0, Math.PI * 2)
        ctx.strokeStyle = "#f59e0b"
        ctx.lineWidth = 3
        ctx.stroke()
      }
    })
  }, [players, dimensions, scale, selectedPlayer])

  // Handle mouse events for player selection and dragging
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current
    if (!canvas || scale === 0) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Check if a player was clicked
    for (const player of players) {
      const playerX = player.position.x * scale
      const playerY = player.position.y * scale
      const radius = scale * 1.2

      const distance = Math.sqrt(Math.pow(mouseX - playerX, 2) + Math.pow(mouseY - playerY, 2))

      if (distance <= radius) {
        onPlayerSelect(player)
        setIsDragging(true)
        setDraggedPlayer(player)
        return
      }
    }

    // If no player was clicked, deselect
    onPlayerSelect(null)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !draggedPlayer || scale === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / scale
    const mouseY = (e.clientY - rect.top) / scale

    // Update the player's position
    const updatedPlayer = {
      ...draggedPlayer,
      position: { x: mouseX, y: mouseY },
      targetPosition: { x: mouseX, y: mouseY },
    }

    // Find and update the player in the players array
    const playerIndex = players.findIndex((p) => p.id === draggedPlayer.id)
    if (playerIndex !== -1) {
      const updatedPlayers = [...players]
      updatedPlayers[playerIndex] = updatedPlayer

      // Update the selected player if it's the one being dragged
      onPlayerSelect(updatedPlayer)
      setDraggedPlayer(updatedPlayer)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedPlayer(null)
  }

  return (
    <div ref={containerRef} className="w-full relative border rounded-md overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-pointer"
      />
    </div>
  )
}
