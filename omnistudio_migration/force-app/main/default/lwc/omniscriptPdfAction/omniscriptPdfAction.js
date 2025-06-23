import OmniscriptBaseAction from 'c/omniscriptBaseAction';
import { OmniscriptPdfActionUtil } from 'c/omniscriptActionUtils';
import { NavigationMixin } from 'lightning/navigation';
import { pdfWriterUrl } from 'c/omniscriptRestApi';
import { loadScript } from 'lightning/platformResourceLoader';

export default class OmniscriptPdfAction extends NavigationMixin(OmniscriptBaseAction) {
    connectedCallback() {
        super.connectedCallback();

        if (this.jsonDef) {
            this._actionUtilClass = new OmniscriptPdfActionUtil(this.jsonDef);
        }
    }

    renderedCallback() {
        if (!this.vPdfWriter) {
            this.loadWriterProm = loadScript(this, pdfWriterUrl).then(
                function() {
                    // eslint-disable-next-line no-undef
                    this.vPdfWriter = vlocityPdfWriter;
                }.bind(this),
            );
        }
        super.renderedCallback();
    }
}