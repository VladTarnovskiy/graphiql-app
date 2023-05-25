import { tags } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';

export const myDarkTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#0C0E0F',
    foreground: '#e5e5e5',
    caret: '#fafafa',
    selection: '#14b8a626',
    selectionMatch: '#14b8a626',
    lineHighlight: '#8a919930',
    gutterBackground: '#0C0E0F',
  },
  styles: [
    { tag: tags.comment, color: '#787b8099' },
    { tag: tags.variableName, color: '#14b8a6' },
    { tag: [tags.string, tags.special(tags.brace)], color: '#facc15' },
    { tag: tags.number, color: '#f87171' },
    { tag: tags.bool, color: '#f87171' },
    { tag: tags.null, color: '#5c6166' },
    { tag: tags.keyword, color: '#5c6166' },
    { tag: tags.className, color: '#5c6166' },
    { tag: tags.definition(tags.typeName), color: '#5c6166' },
    { tag: tags.typeName, color: '#5c6166' },
    { tag: tags.angleBracket, color: '#5c6166' },
    { tag: tags.tagName, color: '#5c6166' },
    { tag: tags.attributeName, color: '#5c6166' },
  ],
});

export const myLightTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#fafafa',
    foreground: '#1A1C1E',
    caret: '#1A1C1E',
    selection: '#14b8a626',
    selectionMatch: '#14b8a626',
    lineHighlight: '#8a919930',
    gutterBackground: '#fafafa',
  },
  styles: [
    { tag: tags.comment, color: '#787b8099' },
    { tag: tags.variableName, color: '#14b8a6' },
    { tag: [tags.string, tags.special(tags.brace)], color: '#facc15' },
    { tag: tags.number, color: '#f87171' },
    { tag: tags.bool, color: '#f87171' },
    { tag: tags.null, color: '#5c6166' },
    { tag: tags.keyword, color: '#5c6166' },
    { tag: tags.className, color: '#5c6166' },
    { tag: tags.definition(tags.typeName), color: '#5c6166' },
    { tag: tags.typeName, color: '#5c6166' },
    { tag: tags.angleBracket, color: '#5c6166' },
    { tag: tags.tagName, color: '#5c6166' },
    { tag: tags.attributeName, color: '#5c6166' },
  ],
});
