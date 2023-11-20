import { renderHook, act } from "@testing-library/react";
import useHistoricSearch from "../hooks/useHistorySearch";


test('useHistoricSearch should manage search history correctly', () => {
    const { result } = renderHook(() => useHistoricSearch());
    expect(result.current.searchHistory).toEqual([]);

    act(() => {
        result.current.addSearchHistory('AB1 2CD');
    });
    expect(result.current.searchHistory).toEqual(['AB1 2CD']);

    act(() => {
        result.current.addSearchHistory('AB1 2CD');
    });
    expect(result.current.searchHistory).toEqual(['AB1 2CD']);

    act(() => {
        result.current.addSearchHistory('AB1 2CE');
    });
    expect(result.current.searchHistory).toEqual(['AB1 2CD', 'AB1 2CE']);

    act(() => {
        result.current.removeSearchHistory('AB1 2CD');
    });
    expect(result.current.searchHistory).toEqual(['AB1 2CE']);
});