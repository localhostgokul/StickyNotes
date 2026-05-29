import ApiService from '../api/ApiService';

export const saveData = async (id: string, key: string, value: string | object): Promise<boolean> => {
    const data = { [key]: value };
    try {
        await ApiService.patch(`/notes/update/${id}`, data);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to save [${key}] for note ${id}:`, error.message);
        }
        return false;
    }
}