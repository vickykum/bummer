import { Address } from "../models/RestaurantModels";

export function addressToString(address: Address): string {
  const line1 = [address.housenumber || address.housename, address.street]
    .filter(part => part && part.trim())
    .join(' ');

  const line2 = [address.suburb, address.floor]
    .filter(part => part && part.trim())
    .join(', ');

  const line3 = [address.city, address.state, address.postcode]
    .filter(part => part && part.trim())
    .join(', ');
    console.log([line1, line2, line3].filter(line => line).join(',\n'));
  return [line1, line2, line3].filter(line => line).join(',\n');
}



export const capitalizeString = (str: string | undefined): string => {
    try {
        if(!str){
            return '';
        }
      const words: string[] = str.split('_');
      
      const capitalizedWords = words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      
      return capitalizedWords.join(' ');
    } catch (error) {
      return '';
    }
  };