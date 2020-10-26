export const largeAnnotation =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, cupiditate " +
    "exercitationem fugit laborum maiores mollitia natus nulla odio omnis perspiciatis " +
    "provident qui quidem, reprehenderit, tempora tempore ut veritatis voluptate " +
    "voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias, aliquam " +
    "assumenda, atque consequuntur distinctio eligendi eveniet hic ipsa laudantium " +
    "necessitatibus odit perferendis possimus praesentium quo similique sit sunt voluptatibus?" +
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate deserunt " +
    "esse illo, impedit inventore laborum natus possimus, recusandae, saepe similique tempora " +
    "tempore temporibus ut veniam. Iusto qui quis reiciendis."

export type Comment = {
    userId: number,
    ficId: number,
    text: string,
}

export type Fic = {
    ficId: number,
    author: string,
    rating: number,
    img: string,
    name: string,
    annotation: string,
    genres: string[],
    tags: string[],
    lastUpdate: string,
    comments: Comment[]
}


export const mordorsTestFics: Fic[] = [
    {
        ficId: 1,
        rating: 5,
        author: 'Deathsmell',
        img: 'http://grolleaufricard.me/diplomacy/wp-content/uploads/2015/10/barad-dur-1024x768.jpg',
        name: 'Мордор',
        annotation: largeAnnotation,
        genres: ["Action", "Horror", "Erotic", "Comedy"],
        tags: ["Interesting", "Love", "OneProto", "ElfProto", "Strapon"],
        lastUpdate: '15 минут назад',
        comments: [
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
        ],
    },
    {
        ficId: 2,
        rating: 1,
        author: 'Хуй с грры',
        img: 'https://memegenerator.net/img/images/14353236.jpg',
        name: 'Ванильное дерьмо',
        annotation: largeAnnotation,
        genres: ["Action", "Horror", "Erotic", "Comedy"],
        tags: ["Interesting", "Love", "OneProto", "ElfProto", "Strapon"],
        lastUpdate: 'больше часа назад',
        comments: [
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
            {
                ficId: 1,
                userId: 33,
                text: largeAnnotation
            },
        ],
    },
]
