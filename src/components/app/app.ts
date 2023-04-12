import { Router } from '../../router/router';
import { HeaderController } from '../header/header.controller';
import { Header } from '../header/header.view';

export class App {
    private readonly selector: string;
    private header: Header;
    private headerController: HeaderController;
    private router: Router;
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.headerController = new HeaderController(this.selector);
        this.router = new Router(this.selector);
    }

    public run(): void {
        this.header.render();
        this.headerController.headerInit();
        this.router.render();
    }
}
