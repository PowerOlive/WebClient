import _ from 'lodash';

import { ucFirst } from './string';

export const BOOL_FIELDS = ['x-pm-encrypt', 'x-pm-sign'];
export const FIELDS = {
    AVOID: ['version', 'n', 'prodid', 'abuid'],
    FN: ['fn'],
    EMAIL: ['email'],
    TEL: ['tel'],
    ADR: ['adr'],
    NOTE: ['note'],
    KEY: ['key'],
    'X-PM-ENCRYPT': ['x-pm-encrypt'],
    'X-PM-SIGN': ['x-pm-sign'],
    'X-PM-SCHEME': ['x-pm-scheme'],
    'X-PM-MIMETYPE': ['x-pm-mimetype'],
    'X-PM-TLS': ['x-pm-tls'],
    PHOTO: ['photo'],
    PERSONALS: [
        'kind',
        'source',
        'xml',
        'nickname',
        'bday',
        'anniversary',
        'gender',
        'impp',
        'lang',
        'tz',
        'geo',
        'title',
        'role',
        'logo',
        'org',
        'member',
        'related',
        'categories',
        'rev',
        'sound',
        'uid',
        'clientpidmap',
        'url',
        'fburl',
        'caladruri',
        'caluri'
    ]
};

const STANDARD_KEYS = [].concat(
    FIELDS.AVOID,
    FIELDS.FN,
    FIELDS.EMAIL,
    FIELDS.TEL,
    FIELDS.ADR,
    FIELDS.NOTE,
    FIELDS.PHOTO,
    FIELDS.PERSONALS,
    FIELDS.KEY,
    FIELDS['X-PM-ENCRYPT'],
    FIELDS['X-PM-SCHEME'],
    FIELDS['X-PM-MIMETYPE'],
    FIELDS['X-PM-SIGN'],
    FIELDS['X-PM-TLS']
);

const HUMAN_KEYS = [].concat(
    FIELDS.FN,
    FIELDS.EMAIL,
    FIELDS.TEL,
    FIELDS.ADR,
    FIELDS.NOTE,
    FIELDS.PHOTO,
    FIELDS.PERSONALS
);

const KEY_MAP = {
    FN: 'Name',
    PERSONALS: 'Personals'
};

const SINGLE_KEYS = [].concat(
    FIELDS['X-PM-ENCRYPT'],
    FIELDS['X-PM-SCHEME'],
    FIELDS['X-PM-MIMETYPE'],
    FIELDS['X-PM-SIGN'],
    FIELDS['X-PM-TLS']
);

export const toHumanKey = (key) => {
    return KEY_MAP[key] || `${ucFirst(key.toLowerCase())}s`;
};

export const isSingle = (key) => SINGLE_KEYS.includes(key);

/**
 * Get keys available for a field or non standards keys
 * @param  {String} field Type of fields (CUSTOMS to list non-standard)
 * @param  {Object} vcard
 * @return {Array}
 */
export function getKeys(field = '', vcard = {}) {
    // Return non standard keys
    if (field === 'CUSTOMS') {
        return _.difference(Object.keys(vcard.data), STANDARD_KEYS);
    }
    return FIELDS[field];
}

export function isPersonalsKey(key = '') {
    return FIELDS.PERSONALS.includes(key.toLowerCase());
}

/**
 * Get keys "human friendly" from a vCard, what we want
 * to see as a human about a contact
 * @param  {Object} vcard
 * @return {Array}
 */
export function getHumanFields(vcard = {}) {
    return _.intersection(Object.keys(vcard.data), HUMAN_KEYS);
}
