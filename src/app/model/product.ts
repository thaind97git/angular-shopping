export class Product {
    constructor (
        public productCode: string,
        public name: string,
        public description: string,
        public isPromotion: boolean,
        public quantity: number,
        public startPrice: number,
        public percentPromotion: number,
        public dateSubmitted: Date,
        public isActive: boolean = false,
        public _subMenu: string,
        public _images: Image,
        public _colors: Array<string>,
        public _sizes: Array<string>
      
    ){}
}

export interface Image {
    Image: Array<string> ;
    SubImage: Array<string> ;
}
