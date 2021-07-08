import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import jwt, { decode } from 'jsonwebtoken';
import jwtToPem from 'jwk-to-pem';
import jwksClient from 'jwks-rsa';

// decode 에러나거나 jwk error나면 걸러냄
@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;
    const token = authorization.split(' ').slice(-1)[0];
    const claimlessToken = jwt.decode(token, {
      complete: true,
    });
    const claimlessTokenHeader = claimlessToken.header;
    const claimlessTokenPayload = claimlessToken.payload;
    const kid = claimlessTokenHeader['kid'];
    const alg = claimlessTokenHeader['alg'];

    // jwk는 set Meta data쪽으로?
    const client = jwksClient({
      jwksUri: `${process.env.JWKS_URI}`,
    });

    const jwk = await client.getSigningKey(kid);

    const payload = jwt.verify(
      token,
      jwk.getPublicKey(),
      { algorithms: [alg], complete: true },
      function (err, decodedToken) {
        if (err) {
          // 모든 요청에서 검증 안되면 거름
          return new UnauthorizedException();
        } else {
          return decodedToken;
        }
      },
    );

    try {
      const sub = payload['payload']['sub'];
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
