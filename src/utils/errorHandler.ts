export const handleError = (message: string, error: unknown, setError: (message: string) => void) => {
    console.error(message, error);
    setError(message);
};