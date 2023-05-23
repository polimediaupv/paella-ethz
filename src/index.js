
import { Paella, utils } from 'paella-core';
import getBasicPluginContext from 'paella-basic-plugins';
import getSlidePluginContext from 'paella-slide-plugins';
import getZoomPluginContext from 'paella-zoom-plugin';
import getUserTrackingPluginContext from 'paella-user-tracking';

import dictionary from "./default-dictionaries.js";
import { applyEthzTheme } from './ethz-theme';


window.onload = async () => {
    const initParams = {
        customPluginContext: [
            require.context("./plugins", true, /\.js/),
            getBasicPluginContext(),
            getSlidePluginContext(),
            getZoomPluginContext(),
            getUserTrackingPluginContext()
        ],
        loadDictionaries: (player) => {
            for (const lang in dictionary) {
              player.addDictionary(lang, dictionary[lang]);
            }
            player.setLanguage(navigator.language.substring(0, 2));
        }
    };
    
    try {
        const paella = new Paella('player-container', initParams);
        // apply ETHZ theme
        await applyEthzTheme(paella);
        // load Paella
        await paella.loadManifest()        
    }
    catch (e) {
        console.error(e);
    }

}    
