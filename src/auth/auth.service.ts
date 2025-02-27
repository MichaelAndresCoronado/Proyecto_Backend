// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async validateUser(email: string, password: string): Promise<string> {
    // Busca el usuario por email
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Para este MVP, comparamos el password directamente (en producción se debe usar bcrypt)
    if (usuario.password_hash !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Genera el token con una clave secreta y un tiempo de expiración (por ejemplo, 1 hora)
    const payload = { sub: usuario.id_usuario, email: usuario.email };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
    return token;
  }
}
