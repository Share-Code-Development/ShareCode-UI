import { animate, style, transition, trigger } from "@angular/animations";

const fadeInTransition = transition(':enter', [
    style({
        opacity: 0
    }),
    animate('0.2s ease-in', style({
        opacity: 1
    }))
]);

const fadeOutTransition = transition(':leave', [
    style({
        opacity: 1
    }),
    animate('0.2s ease-out', style({
        opacity: 0
    }))
])

const scaleDownTransition = transition(':leave', [
    style({
        transform: 'scale(1)'
    }),
    animate('0.2s ease-out', style({
        transform: 'scale(0.95)'
    }))
])



export const scaleDown = trigger('scaleDown', [
    scaleDownTransition
]);

export const fadeIn = trigger('fadeIn', [
    fadeInTransition
]);

export const fadeOut = trigger('fadeOut', [
    fadeOutTransition
]);