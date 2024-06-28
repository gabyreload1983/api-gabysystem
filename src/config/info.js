import { getPackageVersion } from "../utils.js";

const api_version = (await getPackageVersion()) || "error";

export const API_INFO = {
  version: api_version,
};

export const LEYEND_ORDER = `La empresa no se responsabiliza por el origen de los aparatos recibidos para reparación. Por la presente deja constancia de que todo el software existente en los medios de los equipos es de vuestra propiedad, deslindando de cualquier responsabilidad de los mismos a Sinapsis. De no existir reclamo transcurridos 90 días de la fecha de este comprobante los equipos se consideraran abandonados, quedando Sinapsis facultado a disponer de los mismos perdiendo Ud. todo derecho a reclamo o indemnización alguna art 2525 y 2528 del código civil.
CONSULTA EL ESTADO DE TU ORDEN EN: www.sinapsis.com.ar`;
