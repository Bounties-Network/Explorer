import { FormInput } from 'hocs';
import {
  TextInput,
  Textbox,
  MarkdownEditor,
  SearchSelect,
  RadioGroup,
  NumberInput,
  DatePicker,
  Toggle,
  Rating,
  Checkbox
} from 'components';

export const FormTextInput = FormInput(TextInput);
export const FormTextbox = FormInput(Textbox);
export const FormMarkdownEditor = FormInput(MarkdownEditor);
export const FormSearchSelect = FormInput(SearchSelect);
export const FormRadioGroup = FormInput(RadioGroup);
export const FormNumberInput = FormInput(NumberInput);
export const FormDatePicker = FormInput(DatePicker);
export const FormToggle = FormInput(Toggle);
export const FormRating = FormInput(Rating);
export const FormCheckbox = FormInput(Checkbox);
