import { render, screen, waitFor } from '@testing-library/react';
import ClientList from '../components/ClientList';
import { getData } from '../utils/dataHelper';
import { ClientType } from '../utils/types';

// Mock the getData function
jest.mock('../utils/dataHelper', () => ({
    getData: jest.fn(),
}));


describe('ClientList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displays "No clients found" when clientList is empty', () => {
        (getData as jest.Mock).mockResolvedValueOnce([]);

        render(<ClientList />);

        expect(screen.getByText('No clients found.')).toBeInTheDocument();
    });

    test('renders client data when available', async () => {
        const mockData: ClientType[] = [
            {
                name: 'John Doe',
                dateOfBirth: '1990-01-01',
                mainLanguage: 'English',
                secondaryLanguage: 'Spanish',
                fundingSource: 'NIDS',
            },
        ];

        (getData as jest.Mock).mockResolvedValueOnce(mockData);

        render(<ClientList />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('1/1/1990')).toBeInTheDocument();
            expect(screen.getByText('English')).toBeInTheDocument();
            expect(screen.getByText('Spanish')).toBeInTheDocument();
            expect(screen.getByText('NIDS')).toBeInTheDocument();
        });
    });
});
