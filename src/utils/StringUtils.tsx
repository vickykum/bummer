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