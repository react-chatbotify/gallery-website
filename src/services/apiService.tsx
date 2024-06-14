import { Theme } from '../interfaces/Theme';

const getThemeData = async (item: string) => {
  const cdnUrl = 'https://cdn.jsdelivr.net/gh/tjtanjin/react-chatbotify-themes/themes';
  const displayFile = 'display.png';
  const metaFile = 'meta.json';
  const displayUrl = `${cdnUrl}/${item}/${displayFile}`;
  const metaUrl = `${cdnUrl}/${item}/${metaFile}`;
  const meta = await (await fetch(metaUrl)).json();

  // todo: backend to provide these values?
  const id = 0;
  const authorImg = '';
  const tags = ['Retro'];

  // todo:

  return {
    id: id,
    name: meta.theme,
    tags: tags,
    themeImg: displayUrl,
    authorName: meta.author,
    authorImg: authorImg,
    description: meta.description,
    github: meta.github,
  };
};

export { getThemeData };
