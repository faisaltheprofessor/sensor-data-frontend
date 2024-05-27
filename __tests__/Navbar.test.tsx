import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe("Navbar Component", () => {
    it('should render the Navbar component with logo and mode toggle button', () => {
        render(<Navbar />)
        const logo = screen.getByAltText(/logo/i)
        const agriSenseText = screen.getByText('AgriSense')

        expect(logo).toBeInTheDocument()
        expect(agriSenseText).toBeInTheDocument()
    })

    it('should render the Mode Toggle dropdown', () => {
        render(<Navbar />)
        const modeToggles = screen.getAllByRole('button', { name: /toggle theme/i })
        expect(modeToggles.length).toBe(2)
    })
})
