const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const moment = require('moment');
const Schema = mongoose.Schema;
templateIds = require('../templateConfig');

var Template = new Schema({
    templateId:String,
    category:[String],
    name:String,
    filename:String,
    createdat:Number,
    finalized:{type:Boolean, default:false}
}, {_id:false, strict:false, usePushEach: true });

var Default = new Schema({
    _id: String,
    embeddedTemplate:Template,
    mergeTemplate:Template,
    templates: [Template]
}, { usePushEach: true });

var defaults = mongoose.model('Default', Default);

defaults.findOne({_id:'defaultSettings'}, function(err, doc){
    if(err)
        console.log(err);
    if(!doc){

        var initTemplates = new defaults({
            _id:'defaultSettings',
            mergeTemplate:{
                templateId: templateIds.mergeTemplateId,
                category:[],
                name:'Updated Employee Agreement',
                filename:'employment-agreement-updated.pdf',
                finalized:true
            },
            embeddedTemplate:{
                templateId: templateIds.embeddedTemplateId,
                category:[],
                name:'Embedded Mutual NDA',
                filename:'mutual-nda-with-date.pdf',
                finalized:true
            },
            templates:[
                {
                    templateId: templateIds.vendorAgreementId,
                    category:['hr','legal'],
                    name:'Vendor Agreement',
                    filename:'vendor_agreement.pdf',
                    finalized:true
                },
                {
                    templateId: templateIds.commercialLeaseId,
                    category:['realestate'],
                    name:'Commercial Lease',
                    filename:"commercial-lease.pdf",
                    finalized:true
                },
                {
                    templateId: templateIds.purchaseAgreementId,
                    category:['realestate'],
                    name:'Purchase Agreement',
                    filename:"purchase-agreement.pdf",
                    finalized:true
                },
                {
                    templateId: templateIds.stockOptionId,
                    category:['legal'],
                    name:'Stock Option Agreement',
                    filename:"stock_option_agreement.pdf",
                    finalized:true
                },
                {
                    templateId: templateIds.w4Id,
                    category:['hr'],
                    name:'Form W-4',
                    filename:'w4.pdf',
                    finalized:true
                },
                {
                    templateId: templateIds.w9Id,
                    category:['hr'],
                    name:'Form W-9',
                    filename:'w9.pdf',
                    finalized:true
                },
                {
                    templateId: templateIds.subcontractorId,
                    category:['hr','legal'],
                    name:'Subcontractor Agreement',
                    filename:'sub_contractor.pdf',
                    finalized:true
                },
                {
                    templateId: templateIds.mutualNDAId,
                    category:['hr','legal'],
                    name:'Mutual NDA',
                    filename:"mutual-nda-with-date.pdf",
                    finalized:true
                }
            ]
        });

        initTemplates.save();

    }
});

module.exports = defaults;
