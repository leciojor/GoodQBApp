// Default plays
export const defaultPlays = [
  {
    id: "play-1",
    name: "I-Formation",
    positions: [
      // Offense
      { id: "offense-0", position: { x: 40, y: 50 } }, // QB
      { id: "offense-1", position: { x: 40, y: 42 } }, // LT
      { id: "offense-2", position: { x: 40, y: 45 } }, // LG
      { id: "offense-3", position: { x: 40, y: 50 } }, // C
      { id: "offense-4", position: { x: 40, y: 55 } }, // RG
      { id: "offense-5", position: { x: 40, y: 58 } }, // RT
      { id: "offense-6", position: { x: 35, y: 35 } }, // WR left
      { id: "offense-7", position: { x: 35, y: 65 } }, // WR right
      { id: "offense-8", position: { x: 37, y: 50 } }, // FB
      { id: "offense-9", position: { x: 35, y: 50 } }, // RB
      { id: "offense-10", position: { x: 40, y: 62 } }, // TE right

      // Defense
      { id: "defense-0", position: { x: 42, y: 42 } }, // DE
      { id: "defense-1", position: { x: 42, y: 47 } }, // DT
      { id: "defense-2", position: { x: 42, y: 53 } }, // DT
      { id: "defense-3", position: { x: 42, y: 58 } }, // DE
      { id: "defense-4", position: { x: 45, y: 42 } }, // LB
      { id: "defense-5", position: { x: 45, y: 50 } }, // MLB
      { id: "defense-6", position: { x: 45, y: 58 } }, // LB
      { id: "defense-7", position: { x: 50, y: 50 } }, // S
      { id: "defense-8", position: { x: 48, y: 38 } }, // CB left
      { id: "defense-9", position: { x: 48, y: 62 } }, // CB right
      { id: "defense-10", position: { x: 52, y: 50 } }, // FS
    ],
  },
  {
    id: "play-2",
    name: "Shotgun Formation",
    positions: [
      // Offense
      { id: "offense-0", position: { x: 36, y: 50 } }, // QB
      { id: "offense-1", position: { x: 40, y: 42 } }, // LT
      { id: "offense-2", position: { x: 40, y: 45 } }, // LG
      { id: "offense-3", position: { x: 40, y: 50 } }, // C
      { id: "offense-4", position: { x: 40, y: 55 } }, // RG
      { id: "offense-5", position: { x: 40, y: 58 } }, // RT
      { id: "offense-6", position: { x: 35, y: 30 } }, // WR far left
      { id: "offense-7", position: { x: 35, y: 70 } }, // WR far right
      { id: "offense-8", position: { x: 36, y: 42 } }, // Slot WR left
      { id: "offense-9", position: { x: 36, y: 58 } }, // Slot WR right
      { id: "offense-10", position: { x: 38, y: 55 } }, // RB

      // Defense
      { id: "defense-0", position: { x: 42, y: 42 } }, // DE
      { id: "defense-1", position: { x: 42, y: 47 } }, // DT
      { id: "defense-2", position: { x: 42, y: 53 } }, // DT
      { id: "defense-3", position: { x: 42, y: 58 } }, // DE
      { id: "defense-4", position: { x: 45, y: 42 } }, // LB
      { id: "defense-5", position: { x: 45, y: 50 } }, // MLB
      { id: "defense-6", position: { x: 45, y: 58 } }, // LB
      { id: "defense-7", position: { x: 50, y: 50 } }, // S
      { id: "defense-8", position: { x: 48, y: 30 } }, // CB far left
      { id: "defense-9", position: { x: 48, y: 70 } }, // CB far right
      { id: "defense-10", position: { x: 52, y: 50 } }, // FS
    ],
  },
  {
    id: "play-3",
    name: "Spread Offense",
    positions: [
      // Offense
      { id: "offense-0", position: { x: 38, y: 50 } }, // QB
      { id: "offense-1", position: { x: 40, y: 42 } }, // LT
      { id: "offense-2", position: { x: 40, y: 45 } }, // LG
      { id: "offense-3", position: { x: 40, y: 50 } }, // C
      { id: "offense-4", position: { x: 40, y: 55 } }, // RG
      { id: "offense-5", position: { x: 40, y: 58 } }, // RT
      { id: "offense-6", position: { x: 35, y: 25 } }, // WR far left
      { id: "offense-7", position: { x: 35, y: 75 } }, // WR far right
      { id: "offense-8", position: { x: 35, y: 40 } }, // WR left
      { id: "offense-9", position: { x: 35, y: 60 } }, // WR right
      { id: "offense-10", position: { x: 36, y: 50 } }, // RB

      // Defense - Nickel package (5 DBs)
      { id: "defense-0", position: { x: 42, y: 42 } }, // DE
      { id: "defense-1", position: { x: 42, y: 47 } }, // DT
      { id: "defense-2", position: { x: 42, y: 53 } }, // DT
      { id: "defense-3", position: { x: 42, y: 58 } }, // DE
      { id: "defense-4", position: { x: 45, y: 40 } }, // LB
      { id: "defense-5", position: { x: 45, y: 50 } }, // MLB
      { id: "defense-6", position: { x: 45, y: 60 } }, // LB
      { id: "defense-7", position: { x: 48, y: 50 } }, // Nickel back
      { id: "defense-8", position: { x: 48, y: 25 } }, // CB far left
      { id: "defense-9", position: { x: 48, y: 75 } }, // CB far right
      { id: "defense-10", position: { x: 52, y: 50 } }, // FS
    ],
  },
  {
    id: "play-4",
    name: "Goal Line Defense",
    positions: [
      // Offense - Goal line formation
      { id: "offense-0", position: { x: 40, y: 50 } }, // QB under center
      { id: "offense-1", position: { x: 40, y: 40 } }, // LT
      { id: "offense-2", position: { x: 40, y: 44 } }, // LG
      { id: "offense-3", position: { x: 40, y: 50 } }, // C
      { id: "offense-4", position: { x: 40, y: 56 } }, // RG
      { id: "offense-5", position: { x: 40, y: 60 } }, // RT
      { id: "offense-6", position: { x: 40, y: 36 } }, // TE left
      { id: "offense-7", position: { x: 40, y: 64 } }, // TE right
      { id: "offense-8", position: { x: 38, y: 46 } }, // FB
      { id: "offense-9", position: { x: 36, y: 50 } }, // RB
      { id: "offense-10", position: { x: 38, y: 54 } }, // H-back

      // Defense - Goal line defense
      { id: "defense-0", position: { x: 41, y: 38 } }, // DE
      { id: "defense-1", position: { x: 41, y: 44 } }, // DT
      { id: "defense-2", position: { x: 41, y: 50 } }, // NT
      { id: "defense-3", position: { x: 41, y: 56 } }, // DT
      { id: "defense-4", position: { x: 41, y: 62 } }, // DE
      { id: "defense-5", position: { x: 42, y: 41 } }, // LB
      { id: "defense-6", position: { x: 42, y: 47 } }, // LB
      { id: "defense-7", position: { x: 42, y: 53 } }, // LB
      { id: "defense-8", position: { x: 42, y: 59 } }, // LB
      { id: "defense-9", position: { x: 45, y: 45 } }, // S
      { id: "defense-10", position: { x: 45, y: 55 } }, // S
    ],
  },
]
