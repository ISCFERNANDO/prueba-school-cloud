export interface Corporate {
  id: number;
  S_NombreCorto: string;
  S_NombreCompleto: string;
  S_LogoURL: string;
  S_DBName: string;
  S_DBUsuario: string;
  S_SystemUrl: string;
  S_Activo: number;
  D_FechaIncorporacion: string;
  created_at: string;
  updated_at: string;
  tw_users_id: number;
  FK_Asignado_id: number;
  user_created: Asignado;
  asignado: Asignado;
  tw_contactos_corporativo?: ContactoCorporativo[];
}

export interface Asignado {
  id: number;
  username: string;
  email: string;
  S_Nombre: string;
  S_Apellidos: string;
  S_FotoPerfilURL: string;
  S_Activo: number;
  verification_token: string;
  verified: string;
  tw_role_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface ContactoCorporativo {
  N_TelefonoFijo: string;
  N_TelefonoMovil: string;
  S_Comentarios: string;
  S_Email: string;
  S_Nombre: string;
  S_Puesto: string;
  created_at: string;
  id: number;
  tw_corporativo_id: number;
  updated_at: string;
}
