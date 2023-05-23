import { utils } from 'paella-core';
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


export async function applyEthzTheme(paella) {
  await utils.loadStyle('style.css');

  //// Customized icons
  //// fullscreen
  await paella.addCustomPluginIcon('es.upv.paella.fullscreenButton','fullscreenIcon',FullscreenIcon);
  await paella.addCustomPluginIcon('es.upv.paella.fullscreenButton','windowedIcon', FullscreenExitIcon);

  //// volume
  await paella.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeHighIcon',VolumeHighIcon);
  await paella.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeMidIcon',VolumeMidIcon);
  await paella.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeLowIcon',VolumeLowIcon);
  await paella.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeMuteIcon',VolumeMuteIcon);

  //// layout icons
  await paella.addCustomPluginIcon('es.upv.paella.dualVideoDynamic','iconMaximize', MaximizeIcon);
  await paella.addCustomPluginIcon('es.upv.paella.dualVideoDynamic','iconMimimize', MinimizeIcon);
  await paella.addCustomPluginIcon('es.upv.paella.dualVideoDynamic','iconClose', CloseIcon);
  //// play button
  await paella.addCustomPluginIcon('es.upv.paella.playPauseButton','play', PlayIcon);

  //// layout selector
  await paella.addCustomPluginIcon('es.upv.paella.layoutSelector','layoutIcon', ViewModeIcon);

  //// backward 30 segonds
  await paella.addCustomPluginIcon('es.upv.paella.backwardButtonPlugin','backwardIcon', BackwardIcon);
  //// forward 30 segonds
  await paella.addCustomPluginIcon('es.upv.paella.forwardButtonPlugin','forwardIcon', ForwardIcon);

  //// captions icon
  await paella.addCustomPluginIcon('es.upv.paella.captionsSelectorPlugin','captionsIcon',CaptionsIcon);

  //// slides icon
  await paella.addCustomPluginIcon('es.upv.paella.frameControlButtonPlugin','photoIcon',SlidesIcon);

  //// slide navigation
  await paella.addCustomPluginIcon('es.upv.paella.nextSlideNavigatorButton','arrowRightIcon', NextIcon);
  await paella.addCustomPluginIcon('es.upv.paella.prevSlideNavigatorButton','arrowLeftIcon', PrevIcon);
}
