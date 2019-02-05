import { FormInput } from 'hocs';
import { Textbox, TextInput } from 'components';

export const FormTextInput = FormInput(TextInput, 'formik');
export const FormTextbox = FormInput(Textbox, 'formik');
