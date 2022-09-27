import {
    VideoLayout,
    utils,  
    CanvasButtonPosition
} from 'paella-core';

import defaultIconRotate from '../icons/icon_rotate.svg';
import defaultIconMinimize from '../icons/minimize-3.svg';
import defaultIconSwitchSide from '../icons/icon_switch_side.svg';
import defaultIconMaximize from '../icons/maximize.svg';
import defaultIconClose from '../icons/close.svg';
import defaultIconSideBySide from '../icons/icon_side_by_side.svg';

const { getCookie, setCookie } = utils;

let layout = 0;
/**
 * in pip mode, the minimized video is the second one
 */
const layouts = {
    // First layout: side by side
    "sideBySide": {
        id: "side-by-side",
        videos: [
            {
                content:"presentation",
                rect:[
                    {aspectRatio:"16/9",width:614,height:345,top:187,left:649},
                    {aspectRatio:"16/10",width:614,height:384,top:167,left:649},
                    {aspectRatio:"4/3",width:614,height:460,top:130,left:649},
                    {aspectRatio:"3/2",width:614,height:409,top:155,left:649},
                    {aspectRatio:"5/4",width:614,height:491,top:114,left:649}  
                ],
                visible:true,
                layer:1
            },
            {
                content:"presenter",
                rect:[
                    {aspectRatio:"16/9",width:614,height:345,top:187,left:16},
                    {aspectRatio:"16/10",width:614,height:384,top:167,left:16},
                    {aspectRatio:"4/3",width:614,height:460,top:130,left:16},
                    {aspectRatio:"3/2",width:614,height:409,top:155,left:16},
                    {aspectRatio:"5/4",width:614,height:491,top:114,left:16}
                ],
                visible:true,
                layer:"1"
            }
        ],
        buttons: []
    },

    // Second layout: presentation maximized
    "presentationMaximized": {
        id: "presentation-maximized",
        videos:[
            {
                content:"presentation",
                rect:[
                    {aspectRatio:"5/4",left:947,top:353,width:316,height:253},
                    {aspectRatio:"3/2",left:947,top:373,width:316,height:210},
                    {aspectRatio:"4/3",left:947,top:360,width:316,height:273},
                    {aspectRatio:"16/10",left:947,top:380,width:316,height:198},
                    {aspectRatio:"16/9",left:947,top:390,width:316,height:178}
                ],
                visible:true,
                layer:1
            },
            {
                content:"presenter",
                rect:[
                    {aspectRatio:"5/4",left:35,top:8,width:874,height:699},
                    {aspectRatio:"3/2",left:15,top:53,width:917,height:611},
                    {aspectRatio:"4/3",left:26,top:25,width:894,height:670},
                    {aspectRatio:"16/10",left:15,top:72,width:917,height:573},
                    {aspectRatio:"16/9",left:15,top:101,width:917,height:515}
                ],
                visible:true,
                layer:2
            }
        ],
        buttons: []
    },

    // Third layout: presenter maximized
    "presenterMaximized": {
        id: "presenter-maximized",
        videos:[
            {
                content:"presentation",
                rect:[
                    {aspectRatio:"5/4",left:947,top:8,width:874,height:699},
                    {aspectRatio:"3/2",left:947,top:53,width:917,height:611},
                    {aspectRatio:"4/3",left:947,top:25,width:894,height:670},
                    {aspectRatio:"16/10",left:947,top:72,width:917,height:573},
                    {aspectRatio:"16/9",left:947,top:101,width:917,height:515}
                ],
                visible:true,
                layer:1
            },
            {
                content:"presenter",
                rect:[
                    {aspectRatio:"5/4",left:35,top:353,width:316,height:253},
                    {aspectRatio:"3/2",left:15,top:373,width:316,height:210},
                    {aspectRatio:"4/3",left:26,top:360,width:316,height:273},
                    {aspectRatio:"16/10",left:15,top:380,width:316,height:198},
                    {aspectRatio:"16/9",left:15,top:390,width:316,height:178}
                ],
                visible:true,
                layer:2
            }
        ],
        buttons: []
    }
};

let g_currentLayout = "sideBySide";

