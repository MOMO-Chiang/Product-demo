import React from 'react';
import { PageComponentProps } from '@shared/types';
import { CustomTextArea } from './components/CustomTextArea';
import { DemoCodeMirrow } from './components/DemoCodeMirrow';

export type HomePageProps = PageComponentProps;

export const HomePage: React.FC<HomePageProps> = () => (
  <div>
    <h1>歡迎使用資金清查系統</h1>
    {/* <CustomTextArea></CustomTextArea>
    <br /> */}
    {/* <DemoCodeMirrow></DemoCodeMirrow> */}
  </div>
);
