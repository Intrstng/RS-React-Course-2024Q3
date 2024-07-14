// import '@testing-library/jest-dom/vitest'
//                                   import '@testing-library/jest-dom';
//                     // import '@testing-library/jest-dom/extend-expect';
// import { cleanup } from '@testing-library/react'
// import { afterEach } from 'vitest'
//
// afterEach(() => {
//   cleanup()
// })

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// import matchers from '@testing-library/jest-dom/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
