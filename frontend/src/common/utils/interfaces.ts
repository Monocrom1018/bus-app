export const AppInterface = {
  isAndroid() {
    return navigator.userAgent.match(/Android/i) != null;
  },
  isIos() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;
  },
  send(interfaceName: string, body: any) {
    if (AppInterface.isAndroid()) {
      try {
        (window as any).Android.getToken();
      } catch (error) {
        console.log(error);
      }
    } else if (AppInterface.isIos()) {
      (window as any).webkit?.messageHandlers[interfaceName]?.postMessage(body);
    } else {
      console.error('No native APIs found.');
    }
  },
  debug(message: any) {
    AppInterface.send('debug', { message: `${message}` });
  },
  getFCMToken() {
    AppInterface.send('fcm', { cmd: 'getToken' });
    return new Promise((resolve) => (window as any).fcm.promises.push(resolve));
  },
};

interface AlamofireRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  headers: {
    [key: string]: string;
  };
  params: {
    [key: string]: string;
  };
}

interface AlamofireResponse {
  statusCode: string;
  data: string;
}

export const AlamofireInerface = {
  request(requestBody: AlamofireRequest) {
    const _event_id = `${Math.random()}`.slice(2);
    AppInterface.send('alamofire', { ...requestBody, _event_id });
    return new Promise<AlamofireResponse>((resolve, reject) => {
      (window as any).alamofire.appendEvent({
        _event_id,
        resolve,
        reject,
      });
    });
  },
};

interface IEvent {
  _event_id: string;
  resolve: (response: AlamofireResponse) => void;
  reject: (reason?: any) => void;
}

(window as any).alamofire = {
  events: [] as IEvent[],
  callback(_event_id: string, statusCode?: string, data?: string) {
    const event = ((window as any).alamofire.events as Array<IEvent>).find((each) => each._event_id === _event_id);
    if (event) {
      if (statusCode && data) event.resolve({ statusCode, data });
      else event.reject('failure');
    }
  },
  appendEvent(event: IEvent) {
    (window as any).alamofire.events.push(event);
  },
};

(window as any).fcm = {
  promises: [] as Promise<string>[],
  callback(value: any) {
    (window as any).fcm.value = value;
    (window as any).fcm.promises.forEach((promise: any) => promise(value));
  },
};
