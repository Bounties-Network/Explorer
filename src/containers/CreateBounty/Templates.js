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

  src/containers/CreateBounty/index.js

  1 - Imported the change redux-form action creator here line 8
  2 - Bound it via redux-connect at the bottom of the file putting it in the object of the second argument with the rest of the actions
  3 - index.js -> prop pass the now dispatch bound action "change" to the CreateBountyForm.js component at index.js:215
  4 - Pass the change prop instance to the function exported in the Templates.js file via CreateBountyForm.js:259 
    onChange={handleChooseTemplate(change)}
    Lambda function returning another at the top of this file :)
*/

  console.log(
    'selected',
    intl.get(
      'sections.create_bounty.templates.' + templateName.value + '.description'
    )
  );
  change(
    'CreateBounty',
    'description',
    intl.get(
      'sections.create_bounty.templates.' + templateName.value + '.description'
    )
  );
};

export default handleChooseTemplate;
