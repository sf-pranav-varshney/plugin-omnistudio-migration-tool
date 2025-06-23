import { FlexCardMixin } from "vlocity_ins/flexCardMixin";
    import {interpolateWithRegex, interpolateKeyValue, loadCssFromStaticResource } from "vlocity_ins/flexCardUtility";
    import { load } from "vlocity_ins/newportLoader";
          
          import { LightningElement, api, track, wire } from "lwc";
          import pubsub from "vlocity_ins/pubsub";
          import { getRecord } from "lightning/uiRecordApi";
          import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
          import data from "./definition";
          
          import styleDef from "./styleDefinition";
              
          export default class cfFlex_ClaimConfirmationScreenForOS extends FlexCardMixin(OmniscriptBaseMixin(LightningElement)){
              @api debug;
              @api recordId;
              @api objectApiName;
              @track _omniSupportKey = 'cfFlex_ClaimConfirmationScreenForOS';
                  @api get omniSupportKey() {
                    return this._omniSupportKey;
                  }
                  set omniSupportKey(parentRecordKey) {
                    this._omniSupportKey = this._omniSupportKey  + '_' + parentRecordKey;
                  }
              @track record;
              
              
              pubsubEvent = [];
              customEvent = [];
              
              connectedCallback() {
                super.connectedCallback();
                this.setStyleDefinition(styleDef);
                data.Session = {} //reinitialize on reload
                
                
                
                
                
                
                load(this)
                .then(() => {
                  this.setDefinition(data); 
 this.registerEvents();
                  this.isProcessing = false;
                  //this.isNewport = false;
                })
                .catch(() => {
                  this.setDefinition(data); 
 this.registerEvents();
                });
                
              }
              
              disconnectedCallback(){
                super.disconnectedCallback();
                    this.omniSaveState(this.records,this.omniSupportKey,true);
                    

                  this.unregisterEvents();
              }

              registerEvents() {
                
              }

              unregisterEvents(){
                
              }
            
              renderedCallback() {
                super.renderedCallback();
                
              }
          }