// Backend model (matches backend/db.json)
export interface BackendUser {
  id: string | number;
  Username: string;
  Password: string;
  Mail?: string;
  Nom?: string;
  Prenom?: string;
  Sexe?: string;
  recaps?: Recap[];
}

export interface Recap {
  id: number;
  mesures: Mesures;
  exercices: Exercice[];
  repas: Repas[];
}

export interface Mesures {
  Poids: number;
  Taille: number;
  Age: number;
}

export interface Exercice {
  id: number;
  Nom: string;
  Groupe?: string;
  Type?: string;
  Objectif?: string;
}

export interface Repas {
  id: number;
  Label?: string;
  Proteines?: number;
  Glucide?: number;
  Lipides?: number;
}

// Normalized client-side model
export interface User {
  id: string | number;
  username: string;
  password: string;
  Mail?: string;
  Nom?: string;
  Prenom?: string;
}
