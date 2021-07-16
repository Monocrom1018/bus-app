import {
  Injectable,
  Inject,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { UsersRepository } from '../users/users.repository';

@Injectable({ scope: Scope.REQUEST }) // Interceptor 같은 개념
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @Inject(REQUEST) private request: Request,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async currentApiUser(): Promise<any> {
    try {
      const token = await this.jwtToken();
      if (token) {
        const user = this.usersRepository.findByUuid(await this.sub());
        return user;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async isSignIn(): Promise<boolean> {
    try {
      const token = await this.jwtToken();
      const user = await this.currentApiUser();

      if (token && user) {
        return true;
      }
      return false;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async unAuthorized(): Promise<any> {
    return this.sub();
  }

  async authorizeAccessRequest(): Promise<any> {
    return this.sub();
  }

  async jwtToken(): Promise<any> {
    try {
      const authorization = this.request.headers?.authorization;
      const token = authorization.split(' ').slice(-1)[0];
      return token;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async payload(): Promise<any> {
    try {
      const token = await this.jwtToken();
      const jwk = await this.jwks();
      const alg = await this.alg();
      const payload = jwt.verify(
        token,
        jwk,
        { algorithms: [alg], complete: true },
        (err, decodedToken) => {
          if (err) {
            return new UnauthorizedException();
          }
          return decodedToken;
        },
      );
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async claimlessPayload(): Promise<any> {
    try {
      const token = await this.jwtToken();
      const claimlessToken = jwt.decode(token, {
        complete: true,
      });
      return claimlessToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async jwks(): Promise<any> {
    if (process.env.NODE_ENV !== 'production') {
      return `${process.env.JWKS_MOCK_PEM}`;
    }
    const client = jwksClient({
      jwksUri: `${process.env.JWKS_URI}`,
    });
    const jwk = await client.getSigningKey(await this.kid());
    return jwk.getPublicKey();
  }

  async kid(): Promise<any> {
    const decodedJwt = await this.claimlessPayload();
    return decodedJwt.header?.kid;
  }

  async alg(): Promise<any> {
    const claimlessPayload = await this.claimlessPayload();
    const alg = claimlessPayload.header?.alg;
    return alg;
  }

  async sub(): Promise<any> {
    const payload = await this.payload();
    const sub = payload.payload?.sub;
    return sub;
  }
}