function currentLayout(validContent) {
    // Set the valid content from the current player configuration
    let selectedLayout = JSON.parse(JSON.stringify(layouts[g_currentLayout]));
    selectedLayout.videos[0].content = validContent[0];
    selectedLayout.videos[1].content = validContent[1];
    return selectedLayout;
}

export default class DualVideoLayout extends VideoLayout {
    get identifier() { return "dual-video-ethz"; }

    async load() {
        let layoutName = getCookie('dualVideoLayout');
        if (layoutName !== "" && Object.keys(layouts).indexOf(layoutName) !== -1) {
            g_currentLayout = layoutName;
        }
        this.player.log.debug("Dual video ETHZ layout loaded");
    }

    getValidStreams(streamData) {
        // As this is a dual stream layout plugin, we make sure that the valid streams containis
        // two streams. This prevents a bad configuration of the plugin
        return super.getValidStreams(streamData)
            .filter(stream => stream.length === 2);
    }

    setSideBySide() {
        g_currentLayout = "sideBySide";
        this.player.videoContainer.updateLayout();
    }

    setPresentationMaximized() {
        g_currentLayout = "presentationMaximized";
        this.player.videoContainer.updateLayout();
    }

    setPresenterMaximized() {
        g_currentLayout = "presenterMaximized";
        this.player.videoContainer.updateLayout();
    }

    closeVideo(content) {
        const singleStreamContentIds = this.player.videoContainer.validContentIds.filter(cid => cid.indexOf("-") === -1);
        const contentId = singleStreamContentIds.find(cid => cid != content);
        this.player.videoContainer.setLayout(contentId);
    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        if (layoutStructure.id === "side-by-side") {
            // Buttons: swap videos and minimize
            return [
                // Swap
                {
                    icon: this.player.getCustomPluginIcon(this.name,"iconMinimize") || defaultIconMinimize,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Minimize video'),
                    ariaLabel: this.player.translate('Minimize video'),
                    click: () => {
                        this.minimizeVideo(content);
                    }
                },

                // Close
                {
                    icon: this.player.getCustomPluginIcon(this.name,"iconClose") || defaultIconClose,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Close video'),
                    ariaLabel: this.player.translate('Close video'),
                    click: () => {
                        this.closeVideo(content);
                    }
                }
            ]
        }
        else {
            const result = [];

            result.push({
                icon: this.player.getCustomPluginIcon(this.name, "iconSideBySide") || defaultIconSideBySide,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Minimize video'),
                ariaLabel: this.player.translate('Minimize video'),
                click: () => {
                    this.setSideBySide();
                }
            });

            result.push({
                icon: this.player.getCustomPluginIcon(this.name,"iconClose") || defaultIconClose,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Close video'),
                ariaLabel: this.player.translate('Close video'),
                click: () => {
                    this.closeVideo(content);
                }
            });

            return result;
        }
    }

    getLayoutStructure(streamData, contentId) {
        if (!this._currentContent || this._currentContentId!==contentId) {
            const {content} = this.validContent.find(content => content.id === contentId);
            this._currentContent = content;
            this._currentContentId = contentId;

            const content0 = getCookie('dualVideoLayoutContent0');
            const content1 = getCookie('dualVideoLayoutContent1');
            if (content0 !== "" && content1 !== "" && 
                this._currentContent.indexOf(content0) !== -1 && 
                this._currentContent.indexOf(content1) !== -1)
            {
                this._currentContent[0] = content0;
                this._currentContent[1] = content1;
            }
        }
        const selectedLayout = currentLayout(this._currentContent);

        const result = {
            id: selectedLayout.id,
            player: this.player,
            name:{es:"Dos streams con posición dinámica"},
            hidden:false,
            videos: selectedLayout.videos,
            buttons: []
        };

        // Save layout settings
        setCookie("dualVideoLayoutIndex", layout);
        setCookie("dualVideoLayoutContent0", this._currentContent[0]);
        setCookie("dualVideoLayoutContent1", this._currentContent[1]);
        
        return result;
    }

    async getDictionaries() {
        const dict = {
            es: {
                "Swap between side by side and minimized video": "Cambiar la disposición de los dos vídeos entre minimizado y del mismo tamaño",
                "Swap the position of the videos": "Intercambiar la posición de los vídeos"
            }
        };
        return dict;
    }
}
