export interface LoginUser {
    success: Success;
}

export interface Success {
    token: string;
    data:  Data;
}

export interface Data {
    id:                 number;
    username:           string;
    email:              string;
    S_Nombre:           string;
    S_Apellidos:        string;
    S_FotoPerfilURLSC:    string;
    S_Activo:           number;
    verification_token: string;
    verified:           string;
    tw_roleSC_id:         number;
    created_at:         Date;
    updated_at:         Date;
    deleted_at:         null;
    tw_roleSC:            TwRole;
}

export interface TwRole {
    id:         number;
    S_Nombre:   string;
    S_Activo:   number;
    N_Nivel:    number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLoginUser(json: string): LoginUser {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: LoginUser): string {
        return JSON.stringify(value);
    }
}
