import { Art } from '../../models/Art';

export type ComparatorFunctionT = (firstArt: Art, secondArt: Art) => number;

export const useArtComparator = (
    sortParam?: string, 
    sortDirection?: string
): ComparatorFunctionT => {
    const isAscending = sortDirection === 'asc';

    switch (sortParam) {
        case 'date-creation': {
            if (isAscending) {
                return (firstArt: Art, secondArt: Art) => 
                    Date.parse(firstArt.dateCreation.toString()) - Date.parse(secondArt.dateCreation.toString());
            } else {
                return (firstArt: Art, secondArt: Art) => 
                    Date.parse(secondArt.dateCreation.toString()) - Date.parse(firstArt.dateCreation.toString());
            }
        } 
        // case 'price': {
        //     if (isAscending) {
        //         return (firstArt: Art, secondArt: Art) => 
        //             firstArt.dateCreation.getTime() - secondArt.dateCreation.getTime();
        //     } else {
        //         return (firstArt: Art, secondArt: Art) => 
        //             firstArt.dateCreation.getTime() - secondArt.dateCreation.getTime();
        //     }
        // }
        default: {
            return () => 0;
        }
    }
}