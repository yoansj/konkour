import firebase from 'firebase/app';
import "firebase/firestore";

export type RawContestType = {
    /**
     * Author of the contest
     */
    author: string,

    /**
     * Original date of the contest
     */
    contestDate: firebase.firestore.Timestamp,

    /**
     * Date when the contest was harvested
     */
    harvestDate: firebase.firestore.Timestamp,

    /**
     * Url of the source contest
     */
    url: string,

    /**
     * Source type of the contest
     * Can be Twitter, Instagram, Other
     * ! In reality only Twitter is supported
     */
    sourceType: "twitter" | "instagram" | "other";

    /**
     * Id of the contest
     */
    id?: string

    /* These are only valid for a Twitter contest */

    /**
     * Array containing the number of comment words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twComment?: any[];

    /**
     * Array containing the number of fav words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twFav?: any[];

    /**
     * Array containing the number of follow words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twFollow?: any[];

    /**
     * Array containing the number of rt words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twRt?: any[];

    /* These are only valid for a Twitter contest */

}

export type RawTwitterContest = {
    /* These are only valid for a Twitter contest */

    /**
     * Array containing the number of comment words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twComment: any[];

    /**
     * Array containing the number of fav words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twFav: any[];

    /**
     * Array containing the number of follow words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twFollow: any[];

    /**
     * Array containing the number of rt words
     * The array is of length 2
     * The first value is the number of words found
     * The second one is the max number of words that can be found
     */
    twRt: any[];

    /* These are only valid for a Twitter contest */
}