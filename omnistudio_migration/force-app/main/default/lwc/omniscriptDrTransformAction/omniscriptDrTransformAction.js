import OmniscriptBaseAction from 'c/omniscriptBaseAction';
import { OmniscriptDrTransformActionUtil } from 'c/omniscriptActionUtils';

/**
 * DataRaptor Transform Action for Omniscript
 */
export default class OmniscriptDrTransformAction extends OmniscriptBaseAction {
    /**
     * @scope private
     * @description Overwrites inherited connectedCallback. Instantiates specific action utility class from action
     *              framework.
     * @returns {Void}
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.jsonDef) {
            this._actionUtilClass = new OmniscriptDrTransformActionUtil(this.jsonDef);
        }
    }
}