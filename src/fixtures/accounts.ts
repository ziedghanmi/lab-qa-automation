import { config } from '../config';

export interface Account {
  username: string;
  password: string;
  /** Rôle renvoyé par l'application après connexion (localStorage `auth-storage`). */
  expectedRole: string;
  /** Description telle qu'annoncée sur la page d'accueil de Lab.qa. */
  description: string;
}

export const accounts = {
  jeanDupont: {
    username: 'jean_dupont',
    password: config.defaultPassword,
    expectedRole: 'standard_user',
    description: 'Parcours complet',
  },
  compteBanni: {
    username: 'compte_banni',
    password: config.defaultPassword,
    expectedRole: 'locked_user',
    description: 'Compte verrouillé',
  },
  clientChaos: {
    username: 'client_chaos',
    password: config.defaultPassword,
    expectedRole: 'problem_user',
    description: 'Éléments défectueux',
  },
  tortueDuWeb: {
    username: 'tortue_du_web',
    password: config.defaultPassword,
    expectedRole: 'performance_glitch_user',
    description: 'Délai au login (~3 s)',
  },
} as const satisfies Record<string, Account>;

/**
 * Comptes qui aboutissent à une connexion réussie — utilisés pour rejouer
 * le scénario de connexion/déconnexion (cas 1) sur plusieurs jeux de données
 * sans dupliquer le test (cas 6), y compris le compte lent (cas 5).
 */
export const validAccounts: Account[] = [
  accounts.jeanDupont,
  accounts.clientChaos,
  accounts.tortueDuWeb,
];
