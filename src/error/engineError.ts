export class EngineError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EngineError';
    }
}

export class DuplicateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateError';
    }
}
