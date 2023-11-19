import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CrimeTable from '../components/CrimeTable/CrimeTable';
test('renders CrimeTable component', async () => {
    const mockData = [
        { id: '1', category: 'burglary', location: { latitude: 51.505, longitude: -0.09, street: { name: 'Street 1' } }, postcode: 'AB1 2CD', date: '2022-01-01', outcomeStatus: 'Under investigation' },
        { id: '2', category: 'robbery', location: { latitude: 51.506, longitude: -0.10, street: { name: 'Street 2' } }, postcode: 'AB1 2CE', date: '2022-01-02', outcomeStatus: 'Awaiting court outcome' },
        { id: '3', category: 'theft', location: { latitude: 51.507, longitude: -0.11, street: { name: 'Street 3' } }, postcode: 'AB1 2CF', date: '2022-01-03', outcomeStatus: 'Offender sent to prison' },
    ];

    render(
        <Router>
            <CrimeTable
                selectedCrimeData={mockData}
                postcode="AB1 2CD"
                dataCrimeCategories={['burglary', 'robbery', 'theft']}
                categorySelected="burglary"
                setCategorySelected={(category) => {
                    console.log(`Category selected: ${category}`);
                }}
            />
        </Router>
    );

    // I would test for findAllByRole here, but it doesn't work with the DataGrid component
    // Wait for all cells to be rendered in the DataGrid
    const crimeTableCellElements = await screen.findAllByRole('cell');
    // Expect to find multiple cells 
    expect(crimeTableCellElements.length).toBeGreaterThan(0);
});

test('CrimeTable is populated with data', async () => {
    const mockData = [
        { id: '1', category: 'burglary', location: { latitude: 51.505, longitude: -0.09, street: { name: 'Street 1' } }, postcode: 'AB1 2CD', date: '2022-01-01', outcomeStatus: 'Under investigation' },
        { id: '2', category: 'robbery', location: { latitude: 51.506, longitude: -0.10, street: { name: 'Street 2' } }, postcode: 'AB1 2CE', date: '2022-01-02', outcomeStatus: 'Awaiting court outcome' },
        { id: '3', category: 'theft', location: { latitude: 51.507, longitude: -0.11, street: { name: 'Street 3' } }, postcode: 'AB1 2CF', date: '2022-01-03', outcomeStatus: 'Offender sent to prison' },
    ];

    render(
        <Router>
            <CrimeTable
                selectedCrimeData={mockData}
                postcode="AB1 2CD"
                dataCrimeCategories={['burglary', 'robbery', 'theft']}
                categorySelected="burglary"
                setCategorySelected={(category) => {
                    console.log(`Category selected: ${category}`);
                }}
            />
        </Router>
    );

    // Wait for all cells to be rendered in the DataGrid
    const crimeTableCellElements = await screen.findAllByRole('cell');
    expect(crimeTableCellElements.length).toBeGreaterThan(0);

    // Check if the first row of data is rendered
    const firstRowElement = screen.getByText('Street 1');
    expect(firstRowElement).toBeInTheDocument();
});
test('CrimeTable is not populated with data', async () => {
    const mockData: [] = []; // No data

    render(
        <Router>
            <CrimeTable
                selectedCrimeData={mockData}
                postcode="AB1 2CD"
                dataCrimeCategories={['burglary', 'robbery', 'theft']}
                categorySelected="burglary"
                setCategorySelected={(category) => {
                    console.log(`Category selected: ${category}`);
                }}
            />
        </Router>
    );

    // Try to find a cell in the DataGrid
    const crimeTableCellElements = screen.queryAllByRole('cell');
    expect(crimeTableCellElements.length).toBe(0); // Expect no cells

    // Try to find a row of data
    const firstRowElement = screen.queryByText('Street 1');
    expect(firstRowElement).not.toBeInTheDocument(); // Expect the row not to be in the document
});