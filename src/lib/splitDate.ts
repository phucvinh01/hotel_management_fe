

export default function splitDate(dateString: string): DateParts | null | undefined{
    const parts = dateString.split('-');
    
    if (parts.length !== 3) {
        console.error('Invalid date format');
        return null;
    }

    return {
        day: parts[2],
        month: parts[1],
        year: parts[0]
    };
}

