
import { Paella, utils } from 'paella-core';
import getBasicPluginContext from 'paella-basic-plugins';
import getSlidePluginContext from 'paella-slide-plugins';
import getZoomPluginContext from 'paella-zoom-plugin';
import getUserTrackingPluginContext from 'paella-user-tracking';

import packageData from "../package.json";

// Customized icons
import BackwardIcon from "./icons/backward-icon.svg";
import ForwardIcon from "./icons/forward-icon.svg";
import CaptionsIcon from "./icons/captions-icon.svg";
import CloseIcon from "./icons/close.svg";
import FullscreenIcon from "./icons/fullscreen-icon.svg";
import FullscreenExitIcon from "./icons/fullscreen-exit.svg";
import MaximizeIcon from "./icons/maximize.svg";
import MinimizeIcon from "./icons/minimize.svg";
import PlayIcon from "./icons/play-icon.svg";
import SettingsIcon from "./icons/settings-icon.svg";
import NextIcon from "./icons/slide-next-icon.svg";
import PrevIcon from "./icons/slide-prev-icon.svg";
import SlidesIcon from "./icons/slides-icon.svg";
import ViewModeIcon from "./icons/view-mode.svg";
import VolumeHighIcon from "./icons/volume-base-icon.svg";
import VolumeMidIcon from "./icons/volume-mid-icon.svg";
import VolumeLowIcon from "./icons/volume-low-icon.svg";
import VolumeMuteIcon from "./icons/volume-mute-icon.svg";

import dictionary from "./dictionary.json";

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
        for (const lang in dictionary) {
            paella.addDictionary(lang, dictionary[lang]);
        }
        
        await utils.loadStyle('style.css');
        
        //// Customized icon tests
		//// fullscreen 
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","fullscreenIcon",FullscreenIcon);
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","windowedIcon", FullscreenExitIcon);

		//// volume
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeHighIcon",VolumeHighIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMidIcon",VolumeMidIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeLowIcon",VolumeLowIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMuteIcon",VolumeMuteIcon);

        //// layout icons
        paella.addCustomPluginIcon("es.upv.paella.dualVideoDynamic","iconMaximize", MaximizeIcon);
        paella.addCustomPluginIcon("es.upv.paella.dualVideoDynamic","iconMimimize", MinimizeIcon);
        paella.addCustomPluginIcon("es.upv.paella.dualVideoDynamic","iconClose", CloseIcon);
        

        //// play button
        paella.addCustomPluginIcon("es.upv.paella.playPauseButton","play", PlayIcon);
		//// quality selector
		//paella.addCustomPluginIcon("es.upv.paella.qualitySelector","screenIcon",screenIcon);

		//// playback rate
		//paella.addCustomPluginIcon("es.upv.paella.playbackRateButton","screenIcon",screenIcon);

		//// layout selector
		paella.addCustomPluginIcon("es.upv.paella.layoutSelector","layoutIcon", ViewModeIcon);

		//// backward 30 segonds
		paella.addCustomPluginIcon("es.upv.paella.backwardButtonPlugin","backwardIcon", BackwardIcon);

		//// forward 30 segonds
		paella.addCustomPluginIcon("es.upv.paella.forwardButtonPlugin","forwardIcon", ForwardIcon);

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

        //// slide navigation
        paella.addCustomPluginIcon("es.upv.paella.nextSlideNavigatorButton","arrowRightIcon", NextIcon);
        paella.addCustomPluginIcon("es.upv.paella.prevSlideNavigatorButton","arrowLeftIcon", PrevIcon);

       
    }
    catch (e) {
        console.error(e);
    }

}    
