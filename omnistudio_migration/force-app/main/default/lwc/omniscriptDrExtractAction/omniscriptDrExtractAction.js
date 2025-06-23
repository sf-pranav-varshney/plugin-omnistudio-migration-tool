import OmniscriptBaseAction from 'c/omniscriptBaseAction';
import { OmniscriptDrExtractActionUtil } from 'c/omniscriptActionUtils';

/**
 * DataRaptor Extract Action for Omniscript
 */
export default class OmniscriptDrExtractAction extends OmniscriptBaseAction {
    /**
     * @scope private
     * @description Overwrites inherited connectedCallback. Instantiates specific action utility class from action
     *              framework.
     * @returns {Void}
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.jsonDef) {
            this._actionUtilClass = new OmniscriptDrExtractActionUtil(this.jsonDef);
        }
    }
}