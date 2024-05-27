import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe("Home Component", () => {
    it('should contain the phrase Sensor Data', () => {
        render(<Home />)
        const element = screen.getByText('Sensor Data')
        expect(element).toBeInTheDocument()
    })
})