import { FormInput } from 'hocs';
import {
  TextInput,
  MarkdownEditor,
  SearchSelect,
  RadioGroup,
  NumberInput,
  DatePicker
} from 'components';

export const FormTextInput = FormInput(TextInput);
export const FormMarkdownEditor = FormInput(MarkdownEditor);
export const FormSearchSelect = FormInput(SearchSelect);
export const FormRadioGroup = FormInput(RadioGroup);
export const FormNumberInput = FormInput(NumberInput);
export const FormDatePicker = FormInput(DatePicker);
