export interface Etudiant {
    id?: number;
    firstName?: string;
    lastName?: string;
    emailPro?: string;
    emailPerso?: string;
    phoneNumber?: string;
    address?: string;
    archive?: boolean;
    registrationNo?: string;
}

export interface Teacher {
    id?: number;
    firstName?: string;
    lastName?: string;
    emailPro?: string;
    emailPerso?: string;
    phoneNumber?: string;
    address?: string;
    archive?: boolean;
}

export interface Classe {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}

export interface Course {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}

export interface Academy {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}
