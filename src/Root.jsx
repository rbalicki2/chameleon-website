// @flow
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import StateProvider from 'src/components/Providers/StateProvider';
import { type TimeOfDay } from 'src/components/Contextual/StyleContext/TimeOfDay';
import Background from 'src/components/Contextual/Background';
import App from 'src/components/App';
import Button from 'src/components/Contextual/Button';
import { UpdateContext } from './components/Contextual/StyleContext';
import ToggleSwitch from './components/Contextual/ToggleSwitch';

import appleTouchIcon from './components/App/Head/apple-touch-icon.png';
import favicon32 from './components/App/Head/favicon-32x32.png';
import favicon16 from './components/App/Head/favicon-16x16.png';
// N.B. this is apparently a bug. import/extensions doesn't understand query params...
/* eslint-disable import/extensions */
// $FlowFixMe - TODO figure out how to make flow recognize these
import safariPinnedTab from './components/App/Head/safari-pinned-tab.svg?external';
/* eslint-enable import/extensions */
// $FlowFixMe
import favicon from './components/App/Head/favicon.ico';

// eslint-disable-next-line import/no-named-as-default
import type ColorPalette from './components/Contextual/StyleContext/ColorPalette';
import { type BaseColors } from './components/Contextual/StyleContext/ColorPalette/baseColors';
import { getColorPaletteFromBase } from './components/Contextual/StyleContext/ColorPalette';

import uploadImage from './image-api';

const UpperRightDiv = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const baseColors: BaseColors = {
  id: 'day',
  backgroundColor: tinycolor('#fcfae8'), // yellow
  actionColor: tinycolor('#0a7623'),
  brandColor: tinycolor('#ec9213'),
  mostExtremeTextLightness: 0.47,
  mostExtremeBackgroundDarkness: 0.3,
};
const initialColorPalette: ColorPalette = getColorPaletteFromBase(baseColors);

type TimeOfDayUpdater = (TimeOfDay) => void;
export default () => (<Fragment>
  <Helmet>
    <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
    <meta name="msapplication-TileColor" content="#da532c" />
    <link rel="shortcut icon" href={favicon} />
    <meta name="theme-color" content="#ffffff" />
    <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
  </Helmet>
  <StateProvider initialValue={initialColorPalette}>{
    (colorPalette: ColorPalette, setColorPalette: TimeOfDayUpdater) =>
      (<StateProvider initialValue={0}>{(rotation, setRotation) => (
        <UpdateContext call={context => context.setColorPalette(colorPalette).rotate(rotation)}>
          <Fragment>
            <Background />
            <App />
            <UpperRightDiv>
              <ToggleSwitch
                isChecked={!!rotation}
                onClick={() => setRotation(rotation ? 0 : 90)}
              />
              <Button onClick={() => uploadImage().then(setColorPalette)}>
                ?
              </Button>
            </UpperRightDiv>
          </Fragment>
        </UpdateContext>
      )}</StateProvider>)
  }</StateProvider>
</Fragment>);


// curl --user "acc_76a13abf730bf61:73899e013831bad56f8d5d72cb491fe7"
// https://api.imagga.com/v1/colors?url=https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg