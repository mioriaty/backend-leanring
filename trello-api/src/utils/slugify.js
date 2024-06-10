
/**
 * Simple method to Convert a String to Slug
 * @param {string} val - The string to convert to slug
 * @example
 * const originalStringTest = 'Tôi là Dương Tô';
 * const slug = slugify(originalStringTest);
 * Results:
 * Original: 'Tôi là Dương Tô'
 * Slug: toi-la-duong-to
 */
const slugify = (val) => {
  if (!val) return '';
  return String(val)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};

export { slugify };
