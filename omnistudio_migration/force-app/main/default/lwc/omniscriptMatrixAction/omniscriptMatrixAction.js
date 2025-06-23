/**
 * @module ns/omniscriptMatrixAction
 * @description This component is used to perform Matrix Action.
 */
import OmniscriptBaseAction from 'c/omniscriptBaseAction';
import { OmniscriptMatrixActionUtil } from 'c/omniscriptActionUtils';

/**
 * Default exported class OmniscriptMatrixAction.
 * @extends OmniscriptBaseAction
 * @typicalname OmniscriptMatrixAction
 */
export default class OmniscriptMatrixAction extends OmniscriptBaseAction {
    /**
     * @scope private
     * @description Overwrites inherited connectedCallback. Instantiates specific action utility class from action
     *              framework.
     * @returns {Void}
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.jsonDef) {
            this._actionUtilClass = new OmniscriptMatrixActionUtil(this.jsonDef);
        }
    }
}