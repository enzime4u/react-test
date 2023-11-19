import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchView } from '../components/SearchView/SearchView';



test('renders SearchView component', () => {
    const addSearchHistory = jest.fn();
    const removeSearchHistory = jest.fn();
    const searchHistory = ['AB1 2CD', 'AB1 2CE'];

    render(
        <Router>
            <SearchView
                addSearchHistory={addSearchHistory}
                removeSearchHistory={removeSearchHistory}
                searchHistory={searchHistory}
            />
        </Router>
    );

    // Check if the SearchBar component is rendered
    const searchBarElement = screen.getByPlaceholderText('Enter postcode');
    expect(searchBarElement).toBeInTheDocument();

    // // Check if the SearchHistory component is rendered
    const searchHistoryElements = screen.getAllByRole('listitem');
    expect(searchHistoryElements.length).toBe(searchHistory.length);

    // // Check if the addSearchHistory function is called when a postcode is entered and the Search button is clicked
    fireEvent.change(searchBarElement, { target: { value: 'AB1 2CF' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    expect(addSearchHistory).toHaveBeenCalledWith('AB1 2CF');
});
