import { ButtonGroupPlugin } from "paella-core";

import SettingsIcon from "../icons/settings-icon.svg";

export default class SettingsButtonGroupPlugin extends ButtonGroupPlugin {
    async load() {
        this.icon = SettingsIcon;
    }
}
