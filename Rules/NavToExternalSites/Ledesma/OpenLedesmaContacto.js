/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OpenLedesmaContacto(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open SAP.com website
            return utilsModule.openUrl("https://www.ledesma.com.ar/contacto/");
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}
