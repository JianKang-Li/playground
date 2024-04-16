const TagSet = new Set([...document.querySelectorAll('*')].map(el => el.tagName))
return TagSet
