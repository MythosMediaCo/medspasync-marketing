import { webcrypto } from 'crypto';
globalThis.crypto = webcrypto;

import('./node_modules/vite/bin/vite.js');
