declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}
declare module '*.frag' {
    const content: string;
    export = content;
}
declare module '*.vert' {
    const content: string;
    export = content;
}
declare module '*.txt' {
    const content: string;
    export = content;
}
declare module '*.glsl' {
    const content: string;
    export = content;
}
declare module '*.obj' {
    const content: string;
    export = content;
}
declare module '*.mtl' {
    const content: string;
    export = content;
}
declare var wbp:{
    dev:boolean
};

// declare function initShaders(...args);


type RootState={
    loading:{
        prev:number,
        shade:number,
        effect:number
    }
};