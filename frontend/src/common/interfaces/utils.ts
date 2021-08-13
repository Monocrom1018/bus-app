export interface Route {
  path: string;
  component?: React.FunctionComponent;
  async?: unknown;
}

export interface ResourceRoute {
  resource: string;
  collection?: string[];
  member?: string[];
  only?: ('show' | 'edit' | 'new' | 'index')[];
}

export interface Poppable {
  open: () => void;
  close: () => void;
}

export interface Resetable {
  reset: () => void;
}

export interface RefreshableList {
  refresh: () => Promise<unknown>;
}

export interface S3ImagePickerRef {
  submit: () => Promise<void>;
  reset: () => void;
}
