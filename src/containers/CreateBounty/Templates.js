import intl from 'react-intl-universal';

const handleChooseTemplate = change => templateName => {
  /*
  const chosenTemplate = templates.find((template) => template.templateName === templateName)
  chosenTemplate && chosenTemplate.templateFields.map((templateField) => {
    // dispatch redux form field change here via formFieldSetValue
    formfieldSetValue(templateField)
    // or setWholeFormState logic
  })
  return
  */

  /*
  PS - Eric's Notes

  src/containers/CreateBounty/CreateBountyForm.js

  Pass the change prop instance to above
  onChange={handleChooseTemplate(change)} where change is destructured from this.props bound from the redux form higher order component/wrapper
  Lambda function returning another at the top of this file :)

  change(field, value)
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
  change(
    'categories',
    intl.get(
      'sections.create_bounty.templates.' + templateName.value + '.categories'
    )
  );
};

export default handleChooseTemplate;
