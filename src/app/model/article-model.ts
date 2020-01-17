export class Article {
    id?: number;
    title: string;
    subTitle: string;
    content: string;
    votes?: number;

    constructor(title: string,
                subTitle: string,
                content: string,
                votes?: number
    ) { }
}
