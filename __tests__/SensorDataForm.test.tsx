import { render, screen, fireEvent } from '@testing-library/react'
import { SensorDataForm } from '@/components/SensorDataForm'
import { mock } from 'node:test'

describe("SensorDataForm Component", () => {

    it('should render the SensorDataForm component with form fields and submit button', () => {
        render(<SensorDataForm afterSubmit={mock.fn()} />)

        const sensorIdInput = screen.getByTestId('sensor-id-input')
        const typeSelect = screen.getByTestId('select-type')
        const valueInput = screen.getByTestId('value-input')
        const timestampInput = screen.getByTestId('timestamp-input')
        const saveButton = screen.getByTestId('save-button')

        expect(sensorIdInput).toBeInTheDocument()
        expect(typeSelect).toBeInTheDocument()
        expect(valueInput).toBeInTheDocument()
        expect(timestampInput).toBeInTheDocument()
        expect(saveButton).toBeInTheDocument()
    })

})
