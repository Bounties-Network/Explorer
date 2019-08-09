import intl from 'react-intl-universal';
import { change } from 'redux-form';

const handleChooseTemplate = templateName => {
  /*
  const chosenTemplate = templates.find((template) => template.templateName === templateName)
  chosenTemplate && chosenTemplate.templateFields.map((templateField) => {
    // dispatch redux form field change here via formFieldSetValue
    formfieldSetValue(templateField)
    // or setWholeFormState logic
  })
  return
  */
  console.log(
    'selected',
    intl.get(
      'sections.create_bounty.templates.' + templateName.value + '.description'
    )
  );
  change(
    'description',
    intl.get(
      'sections.create_bounty.templates.' + templateName.value + '.description'
    )
  );
};

export default handleChooseTemplate;
