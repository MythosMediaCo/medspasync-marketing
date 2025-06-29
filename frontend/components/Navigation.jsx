import React from 'react';
import { Navigation as UnifiedNavigation } from '../../../medspasync-ecosystem/design-system/components/Navigation';

const Navigation = () => {
  return (
    <UnifiedNavigation
      variant="marketing"
      showAuth={true}
      className="nav-header"
    />
  );
};

export default Navigation;