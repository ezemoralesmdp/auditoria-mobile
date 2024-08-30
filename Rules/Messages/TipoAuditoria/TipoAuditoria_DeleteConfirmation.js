/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TipoAuditoria_DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/AuditoriaMobile/Actions/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Error al eliminar el tipo de auditoría ' + failure));
        } else {
            return Promise.reject('Eliminación de tipo de auditoría cancelada por el usuario.')
        }
    });
}
