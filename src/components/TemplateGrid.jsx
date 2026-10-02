import React from 'react';
import { TemplateCard } from './TemplateCard';
import { EmptyState } from './EmptyState';
import { Search } from 'lucide-react';

export const TemplateGrid = ({ templates, emptyTitle = 'No templates found', emptyDescription = 'Try adjusting your search query or filter settings.' }) => {
  if (!templates || templates.length === 0) {
    return <EmptyState icon={Search} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};
