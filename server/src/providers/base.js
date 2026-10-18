export class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotImplementedError";
  }
}

export class ImageryProvider {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  async healthCheck() {
    throw new NotImplementedError(`${this.id}: healthCheck not implemented`);
  }

  async search() {
    throw new NotImplementedError(`${this.id}: search not implemented`);
  }

  async getItem() {
    throw new NotImplementedError(`${this.id}: getItem not implemented`);
  }

  isAllowedCursor() {
    return false;
  }

  async listAssets() {
    throw new NotImplementedError(`${this.id}: listAssets not implemented`);
  }
}
