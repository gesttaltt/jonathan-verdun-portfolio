import { render, screen } from '@testing-library/react'
import { BioinformaticsGraphic } from '@/components/BioinformaticsGraphic'

describe('BioinformaticsGraphic', () => {
  it('renders codons properly', () => {
    render(<BioinformaticsGraphic />)
    const codons = ['ATG', 'GCT', 'TTA', 'CCG', 'GAT', 'TTC', 'AGC', 'GTA']
    codons.forEach((codon) => {
      expect(screen.getByText(codon)).toBeInTheDocument()
    })
  })

  it('renders the data analysis label', () => {
    render(<BioinformaticsGraphic />)
    expect(screen.getByText(/Data Analysis: \[Epitope Discovery Pipeline\]/i)).toBeInTheDocument()
  })
})
