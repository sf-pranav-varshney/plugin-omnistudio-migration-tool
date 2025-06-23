import OmniscriptBaseAction from 'c/omniscriptBaseAction';
import { OmniscriptDrPostActionUtil } from 'c/omniscriptActionUtils';

/**
 * DataRaptor Post Action for Omniscript
 */
export default class OmniscriptDrPostAction extends OmniscriptBaseAction {
    /**
     * @scope private
     * @description Overwrites inherited connectedCallback. Instantiates specific action utility class from action
     *              framework.
     * @returns {Void}
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.jsonDef) {
            this._actionUtilClass = new OmniscriptDrPostActionUtil(this.jsonDef);
        }
    }
}