// var host = "https://dev-api.ambalawireless.com/api/v1/";
// var host = "https://api.ambalawireless.com/api/v1/";
var host = "https://api.dawlatplus.com/api/v1/";


module.exports = {
    V1API: {
        'getAccessToken': host + 'client/login',
        'refreshAccessToken': host + 'client/token/refresh',
        'verifyLogin': host + 'client/token/verify',
        'reset_password':host+'client/change-password',
        'register':host+'client/registration',

        "smsTemplate_add":host+'client/sms-template/create',
        "smsTemplate_get":host+'client/sms-template/get',
        "smsTemplate_delete":host+'client/sms-template/delete',
        "smsTemplate_edit":host+'client/sms-template/update',

        "price_get":host+'client/pricing',

        "contactGroup_add":host+'client/address-book/contact-group/create',
        "contactGroup_get":host+'client/address-book/contact-group/get',
        "contactGroup_delete":host+'client/address-book/contact-group/delete',

        "contact_add":host+'client/address-book/manage-contact/create-single-contact',
        "contact_get":host+'client/address-book/manage-contact/get',
        "contact_delete":host+'client/address-book/manage-contact/delete',
        "contact_upload":host+'client/address-book/manage-contact/upload-contact',

        "delivery_report_get":host+"client/report/sms-delivery-report",
        "recharge_history_get":host+"client/recharge-history",

        "document_api_get":host+'client/get-api-key',
        "account_summary_get":host+'client/get-dashboard-summary',
        "account_graph_get":host+'client/get-dashboard-graph',
        "send_sms":host+'client/sms/send-sms',
        'send_schedule_sms':host+'client/sms/schedule-sms',
        "send_group_sms":host+'client/sms/send-group-sms',
        "send_sms_by_file":host+'client/sms/send-sms-by-file',
        "sender_id_get":host+'client/sender-id',
    }
};
