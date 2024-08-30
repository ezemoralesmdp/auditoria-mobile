/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OpenSAPMobileStart(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    // Get the Nativescript Platform Module
    const platformModule = clientAPI.nativescript.platformModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            //This will open SAP Mobile Start app
            if (platformModule.isIOS) {
                return utilsModule.openUrl("com.sap.mobile.start://");
            } else if (platformModule.isAndroid) {
                return utilsModule.openUrl("com.sap.mobile.apps.sapstart://");
            }
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}
