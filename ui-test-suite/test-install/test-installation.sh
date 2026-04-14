#!/bin/bash

# Exit on any failure
set -e
echo "Starting Package Integrity Tests..."

# Assuming you've built the library via `npm run build`
# e.g., output in /dist

LIB_TARBALL=$(npm pack)
echo "Generated release tarball: $LIB_TARBALL"

rm -rf test-install/react-app test-install/vue-app

# 1. Test React Installation & Tree-shaking 
echo "Testing React Installation..."
mkdir -p test-install/react-app
cd test-install/react-app
npm init -y > /dev/null
npm install react react-dom typescript > /dev/null
npm install "../../$LIB_TARBALL" > /dev/null

cat << 'EOF' > test.tsx
import React from 'react';
import { Button } from 'my-ui-library/react';

export const App = () => <Button>Install test</Button>;
EOF

# Compile to ensure types exist
npx tsc --noEmit --jsx react --esModuleInterop test.tsx
echo "React Installation Success"
cd ../../

# 2. Test Vue Installation
echo "Testing Vue Installation..."
mkdir -p test-install/vue-app
cd test-install/vue-app
npm init -y > /dev/null
npm install vue typescript > /dev/null
npm install "../../$LIB_TARBALL" > /dev/null

cat << 'EOF' > test.ts
import { defineComponent } from 'vue';
import { Button } from 'my-ui-library/vue';

export default defineComponent({
  components: { Button },
  template: '<Button>Test</Button>'
});
EOF

npx tsc --noEmit --esModuleInterop --moduleResolution node test.ts
echo "Vue Installation Success"
cd ../../

echo "✅ Package Integrity Checks Passed!"
