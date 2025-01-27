import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { WebSocketProvider } from '@/context/WebSocketProvider';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <DashboardLayout defaultSidebarCollapsed>
        <PageContainer>{props.children}</PageContainer>
      </DashboardLayout>
    </WebSocketProvider>
  );
}  
