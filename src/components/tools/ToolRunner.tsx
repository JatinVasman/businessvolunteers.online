import React from 'react';
import type { ToolMeta } from '../../data/toolsData';
import { CalculatorsRunner } from './runners/CalculatorsRunner';
import { TextRunner } from './runners/TextRunner';
import { DevRunner } from './runners/DevRunner';
import { QrRunner } from './runners/QrRunner';
import { ImageRunner } from './runners/ImageRunner';
import { PdfRunner } from './runners/PdfRunner';
import { DocsRunner } from './runners/DocsRunner';
import { MarketingRunner } from './runners/MarketingRunner';
import { SeoRunner } from './runners/SeoRunner';
import { EcommerceRunner } from './runners/EcommerceRunner';

interface ToolRunnerProps {
  tool: ToolMeta;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  return (
    <div className="bv-tool-runner-wrap">
      {/* Category Runner Delegation */}
      {tool.categoryKey === 'calculators' && <CalculatorsRunner tool={tool} />}
      {tool.categoryKey === 'text' && <TextRunner tool={tool} />}
      {tool.categoryKey === 'dev' && <DevRunner tool={tool} />}
      {tool.categoryKey === 'qr' && <QrRunner tool={tool} />}
      {tool.categoryKey === 'images' && <ImageRunner tool={tool} />}
      {tool.categoryKey === 'pdf' && <PdfRunner tool={tool} />}
      {tool.categoryKey === 'docs' && <DocsRunner tool={tool} />}
      {tool.categoryKey === 'marketing' && <MarketingRunner tool={tool} />}
      {tool.categoryKey === 'seo' && <SeoRunner tool={tool} />}
      {tool.categoryKey === 'ecommerce' && <EcommerceRunner tool={tool} />}
    </div>
  );
};
