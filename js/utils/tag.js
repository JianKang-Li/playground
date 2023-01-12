const TagSet = new Set([...document.querySelectorAll('*')].map(el => el.tagName))
console.log(TagSet);