import React from 'react';
import { Container } from './Container';
import { Footer } from './Footer';
import { NavigationTabs } from './NavigationTabs';

interface AppShellProps {
  activeTab?: 'home' | 'add' | undefined;
}

export function AppShell({
  activeTab,
  children,
}: React.PropsWithChildren<AppShellProps>) {
  return (
    <Container>
      <NavigationTabs activeTab={activeTab} />
      {children}
      <Footer />
    </Container>
  );
}
