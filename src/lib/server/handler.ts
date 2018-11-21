export class Handler {
  private url: string;
  private urlReg: RegExp;
  private params: string[] = [];
  private handler: Function;

  constructor(url: string, handler: Function) {
    this.url = url;
    this.handler = handler;
    this.urlReg = new RegExp(url.replace(/:.\//, ':.\/'));
  }

  parseParams(url: string) {
    const repl = url.replace(this.urlReg, (match: string) => {
      this.params.push(match);
      return match;
    });
  }

  getHandler() {
    return this.handler;
  }

  isValid(url: string) {
    return this.urlReg.test(url);
  }
}