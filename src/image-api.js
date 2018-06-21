import axios from 'axios';
import tinycolor from 'tinycolor2';
import { getColorPaletteFromBase } from './components/Contextual/StyleContext/ColorPalette';

const infoToPalette = (info) => {
  const base = {
    id: 'foo',
    backgroundColor: tinycolor(info.background_colors[0]),
    brandColor: tinycolor(info.foreground_colors[0]),
    actionColor: tinycolor(info.foreground_colors[1]),
    mostExtremeTextLightness: 0.47,
    mostExtremeBackgroundDarkness: 0.3,
  };
  return getColorPaletteFromBase(base);
}

export default () => {
  const url = prompt('Enter URL of image you want to scan');

  if (!url) {
    return Promise.reject();
  }

  return axios({
    method: 'GET',
    url: `https://api.imagga.com/v1/colors?url=${url}`,
    auth: {
      username: 'acc_76a13abf730bf61',
      password: '73899e013831bad56f8d5d72cb491fe7',
    },
  })
    .then(x => x.data.results[0].info)
    .then(infoToPalette);
};

// curl --user "acc_76a13abf730bf61:73899e013831bad56f8d5d72cb491fe7" https://api.imagga.com/v1/colors?url=https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg