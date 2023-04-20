import { Router } from '../../router/router';
import { HeaderController } from '../header/header.controller';
import { Header } from '../header/header.view';

export class App {
    private headerController: HeaderController;
    private router: Router;
    constructor(selector: string) {
        this.router = new Router(selector);
        this.headerController = new HeaderController(new Header(selector), this.router);
    }

    public run(): void {
        this.headerController.render();
        this.headerController.headerInit();
        this.router.render();
    }
}
