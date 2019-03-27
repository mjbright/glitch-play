import frontmatter from './front-matter.js';

const source = document.body.getAttribute('data-source');
const {Previewer} = Paged;

const adoc = Asciidoctor();
const md = new markdownit('default', {
    html: false,
    typographer: true,
    quotes: ['«\xA0', '\xA0»', '‹\xA0', '\xA0›']
  });

md.use(markdownItAttrs);

fetch(source)
  .then(response => response.text())
  .then(text => {
    const extension = source.split('.').pop();
    const {attributes:metadata, body} = frontmatter(text);
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(sheet => sheet.href);
  
    document.body.innerHTML = extension === 'md' ? md.render(body) : adoc.convert(body, {
      doctype: 'book',
      safe: 'safe',
      attributes: [
        'showtitle',
      ]
    });
  
    return new Previewer().preview();
  })
  .then(result => console.log(result));