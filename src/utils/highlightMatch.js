export const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'ig');
    return text?.toString().replace(regex, '<mark>$1</mark>');
  };
  