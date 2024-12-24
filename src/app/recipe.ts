// export interface RecipeOverview {
//     id: number;
//     thumbnail: string;
//     name: string;
//     hashtag: string[];
//     timeMin: number;
// }

export interface RecipeDetail {
    // total 14
    id: number;
    thumbnail: string;
    name: string;
    hashtag: string[];
    timeMin: number;

    author: string;
    date: string;
    likeQty: number;
    commentQty: number;
    comments: Commentinfo[];

    introduction: string;

    ingredients: Ingredients[];
    serve: number;
    step: string[];
    nutrition: Nutrition[];
}

export interface Commentinfo {
    persona: string;
    comment: string;
    like: number;
    isLike: number
}

/** 這是原料介面 冒號後面是型別 */
export interface Ingredients {
    item: string;
    metric: number;
    /** 宣告單位屬性 */
    type: number;
}

export interface Nutrition {
    element: string;
    weight: number;
    type: number;
}

export interface TypeList {
    thumbnail: string;
    hashtag: string;
}


