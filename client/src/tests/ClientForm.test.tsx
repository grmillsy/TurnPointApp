import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientForm from '../components/ClientForm';
import { addClient } from '../utils/dataHelper';

jest.mock('../utils/dataHelper', () => ({
    addClient: jest.fn(),
}));

describe.skip('ClientForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form and starts at step 1', () => {
        render(<ClientForm />);

        expect(screen.getByText('Hello,')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mr Squigles')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('01/01/1983')).toBeInTheDocument();
    });

    test('disables "Next" button when required fields are empty', () => {
        render(<ClientForm />);

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();

        act(() => {

            fireEvent.change(screen.getByPlaceholderText('Mr Squigles'), {target: {value: 'John Doe'}});
            fireEvent.change(screen.getByPlaceholderText('01/01/1983'), {target: {value: '01/01/1990'}});
        })
        expect(nextButton).not.toBeDisabled();
    });

    test('navigates to step 2 and displays appropriate fields', async () => {
        render(<ClientForm />);

        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Mr Squigles'), {target: {value: 'John Doe'}});
            fireEvent.change(screen.getByPlaceholderText('01/01/1983'), {target: {value: '01/01/1990'}});

            fireEvent.click(screen.getByText('Next'));
        })


            expect(screen.getByPlaceholderText('Australian')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Javascript')).toBeInTheDocument();
    });

    test('submits the form and shows success message', async () => {

        (addClient as jest.Mock).mockResolvedValueOnce(true);

        render(<ClientForm />);

        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Mr Squigles'), {target: {value: 'John Doe'}});
            fireEvent.change(screen.getByPlaceholderText('01/01/1983'), {target: {value: '01/01/1990'}});
            fireEvent.click(screen.getByText('Next'));

        })
         await waitFor(() => {
            expect(screen.getByPlaceholderText('Australian')).toBeInTheDocument();
        });

        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Australian'), {target: {value: 'English'}});
            fireEvent.click(screen.getByText('Next'));
        })

        await waitFor(() => {
            expect(screen.getByLabelText('Funding Source*')).toBeInTheDocument();
        });

        act(() => {
            fireEvent.change(screen.getByLabelText('Funding Source*'), {target: {value: 'NIDS'}});
            fireEvent.click(screen.getByText('Submit'));

        })

        await waitFor(() => expect(addClient).toHaveBeenCalledWith({
            name: 'John Doe',
            dateOfBirth: '01/01/1990',
            mainLanguage: 'English',
            secondaryLanguage: '',
            fundingSource: 'NIDS',
        }));

        await waitFor(() => screen.getByText('Client added successfully! Please refresh table to see changes'));
    });

});
