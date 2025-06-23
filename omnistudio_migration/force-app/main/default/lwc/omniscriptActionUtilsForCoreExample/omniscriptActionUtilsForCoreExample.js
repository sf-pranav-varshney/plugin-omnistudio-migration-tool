import { LightningElement } from 'lwc';
import OmniscriptActionUtilsForCore from 'c/omniscriptActionUtilsForCore';
export default class OmniscriptActionUtilsForCoreTester extends LightningElement {
    connectedCallback() {
        this.omniactions = new OmniscriptActionUtilsForCore();

        this.omniactions.runIntegrationProcedure({
            ipName: "test_test",
            options: {},
            input: {}
        }).then((result) => {
            window.console.log("IP RESULT :");
            window.console.log(result);
        });

        this.omniactions.runDataRaptorExtract({
            drName: "getsomeaccounts",
            options: {},
            input: {}
        }).then((result) => {
            window.console.log("DRE RESULT :");
            window.console.log(result);
        });

        this.omniactions.runDataRaptorPost({
            drName: "createaccount",
            options: {},
            input: {}
        }).then((result) => {
            window.console.log("DRP RESULT :");
            window.console.log(result);
        });

        this.omniactions.runDataRaptorTransform({
            drName: "transformdata",
            options: {},
            input: {
                "one": {
                    "dataforone": "ONEE"
                },
                "two": {
                    "datafortwo": "TWOOO"
                }
            }
        }).then((result) => {
            window.console.log("DRT RESULT :");
            window.console.log(result);
        });

        this.omniactions.runApexRemote({
            // namespace required for devs
            className: "omnistudio.SelectOptionsDependentCallableAndVoi",
            methodName: "SelectOptions",
            options: {},
            input: {}
        }).then((result) => {
            window.console.log("AR RESULT :");
            window.console.log(result);
        });
    }
}