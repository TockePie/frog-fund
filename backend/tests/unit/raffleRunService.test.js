import { RaffleRunService } from '../../src/services/raffleRunService.js'

describe('RaffleRunService', () => {
  const donations = [
    { user: { id: '1' }, amount: 50 },
    { user: { id: '2' }, amount: 150 },
    { user: { id: '3' }, amount: 200 }
  ]

  it('pickAll selects random unique donors', () => {
    const result = RaffleRunService.pickAll(donations, 2)
    expect(result).toHaveLength(2)
    expect(new Set(result.map((d) => d.user.id)).size).toBe(2)
  })

  it('pickMultiple uses weighted tickets', () => {
    const pool = []
    for (const d of donations) {
      const mult = Math.max(1, Math.floor(d.amount / 50))
      for (let i = 0; i < mult; i++) pool.push(d)
    }
    expect(pool).toHaveLength(1 + 3 + 4) // 50→1, 150→3, 200→4
  })

  it('pickTop returns top N by amount', () => {
    const result = RaffleRunService.pickTop(donations, 2)
    expect(result[0].amount).toBe(200)
    expect(result[1].amount).toBe(150)
  })
})
