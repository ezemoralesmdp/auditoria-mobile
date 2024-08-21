export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _Auditoria = context.executeAction('/AuditoriaMobile/Actions/Auditoria/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_Auditoria]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/AuditoriaMobile/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}