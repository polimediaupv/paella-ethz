
import { Paella, utils } from 'paella-core';
import getBasicPluginContext from 'paella-basic-plugins';
import getSlidePluginContext from 'paella-slide-plugins';
import getZoomPluginContext from 'paella-zoom-plugin';
import getUserTrackingPluginContext from 'paella-user-tracking';

import packageData from "../package.json";

// Customized icons
import BackwardIcon from "./icons/backward-10s-icon.svg";
import ForwardIcon from "./icons/forward-10s-icon.svg";
import CaptionsIcon from "./icons/captions-icon.svg";
import CloseIcon from "./icons/close.svg";
import FullscreenIcon from "./icons/fullscreen-icon.svg";
import MaximizeIcon from "./icons/maximize.svg";
import MinimizeIcon from "./icons/minimize.svg";
import PlayIcon from "./icons/play-icon.svg";
import SettingsIcon from "./icons/settings-icon.svg";
import NextIcon from "./icons/slide-next-icon.svg";
import PrevIcon from "./icons/slide-prev-icon.svg";
import SlidesIcon from "./icons/slides-icon.svg";
import VolumeHighIcon from "./icons/volume-base-icon.svg";
import VolumeMidIcon from "./icons/volume-mid-icon.svg";
import VolumeLowIcon from "./icons/volume-low-icon.svg";
import VolumeMuteIcon from "./icons/volume-mute-icon.svg";

window.onload = async () => {
    const initParams = {
        customPluginContext: [
            require.context("./plugins", true, /\.js/),
            getBasicPluginContext(),
            getSlidePluginContext(),
            getZoomPluginContext(),
            getUserTrackingPluginContext()
        ]
    };
    
    class PaellaPlayer extends Paella {
        get version() {
            const player = packageData.version;
            const coreLibrary = super.version;
            const pluginModules = this.pluginModules.map(m => `${ m.moduleName }: ${ m.moduleVersion }`);
            return {
                player,
                coreLibrary,
                pluginModules
            };
        }
    }
    
    let paella = new PaellaPlayer('player-container', initParams);

    try {
        await paella.loadManifest()
        
        await utils.loadStyle('style.css');
        
       //// Customized icon tests
		//// fullscreen 
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","fullscreenIcon",FullscreenIcon);
		//paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","windowedIcon",windowedIcon);

		//// volume
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeHighIcon",VolumeHighIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMidIcon",VolumeMidIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeLowIcon",VolumeLowIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMuteIcon",VolumeMuteIcon);

		//// quality selector
		//paella.addCustomPluginIcon("es.upv.paella.qualitySelector","screenIcon",screenIcon);

		//// playback rate
		//paella.addCustomPluginIcon("es.upv.paella.playbackRateButton","screenIcon",screenIcon);

		//// layout selector
		//paella.addCustomPluginIcon("es.upv.paella.layoutSelector","layoutIcon",layoutIcon);

		//// backward 30 segonds
		paella.addCustomPluginIcon("es.upv.paella.backwardButtonPlugin","backwardIcon",BackwardIcon);

		//// forward 30 segonds
		paella.addCustomPluginIcon("es.upv.paella.forwardButtonPlugin","forwardIcon",ForwardIcon);

		//// keyboard icon
		//paella.addCustomPluginIcon("es.upv.paella.keyboardShortcutsHelp","keyboardIcon",keyboardIcon);

		//// audio selector
		//paella.addCustomPluginIcon("es.upv.paella.audioSelector","screenIcon",screenIcon);

		//// download icon
		//paella.addCustomPluginIcon("es.upv.paella.downloadsPlugin","downloadIcon",downloadIcon);

		//// find captions icon
		//paella.addCustomPluginIcon("es.upv.paella.findCaptionsPlugin","findCaptionsIcon",findCaptionsIcon);

		//// captions icon
		paella.addCustomPluginIcon("es.upv.paella.captionsSelectorPlugin","captionsIcon",CaptionsIcon);

       //// slides icon
       paella.addCustomPluginIcon("es.upv.paella.frameControlButtonPlugin","photoIcon",SlidesIcon);
    }
    catch (e) {
        console.error(e);
    }

}    
