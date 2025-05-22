export const getSpeciesColor = (species: string[]) => {
    if (species.length === 0) return 'bg-yellow-500/10';
    if (species[0].toLowerCase().includes('droid')) return 'bg-green-500/10';
    return 'bg-blue-500/10';
};