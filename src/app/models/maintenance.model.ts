/**
 * Maintenance Model.
 */
export interface Maintenance {

    Android: Android;

    Web: Web;
}

export interface Android {

    Availability: Availability

    Updates: Updates
}

export interface Web {

    Availability: Availability
}

export interface Updates {

    LatestMajorVersion: number,

    Message: string,

    Url: string
}

export interface Availability {

    EnableApp: boolean,

    Message: string
}