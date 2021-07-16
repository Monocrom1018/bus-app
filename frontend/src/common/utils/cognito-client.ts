import { find } from 'lodash';
import Client from '../../../.cognito/db/clients.json';

interface Client {
  ClientId: string;
  ClientName: string;
  UserPoolId: string;
  CreationDate: number;
  LastModifiedDate: number;
  AllowedOAuthFlowsUserPoolClient: boolean;
  RefreshTokenValidity: number;
}

function isClient(client: any): client is Client {
  return (
    typeof client.ClientId === 'string' &&
    typeof client.ClientName === 'string' &&
    typeof client.UserPoolId === 'string' &&
    typeof client.CreationDate === 'number' &&
    typeof client.LastModifiedDate === 'number' &&
    typeof client.AllowedOAuthFlowsUserPoolClient === 'boolean' &&
    typeof client.RefreshTokenValidity === 'number'
  );
}

export const getCognitoMockConfig = (ClientId = Object.keys(Client.Clients)[0]) => {
  const client = find(Client.Clients, { ClientId });
  if (isClient(client)) {
    return {
      aws_cognito_region: 'local',
      aws_user_pools_id: client.UserPoolId,
      aws_user_pools_web_client_id: client.ClientId,
      endpoint: 'http://127.0.0.1:9229',
      authenticationFlowType: 'USER_PASSWORD_AUTH',
      aws_cognito_identity_pool_id: 'backpackbusdevfe582237_userpool_fe582237-dev',
    };
  }
  return {};
};
