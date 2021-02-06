export interface NativeTransitionOptions {
    direction?: string;
    duration?: number;
    slowdownfactor?: number;
    slidePixels?: number;
    iosdelay?: number;
    androiddelay?: number;
    winphonedelay?: number;
    fixedPixelsTop?: number;
    fixedPixelsBottom?: number;
    action?: string;
    origin?: string;
    href?: string;
}
/**
 * @name NativePageTransitions
 * @description
 * The Native Page Transitions plugin uses native hardware acceleration to animate your transitions between views. You have complete control over the type of transition, the duration, and direction.
 *
 * @usage
 * ```
 * import {NativePageTransitions, NativeTransitionOptions} from 'ionic-native';
 *
 * let options: NativeTransitionOptions = {
 *    direction: 'up',
 *    duration: 500,
 *    slowdownfactor: 3,
 *    slidePixels: 20,
 *    iosdelay: 100,
 *    androiddelay: 150,
 *    winphonedelay: 250,
 *    fixedPixelsTop: 0,
 *    fixedPixelsBottom: 60
 *  };
 *
 * NativePageTransitions.slide(options)
 *   .then(onSuccess)
 *   .catch(onError);
 *
 * ```
 */
export declare class NativePageTransitions {
    /**
     * Perform a slide animation
     * @param options {NativeTransitionOptions} Options for the transition
     * @returns {Promise<any>}
     */
    static slide(options: NativeTransitionOptions): Promise<any>;
    /**
     * Perform a flip animation
     * @param options {NativeTransitionOptions} Options for the transition
     * @returns {Promise<any>}
     */
    static flip(options: NativeTransitionOptions): Promise<any>;
    /**
     * Perform a fade animation
     * @param options {NativeTransitionOptions} Options for the transition
     * @returns {Promise<any>}
     */
    static fade(options: NativeTransitionOptions): Promise<any>;
    /**
     * Perform a slide animation
     * @param options {NativeTransitionOptions} Options for the transition
     * @returns {Promise<any>}
     */
    static drawer(options: NativeTransitionOptions): Promise<any>;
    /**
     * Perform a slide animation
     * @param options {NativeTransitionOptions} Options for the transition
     * @returns {Promise<any>}
     */
    static curl(options: NativeTransitionOptions): Promise<any>;
}
