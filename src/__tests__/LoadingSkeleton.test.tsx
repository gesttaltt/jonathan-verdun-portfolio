import { render } from '@testing-library/react'
import { PageSkeleton, CardSkeleton } from '@/components/LoadingSkeleton'

describe('PageSkeleton', () => {
  it('renders multiple skeleton elements', () => {
    const { container } = render(<PageSkeleton />)
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThanOrEqual(5)
  })
})

describe('CardSkeleton', () => {
  it('renders multiple skeleton elements', () => {
    const { container } = render(<CardSkeleton />)
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThanOrEqual(3)
  })
})
