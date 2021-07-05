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
   
    const client = jwksClient({
      jwksUri:
        'https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_DJbbNgcV8/.well-known/jwks.json',
    });
    
    const jwk = await client.getSigningKey(kid);
    console.log(jwk);
    
    const payload = jwt.verify(
      token,
      jwk.getPublicKey(),
      { algorithms: [alg], complete: true },
      function (err, decodedToken) {
        if (err) {
          // console.log(err);
          return new UnauthorizedException();
        } else {
          // console.log("------------")
          return decodedToken;
        }
      },
    );

    const sub = payload['payload']['sub'];
    console.log(sub);
    try {
      // console.log(payload['header']);
      // console.log(sub);
    } catch (error) {
      console.log(error);
    }

    return true;
  }
}
