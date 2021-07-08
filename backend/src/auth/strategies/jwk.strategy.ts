import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwkStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWKS}`,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const {} = payload;
    return done(null, true);
  }
}
