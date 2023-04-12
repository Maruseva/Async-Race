import { Router } from '../../router/router';
import { HeaderController } from '../header/header.controller';

export class App {
    private headerController: HeaderController;
    private router: Router;
    constructor(selector: string) {
        this.headerController = new HeaderController(selector);
        this.router = new Router(selector);
    }

    public run(): void {
        this.headerController.render();
        this.headerController.headerInit();
        this.router.render();
    }
}
