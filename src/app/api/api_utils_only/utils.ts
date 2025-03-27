export const generateSearchKeywords = (title: string) => {
  // Remove all special characters except letters, numbers, and spaces
  const words = title.toLowerCase().split(/\s+/);
  const keywordSet = new Set();

  // Generate prefixes starting from each word
  for (let start = 0; start < words.length; start++) {
    let phrase = '';

    for (let end = start; end < words.length; end++) {
      phrase += (end === start ? '' : ' ') + words[end];

      // Generate prefixes of at least 3 characters
      for (let i = 3; i <= phrase.length; i++) {
        keywordSet.add(phrase.substring(0, i));
      }
    }
  }

  return Array.from(keywordSet);
};
