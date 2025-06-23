/**
 * @module ns/omniscriptDisclosure
 * @description This component is used to render a Disclosure Element, it extends `OmniscriptCheckbox`.
 */
import OmniscriptCheckbox from 'c/omniscriptCheckbox';
import tmpl from './omniscriptDisclosure.html';
import tmpl_nds from './omniscriptDisclosure_nds.html';
import { handleMergeField } from 'c/omniscriptInternalUtils';
import { replaceUrlHost } from 'c/omniscriptRestApi';

/**
 * Default exported class OmniscriptDisclosure
 * @extends OmniscriptCheckbox
 * @typicalname OmniscriptDisclosure
 */
export default class OmniscriptDisclosure extends OmniscriptCheckbox {
    /**
     * @scope private
     * @description disclosure text
     */
    _dText;

    initCompVariables() {
        super.initCompVariables();
        let disclosureText = this.scriptHeaderDef.multiLang ? this._propSetMap.textKey : this._propSetMap.text;
        this._dText = handleMergeField(disclosureText, this.jsonData, this.scriptHeaderDef.labelMap, null);
        this._dText = replaceUrlHost(
            this._dText,
            this.scriptHeaderDef.isCommunity,
            this.scriptHeaderDef.networkUrlPathPrefix || null,
            this.scriptHeaderDef.communityBaseUrl,
        );
    }

    /**
     * @scope private
     * @description Overwrites native render.
     * @returns {Template}
     */
    render() {
        return this.layout === 'newport' ? tmpl_nds : tmpl;
    }
}