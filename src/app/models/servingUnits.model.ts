/**
 * Serving Unit Model.
 */
export interface ServingUnit {

    Name: string;

    ShortCode: string;

    SHortCodePlural: string;

}

export interface ServingUnitsDoc {

    data: ServingUnit[];
}