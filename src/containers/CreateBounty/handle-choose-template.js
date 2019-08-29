import intl from 'react-intl-universal';

const handleChooseTemplate = (
  change,
  setState,
  currentCategories
) => templateName => {
  // Overwrite description
  change(
    'description',
    intl.get(
      'sections.create_bounty.templates.' + templateName.value + '.description'
    )
  );
  // Concat categories to current or overwrite
  change(
    'categories',
    Array.isArray(currentCategories)
      ? currentCategories.concat(
          intl.get(
            'sections.create_bounty.templates.' +
              templateName.value +
              '.categories'
          )
        )
      : 'sections.create_bounty.templates.' + templateName.value + '.categories'
  );
  setState && setState(templateName.value);
};

export default handleChooseTemplate;
