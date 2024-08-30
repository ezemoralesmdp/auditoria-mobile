/**
 * Esta función arroja un mensaje de confirmación ante la eliminación de una entidad de tipo Auditoria.
 * @param {IClientAPI} clientAPI
 */
export default function Auditoria_DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/AuditoriaMobile/Actions/Messages/Auditoria/Auditoria_DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Error al eliminar la auditoría ' + failure));
        } else {
            return Promise.reject('Eliminación de auditoría cancelada por el usuario.')
        }
    });
}
