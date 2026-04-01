/** Mirrors former Prisma enums — used for JWT payloads and API responses. */
export enum Permission {
    VIEW = 'VIEW',
    MODIFY = 'MODIFY',
    SHARE_ACCESS = 'SHARE_ACCESS',
}

export enum PassTier {
    Premium = 'Premium',
    Customized = 'Customized',
}
