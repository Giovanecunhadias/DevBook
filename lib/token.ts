import { randomBytes } from 'crypto';

/**
 * Função para criar um token de verificação único e seguro
 * @returns {string} O token gerado
 */
export function createVerificationToken(): string {
    // Gera um token aleatório de 32 bytes e converte para hexadecimal
    return randomBytes(90).toString('hex');
}
